<#
 ============================================================
  AI CITY 2250 - RAPPERSWIL-JONA : GRAPHIQUE EDITION
  Natives Windows-Fenster via PowerShell (WinForms)
  Kein Browser. Keine Konsole. Die Stadt ist animiert.
 ============================================================
#>

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# ---------- HELFER ----------
function New-Brush($argb) { New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(-16777216 -bor $argb)) }
function ArgB($a,$r,$g,$b){ return (($a -shl 24) -bor ($r -shl 16) -bor ($g -shl 8) -bor $b) }

$script:Tick = 0
$script:Sim = [PSCustomObject]@{
  Total=0; Day=0; Invested=0; Projects=0; Buildings=14; TeamLevel=1
}
$script:Paused = $false
$script:Speed = 1

# ---------- ORGANISATION (CEO + 8 Divisionen) ----------
$Cols = @('255,215,0','0,255,153','0,190,255','80,220,140','255,150,240','255,120,90','0,170,255','180,120,255','0,190,255')
function TColor($i){ $c = $Cols[$i % $Cols.Length].Split(','); return (ArgB 255 ([int]$c[0]) ([int]$c[1]) ([int]$c[2])) }

$script:Divisions = @(
  'EXECUTIVE BOARD','AI DIVISION','SOFTWARE DIVISION','SHOPIFY DIVISION','DESIGN DIVISION',
  'MARKETING DIVISION','AUTOMATION DIVISION','BUSINESS DIVISION','RESEARCH DIVISION'
)

$script:Names = @(
  @('CEO','CTO','CIO','COO','CFO','CMO','CPO','CSO','CAIO','CINO'),
  @('Big-Pickle','Hy3','MiMo','Muse-Spark','Nemotron','qwen3-4b','llama3.2','qwen3-8b'),
  @('OpenCode','Claude Code','Backend','Frontend','DevOps','Security','Cloud','DB-Keeper'),
  @('Store-Magier','CRO-Optimi','Product-Cu','Checkout','App-Tinker'),
  @('DesignArena','UI-Architekt','Brand','Motion','Hologramm'),
  @('SEO-Patriarch','Ads-Zar','Social','Email','Copy','Arena AI'),
  @('Workflow-Zauberer','API-Botsch','Windows Use','Script-Samurai','Orchestrierer'),
  @('Sales-Ikone','Finanz-Director','Legal','CRM-Ops','Skalierung'),
  @('Trend-Oracle','Daten-Wi','Wettbewerb','Innovation')
)

$script:Citizens = New-Object System.Collections.ArrayList
for ($di=0; $di -lt 9; $di++) {
  $role = $script:Divisions[$di]
  for ($i=0; $i -lt $script:Names[$di].Count; $i++) {
    $null = $script:Citizens.Add([PSCustomObject]@{
      Name=$script:Names[$di][$i]; Div=$di; Role=$role; Level=1; Xp=0; Revenue=0
      Projects=0; Builds=0; State='work'; Timer=0; Chat=''; ChatT=0
      X=(20+$di*10+$i*6)%108; Y=(12+$di*4)%48; Tx=0; Ty=0; Trail=@{}
    })
  }
}

# ---------- PROJEKTE (alles - nicht nur Crypto) ----------
$script:Proj = @(
  'Quantum-Store errichten','Holo-Marktplatz','GTA-Aera KI-Plattform','Neon-Netz ausrollen',
  'Globales Zahlungs-Gate','DeFi-Tempel verzinsen','SEO-Monument skalieren','Fusion-Reaktor KI',
  'Kunden-Imperium aufbauen','Sakura-SPA eroeffnen','Cloud-Imperium erweitern','Firmenwagen-AI flotten',
  'Hafen-Logistik AI','Schloss-Holo-Tour','Lido F&B-Roboter','Jona Einkaufs-AI','Blockchain-Bruecke',
  'KI-Healthcare-Center','Smart-Farming Suedufer','Metaverse-Bahnhof','Robotik-Produktion',
  'Fusion-Energie Export','KI-Schulsystem','Autonome Flotte Obersee','Trading-Supercomputer',
  'Hologramm-Konzerne','Nanobot-Recycling','Orbital-Node 2250'
)
$script:Rev = @(9400,5200,41000,7800,12400,9800,3300,56000,6700,2400,18000,3900,6100,2900,4700,7500,15000,22000,5100,31000,4200,8700,13000,6900,26000,5600,11000,76000)

