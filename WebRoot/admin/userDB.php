<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/9/15
 * Time: 13:24
 */
include "DB.php";
$pdo = new DB();
$cond = array(
    // 'uid'=>'= 98745'
);
$data = array();
$orderby = array();
$limit = array(4);

$stm = $pdo->getall('user',$data ,$cond,$orderby,$limit);


$stm = json_encode($stm);
echo $stm;

