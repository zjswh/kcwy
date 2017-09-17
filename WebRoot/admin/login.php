<?php
include "DB.php";
$pdo = new DB();

$_user = isset($_POST['username']) ? $_POST['username'] : '';
$_pass = isset($_POST['password']) ? $_POST['password'] : '';

$cond = array(
    'nickname' => $_user
);
$data = array('id','phone');
$stm = $pdo->get('user',$data,$cond);
$res = array();
if($stm){
    $res['statu'] = 0;
    $res['data'] = $stm;
}else{
    $res['statu'] = 1;
}
echo json_encode($res);
?>
