param(
  [Parameter(Mandatory = $true)][string]$InputFile,
  [Parameter(Mandatory = $true)][string]$OutputFile,
  [Parameter(Mandatory = $true)][string]$Headline
)

Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Image]::FromFile((Resolve-Path $InputFile))
$canvas = New-Object System.Drawing.Bitmap($source.Width, $source.Height)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)

$margin = [int]($source.Width * 0.075)
$boxTop = [int]($source.Height * 0.08)
$boxHeight = [int]($source.Height * 0.22)
$overlayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(175, 7, 12, 33))
$graphics.FillRectangle($overlayBrush, $margin, $boxTop, $source.Width - (2 * $margin), $boxHeight)

$font = New-Object System.Drawing.Font('Arial', [single]($source.Width * 0.075), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$layout = [System.Drawing.RectangleF]::new(
  [single]($margin + 28),
  [single]($boxTop + 20),
  [single]($source.Width - (2 * $margin) - 56),
  [single]($boxHeight - 40)
)
$graphics.DrawString($Headline, $font, $textBrush, $layout, $format)

$outDir = Split-Path -Parent $OutputFile
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
$canvas.Save($OutputFile, [System.Drawing.Imaging.ImageFormat]::Png)

$format.Dispose(); $textBrush.Dispose(); $font.Dispose(); $overlayBrush.Dispose(); $graphics.Dispose(); $canvas.Dispose(); $source.Dispose()
Write-Output "Created $OutputFile"
