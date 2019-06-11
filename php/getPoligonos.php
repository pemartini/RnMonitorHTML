<?php
require('./config.php');
session_start();
$urlParams = explode('/', $_SERVER['REQUEST_URI']);
$functionName = $urlParams[3];

switch ($functionName){
  case "data" : {
    doCurl("GET", "http://localhost:3000/api/polygon/get/buildings", "");
  }
  break;

  case "unidade" : { 
    $a = $_POST["id_polygon"];
    doCurl("GET", "http://localhost:3000/api/polygon/".$a, "");
  }
  break;

  case "update" : {
    $data = $_POST["data"];
    $id = $_POST["id"];    
   doCurl("PUT", "http://localhost:3000/api/polygon/".$id, $data);    

  }
  break;

  case "parent" : {
    $data = $_POST["data"];
    doCurl("GET", "http://localhost:3000/api/polygon/find/findParent", "");
  }
  break;

  case "floor" : {
    $data = $_POST["data"];
    doCurl("POST", "http://localhost:3000/api/polygon/get/floor/", $data);
  }
  break;

  case "mset" : {
   $data = $_POST["data"];
   doCurl("POST", "http://localhost:3000/api/measurementset/get/building", $data); 
  }
  break;

  case "inside" : {
    $data = $_POST["data"];
   
    doCurl("POST", "http://localhost:3000/api/polygon/get/getInside", $data);
  }
  break;

  case "updatePolygon":{
    $id = $_POST["id"];
    $data = $_POST["data"];
    doCurl("PUT", "http://localhost:3000/api/polygon/update/".$id, $data);
  }
  break;

  case "getFamily": {
    $data = $_POST["polygon"];
    doCurl("GET", "http://localhost:3000/api/polygon/get/PolygonFamily/".$data, "");
    break;
  }

}
?>