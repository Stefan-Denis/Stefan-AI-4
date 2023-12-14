# Install packages for the whole Package Loader project

# Clear the console
Clear-Host

# Download packages for Package Loader
$packageLoaderSrcLocation = Join-Path $PSScriptRoot "..\src\app"
Set-Location $packageLoaderSrcLocation
& npm install


# TODO: Add API package download

# Exit
if ($env:TERM_PROGRAM -eq "vscode") {
    Set-Location -Path $PSScriptRoot
} exit