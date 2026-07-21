param(
  [string]$Image = "..\çıktılar\2026-07-21_instagram-carousel-ai-otomasyonlari\instagram-4x5\01_kapak.png",
  [string]$Caption = "Yapay zekâ ile iş akışlarını otomatikleştirmenin 6 pratik yolu.`n`nMüşteri mesajlarından içerik planına, toplantı notlarından satış önceliklerine kadar tekrar eden işleri daha hızlı ve düzenli yönetmek mümkün.`n`nKaydetmeyi unutma.`n`n#yapayzeka #otomasyon #verimlilik #isakisleri #ai #dijitalpazarlama"
)

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here
& node.exe publish.mjs --image $Image --caption $Caption
