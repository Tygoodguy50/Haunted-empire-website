# Netlify Deployment Script for Haunted Empire Website
# Usage: powershell ./deploy-netlify.ps1

# Ensure Netlify CLI is installed
if (!(Get-Command "netlify" -ErrorAction SilentlyContinue)) {
    Write-Host "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
}

# Set site directory
$siteDir = "c:\Users\tyler\LocalAI\Haunted-empire-website-1"

# Change to site directory
Set-Location $siteDir

if ($env:NETLIFY_AUTH_TOKEN) {
    netlify deploy --site=af08fad9-fa67-4b4e-9644-6ec43c1dbe16 --dir=$siteDir --prod --auth=$env:NETLIFY_AUTH_TOKEN
    Write-Host "Netlify deployment complete. Starting validation..."
    # Validate frontend live site
    $frontendUrl = "https://haunted.phantomgear.it.com"
    try {
        $frontendResponse = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 15
        if ($frontendResponse.StatusCode -eq 200) {
            Write-Host "Frontend validation successful: $frontendUrl is live."
        } else {
            Write-Host "Frontend validation failed: $frontendUrl returned status $($frontendResponse.StatusCode)."
        }
    } catch {
        Write-Host "Frontend validation error: $_"
    }
    # Validate backend connectivity
    $backendUrl = "$frontendUrl/test-connect"
    try {
        $backendResponse = Invoke-WebRequest -Uri $backendUrl -UseBasicParsing -TimeoutSec 15
        if ($backendResponse.StatusCode -eq 200) {
            Write-Host "Backend validation successful: $backendUrl is reachable."
        } else {
            Write-Host "Backend validation failed: $backendUrl returned status $($backendResponse.StatusCode)."
        }
    } catch {
        Write-Host "Backend validation error: $_"
    }
} else {
    Write-Host "NETLIFY_AUTH_TOKEN environment variable not set. Please set your Netlify personal access token."
}

Write-Host "Netlify deployment complete."
