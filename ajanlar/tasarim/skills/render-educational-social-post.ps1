param(
    [Parameter(Mandatory = $true)][string]$BackgroundPath,
    [Parameter(Mandatory = $true)][string]$OutputPath
)

Add-Type -AssemblyName System.Drawing

$width = 1080
$height = 1350
$canvas = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = 'AntiAlias'
$graphics.InterpolationMode = 'HighQualityBicubic'
$graphics.TextRenderingHint = 'AntiAliasGridFit'

$espresso = [Drawing.Color]::FromArgb(19, 15, 11)
$gold = [Drawing.Color]::FromArgb(218, 177, 83)
$cream = [Drawing.Color]::FromArgb(248, 240, 224)
$muted = [Drawing.Color]::FromArgb(202, 190, 167)
$grid = [Drawing.Color]::FromArgb(22, 218, 177, 83)

$graphics.Clear($espresso)
$source = [Drawing.Image]::FromFile((Resolve-Path $BackgroundPath))
$ratio = [Math]::Max($width / $source.Width, $height / $source.Height)
$drawWidth = [int][Math]::Ceiling($source.Width * $ratio)
$drawHeight = [int][Math]::Ceiling($source.Height * $ratio)
$drawX = [int](($width - $drawWidth) / 2)
$drawY = [int](($height - $drawHeight) / 2)
$imageAttributes = New-Object Drawing.Imaging.ImageAttributes
$matrix = New-Object Drawing.Imaging.ColorMatrix
$matrix.Matrix33 = 0.32
$imageAttributes.SetColorMatrix($matrix)
$graphics.DrawImage($source, (New-Object Drawing.Rectangle $drawX, $drawY, $drawWidth, $drawHeight), 0, 0, $source.Width, $source.Height, [Drawing.GraphicsUnit]::Pixel, $imageAttributes)

$gridPen = New-Object Drawing.Pen $grid, 1
for ($x = 0; $x -le $width; $x += 54) { $graphics.DrawLine($gridPen, $x, 0, $x, $height) }
for ($y = 0; $y -le $height; $y += 54) { $graphics.DrawLine($gridPen, 0, $y, $width, $y) }

$framePen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(150, $gold)), 2
$graphics.DrawRectangle($framePen, 54, 54, 972, 1242)
$accentBrush = New-Object Drawing.SolidBrush $gold
$graphics.FillRectangle($accentBrush, 90, 210, 164, 7)

$tagFont = New-Object Drawing.Font 'Arial', 20, ([Drawing.FontStyle]::Bold)
$titleFont = New-Object Drawing.Font 'Arial', 76, ([Drawing.FontStyle]::Bold)
$bodyFont = New-Object Drawing.Font 'Arial', 31, ([Drawing.FontStyle]::Regular)
$takeawayFont = New-Object Drawing.Font 'Arial', 29, ([Drawing.FontStyle]::Bold)
$smallFont = New-Object Drawing.Font 'Arial', 18, ([Drawing.FontStyle]::Bold)
$creamBrush = New-Object Drawing.SolidBrush $cream
$mutedBrush = New-Object Drawing.SolidBrush $muted

$graphics.DrawString('YAPAY ZEKA 101', $tagFont, $accentBrush, 90, 144)
$graphics.DrawString("CHATBOTLAR`nNE ISE YARAR?", $titleFont, $creamBrush, (New-Object Drawing.RectangleF 84, 255, 900, 235))
$graphics.DrawString("Sorulari yanitlar, islemleri hizlandirir`nve kullanici deneyimini guclendirir.", $bodyFont, $mutedBrush, (New-Object Drawing.RectangleF 90, 555, 820, 130))

$takeawayBox = New-Object Drawing.Rectangle 90, 938, 900, 170
$takeawayPen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(175, $gold)), 2
$graphics.DrawRectangle($takeawayPen, $takeawayBox)
$graphics.DrawString('TEMEL FAYDA', $smallFont, $accentBrush, 120, 972)
$graphics.DrawString('Tekrarlayan sorulara 7/24 hizli yanit.', $takeawayFont, $creamBrush, (New-Object Drawing.RectangleF 120, 1010, 810, 72))
$graphics.DrawString('OGREN • UYGULA • GELISTIR', $smallFont, $accentBrush, 90, 1195)

$canvas.Save($OutputPath, [Drawing.Imaging.ImageFormat]::Png)

$smallFont.Dispose(); $takeawayFont.Dispose(); $bodyFont.Dispose(); $titleFont.Dispose(); $tagFont.Dispose()
$takeawayPen.Dispose(); $framePen.Dispose(); $gridPen.Dispose(); $accentBrush.Dispose(); $creamBrush.Dispose(); $mutedBrush.Dispose()
$imageAttributes.Dispose(); $source.Dispose(); $graphics.Dispose(); $canvas.Dispose()