function RandR { return (Get-Random -Minimum $script:Rev[0] -Maximum 26000) }

# ---------- STADTGEDAEUDE ----------
$script:Blds = New-Object System.Collections.ArrayList
for ($di=0; $di -lt 9; $di++) {
  $null = $script:Blds.Add([PSCustomObject]@{ N="Tower-$($script:Divisions[$di])"; Div=$di; Lvl=1; X=(14+$di*11); Y=(10+$di*3)%46; W=4; H=4; Prog=0 })
}
for ($i=0; $i -lt 40; $i++) {
  $x = Get-Random -Minimum 5 -Maximum 105
  $y = Get-Random -Minimum 60 -Maximum 62
  if ($x -ge 72 -and $x -lt 95 -and $y -ge 34) { $y = 46 }
  $null = $script:Blds.Add([PSCustomObject]@{ N="Haus"; Div=-1; Lvl=1; X=$x; Y=$y; W=(Get-Random -Minimum 2 -Maximum 3); H=(Get-Random -Minimum 2 -Maximum 3); Prog=0 })
}

# ---------- EREIGNISSE ----------
$script:Events = @(
  'Fusions-Reaktor stabil - Energie +3%','Quantum-Link Latenz -18ms','Krypto-Gate frei',
  'Design-Monument enthüllt - Brand +9%','Backbone 8TB/s','Bio-R&D Patent',
  'Orbital-Node synchron','18 SmartTowers genehmigt','Marktindex +2.4%','Zero-Trust Update'
)

# ---------- WASSER/LAND PRUEFEN ----------
function InWater($x,$y){
  if ($y -ge 62) { return $true }
  if ($x -ge 70 -and $x -lt 96 -and $y -ge 34 -and $y -lt 62) { return $false } # Halbinsel
  return $false
}

