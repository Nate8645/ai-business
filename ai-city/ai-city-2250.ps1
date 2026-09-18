<#
 ============================================================
  AI CITY 2250 - RAPPERSWIL-JONA : PowerShell Edition
  Das staerkste KI-Team der Welt : 100% autonom
  Jahr 2250 : Alle 8 Divisionen + Executive Board
 ============================================================

 Befehle:
   [1] Team          [2] Wirtschaft     [3] Map
   [4] Projekte      [5] Agent-Chat     [6] Hilfe
   [7] Detail        [8] Build          [9] Speichern
   [0] Auto-Run      [Q] Beenden

 MIT <Enter> die Auswahl bestaetigen.
#>

$Host.UI.RawUI.WindowTitle = "AI CITY 2250 - Rapperswil-Jona :: Quantum-Kern"
$ErrorActionPreference = 'Stop'

try {
  $w = (Get-Host).UI.RawUI.WindowSize.Width
  $h = (Get-Host).UI.RawUI.WindowSize.Height
  $script:W = [Math]::Max(88, $w)
  $script:H = [Math]::Max(30, $h - 1)
} catch { $script:W = 120; $script:H = 40 }

# ================== TEAM: EXECUTIVE BOARD + ALLE DIVISIONEN ==================
$script:ORG = @(
  @{D='EXECUTIVE BOARD'; C='Yellow'; M=@(
    @{N='CEO Quantum-Architekt'; R='CEO'; I='[C]'; T='admin'}
    @{N='CTO Tech-Imperator'; R='CTO'; I='[T]'; T='admin'}
    @{N='CIO Informations-Strateg'; R='CIO'; I='[I]'; T='admin'}
    @{N='COO Operations-Meister'; R='COO'; I='[O]'; T='admin'}
    @{N='CFO Kapital-Stratege'; R='CFO'; I='[$]'; T='admin'}
    @{N='CMO Markt-Genie'; R='CMO'; I='[M]'; T='admin'}
    @{N='CPO Produkt-Visionaer'; R='CPO'; I='[P]'; T='admin'}
    @{N='CSO Imperiums-Waechter'; R='CSO'; I='[S]'; T='admin'}
    @{N='Chief AI Officer Ki-Orakel'; R='CAIO'; I='[A]'; T='admin'}
    @{N='Chief Innovation Officer'; R='CINO'; I='[X]'; T='admin'})},
  @{D='AI DIVISION'; C='Green'; M=@(
    @{N='Big-Pickle'; R='Master AI'; I='[R]'; T='model'}
    @{N='Hy3'; R='Coding AI'; I='[C]'; T='model'}
    @{N='MiMo-V2.5'; R='Architect AI'; I='[A]'; T='model'}
    @{N='Muse-Spark'; R='Kreativ-AI'; I='[K]'; T='model'}
    @{N='Nemotron-Ultra'; R='Reasoning'; I='[N]'; T='model'}
    @{N='qwen3-4b'; R='Lokal-Brain'; I='[Q]'; T='model'}
    @{N='llama3.2'; R='Universal-AI'; I='[L]'; T='model'}
    @{N='qwen3-8b'; R='Deep-Reasoner'; I='[D]'; T='model'})},
  @{D='SOFTWARE DIVISION'; C='Blue'; M=@(
    @{N='OpenCode'; R='Master Orchester'; I='[O]'; T='admin'}
    @{N='Claude Code'; R='Senior Architekt'; I='[C]'; T='core'}
    @{N='Backend-Engineer'; R='API/Kernel'; I='[B]'; T='core'}
    @{N='Frontend-Engineer'; R='UI-Layer'; I='[F]'; T='core'}
    @{N='DevOps-Pilot'; R='Pipeline'; I='[D]'; T='core'}
    @{N='Security-Guardian'; R='Zero-Trust'; I='[S]'; T='core'}
    @{N='Cloud-Architect'; R='Scaling'; I='[X]'; T='core'}
    @{N='DB-Keeper'; R='Data-Core'; I='[DB]'; T='core'})},
  @{D='SHOPIFY DIVISION'; C='Green'; M=@(
    @{N='Store-Magier'; R='Theme/Liquid'; I='[S]'; T='core'}
    @{N='CRO-Optimierer'; R='Conversion'; I='[%]'; T='core'}
    @{N='Product-Curator'; R='Listing/SEO'; I='[P]'; T='core'}
    @{N='Checkout-Meister'; R='Kasse'; I='[$]'; T='core'}
    @{N='App-Tinkerer'; R='Apps/APIs'; I='[+]'; T='core'})},
  @{D='DESIGN DIVISION'; C='Magenta'; M=@(
    @{N='DesignArena'; R='Creative Director'; I='[D]'; T='core'}
    @{N='UI-Architekt'; R='Interface'; I='[U]'; T='core'}
    @{N='Brand-Waechter'; R='Identity'; I='[B]'; T='core'}
    @{N='Motion-Maestro'; R='Animation'; I='[M]'; T='core'}
    @{N='Hologramm-Kuenstler'; R='Holos'; I='[H]'; T='core'})},
  @{D='MARKETING DIVISION'; C='Red'; M=@(
    @{N='SEO-Patriarch'; R='Ranking'; I='[1]'; T='core'}
    @{N='Ads-Zar'; R='Kampagnen'; I='[A]'; T='core'}
    @{N='Social-Kaiser'; R='Community'; I='[S]'; T='core'}
    @{N='Email-Stratege'; R='Sequenzen'; I='[@]'; T='core'}
    @{N='Copy-Genie'; R='Copywriting'; I='[W]'; T='core'}
    @{N='Arena AI'; R='Research'; I='[R]'; T='core'})},
  @{D='AUTOMATION DIVISION'; C='Yellow'; M=@(
    @{N='Workflow-Zauberer'; R='Automation'; I='[W]'; T='core'}
    @{N='API-Botschafter'; R='Integration'; I='[A]'; T='core'}
    @{N='Windows Use'; R='System-Admin'; I='[WIN]'; T='admin'}
    @{N='Script-Samurai'; R='PowerShell'; I='[PS]'; T='core'}
    @{N='Orchestrierer-Elite'; R='Coordination'; I='[O]'; T='core'})},
  @{D='BUSINESS DIVISION'; C='Magenta'; M=@(
    @{N='Sales-Ikone'; R='B2B/Verkauf'; I='[S]'; T='core'}
    @{N='Finanz-Director'; R='Profit-Tracking'; I='[$]'; T='core'}
    @{N='Legal-Executor'; R='Compliance'; I='[L]'; T='core'}
    @{N='CRM-Ops'; R='Pipeline'; I='[C]'; T='core'}
    @{N='Skalierungs-Pilot'; R='Growth'; I='[G]'; T='core'})},
  @{D='RESEARCH DIVISION'; C='Blue'; M=@(
    @{N='Trend-Oracle'; R='Future-Scan'; I='[T]'; T='core'}
    @{N='Daten-Wissenschaftler'; R='Analytics'; I='[#]'; T='core'}
    @{N='Wettbewerbs-Analytiker'; R='Markt'; I='[V]'; T='core'}
    @{N='Innovations-Scout'; R='R&D'; I='[R]'; T='core'})}
)

