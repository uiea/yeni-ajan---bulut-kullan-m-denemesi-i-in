param(
    [int]$IntervalSeconds = 600,
    [string]$RepositoryPath = $PSScriptRoot
)

$ErrorActionPreference = 'Stop'

# Resolve repository path
$RepositoryPath = Resolve-Path -LiteralPath $RepositoryPath | Select-Object -ExpandProperty Path
$gitDir = Join-Path $RepositoryPath '.git'
$logPath = Join-Path $gitDir 'auto-sync-loop.log'

function Write-LoopLog([string]$Message) {
    "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $Message" | Add-Content -LiteralPath $logPath -Encoding utf8
}

Write-LoopLog "Auto-sync loop başlatıldı. Aralık: $IntervalSeconds saniye."

# Small initial delay to avoid colliding with pull-on-open
Start-Sleep -Seconds 15

while ($true) {
    try {
        Write-LoopLog 'sync-github.ps1 çalıştırılıyor.'
        & "$RepositoryPath\sync-github.ps1" -RepositoryPath $RepositoryPath
        Write-LoopLog 'sync-github.ps1 tamamlandı.'
    } catch {
        Write-LoopLog "HATA: $($_.Exception.Message)"
    }

    Start-Sleep -Seconds $IntervalSeconds
}