# ---------- SIMULATION ----------
function SimTick {
  param([int]$n=1)
  for ($s=0; $s -lt $n; $s++) {
    foreach ($c in $script:Citizens) {
      if ($c.ChatT -gt 0) { $c.ChatT-- }
      if ($c.State -eq 'travel') {
        $dx = $c.Tx - $c.X; $dy = $c.Ty - $c.Y
        $d = [Math]::Sqrt($dx*$dx+$dy*$dy)
        if ($d -lt 3) { $c.State='work'; $c.Timer=0 }
        else { $c.X += $dx/$d*0.5; $c.Y += $dy/$d*0.4 }
      }
      $c.Timer--
      if ($c.Timer -gt 0) { continue }
      $r = Get-Random -Minimum 0 -Maximum 100
      if ($r -lt 14) {
        # Projekt eroeffnen
        $pi = Get-Random -Minimum 0 -Maximum ($script:Proj.Count-1)
        $pName = $script:Proj[$pi]; $pR = $script:Rev[$pi]
        $c.Projects++; $script:Sim.Projects++
        $c.Revenue += $pR; $script:Sim.Day += $pR; $script:Sim.Total += $pR
        $c.Xp += [Math]::Floor($pR/900)
        $c.Chat = "QD $pR > $pName"; $c.ChatT = 30
        # Neues Gebaeude bei build-artigen Projekten
        if (Get-Random -Maximum 2 -eq 0) {
          $bx = (Get-Random -Minimum 6 -Maximum 100); $by = (Get-Random -Minimum 40 -Maximum 60)
          if (-not (InWater $bx $by)) {
            $null = $script:Blds.Add([PSCustomObject]@{ N="Projekt"; Div=$c.Div; Lvl=1; X=$bx; Y=$by; W=3; H=3; Prog=5 })
          }
        }
        $c.Timer = 6 + (Get-Random -Maximum 8)
      } elseif ($r -lt 30) {
        # Kommunikation
        $o = $script:Citizens[(Get-Random -Maximum $script:Citizens.Count)]
        $msgs = @('Deploy v4.2 OK','Daten fusioniert','Holo-Patch LIVE','Reaktor stabil','Gate frei','Route offen','Sync 100%') 
        $c.Chat = "> " + $msgs[(Get-Random -Maximum $msgs.Count)]; $c.ChatT = 20
        $o.Timer = 4
        $c.Timer = 4 + (Get-Random -Maximum 5)
      } elseif ($r -lt 42) {
        # Level up
        if ($c.Xp -gt ($c.Level*40)) { $c.Level++; $c.Chat = "LVL $($c.Level)!"; $c.ChatT = 20; $c.Timer=5 }
        else { $c.Timer = 4 }
      } elseif ($r -lt 52) {
        # Investieren
        $amt = Get-Random -Minimum 200 -Maximum 1400
        $script:Sim.Invested += $amt; $script:Sim.Total -= $amt
        $c.Chat = "INV -QD$amt"; $c.ChatT = 20; $c.Timer = 4
      } else {
        $c.Timer = 3 + (Get-Random -Maximum 6)
      }
    }
    # Gebaeude-Fortschritt
    foreach ($b in $script:Blds) {
      if ($b.Lvl -lt 5 -and (Get-Random -Maximum 4) -eq 0) {
        $b.Prog += Get-Random -Minimum 2 -Maximum 9
        if ($b.Prog -ge 100) { $b.Lvl++; $b.Prog=0; $script:Sim.Buildings++ }
      }
    }
    # Pawisches Einkommen
    $script:Sim.Day += 4 + $script:Sim.TeamLevel + (Get-Random -Maximum 8)
    $script:Sim.Total += 4 + $script:Sim.TeamLevel + (Get-Random -Maximum 8)
    $script:Sim.TeamLevel = 1 + [Math]::Floor($script:Sim.Projects/20)
    # Ereignis
    if ((Get-Random -Maximum 12) -eq 0) {
      $script:Sim.Total += 800; $script:Sim.Projects++
      $log.Add($script:Events[(Get-Random -Maximum $script:Events.Count)])
    }
  }
}

# ---------- WINFORMS ----------
$form = New-Object System.Windows.Forms.Form
$form.Text = 'AI CITY 2250 - RAPPERSWIL-JONA :: Das staerkste KI-Team der Welt'
$form.Size = New-Object System.Drawing.Size(1400,860)
$form.StartPosition = 'CenterScreen'
$form.BackColor = [System.Drawing.Color]::FromArgb(8,8,20)

# Panel Stadt (Zeichnen)
$paint = New-Object System.Windows.Forms.Panel
$paint.Location = New-Object System.Drawing.Point(0,60)
$paint.Size = New-Object System.Drawing.Size(1000,760)
$paint.BackColor = [System.Drawing.Color]::FromArgb(8,10,18)
$paint.DoubleBuffered = $true

# Panel rechts (Log + Stats)
$right = New-Object System.Windows.Forms.Panel
$right.Location = New-Object System.Drawing.Point(1005,60)
$right.Size = New-Object System.Drawing.Size(380,760)
$right.BackColor = [System.Drawing.Color]::FromArgb(12,12,26)

$log = New-Object System.Windows.Forms.ListBox
$log.Location = New-Object System.Drawing.Point(10,230)
$log.Size = New-Object System.Drawing.Size(360,520)
$log.BackColor = [System.Drawing.Color]::FromArgb(10,10,22)
$log.ForeColor = [System.Drawing.Color]::FromArgb(140,240,255)
$log.BorderStyle = 'None'

$title = New-Object System.Windows.Forms.Label
$title.Location = New-Object System.Drawing.Point(20,12)
$title.Size = New-Object System.Drawing.Size(1360,40)
$title.Font = New-Object System.Drawing.Font('Segoe UI',16,[System.Drawing.FontStyle]::Bold)
$title.ForeColor = [System.Drawing.Color]::FromArgb(0,255,213)
$title.Text = 'AI CITY 2250  ::  RAPPERSWIL-JONA  |  Das staerkste KI-Team der Welt  |  Jahr 2250'

