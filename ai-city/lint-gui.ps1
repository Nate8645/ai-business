$tokens = $null
$errs = $null
[System.Management.Automation.Language.Parser]::ParseFile('C:\Users\Startklar\ai-business\ai-city\ai-city-2250-gui.ps1',[ref]$tokens,[ref]$errs) | Out-Null
if ($errs.Count -eq 0) {
  Write-Host 'PARSE: LINT OK'
} else {
  Write-Host ('PARSE-Fehler: ' + $errs.Count)
  $errs | ForEach-Object { Write-Host $_.Message }
}