$script:CIT = @()
$cid = 0
foreach ($d in $script:ORG) {
  $di = [array]::IndexOf($script:ORG, $d)
  foreach ($m in $d.M) {
    $cid++
    $script:CIT += [PSCustomObject]@{
      Id=$cid; Team=$d.D; TeamIdx=$di; Name=$m.N; Role=$m.R; Icon=$m.I; T=$m.T
      Level=1; Xp=0; Revenue=0; Projects=0; Builds=0; State='work'; Timer=0; Chat=''; X=0; Y=0
    }
  }
}
$script:SIZE = $script:CIT.Count

# ================== PROJEKTPOOL (ALLES - nicht nur Crypto) ==================
$script:PROJ = @(
  @{N='Quantum-Store errichten'; R=9400;  K='build'; Min='core'}
  @{N='Holo-Marktplatz planen';  R=5200;  K='build'; Min='core'}
  @{N='GTA-Aera KI-Plattform';   R=41000; K='build'; Min='admin'}
  @{N='Neon-Netz ausrollen';     R=7800;  K='build'; Min='admin'}
  @{N='Globales Zahlungs-Gate';  R=12400; K='rev';   Min='core'}
  @{N='DeFi-Tempel verzinsen';   R=9800;  K='rev';   Min='core'}
  @{N='SEO-Monument skalieren';  R=3300;  K='build'; Min='core'}
  @{N='Fusion-Reaktor KI';       R=56000; K='rev';   Min='admin'}
  @{N='Kunden-Imperium aufbauen';R=6700;  K='build'; Min='core'}
  @{N='Sakura-SPA eroeffnen';    R=2400;  K='rev';   Min='core'}
  @{N='Cloud-Imperium erweitern';R=18000; K='rev';   Min='admin'}
  @{N='Firmenwagen-AI flotten';  R=3900;  K='rev';   Min='core'}
  @{N='Hafen-Logistik AI';       R=6100;  K='build'; Min='core'}
  @{N='Schloss-Holo-Tour';       R=2900;  K='rev';   Min='core'}
  @{N='Lido F&B-Roboter';        R=4700;  K='rev';   Min='core'}
  @{N='Jona Einkaufs-AI';        R=7500;  K='build'; Min='core'}
  @{N='Blockchain-Bruecke';      R=15000; K='rev';   Min='admin'}
  @{N='KI-Healthcare-Center';    R=22000; K='build'; Min='admin'}
  @{N='Smart-Farming Suedufer';  R=5100;  K='rev';   Min='core'}
  @{N='Metaverse-Bahnhof';       R=31000; K='build'; Min='admin'}
  @{N='Robotik-Produktion';      R=4200;  K='rev';   Min='core'}
  @{N='Fusion-Energie Export';   R=8700;  K='rev';   Min='admin'}
  @{N='KI-Schulsystem';          R=13000; K='build'; Min='core'}
  @{N='Autonome Flotte Obersee'; R=6900;  K='rev';   Min='core'}
  @{N='Trading-Supercomputer';   R=26000; K='rev';   Min='admin'}
  @{N='Hologramm-Konzerne';      R=5600;  K='build'; Min='core'}
  @{N='Nanobot-Recycling';       R=11000; K='build'; Min='admin'}
  @{N='Orbital-Node 2250';       R=76000; K='build'; Min='admin'}
)

