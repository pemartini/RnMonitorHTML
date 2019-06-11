<?php
require('./config.php');
session_start();
$urlParams = explode('/', $_SERVER['REQUEST_URI']);
$functionName = $urlParams[3];

switch ($functionName){
  case "pisos" : {
    doCurl("GET", "http://localhost:3000/api/polygon/get/buildings", "");
  }
  break;

  case "polygon" : { 
    $data = $_POST["data"];
    doCurl("POST", "http://localhost:3000/api/polygon/", $data);
  }
  break;

  case "mset" : {
   $data = $_POST["data"];
   $apiKey = $_POST["id"];    
   doCurl("POST", "http://localhost:3000/api/measurementset/", $data);
   doCurl("PUT", "http://localhost:3000/api/sensorUpdateApi/".$apiKey, "");    
  }
  break;

  case "types" : {
    doCurl("GET", "http://localhost:3000/api/types", "");
  }
  break;

  case "superior" : {
    $data = $_POST["data"];
    doCurl("POST", "http://localhost:3000/api/polygon/get/getSuperior", $data);
  }
  break;

  case "notification" : {
    $user = $_SESSION['userId'];
    doCurl("GET", "http://localhost:3000/api/notificationActive/".$user, "");
  }
  break;

  case "edit" : {
    $id = $_POST["id"];
    doCurl("PUT", "http://localhost:3000/api/notification/".$id, "");
  }
  break;

  case "getSuperior" : {
   $data = $_POST["data"];
   doCurl("POST", "http://localhost:3000/api/polygon/get/polygonSuperior", $data);
  }
  break;
}
?>