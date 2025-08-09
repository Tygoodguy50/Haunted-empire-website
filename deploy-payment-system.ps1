#!/usr/bin/env powershell
# Quick deployment script after updating Stripe links

Write-Host "🚀 DEPLOYING UPDATED PAYMENT SYSTEM" -ForegroundColor Green
Write-Host ""

# Check if stripe-payment-links.js has been updated
$stripeFile = "stripe-payment-links.js"
if (Test-Path $stripeFile) {
    $content = Get-Content $stripeFile -Raw
    if ($content -match "REPLACE_WITH_YOUR_STRIPE_LINK") {
        Write-Host "⚠️  WARNING: stripe-payment-links.js still contains placeholder URLs" -ForegroundColor Yellow
        Write-Host "Please update it with your real Stripe Payment Links before deploying." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Open stripe-payment-links.js and replace all instances of:"
        Write-Host "'REPLACE_WITH_YOUR_STRIPE_LINK' with your actual Stripe URLs"
        Write-Host ""
        exit 1
    } else {
        Write-Host "✅ Stripe payment links detected in configuration" -ForegroundColor Green
    }
} else {
    Write-Host "❌ stripe-payment-links.js not found" -ForegroundColor Red
    exit 1
}

Write-Host "🔄 Committing changes to git..." -ForegroundColor Cyan
git add .
git commit -m "Update payment system with real Stripe Payment Links"

Write-Host "📤 Pushing to GitHub (triggers Netlify deployment)..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host ""
Write-Host "Your website will update in 1-2 minutes at:" -ForegroundColor Cyan
Write-Host "https://charming-llama-c1e5db.netlify.app"
Write-Host ""
Write-Host "💰 Payment system is now live and ready to convert traffic!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Monitor your revenue with:" -ForegroundColor Yellow
Write-Host "- Stripe Dashboard for payment tracking"
Write-Host "- Bluesky @phantomdp.bsky.social for promotional posts"
Write-Host "- Netlify Analytics for website traffic"