$script:ECO = [PSCustomObject]@{ Day=0; Total=0; Invested=0; Projects=0; Buildings=8; TeamLevel=1; Year=2250 }
$script:BUILDS = @()
for ($i=0; $i -lt 8; $i++) {
  $nm = ($script:ORG[$i].D -replace ' DIVISION','')
  $script:BUILDS += [PSCustomObject]@{ Name=("Tower-" + $nm); Team=$i; Lvl=1; X=0; Y=0; Progress=0 }
}
$script:LOG = New-Object System.Collections.ArrayList
$script:EVENTS = @(
  'o Fusions-Reaktor stabil :: Energiedividende +3%',
  'o Quantum-Link optimiert :: Latenz -18ms',
  'o Krypto-Gate frei :: Transaktionsflaeche offen',
  'o Design-Monument enthuellt :: Brand +9%',
  'o Backbone auf 8TB/s ausgebaut',
  'o Bio-R&D Durchbruch :: Patent eingereicht',
  'o Orbital-Node erreicht Synch-Netz',
  'o 18 neue SmartTowers genehmigt',
  'o Marktindex +2.4% :: Portfolio gruen',
  'o Zero-Trust Update :: 0 Vorfälle'
)

# ASCII-Map Rapperswil-Jona
$script:MAP = @'
        ============ RAPPERSWIL-JONA 2250 ============
        +-------------------------------------------+
        | KEMPRATEN ..... JONA-ZENTRUM ... AI-TECH  |
        | ....XXXXXX[FABRIK][TOWER][CENTER].....    |
        | ....XXXXXXXXXXXX LENGGIS XXXXXXXXXXXX.... |
        | ....XXX[BAHNHOF]XXX[SCHLOSS]XXX[HURDEN].  |
        | ....XXX BAHNHOF XXXX ALTSTADT X HURDENX.  |
        | ....XXXXXXXXXXXXX[ZOO]XX[FISCHERI]XXXXX.  |
        | ....XXXXXXXXXXXX LIDO/ZOO XXXXXXXXXXXXX.  |
        | ....XXX BOLLINGEN XXXXXXXXXXXXXXXX......  |
        | ......~~~~~~~~~~~~ OBERNSEE ~~~~~~~~~~~~~  |
        | .......~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~....  |
        | ........~~~~~~~~~~~~~~~~~~~~~~~~~~~~~..... |
        +-------------------------------------------+
         % Wald : Feld # Stadt ~ Obersee
         [TOWER]=AI-Distrikt [SCHLOSS]=Altstadt
