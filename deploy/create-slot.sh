#!/bin/bash


Param
(   
    [Parameter (Mandatory = $true)]
    [string]$id = "1" ,   
    [Parameter (Mandatory = $false)]
    [string]$appName="cintamani-buddhas",
    [Parameter (Mandatory = $false)]
    [string]$resGroup="cintamani-buddhas",
    [Parameter (Mandatory = $false)]    
    [string]$env = "develop"
)

id=$1;
if($2) appName=$2 elif appName="cintamani-buddhas"
if($3) resGroup=$3 elif resGroup="cintamani-buddhas"
if($4) env=$4 elif env="develop"


$slot=$env+"-"+$id;
# cintamani-buddhas-develop--test.azurewebsites.net
echo("Setup new slot now: http://" + $appName + "-" + $env +"-"+$id+".azurewebistes.net");
az webapp deployment slot create --name $appName --resource-group $resGroup --slot $slot
echo("Please remember to delete slot, after testing");