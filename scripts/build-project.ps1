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
Write-Host "`rDone".PadRight($moduleCompileConsoleInformation.DuringCompileMessageLength) -ForegroundColor Green


# Compile the API
# TODO: Add API compilation

# Exit
if ($Env:TERM_PROGRAM -eq "vscode") {
    Set-Location -Path $PSScriptRoot
} exit