'@

function Say($agent, $msg, $color='Cyan') {
  $null = $script:LOG.Insert(0, "[$($agent)] $($msg)")
  if ($script:LOG.Count -gt 60) { $script:LOG.RemoveAt($script:LOG.Count-1) }
}

function StartupScreen {
  Clear-Host
  Write-Host ""
  Write-Host "  :: AI CITY 2250 ::  RAPPERSWIL-JONA  " -ForegroundColor Yellow
  Write-Host "  ==== DAS STAEKSTE KI-TEAM DER WELT : JAHR 2250 ====" -ForegroundColor Green
  Write-Host ""
  Write-Host ("  Host  : " + $env:COMPUTERNAME) -ForegroundColor Cyan
  Write-Host ("  Stufe : " + $script:SIZE + " Agenten (CEO + Executive + 8 Divisionen)") -ForegroundColor Cyan
  Write-Host "  Modelle: 28 Free-Models : Kosten 0 USD" -ForegroundColor Cyan
  Write-Host "  Boot  : Netz-Init ... Fusion ... Quantum-Link ..." -ForegroundColor Yellow
  Start-Sleep -Milliseconds 800
  Say 'CEO Quantum-Architekt' 'Alle Divisionen verbunden. Netz AKTIV.' 'Yellow'
  Say 'Chief AI Officer Ki-Orakel' '28 Free-Models online - Kosten: 0 USD' 'Green'
  Say 'Windows Use System-Admin' 'PowerShell-Kern stabil - Uptime 99.7%' 'Blue'
  Start-Sleep -Milliseconds 800
}

function Tick {
  param([double]$sec=1)
  foreach ($c in $script:CIT) {
    $c.Timer -= $sec
    if ($c.Timer -gt 0) { continue }
    $r = Get-Random -Minimum 0 -Maximum 100
    if ($r -lt 15) {
      $p = $script:PROJ | Get-Random
      if (($p.Min -eq 'core') -or ($c.T -eq $p.Min) -or ($c.T -eq 'admin')) {
        $c.Projects++; $script:ECO.Projects++
        $c.Revenue += $p.R; $script:ECO.Day += $p.R; $script:ECO.Total += $p.R
        $c.Xp += [Math]::Round($p.R/800)
        if ($p.K -eq 'build') { $c.Builds++; Add-Building $c }
        Say "$($c.Icon) $($c.Name)" "$($p.N) -> QD $($p.R)" 'Green'
      } else { $c.Timer = 2 + (Get-Random -Maximum 5) }
    }
    elseif ($r -lt 34) {
      $other = $script:CIT | Get-Random
      if ($other.Id -ne $c.Id) {
        $sm = @('Deploy v4.2 OK','Auto-Test gruen','Daten fusioniert','Holo-Patch LIVE','Reaktor stabil','Gate frei','Route offen','Quantum-Link sicher','Cache optimiert','Feature-Sync 100%') | Get-Random
        Say "$($c.Icon) $($c.Name) <-> $($other.Icon) $($other.Name)" "Sync: '$sm'" 'Cyan'
        $other.Timer = 3
        $c.Timer = 3 + (Get-Random -Maximum 5)
      } else { $c.Timer = 2 }
    }
    elseif ($r -lt 47) {
      if ($c.Xp -gt ($c.Level*40)) {
        $c.Level++
        Say "$($c.Icon) $($c.Name)" "LEVEL $($c.Level) - Power erweitert" 'Yellow'
        $c.Timer = 4
      } else { $c.Timer = 3 }
    }
    elseif ($r -lt 60) {
      $amt = Get-Random -Minimum 200 -Maximum 1400
      $script:ECO.Invested += $amt; $script:ECO.Total -= $amt
      Say "$($c.Icon) $($c.Name)" "Investiert QD $amt in City-Infrastruktur" 'Green'
      $c.Timer = 4
    } else { $c.Timer = 2 + (Get-Random -Maximum 6) }
  }

  foreach ($b in $script:BUILDS) {
    if ($b.Progress -lt 100) {
      $b.Progress += Get-Random -Minimum 2 -Maximum 7
      if ($b.Progress -ge 100) {
        $b.Lvl++; $script:ECO.Buildings++; $b.Progress = 0
        Say 'City-Engine' "$($b.Name) fertig - Level $($b.Lvl)! Neue Gebaeude stehen." 'Yellow'
      }
    }
  }

  if ((Get-Random -Maximum 10) -lt 4) {
    $inc = 6 + ($script:ECO.TeamLevel*2) + (Get-Random -Maximum 10)
    $script:ECO.Day += $inc; $script:ECO.Total += $inc
  }

  $script:ECO.TeamLevel = 1 + [Math]::Floor($script:ECO.Projects / 25)

  if ((Get-Random -Maximum 16) -eq 0) {
    $ev = $script:EVENTS | Get-Random
    $bonus = 500 + (Get-Random -Maximum 2500)
    $script:ECO.Total += $bonus
    Say 'City-Ereignis' "$ev : Bonus QD $bonus" 'Magenta'
  }
}

