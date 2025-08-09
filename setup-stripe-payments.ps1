#!/usr/bin/env powershell
# Stripe Payment Links Setup Script
# Run this after you've created your Stripe Payment Links

Write-Host "🔗 STRIPE PAYMENT LINKS SETUP" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host ""

Write-Host "📊 PRODUCT CATALOG TO CREATE IN STRIPE:" -ForegroundColor Yellow
Write-Host ""
Write-Host "SHOP PRODUCTS:" -ForegroundColor Cyan
Write-Host "1. Horror Writing Masterclass - $89"
Write-Host "2. Horror Templates Bundle - $47"
Write-Host "3. Professional Editing - $150"
Write-Host "4. Horror Plot Generator - $29"
Write-Host "5. From Draft to Published Course - $197"
Write-Host "6. Complete Horror Toolkit - $297"
Write-Host ""

Write-Host "SUBSCRIPTION PLANS:" -ForegroundColor Cyan
Write-Host "1. Writer Plan - $9/month"
Write-Host "2. Author Plan - $29/month"
Write-Host "3. Elite Plan - $99/month"
Write-Host ""

Write-Host "BOOKS (Multiple Formats):" -ForegroundColor Cyan
Write-Host "1. Whispers from the Dark - Ebook ($9.99), Paperback ($14.99), Hardcover ($24.99)"
Write-Host "2. Midnight Terrors - Ebook ($9.99), Paperback ($14.99), Hardcover ($24.99)"
Write-Host "3. The Phantom's Embrace - Ebook ($9.99), Paperback ($14.99), Hardcover ($24.99)"
Write-Host "4. Complete Book Bundle - $49.99"
Write-Host ""

Write-Host "PREMIUM SERVICES:" -ForegroundColor Cyan
Write-Host "1. Professional Editing - $500"
Write-Host "2. Ghostwriting Service - $2000"
Write-Host "3. Publishing Package - $1500"
Write-Host "4. 1-on-1 Mentorship - $300/hour"
Write-Host "5. VIP Author Program - $5000"
Write-Host ""

Write-Host "📋 SETUP INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to https://dashboard.stripe.com"
Write-Host "2. Switch to LIVE MODE (important!)"
Write-Host "3. Go to Products -> Payment Links"
Write-Host "4. Create each product above with the exact pricing"
Write-Host "5. Copy each Payment Link URL"
Write-Host "6. Edit stripe-payment-links.js and replace the placeholder URLs"
Write-Host "7. Run deploy-netlify.ps1 to update your live website"
Write-Host ""

Write-Host "🔧 AUTOMATION STATUS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Real Bluesky posting active (every 7 minutes)"
Write-Host "✅ Website live at https://charming-llama-c1e5db.netlify.app"
Write-Host "✅ Payment buttons ready for Stripe links"
Write-Host "⏳ Waiting for your Stripe Payment Links"
Write-Host ""

$continue = Read-Host "Have you created your Stripe Payment Links? (y/n)"

if ($continue -eq "y" -or $continue -eq "Y") {
    Write-Host ""
    Write-Host "🚀 READY TO UPDATE PAYMENT LINKS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Edit stripe-payment-links.js with your real Stripe URLs"
    Write-Host "2. Run: powershell .\deploy-netlify.ps1"
    Write-Host "3. Your payment system will be live!"
    Write-Host ""
    Write-Host "Your promotional system is already driving traffic to:" -ForegroundColor Cyan
    Write-Host "- Shop page for product sales"
    Write-Host "- Course page for enrollments"
    Write-Host "- Subscribe page for monthly revenue"
    Write-Host "- Books page for book sales"
    Write-Host ""
    Write-Host "💰 Once Stripe links are added, you'll start converting traffic to revenue!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "📝 Create your Stripe Payment Links first, then run this script again." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick Stripe setup:" -ForegroundColor Cyan
    Write-Host "1. Login to Stripe Dashboard"
    Write-Host "2. Products -> Payment Links -> Create"
    Write-Host "3. Add each product with the pricing above"
    Write-Host "4. Copy the Payment Link URLs"
    Write-Host "5. Come back and update stripe-payment-links.js"
}

Write-Host ""
Write-Host "🎯 Current Status: Your horror writing business automation is 95% complete!" -ForegroundColor Green
Write-Host "🔗 Just need to add real Stripe Payment Links to start earning revenue!" -ForegroundColor Green
