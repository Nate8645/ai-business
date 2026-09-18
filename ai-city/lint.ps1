$tokens = $null
$errs = $null
[System.Management.Automation.Language.Parser]::ParseFile('C:\Users\Startklar\ai-business\ai-city\ai-city-2250.ps1',[ref]$tokens,[ref]$errs) | Out-Null
if ($errs.Count -eq 0) {
  Write-Host 'PARSE: LINT OK - keine Fehler'
} else {
  Write-Host ('PARSE-Fehler: ' + $errs.Count)
  $errs | Select-Object -First 10 | ForEach-Object { Write-Host $_.Message }
}