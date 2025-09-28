@echo off
setlocal enabledelayedexpansion

:: List of hospital IDs
set HOSPITALS=alkebd alhimyat al3am alramad ellgeldia el3bor university

:: Create each hospital page
for %%H in (%HOSPITALS%) do (
    echo Creating files for %%H...
    
    :: Create HTML file
    echo ^<!DOCTYPE html^> > "%%~H.html"
    echo ^<html lang="en"^> >> "%%~H.html"
    echo ^<head^> >> "%%~H.html"
    echo     ^<meta charset="UTF-8"^> >> "%%~H.html"
    echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> "%%~H.html"
    echo     ^<title^>%%~H - GovHospitals^</title^> >> "%%~H.html"
    echo     ^<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"^> >> "%%~H.html"
    echo     ^<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"^> >> "%%~H.html"
    echo     ^<style^> >> "%%~H.html"
    echo         body { min-height: 100vh; display: flex; flex-direction: column; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; } >> "%%~H.html"
    echo         #app { flex: 1; background-color: #f8f9fa; display: flex; flex-direction: column; } >> "%%~H.html"
    echo         .loading-spinner { display: flex; justify-content: center; align-items: center; height: 100vh; width: 100%%; position: fixed; top: 0; left: 0; background-color: rgba(255, 255, 255, 0.9); z-index: 9999; } >> "%%~H.html"
    echo     ^</style^> >> "%%~H.html"
    echo ^</head^> >> "%%~H.html"
    echo ^<body^> >> "%%~H.html"
    echo     ^<div id="loading" class="loading-spinner"^> >> "%%~H.html"
    echo         ^<div class="spinner-border text-success" role="status"^> >> "%%~H.html"
    echo             ^<span class="visually-hidden"^>Loading...^</span^> >> "%%~H.html"
    echo         ^</div^> >> "%%~H.html"
    echo     ^</div^> >> "%%~H.html"
    echo     ^<div id="app"^>^</div^> >> "%%~H.html"
    echo     ^<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"^>^</script^> >> "%%~H.html"
    echo     ^<script src="hospital-page.js"^>^</script^> >> "%%~H.html"
    echo     ^<script src="%%~H.js"^>^</script^> >> "%%~H.html"
    echo ^</body^> >> "%%~H.html"
    echo ^</html^> >> "%%~H.html"

    :: Create JS file
    echo // %%H Configuration > "%%~H.js"
    echo const hospitalConfig = { >> "%%~H.js"
    echo     name: '%%~H', >> "%%~H.js"
    echo     nameAr: '%%~H', >> "%%~H.js"
    echo     description: 'Hospital Description', >> "%%~H.js"
    echo     descriptionAr: 'وصف المستشفى', >> "%%~H.js"
    echo     primaryColor: '#3498db', >> "%%~H.js"
    echo     secondaryColor: '#2980b9', >> "%%~H.js"
    echo     icon: 'hospital' >> "%%~H.js"
    echo }; >> "%%~H.js"
    echo >> "%%~H.js"
    echo // Initialize the hospital page >> "%%~H.js"
    echo if (document.readyState === 'loading') { >> "%%~H.js"
    echo     document.addEventListener('DOMContentLoaded', () => initHospitalPage(hospitalConfig)); >> "%%~H.js"
    echo } else { >> "%%~H.js"
    echo     initHospitalPage(hospitalConfig); >> "%%~H.js"
    echo } >> "%%~H.js"
)

echo All hospital files have been generated!
pause
