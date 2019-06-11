<?php
require('./config.php');
session_start();
$urlParams = explode('/', $_SERVER['REQUEST_URI']);
$functionName = $urlParams[3];

switch ($functionName){
  case "getUser" : {
      $user = $_SESSION["userId"];
    doCurl("GET", "http://localhost:3000/api/users/".$user, "");
  }
  break;

  case "getSingle" : {
    $user = $_POST["user_id"];
    doCurl("GET", "http://localhost:3000/api/users/".$user, "");
  }
  break;

  case "upd" : { 
    $data = $_POST["data"];
    $user = $_SESSION["userId"];
    doCurl("PUT", "http://localhost:3000/api/users/".$user, $data);
  }
  break;

  case "updPw" : {
    $data = $_POST["data"];
    $user = $_SESSION["userId"];
   doCurl("PUT", "http://localhost:3000/api/user/pw/".$user, $data);    

  }
  break;

  case "op" : {
      $user = $_SESSION["userId"];
      doCurl("GET", "http://localhost:3000/api/occupationprofile/user/".$user, "");
  }
  break;

  case "polygon": {
    $data = $_POST["polygon"];
    doCurl("GET", "http://localhost:3000/api/polygon/".$data,"");
  }
  break;


  case "polyg" : {
    doCurl("GET", "http://localhost:3000/api/polygon/get/buildings", "");
  }
  break;

  case "occ" : {
    $id = $_POST["id"];
    doCurl("GET", "http://localhost:3000/api/occupationprofile/".$id, "");
  }
  break;

  case "del" : {
    $id = $_POST["id_occprof"];
    doCurl("DELETE", "http://localhost:3000/api/occupationprofile/".$id, "");
  }
  break;

  case "updOc" : {
    $id = $_POST["id_occprof"];
    $data = $_POST["data"];
    doCurl("PUT", "http://localhost:3000/api/occupationprofile/".$id, $data);
  }
  break;

  case "post" : {
    $data = json_decode($_POST["data"], true);
    $user = array('userId' => $_SESSION["userId"]);
    $dados = array_merge($data, $user);
    $json = json_encode($dados);  
    doCurl("POST", "http://localhost:3000/api/occupationprofile", $json);
  }
  break;

  case "register" :  {
    $dados = $_POST["data"];
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_URL => "http://localhost:3000/api/users",
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => $dados,
        CURLOPT_HTTPHEADER => array('Content-Type: application/json')
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    header('Content-Type: application/json');
    if($response){
        echo json_encode("success");
    }else{
        echo json_encode("");
    } 
  }
  break;

  case "exists" : {
    $dados = $_POST["email"];  
    $data = json_encode(array('email' => $dados));
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_URL => "http://localhost:3000/api/users/emailexists",
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_HTTPHEADER => array('Content-Type: application/json')
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    echo $response;
  }
  break;

  case "all" : {
    doCurl("GET", "http://localhost:3000/api/users/", "");
  }
  break;

  case "updateTypology" : {
    $id = $_POST["id"];
    $data = $_POST["data"];
    doCurl("PUT", "http://localhost:3000/api/users/".$id, $data);
  }
  break;
}
?>