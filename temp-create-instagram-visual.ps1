try {
    Add-Type -AssemblyName System.Drawing
    $width = 1080
    $height = 1350
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.TextRenderingHint = 'AntiAliasGridFit'

    $espresso = [System.Drawing.Color]::FromArgb(19, 15, 11)
    $gold = [System.Drawing.Color]::FromArgb(218, 177, 83)
    $cream = [System.Drawing.Color]::FromArgb(248, 240, 224)
    $muted = [System.Drawing.Color]::FromArgb(202, 190, 167)

    $g.Clear($espresso)
    $penGold = New-Object System.Drawing.Pen $gold, 18
    $penGold.StartCap = 'Round'
    $penGold.EndCap = 'Round'
    $g.DrawEllipse($penGold, -260, 180, 820, 820)
    $g.DrawEllipse($penGold, 420, 420, 760, 760)

    $brushTrans = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, $gold))
    $g.FillEllipse($brushTrans, 80, 940, 520, 520)
    $g.FillEllipse($brushTrans, 520, 120, 520, 520)

    $thinPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(64, $gold)), 2
    for ($x = 0; $x -le $width; $x += 72) { $g.DrawLine($thinPen, $x, 0, $x, $height) }
    for ($y = 0; $y -le $height; $y += 72) { $g.DrawLine($thinPen, 0, $y, $width, $y) }

    $accentBrush = New-Object System.Drawing.SolidBrush $gold
    $g.FillRectangle($accentBrush, 90, 90, 240, 18)

    $titleFont = New-Object System.Drawing.Font 'Arial', 60, ([System.Drawing.FontStyle]::Bold)
    $bodyFont = New-Object System.Drawing.Font 'Arial', 30, ([System.Drawing.FontStyle]::Regular)
    $bulletFont = New-Object System.Drawing.Font 'Arial', 32, ([System.Drawing.FontStyle]::Bold)
    $ctaFont = New-Object System.Drawing.Font 'Arial', 34, ([System.Drawing.FontStyle]::Bold)

    $creamBrush = New-Object System.Drawing.SolidBrush $cream
    $mutedBrush = New-Object System.Drawing.SolidBrush $muted

    $g.DrawString('YAPAY ZEKA İLE WEB SİTESİ', $titleFont, $creamBrush, (New-Object System.Drawing.RectangleF 90, 150, 900, 180))
    $g.DrawString('Küçük işletmeler için hızlı, teknik olmayan dijital vitrin.', $bodyFont, $mutedBrush, (New-Object System.Drawing.RectangleF 90, 340, 900, 120))

    $bulletY = 520
    $g.DrawString('• Hazır site yapısı', $bulletFont, $creamBrush, 90, $bulletY)
    $g.DrawString('• Ürün/hizmet sayfanız hızlıca canlı', $bulletFont, $creamBrush, 90, ($bulletY + 58))
    $g.DrawString('• Zaman ve bütçe tasarrufu', $bulletFont, $creamBrush, 90, ($bulletY + 116))

    $goldBrush = New-Object System.Drawing.SolidBrush $gold
    $g.DrawString('AI destekli siteden bugün başlayın.', $ctaFont, $goldBrush, (New-Object System.Drawing.RectangleF 90, 820, 900, 80))
    $g.DrawString('Paylaşıma hazır Instagram görseli', $bodyFont, $mutedBrush, 90, 980)

    $outputPath = Join-Path (Get-Location) 'çıktılar\2026-07-21_tasarim_yapay-zeka-web-sitesi-gorsel.png'
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    $penGold.Dispose()
    $thinPen.Dispose()
    $brushTrans.Dispose()
    $accentBrush.Dispose()
    $creamBrush.Dispose()
    $mutedBrush.Dispose()
    $titleFont.Dispose()
    $bodyFont.Dispose()
    $bulletFont.Dispose()
    $ctaFont.Dispose()

    Write-Output "CREATED $outputPath"
} catch {
    Write-Error "FAILED: $($_.Exception.Message)"
    exit 1
}
