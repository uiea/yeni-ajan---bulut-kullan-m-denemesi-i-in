param(
    [string]$RepositoryPath = $PSScriptRoot,
    [string]$Branch = 'main'
)

$ErrorActionPreference = 'Stop'
$gitDir = Join-Path $RepositoryPath '.git'
$logPath = Join-Path $gitDir 'auto-pull.log'

function Write-PullLog([string]$Message) {
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
    # Resolve and normalize path
    $RepositoryPath = Resolve-Path -LiteralPath $RepositoryPath | Select-Object -ExpandProperty Path
    Set-Location -LiteralPath $RepositoryPath
    Write-PullLog 'Çekme işlemi başladı.'

    Invoke-Git fetch origin $Branch
    $upstream = "origin/$Branch"
    $counts = git rev-list --left-right --count "$upstream...HEAD"
    $behind = [int](($counts -split '\s+')[0])

    if ($behind -gt 0) {
        Invoke-Git rebase $upstream
        Write-PullLog 'Uzak değişiklikler yerelde uygulandı (rebase).'
    } else {
        Write-PullLog 'Zaten güncel.'
    }
} catch {
    Write-PullLog "HATA: $($_.Exception.Message)"
    exit 1
} finally {
}
