Param
(   
    [Parameter (Mandatory = $true)]
    [string]$id = "1" ,   
    [Parameter (Mandatory = $false)]
    [string]$appName="cintamani-buddhas",
    [Parameter (Mandatory = $false)]
    [string]$resGroup="cintamani-buddhas",
    [Parameter (Mandatory = $false)]    
    [string]$env = "develop-"
)

$slot=$env+"-"+$id;

az webapp deployment slot create --name $appName --resource-group $resGroup --slot $slot
Write-Output("Please remember to delete slot, after testing");