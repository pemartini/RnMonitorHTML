<?php
require('./config.php');
session_start();
$urlParams = explode('/', $_SERVER['REQUEST_URI']);
$functionName = $urlParams[3];

switch ($functionName){
  case "data" : {
    $user = $_SESSION['userId'];
    doCurl("GET", "http://localhost:3000/api/sensor/ativo/".$user, "");
  }
  break;

    case "unidade" : {
      $id = $_POST["id_sensor"];
      doCurl("GET", "http://localhost:3000/api/sensor/".$id, "");
    }
    break;

  case "measurement" : {
    $sensor = $_POST["sensor"];
    doCurl("GET", "http://localhost:3000/api/measurementset/sensor/".$sensor, "");
  }
  break;

  case "polygon" : {
    $polygon = $_POST["polygon"];
    doCurl("GET", "http://localhost:3000/api/polygon/".$polygon, "");
  }
  break;

  case "inativo" : { 
    $user = $_SESSION['userId'];
    doCurl("GET", "http://localhost:3000/api/sensor/inativo/".$user, "");
  }
  break;

  case "uInativo": {
      $id = $_POST["id_sensor"];
      doCurl("GET", "http://localhost:3000/api/sensor/".$id,"");
  }
  break;

  case "add" : {   
    $data = json_decode($_POST["data"], true);
    $user = array('user' => $_SESSION["userId"]);
    $dados = array_merge($data, $user);
    $json = json_encode($dados);  
   doCurl("POST", "http://localhost:3000/api/sensor" , $json);
  }
  break;

  case "upd" : {
    $data = $_POST["dataString"];
    $id = $_POST["id"];
    $api = $_POST["api"];
    doCurl("PUT", "http://localhost:3000/api/measurementset/sensor/terminarMedicao/".$api, $data);
    doCurl("PUT", "http://localhost:3000/api/sensorUpdate/".$id, "");
  }
  break;

  case "updSensor" : {
    $data = $_POST["data"];
    $id = $_POST["id"];    
    doCurl("PUT", "http://localhost:3000/api/sensor/".$id, $data);    
  }
  break;

  case "checkAPI" : {
    $dados = $_POST["codigo"];
    $data = json_encode(array('codigo' => $dados));
    doCurl("POST", "http://localhost:3000/api/sensorapiKey/", $data);
  }
  break;

  case "getAll" : {
    $user = $_SESSION["userId"];
    doCurl("GET", "http://localhost:3000/api/sensor/all/".$user, "");
  }
  break;

  case "api" : {
    $api = $_POST["sensor"];
    doCurl("GET", "http://localhost:3000/api/sensor/getByAPI/".$api, "");
  }
  break;

  case 'getMeasurements' : {
    $data = $_POST["data"]; 
    doCurl("POST", "http://localhost:3000/api/measurementset/get/dateTime", $data);
  }
  break;

  case 'getSensoresPolyg' : {
    $data = $_POST["data"];
    doCurl("POST","http://localhost:3000/api/polygon/get/polygonSuperior", $data);
  }
  break;

  case 'checkDateFim' : {
    $dataPost = $_POST["datet"];
    $dataPostId = $_POST["sensor_id"];
    $data = array('dataFim' => $dataPost);
    $dataI = array('id' => $dataPostId);
    $dados = json_encode(array_merge($data, $dataI));
    doCurl("POST", "http://localhost:3000/api/measurementset/checkDate", $dados);
  }
  break;

  case "getAllAtivos" : {
    doCurl("GET", "http://localhost:3000/api/measurementset/get/getSensorAtivo", "");
  }break;

  case "getAllData" :{
    $data  = $_POST["sensor"];
    doCurl("GET", "http://localhost:3000/api/measurementset/sensorLast/".$data, "");
    break;
  }

}
?>