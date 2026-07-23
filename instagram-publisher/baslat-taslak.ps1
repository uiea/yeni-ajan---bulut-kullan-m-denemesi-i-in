param(
  [string]$Caption = "Yapay zeka ile is akislarini otomatiklestirmenin 6 pratik yolu. Musteri mesajlarindan icerik planina, toplanti notlarindan satis onceliklerine kadar tekrar eden isleri daha hizli ve duzenli yonetmek mumkun. Kaydetmeyi unutma. #yapayzeka #otomasyon #verimlilik #isakisleri #ai #dijitalpazarlama",
  [switch]$SaveDraft
)

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here
$root = Split-Path -Parent $here
$outputFolder = Get-ChildItem -LiteralPath $root -Directory | Where-Object Name -Match "kt" | Select-Object -First 1
if (-not $outputFolder) { throw "Gorsel klasoru bulunamadi." }
$image = Join-Path $outputFolder.FullName "2026-07-21_instagram-carousel-ai-otomasyonlari\instagram-4x5\01_kapak.png"
if (-not (Test-Path -LiteralPath $image)) { throw "Gorsel bulunamadi: $image" }
$nodeArgs = @("publish.mjs", "--image", $image, "--caption", $Caption)
if ($SaveDraft) { $nodeArgs += "--save-draft" }
& node.exe @nodeArgs
