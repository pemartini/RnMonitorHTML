<?php
require('./config.php');
session_start();
$urlParams = explode('/', $_SERVER['REQUEST_URI']);
$functionName = $urlParams[3];

switch ($functionName){
  case "data" : {
    doCurl("GET", "http://localhost:3000/api/field", "");
  }
  break;

  case "unidade" : { 
    $a = $_POST["id_field"];
    doCurl("GET", "http://localhost:3000/api/field/".$a, "");
  }
  break;

  case "add" : {   
    $data = $_POST["data"];
    doCurl("POST", "http://localhost:3000/api/field" , $data);
  }
  break;

  case "upd" : {
    $data = $_POST["data"];
    $id = $_POST["id"];    
   doCurl("PUT", "http://localhost:3000/api/field/".$id, $data);    

  }
  break;

  case "delete" : {
    $id = $_POST["id_field"];
    doCurl("DELETE", "http://localhost:3000/api/field/".$id, "");
  }
  break;

  case "active" : {
    $data = $_POST["codigo"];
    $dados = json_encode(array('codigo' => $data));
    doCurl("POST", "http://localhost:3000/api/field/fieldactive/", $dados);
  }
  break;
}

?>