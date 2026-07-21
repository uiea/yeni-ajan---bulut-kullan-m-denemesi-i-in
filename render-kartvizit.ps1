Add-Type -AssemblyName System.Drawing
$w=1200; $h=680
$bmp=New-Object System.Drawing.Bitmap $w,$h
$g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode='AntiAlias'; $g.TextRenderingHint='AntiAlias'
$navy=[Drawing.Color]::FromArgb(13,23,32); $slate=[Drawing.Color]::FromArgb(23,38,51); $gold=[Drawing.Color]::FromArgb(201,155,81); $white=[Drawing.Color]::FromArgb(245,240,231); $muted=[Drawing.Color]::FromArgb(184,193,198)
$brush=New-Object Drawing.Drawing2D.LinearGradientBrush ([Drawing.Rectangle]::new(0,0,$w,$h)),$navy,$slate,35
$g.FillRectangle($brush,0,0,$w,$h); $g.FillRectangle((New-Object Drawing.SolidBrush $gold),0,0,16,$h)
$pen=New-Object Drawing.Pen $gold,6; $pen.StartCap='Round'; $pen.EndCap='Round'; $pen.LineJoin='Round'
# tree and ship emblem
$g.DrawLine($pen,156,210,156,140); $g.DrawLine($pen,156,165,126,141); $g.DrawLine($pen,156,175,185,145); $g.DrawEllipse($pen,114,113,84,48); $g.DrawLine($pen,106,240,206,240); $g.DrawLine($pen,106,240,120,265); $g.DrawLine($pen,206,240,192,265); $g.DrawLine($pen,120,265,192,265); $g.DrawLine($pen,156,210,156,240); $g.DrawLine($pen,156,210,186,238)
$f1=New-Object Drawing.Font 'Arial',54,([Drawing.FontStyle]::Bold); $f2=New-Object Drawing.Font 'Arial',24; $f3=New-Object Drawing.Font 'Arial',22; $f4=New-Object Drawing.Font 'Arial',14
$g.DrawString('Ali AKÇA',$f1,(New-Object Drawing.SolidBrush $white),245,124); $g.DrawString('Mekatronik Teknikeri / Girişimci',$f2,(New-Object Drawing.SolidBrush $gold),248,190)
$g.DrawString('☎  Tel: +90 5XX XXX XX XX',$f3,(New-Object Drawing.SolidBrush $muted),108,450); $g.DrawString('✉  E-posta: ornek@eposta.com',$f3,(New-Object Drawing.SolidBrush $muted),108,515); $g.DrawString('İLETİŞİM İÇİN QR KODU TARATIN',$f4,(New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(148,160,167))),720,555)
# stylized preview QR (functional QR remains in the HTML card)
$g.FillRectangle([Drawing.Brushes]::White,950,405,180,180); $q=New-Object Drawing.SolidBrush $slate
foreach($p in @(@(964,419),@(1061,419),@(964,516))){$g.FillRectangle($q,$p[0],$p[1],42,42);$g.FillRectangle([Drawing.Brushes]::White,$p[0]+7,$p[1]+7,28,28);$g.FillRectangle($q,$p[0]+14,$p[1]+14,14,14)}
foreach($p in @(@(1015,419),@(1036,433),@(1015,454),@(1050,461),@(1080,468),@(1015,482),@(1036,496),@(1080,503),@(1015,538),@(1050,531),@(1080,545))){$g.FillRectangle($q,$p[0],$p[1],14,14)}
$g.DrawString('GOOGLE.COM',$f4,$q,978,600)
$bmp.Save((Join-Path $PSScriptRoot 'kartvizit-ali-akca-onizleme.png'),[Drawing.Imaging.ImageFormat]::Png)
$f1.Dispose();$f2.Dispose();$f3.Dispose();$f4.Dispose();$pen.Dispose();$brush.Dispose();$g.Dispose();$bmp.Dispose()
