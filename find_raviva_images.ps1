$html = (Invoke-WebRequest -Uri "https://ravivajewellery.com" -UserAgent "Mozilla/5.0").Content
$matches = [regex]::Matches($html, '(?i)https://cdn\.shopify\.com/s/files/[^"?\s]+')
$set = [System.Collections.Generic.HashSet[string]]::new()
foreach ($m in $matches) {
    $set.Add($m.Value) | Out-Null
}
$set | Select-Object -First 30