# Stats
function New-StatLbl($x,$y,$w){
  $l = New-Object System.Windows.Forms.Label
  $l.Location = New-Object System.Drawing.Point($x,$y); $l.Size = New-Object System.Drawing.Size($w,20)
  $l.Font = New-Object System.Drawing.Font('Segoe UI',10)
  $l.ForeColor = [System.Drawing.Color]::FromArgb(160,220,255)
  return $l
}
$lEarn = New-StatLbl 12 90 360;  $lEarn.Text = 'Gesamterloes: QD 0'
$lDay  = New-StatLbl 12 115 360; $lDay.Text  = 'Tageserloes:  QD 0'
$lInv  = New-StatLbl 12 140 360; $lInv.Text  = 'Investiert:   QD 0'
$lProj = New-StatLbl 12 165 360; $lProj.Text = 'Projekte:     0'
$lLvl  = New-StatLbl 12 190 360; $lLvl.Text  = 'Team-Level:   1'
$lCost = New-StatLbl 12 65 360;  $lCost.Text  = 'AI-Kosten: 0 USD (28 Free Models)'; $lCost.ForeColor = [System.Drawing.Color]::FromArgb(0,255,140)

$right.Controls.AddRange(@($lCost,$lEarn,$lDay,$lInv,$lProj,$lLvl,$log))

# Buttons
function New-Btn($t,$x,$y,$cb){
  $b = New-Object System.Windows.Forms.Button
  $b.Text=$t; $b.Location=New-Object System.Drawing.Point($x,$y); $b.Size=New-Object System.Drawing.Size(120,32)
  $b.FlatStyle='Flat'; $b.FlatAppearance.BorderColor=[System.Drawing.Color]::FromArgb(0,200,255)
  $b.BackColor=[System.Drawing.Color]::FromArgb(20,40,60); $b.ForeColor=[System.Drawing.Color]::FromArgb(200,240,255)
  $b.Add_Click({ & $cb })
  $form.Controls.Add($b)
}
New-Btn 'Pause / Start' 1010 8 $script:cbtPause
New-Btn 'Schneller 4x'  1140 8 $script:cbtFast
New-Btn 'Projekt bauen' 1270 8 $script:cbtBuild

# ---------- ZEICHNO-FUNKTION ----------
$brushCache = @{}
function Brush($argb){ if(-not $brushCache.ContainsKey($argb)){ $brushCache[$argb]=New-Brush $argb }; return $brushCache[$argb] }