function Add-Building {
  param($c)
  $names = @('Quantum-Hub','Neon-Tower','Fusion-Reaktor','Holo-Platz','Sync-Core','Robo-Werk','DeFi-Palast','Solar-Node','Orbital-Lift','Brain-Labor')
  $bname = "$(Get-Random -InputObject $names)-$($c.Name)"
  $script:BUILDS += [PSCustomObject]@{ Name=$bname; Team=$c.TeamIdx; Lvl=1; X=0; Y=0; Progress=5 }
  Say "Build $($c.Name)" "Baubeginn in Jona: $bname" 'Yellow'
}

function Stat($label,$val,$color='White') {
  Write-Host ("| " + $label + " ") -NoNewline -ForegroundColor Cyan
  Write-Host ($val.PadRight(18)) -NoNewline -ForegroundColor $color
}

function Show-Header {
  Write-Host ""
  Write-Host "  :: AI CITY 2250 :: RAPPERSWIL-JONA  |  Jahr 2250 : Netz AKTIV  |  Stufe: $($script:SIZE) Agenten" -ForegroundColor Yellow
  Write-Host "  ================================================================================="
  Stat 'GESAMTERLOES' "QD $($script:ECO.Total)" 'Yellow'
  Stat 'TAGESERLOES' "QD $($script:ECO.Day)" 'Green'
  Stat 'INVESTIERT' "QD $($script:ECO.Invested)" 'Cyan'
  Stat 'PROJEKTE' "$($script:ECO.Projects)" 'White'
  Stat 'GEBAEUDE' "$($script:ECO.Buildings)" 'White'
  Stat 'TEAM-LEVEL' "$($script:ECO.TeamLevel)" 'Magenta'
  Write-Host ""
}

function Show-Main {
  param([int]$page=1)
  Clear-Host
  Show-Header
  if    ($page -eq 1) { Show-Team }
  elseif($page -eq 2) { Show-Eco }
  elseif($page -eq 3) { Show-MapPage }
  elseif($page -eq 4) { Show-Proj }
  elseif($page -eq 5) { Show-LogPage }
  elseif($page -eq 6) { Show-CmdHelp }
  elseif($page -eq 7) { Show-Detail ($script:DETAILQ) }
  elseif($page -eq 8) { Show-Builds }
  elseif($page -eq 9) { Show-Save }
  Show-Menu
}

