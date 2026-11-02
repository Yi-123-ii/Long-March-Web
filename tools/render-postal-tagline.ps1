# Render the post-office's own short inscription as transparent lettering artwork.
# Windows STXingkai is used only during artwork creation; no font binary is shipped.
Add-Type -AssemblyName System.Drawing
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskOutput = Join-Path $taskRoot 'output/postal-tagline'
New-Item -ItemType Directory -Force -Path $taskOutput | Out-Null
$bitmap = New-Object System.Drawing.Bitmap(1800, 240)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::Transparent)
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$font = New-Object System.Drawing.Font('华文行楷', 132, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
if ($font.FontFamily.Name -ne '华文行楷' -and $font.FontFamily.Name -ne 'STXingkai') { throw 'STXingkai is required to render this artwork.' }
$format = [System.Drawing.StringFormat]::GenericTypographic.Clone()
$graphics.DrawString('寄一纸心语，念万里征途', $font, [System.Drawing.Brushes]::Black, [System.Drawing.PointF]::new(24, 30), $format)
$bitmap.Save((Join-Path $taskOutput 'postal-tagline.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$format.Dispose()
$font.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