$paint.Add_Paint({
  param($sender,$e)
  $g = $e.Graphics
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $W = $paint.Width; $H = $paint.Height
  $scaleX = $W / 115.0; $scaleY = $H / 88.0
  $tx = { param($x) [int]($x*$scaleX) }
  $ty = { param($y) [int]($y*$scaleY) }
  $wdt = { param($w) [int]($w*$scaleX) }

  # Hintergrund Land+Wasser
  $g.Clear([System.Drawing.Color]::FromArgb(8,10,18))
  $landBrush = Brush (ArgB 255 14 22 18)
  $g.FillRectangle($landBrush, 0,0, $W,$H)

  # Obersee
  $waterBrush1 = Brush (ArgB 255 10 44 84)
  $waterBrush2 = Brush (ArgB 255 16 60 100)
  $g.FillRectangle($waterBrush1, 0, (& $ty 62), $W, $H - (& $ty 62))
  # Wellen
  $penWave = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70,120,220,255))
  for ($i=0; $i -lt 8; $i++) {
    $wy = (& $ty (64+ (($script:Tick/40 + $i*7) % 22)))
    $g.DrawArc($penWave, 0, $wy, 400, 40, 0, 180)
    $g.DrawArc($penWave, 300, $wy-10, 500, 40, 180, 180)
  }

  # Halbinsel Altstadt
  $penuse = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255,120,90,60), 2)
  $g.DrawLine($penuse, (& $tx 70), (& $ty 62), (& $tx 70), (& $ty 42))
  $g.DrawLine($penuse, (& $tx 70), (& $ty 42), (& $tx 96), (& $ty 42))
  $g.DrawLine($penuse, (& $tx 96), (& $ty 42), (& $tx 96), (& $ty 62))

  # Strassen
  $streetPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255,60,70,80), 3)
  $g.DrawLine($streetPen, (& $tx 2), (& $ty 30), (& $tx 96), (& $ty 46))
  $g.DrawLine($streetPen, (& $tx 10), (& $ty 6), (& $tx 10), (& $ty 55))
  $g.DrawLine($streetPen, (& $tx 40), (& $ty 10), (& $tx 40), (& $ty 50))
  $g.DrawLine($streetPen, (& $tx 2), (& $ty 12), (& $tx 110), (& $ty 20))
  $g.DrawLine($streetPen, (& $tx 30), (& $ty 26), (& $tx 96), (& $ty 44))
  $g.DrawLine($streetPen, (& $tx 70), (& $ty 40), (& $tx 96), (& $ty 56))
  $g.DrawLine($streetPen, (& $tx 88), (& $ty 38), (& $tx 110), (& $ty 62))

  # Distrikt-Labels
  $lblFont = New-Object System.Drawing.Font('Segoe UI', 8)
  $lblBrush = Brush (ArgB 120 160 230 255)
  $g.DrawString('KEMPRATEN', $lblFont, $lblBrush, (& $tx 3), (& $ty 26))
  $g.DrawString('JONA-ZENTRUM', $lblFont, $lblBrush, (& $tx 32), (& $ty 30))
  $g.DrawString('AI-TECH', $lblFont, $lblBrush, (& $tx 46), (& $ty 12))
  $g.DrawString('BAHNHOF', $lblFont, $lblBrush, (& $tx 58), (& $ty 42))
  $g.DrawString('ALTSTADT+SCHLOSS', $lblFont, $lblBrush, (& $tx 74), (& $ty 34))
  $g.DrawString('LIDO/ZOO', $lblFont, $lblBrush, (& $tx 66), (& $ty 52))
  $g.DrawString('HOLZBRUECKE', $lblFont, $lblBrush, (& $tx 88), (& $ty 40))
  $g.DrawString('BOLLINGEN', $lblFont, $lblBrush, (& $tx 102), (& $ty 56))
  $g.DrawString('OBERSEE', $lblFont, $lblBrush, (& $tx 54), (& $ty 70))

  # Gebaeude
  $fontB = New-Object System.Drawing.Font('Segoe UI', 7)
  foreach ($b in $script:Blds) {
    $bx = & $tx $b.X; $by = & $ty $b.Y
    $bw = & $wdt $b.W; $bh = [int]($b.H * $scaleY)
    # Basis (schwarz) + Hohe (Turm waechst mit Level)
    $heightMul = 1 + $b.Lvl*0.35
    $bh = [int]($bh * $heightMul)
    if ($bh -gt 120) { $bh = 120 }
    if ($b.Div -lt 0) {
      $g.FillRectangle((Brush (ArgB 255 40 50 62)), $bx,$by, $bw,$bh)
      $g.FillRectangle((Brush (ArgB 255 56 70 84)), $bx+1,$by+1, $bw-2,$bh-2)
    } else {
      $tc = TColor $b.Div
      # Leuchtschein
      $g.FillRectangle((Brush ($tc)), $bx, ($by - $bh), $bw, 3)
      $g.FillRectangle((Brush (ArgB 230 20 24 34)), $bx, ($by - $bh + 3), $bw, ($bh-3))
      # Fenster
      $winPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(200,255,255,200))
      for ($wy=$by-8; $wy -gt ($by - $bh + 4); $wy -= 9) {
        $g.DrawLine($winPen, ($bx+2), $wy, ($bx+$bw-2), $wy)
      }
      # LED-Spitze
      $g.FillEllipse((Brush ($tc)), ($bx+$bw/2-2), ($by - $bh - 4), 4, 4)
      # Name
      $g.DrawString($script:Divisions[$b.Div].Split(' ')[0], $fontB, (Brush (ArgB 200 255 255 255)), $bx, ($by+2))
    }
    # Baugeruest wenn im Bau
    if ($b.Prog -gt 0 -and $b.Lvl -lt 5) {
      $scafPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255,255,180,60))
      $progH = [int](($bh) * $b.Prog/100)
      $g.DrawLine($scafPen, $bx, ($by - $progH), ($bx+$bw), ($by - $progH))
      $g.DrawRectangle($scafPen, $bx, ($by - $bh), $bw, $bh)
    }
  }

  # Buerger
  foreach ($c in $script:Citizens) {
    $tc = TColor $c.Div
    $cx = & $tx $c.X; $cyp = & $ty $c.Y
    # Pfad zum Ziel
    if ($c.State -eq 'travel') {
      $tp = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(130,110,160,255), 1)
      $g.DrawLine($tp, $cx, $cyp, (& $tx $c.Tx), (& $ty $c.Ty))
    }
    # Pulsierender Citizen
    $rr = 5 + (($script:Tick/6 + $c.Id) % 4)
    $bodyColor = $tc
    if ($c.ChatT -gt 0) { $bodyColor = ArgB 255 255 200 80 }
    $g.FillEllipse((Brush $bodyColor), ($cx-$rr), ($cyp-$rr), ($rr*2), ($rr*2))
    $g.FillEllipse((Brush (ArgB 255 255 255)), ($cx-$rr/3), ($cyp-$rr/3), 1.5, 1.5)
    if ($c.Chat -ne '' -and $c.ChatT -gt 0) {
      $chatF = New-Object System.Drawing.Font('Segoe UI', 7)
      $cBrush = Brush (ArgB 255 10 10 18)
      $g.FillRectangle($cBrush, ($cx-2), ($cyp-$rr-14), 8, 10)
      $g.DrawString($c.Chat, $chatF, (Brush (ArgB 255 255 255 255)), ($cx), ($cyp-$rr-13))
    }
  }

  # Titel im Stadtbereich
  $bigF = New-Object System.Drawing.Font('Segoe UI', 20, [System.Drawing.FontStyle]::Bold)
  $bigBrush = Brush (ArgB 110 0 255 213)
  $g.DrawString('AI CITY 2250', $bigF, $bigBrush, (& $tx 28), (& $ty -6))
})

