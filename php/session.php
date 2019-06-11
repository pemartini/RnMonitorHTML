<?php
session_start();

if(isset($_POST['token'])){
    $_SESSION['tokn'] = $_POST['token'];
    $_SESSION['isAdmin'] = $_POST['adminFlag'];
    $_SESSION['userId'] = $_POST['user'];
    $_SESSION['timeout'] = time();
    $_SESSION['timeoutTotal'] = time();
    echo json_encode("true");
}
else{
echo json_encode("false");
}

?>