function Show-Team {
  Write-Host "  [ORGANIGRAMM - KOMPLETTES TEAM]" -ForegroundColor Yellow
  Write-Host "  ---------------------------------------------"
  foreach ($d in $script:ORG) {
    $col = $d.C
    $mcount = $d.M.Count
    $revSum = ($script:CIT | Where-Object { $_.Team -eq $d.D } | Measure-Object -Property Revenue -Sum).Sum
    Write-Host ("  " + $d.D + "  Tier: $mcount  Erlös: QD $revSum") -ForegroundColor $col
    foreach ($m in $d.M) {
      $mm = $script:CIT | Where-Object { $_.Name -eq $m.N -and $_.Team -eq $d.D } | Select-Object -First 1
      if (-not $mm) { continue }
      $stCol = switch ($mm.State) { 'travel' {'Yellow'} 'chat' {'Magenta'} default {'Green'} }
      Write-Host ("     " + $m.I + " " + $m.N).PadRight(34) -NoNewline -ForegroundColor White
      Write-Host $m.R.PadRight(22) -NoNewline -ForegroundColor DarkGray
      Write-Host ("Lv " + $mm.Level).PadRight(8) -NoNewline -ForegroundColor Yellow
      Write-Host ("[" + $mm.State + "]") -ForegroundColor $stCol
    }
    Write-Host ""
  }
}

function Show-MapPage {
  Write-Host "  [STADTPLAN RAPPERSWIL-JONA 2250]" -ForegroundColor Green
  Write-Host "  ---------------------------------------------"
  $script:MAP.Split("`n") | ForEach-Object { Write-Host ("  " + $_) }
}

function Show-Eco {
  Write-Host "  [WIRTSCHAFT 2250]" -ForegroundColor Green
  Write-Host "  ---------------------------------------------"
  Write-Host ("  Gesamterloes : QD " + $script:ECO.Total)
  Write-Host ("  Tageserloes  : QD " + $script:ECO.Day)
  Write-Host ("  Investiert   : QD " + $script:ECO.Invested)
  Write-Host "  AI-Kosten    : 0 USD (28 Free Models)"
  Write-Host ("  Projekte     : " + $script:ECO.Projects + " (Team-Level steigt ab 25)")
  Write-Host ("  Gebaeude     : " + $script:ECO.Buildings)
  Write-Host "  Marge        : 100% (Ziel 95%+)"
  Write-Host ""
  Write-Host "  [INFRASTRUKTUR]" -ForegroundColor Yellow
  foreach ($b in $script:BUILDS | Select-Object -First 12) {
    Write-Host ("   * " + $b.Name + "  Lv " + $b.Lvl + "  Fortschritt " + $b.Progress + "%")
  }
}

function Show-Proj {
  Write-Host "  [PROJEKTPOOL - HEXAGON-IMPERIUM]" -ForegroundColor Magenta
  Write-Host "  ---------------------------------------------"
  $n=0
  foreach ($p in $script:PROJ | Select-Object -First 40) {
    $n++
    Write-Host ("   {0,2}. {1,-34} QD {2,6}  [{3}]" -f $n, $p.N, $p.R, $p.K)
  }
}

function Show-LogPage {
  Write-Host "  [KOM.-NETZ : CITY-FEED 2250]" -ForegroundColor Cyan
  Write-Host "  ---------------------------------------------"
  $i=0
  foreach ($l in $script:LOG) {
    if ($i -ge ($script:H-10)) { break }
    Write-Host ("  " + $l)
    $i++
  }
}

function Show-CmdHelp {
  Write-Host "  [ADMIN-KONSOLE 2250]" -ForegroundColor Yellow
  Write-Host "  ---------------------------------------------"
  Write-Host "  [1] Team-Organigramm      [2] Wirtschaft"
  Write-Host "  [3] Map Rapperswil-Jona   [4] Projektpool"
  Write-Host "  [5] Kom.-Netz-Feed        [6] Diese Hilfe"
  Write-Host "  [7] Agent-Detail (Name)   [8] Bauwerke"
  Write-Host "  [9] Speichern (JSON)      [0] Auto-Run"
  Write-Host "  [Q] Beenden"
  Write-Host ""
  Write-Host "  Beispiel Detail: 7 OpenCode  oder  7 CEO"
}