# ---------- HANDLER ----------
$script:cbtPause = { $script:Paused = -not $script:Paused; }
$script:cbtFast = { $script:Speed = if($script:Speed -ge 4){1}else{4} }
$script:cbtBuild = {
  $pi = Get-Random -Minimum 0 -Maximum ($script:Proj.Count-1)
  $script:Sim.Day += $script:Rev[$pi]; $script:Sim.Total += $script:Rev[$pi]; $script:Sim.Projects++
  $log.Add("ADMIN: Projekt '$($script:Proj[$pi])' gebaut - QD $($script:Rev[$pi])")
}

# ---------- TIMER ----------
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 300
$timer.Add_Tick({
  if (-not $script:Paused) { SimTick $script:Speed }
  $script:Tick++
  $lEarn.Text = 'Gesamterloes:  QD {0:N0}' -f $script:Sim.Total
  $lDay.Text  = 'Tageserloes:   QD {0:N0}' -f $script:Sim.Day
  $lInv.Text  = 'Investiert:    QD {0:N0}' -f $script:Sim.Invested
  $lProj.Text = 'Projekte:      {0}' -f $script:Sim.Projects
  $lLvl.Text  = 'Team-Level:    {0}' -f $script:Sim.TeamLevel
  # Log trim
  if ($log.Items.Count -gt 60) { $log.Items.RemoveAt($log.Items.Count-1) }
  $log.TopIndex = 0
  $paint.Invalidate()
})
$timer.Start()

$form.Controls.Add($paint)
$form.Controls.Add($right)
$form.Show()

# Initial-Log
foreach ($d in $script:Divisions) { $null = $log.Add("DEFINITION: $d online - 2250") }
$log.Add('CEO: Alle Divisionen verbunden - Netz AKTIV')
$log.Add('CHIEF AI: 28 Free-Models online - Kosten: 0 USD')
$log.Add('WINDOWS USE: PowerShell-GUI gestartet')

# Anwendbar halten
[System.Windows.Forms.Application]::Run($form)