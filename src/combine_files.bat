@echo off
:: Create a timestamp for the output file name
set timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

:: Create the output file
echo Directory Contents > "combined_files_%timestamp%.txt"

:: First create a directory tree
tree /f /a >> "combined_files_%timestamp%.txt"
echo. >> "combined_files_%timestamp%.txt"
echo ===================================== >> "combined_files_%timestamp%.txt"
echo. >> "combined_files_%timestamp%.txt"

:: Then append all files
for /r %%F in (*) do (
    if not "%%~nxF"=="combined_files_%timestamp%.txt" (
        if not "%%~xF"==".bat" (
            echo File: %%~nxF >> "combined_files_%timestamp%.txt"
            echo Path: %%~dpF >> "combined_files_%timestamp%.txt"
            echo -------------------------------------------- >> "combined_files_%timestamp%.txt"
            type "%%F" >> "combined_files_%timestamp%.txt"
            echo. >> "combined_files_%timestamp%.txt"
            echo ===================================== >> "combined_files_%timestamp%.txt"
            echo. >> "combined_files_%timestamp%.txt"
        )
    )
)
