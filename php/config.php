<?php

function doCurl($method, $url, $data){
    $authorization = "Authorization: ".$_SESSION['tokn'];
    switch($method){
        case "GET" :
        {
            $curl = curl_init();           
            curl_setopt_array($curl, array(
             CURLOPT_URL => $url,
             CURLOPT_RETURNTRANSFER => true,
             CURLOPT_TIMEOUT => 30,
             CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
             CURLOPT_CUSTOMREQUEST => $method,
             CURLOPT_HTTPHEADER => array('Content-Type: application/json' , $authorization)
           ));
           $response = curl_exec($curl);
           $err = curl_error($curl);
           curl_close($curl);
           $response = json_decode($response, true);
           header('Content-Type: application/json');
           echo json_encode($response); 
        }
        break;

        case "POST": 
        {    
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_URL => $url,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $method,
                CURLOPT_POSTFIELDS => $data,
                CURLOPT_HTTPHEADER => array('Content-Type: application/json' , $authorization)
            ));
            $response = curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);
            header('Content-Type: application/json');
            echo $response;
         
        }
        break;

        case "PUT" : {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_URL => $url,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $method,
                CURLOPT_POSTFIELDS => $data,
                CURLOPT_HTTPHEADER => array('Content-Type: application/json' , $authorization)
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

        case "DELETE" : {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_URL => $url,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $method,
                CURLOPT_HTTPHEADER => array('Content-Type: application/json' , $authorization)
            ));
            $response = curl_exec($curl);
            $err = curl_error($curl);
            echo json_encode($response);
            curl_close($curl);
            header('Content-Type: application/json');
            if($response){
                echo json_encode("success");
            }else{
                echo json_encode("");
            } 
        }
        break;
    }    
   }
?>