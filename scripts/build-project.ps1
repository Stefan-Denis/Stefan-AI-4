# Clear the console
Clear-Host


# Compile the Module Loader
$moduleSrcLocation = Join-Path $PSScriptRoot "..\src\app\ts"
Set-Location -Path $moduleSrcLocation

[PSCustomObject]$moduleCompileConsoleInformation = @{   
    DuringCompileMessage       = "Compiling Module Loader..."
    DuringCompileMessageLength = "Compiling Module Loader...".Length + 1
}

Write-Host $moduleCompileConsoleInformation.DuringCompileMessage -NoNewline; & tsc 

# Create "modules" folder for the app modules
$modulesFolderLocation = Join-Path $PSScriptRoot "..\src\app\modules"

if (-not (Test-Path -Path $modulesFolderLocation)) {
    New-Item -Path $modulesFolderLocation -ItemType Directory
}

Write-Host "`rDone".PadRight($moduleCompileConsoleInformation.DuringCompileMessageLength) -ForegroundColor Green


# Compile the API
$apiSrcLocation = Join-Path $PSScriptRoot "..\src\api\ts"
Set-Location -Path $apiSrcLocation

[PSCustomObject]$apiCompileConsoleInformation = @{   
    DuringCompileMessage       = "Compiling API..."
    DuringCompileMessageLength = "Compiling API...".Length + 1
}

Write-Host $apiCompileConsoleInformation.DuringCompileMessage -NoNewline; & tsc
Write-Host "`rDone".PadRight($apiCompileConsoleInformation.DuringCompileMessageLength) -ForegroundColor Green

# Exit
if ($Env:TERM_PROGRAM -eq "vscode") {
    Set-Location -Path $PSScriptRoot
} exit