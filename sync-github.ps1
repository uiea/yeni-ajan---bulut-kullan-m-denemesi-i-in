param(
    [string]$RepositoryPath = 'D:\Yapay Zeka Çalışma Dosyaları\ajanlarım',
    [string]$Branch = 'main'
)

$ErrorActionPreference = 'Stop'
$gitDir = Join-Path $RepositoryPath '.git'
$lockPath = Join-Path $gitDir 'auto-sync.lock'
$logPath = Join-Path $gitDir 'auto-sync.log'

function Write-SyncLog([string]$Message) {
    "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $Message" | Add-Content -LiteralPath $logPath -Encoding utf8
}

function Invoke-Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)
    & git @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "git $($Arguments -join ' ') başarısız oldu (çıkış kodu: $LASTEXITCODE)."
    }
}

try {
    $lock = [System.IO.File]::Open($lockPath, [System.IO.FileMode]::CreateNew, [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
} catch {
    exit 0
}

try {
    Set-Location -LiteralPath $RepositoryPath
    Write-SyncLog 'Eşitleme başladı.'

    Invoke-Git add --all
    & git diff --cached --quiet
    if ($LASTEXITCODE -eq 1) {
        Invoke-Git commit -m "Otomatik eşitleme: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        Write-SyncLog 'Yerel değişiklikler kaydedildi.'
    } elseif ($LASTEXITCODE -ne 0) {
        throw "git diff --cached --quiet başarısız oldu (çıkış kodu: $LASTEXITCODE)."
    }

    Invoke-Git fetch origin $Branch
    $upstream = "origin/$Branch"
    $counts = git rev-list --left-right --count "$upstream...HEAD"
    $behind = [int](($counts -split '\s+')[0])

    if ($behind -gt 0) {
        Invoke-Git rebase $upstream
        Write-SyncLog 'GitHub değişiklikleri yerelde uygulandı.'
    }

    Invoke-Git push origin "HEAD:$Branch"
    Write-SyncLog 'Eşitleme tamamlandı.'
} catch {
    Write-SyncLog "HATA: $($_.Exception.Message)"
    exit 1
} finally {
    if ($lock) { $lock.Dispose() }
    Remove-Item -LiteralPath $lockPath -Force -ErrorAction SilentlyContinue
}