function Show-Detail {
  param([string]$query)
  $q = $query.Trim()
  if (-not $q) {
    Write-Host "  [Eingabe fehlt. Nutze: 7 <Name>]" -ForegroundColor Red
    return
  }
  $found = $script:CIT | Where-Object { $_.Name -like "*$q*" } | Select-Object -First 5
  if (-not $found) {
    Write-Host ("  Agent nicht gefunden: " + $q) -ForegroundColor Red
    return
  }
  foreach ($m in $found) {
    $revFmt = "QD {0:N0}" -f $m.Revenue
    Write-Host ""
    Write-Host ("  " + $m.I + " " + $m.Name + "  -  " + $m.Role + "  [" + $m.Team + "]") -ForegroundColor Yellow
    Stat 'Level'    "Lv $($m.Level)" 'Yellow'
    Stat 'Erloes'   $revFmt 'Green'
    Stat 'Projekte' "$($m.Projects)" 'White'
    Stat 'Builds'   "$($m.Builds)" 'White'
    Stat 'XP'       "$($m.Xp)" 'Magenta'
    Stat 'Status'   $m.State 'Cyan'
    Write-Host ""
  }
}

function Show-Builds {
  Write-Host "  [CITY-BAUWERKE]" -ForegroundColor Green
  Write-Host "  ---------------------------------------------"
  $i=0
  foreach ($b in $script:BUILDS) {
    if ($i -ge ($script:H-10)) { break }
    Write-Host ("  * " + $b.Name + "  Lv " + $b.Lvl + "  [" + $b.Progress + "%]")
    $i++
  }
  Write-Host ""
  Write-Host ("  Gesamt: " + $script:BUILDS.Count + " Bauwerke stehen.")
}

function Show-Save {
  try {
    $file = Join-Path $env:TEMP "ai-city-2250-save.json"
    $data = [PSCustomObject]@{
      Year=$script:ECO.Year; Total=$script:ECO.Total; Day=$script:ECO.Day; Invested=$script:ECO.Invested
      Projects=$script:ECO.Projects; Buildings=$script:ECO.Buildings; TeamLevel=$script:ECO.TeamLevel
      Citizens=$script:CIT; Builds=$script:BUILDS
    }
    $data | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $file -Encoding UTF8
    Write-Host ("  Gespeichert: " + $file) -ForegroundColor Green
  } catch {
    Write-Host ("  Speichern fehlgeschlagen: " + $_.Exception.Message) -ForegroundColor Red
  }
}

function Show-Menu {
  Write-Host ""
  Write-Host "  ------------------------------------------------------------------"
  Write-Host "  [1]Team  [2]Wirtschaft  [3]Map  [4]Projekte  [5]Feed  [6]Hilfe" -NoNewline -ForegroundColor DarkGray
  Write-Host ""
  Write-Host "  [7]Detail  [8]Bauten  [9]Speichern  [0]AUTO-RUN  [Q]Ende" -ForegroundColor DarkGray
  Write-Host ""
  Write-Host "  Admin> " -NoNewline -ForegroundColor Yellow
}

# ================== MAIN ==================
$script:DETAILQ = ""
StartupScreen
$script:page = 1
$script:auto = $true
Show-Main 1

while ($true) {
  if ($script:auto) {
    Tick 1.0
    Show-Main $script:page
    Start-Sleep -Milliseconds 1600
  } else {
    $cmd = Read-Host
    switch -Regex ($cmd) {
      '^1$' { $script:page=1; Show-Main 1 }
      '^2$' { $script:page=2; Show-Main 2 }
      '^3$' { $script:page=3; Show-Main 3 }
      '^4$' { $script:page=4; Show-Main 4 }
      '^5$' { $script:page=5; Show-Main 5 }
      '^6$' { Show-CmdHelp; Show-Menu }
      '^7\s*(.*)$' { $script:DETAILQ=$Matches[1]; Show-Detail $script:DETAILQ; Show-Menu }
      '^8$' { $script:page=8; Show-Main 8 }
      '^9$' { Show-Save; Show-Menu }
      '^0$' { $script:auto=$true; $script:page=1; Show-Main 1 }
      '^[Qq]$' { Write-Host "  Netz faehrt herunter... Auf Wiedersehen" -ForegroundColor Yellow; Start-Sleep -Milliseconds 500; exit }
      default { Show-CmdHelp; Show-Menu }
    }
  }
}