# Clear the host screen
Clear-Host

# Fullscreen the console window, only if its not Visual Studio Code
$shell = New-Object -ComObject WScript.Shell
if ($env:TERM_PROGRAM -ne "vscode") {
    $shell.SendKeys('{F11}')
}

# Set script path and launch the script
$scriptPath = '.\src\app\js\app.js'
& node $scriptPath

# Pause, un-fullscreen, Clear and Exit the script 
Pause
if ($env:TERM_PROGRAM -ne "vscode") {
    $shell.SendKeys('{F11}')
}
Clear-Host