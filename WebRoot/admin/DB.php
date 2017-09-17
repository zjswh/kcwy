<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/9/15
 * Time: 11:51
 */
//$pdo = new PDO("mysql:host=5649ad5022569.sh.cdb.myqcloud.com;port=13493;dbname=test","cdb_outerroot","DhPV2nET9NFu");
//var_dump($pdo);

class DB{
    private $type;//数据库类型
    private $host;//主机名
    private $port;//端口号
    private $dbname;//连接的数据库名称
    private $user; //用户名
    private $pass; //密码
    private $pdo;
    private $config; //配置数组
    private $pre; //数据库前缀

    public function __construct()
    {
        $this->config =  include "config.php";
        foreach($this->config as $k=>$v){
            $this->$k = $v;
        }
        $this->pdo_connect();
    }


    private function pdo_connect(){
        $this->pdo = new PDO($this->type.':host='.$this->host.';port='.$this->port.';dbname='.$this->dbname,$this->user,$this->pass);
        $sql = "SET NAMES '{$this->config['charset']}';";
        $this->pdo->exec($sql);
    }

    public function prepare($sql) {
        $statement = $this->pdo->prepare($sql);
        return $statement;
    }
    public function query($sql,$params = array()){
        if(empty($params)){
            $result = $this->pdo->exec($sql);
        }else{
            $statement = $this->prepare($sql);
            $result = $statement->execute($params);
        }
        return $result;
    }

    public function get($tb,$data = array(),$params = array()){
        $str = empty($data)? '*':implode($data,',');
        $condition = $this->pdo_get($params);
        $sql = "SELECT $str FROM ".$this->tablename($tb);
        if(!empty($params)){
            $sql .= " WHERE {$condition['fields']}";
        }
        return $this->pdo_fetch($sql,$params);
    }

    public function getall($tb,$data = array(),$params = array(),$orderby = array() ,$limit = array()){
        $str = empty($data)? '*':implode($data,',');
        $order = empty($orderby)? '':implode($orderby,' ');
        $lim = empty($limit)? '':implode($limit,',');
        if(empty($params)){
            $sql = "SELECT $str FROM ".$this->tablename($tb);
        }else{
            $condition = $this->pdo_get($params);
            $sql = "SELECT $str FROM ".$this->tablename($tb)." WHERE {$condition['fields']} ";
        }
        
        if(!empty($order)){
            $sql .= " ORDER BY {$order}";
        }
        if(!empty($lim)){
            $sql .= " LIMIT {$lim}";
        }
        return $this->pdo_fetchall($sql,$params);

    }

    public function pdo_fetchall($sql,$params = array()){
        $statement = $this->prepare($sql);
        $result = $statement->execute($params);
        if (!$result) {
            return false;
        } else {
            return $statement->fetchAll(pdo::FETCH_ASSOC);
        }
    }

    public function pdo_fetch($sql,$params = array()){
        $statement = $this->prepare($sql);
        $result = $statement->execute($params);
        if (!$result) {
            return false;
        } else {
            return $statement->fetch(pdo::FETCH_ASSOC);
        }
    }


    public function pdo_insert($tb,$params){
        $condition = $this->pdo_get($params);
        return $this->query("INSERT INTO " .  $this->tablename($tb). " SET {$condition['fields']}", $condition['params']);
    }

    public function pdo_update($tb,$data = array(), $params = array()){
        $fields = $this->pdo_get($data);
        $condition = $this->pdo_get($params);
        $params = array_merge($fields['params'], $condition['params']);
        $sql = "UPDATE " . $this->tablename($tb) . " SET {$fields['fields']}";
        $sql .= $condition['fields'] ? ' WHERE '.$condition['fields'] : '';
        return $this->query($sql, $params);
    }

    public function pdo_del($tb,$data){
        $fields = $this->pdo_get($data);
        $sql = "DELETE FROM " . $this->tablename($tb) . " WHERE {$fields['fields']}";
        return $this->query($sql, $fields['params']);
    }

    private function tablename($tb){
        return "{$this->pre}{$tb}";
    }

    public function insertid() {
        return $this->pdo->lastInsertId();
    }

    private function pdo_get($params){
        $result = array('fields' => '', 'params' => array());
        if(is_array($params)){
            foreach ($params as $fields=>$value){
                $result['fields'] .= "`$fields`  =  :$fields,";
                $result['params'][":$fields"] = is_null($value) ? '' : $value;
            }
            $result['fields'] = substr($result['fields'], 0, -1);
        }
        return $result;
    }






    private function implode($params, $glue = ',') {
        $result = array('fields' => ' 1 ', 'params' => array());
        $split = '';
        $suffix = '';
        $allow_operator = array('>', '<', '<>', '!=', '>=', '<=', '+=', '-=', 'LIKE', 'like');
        
        //where条件里面的（id=:__id）
        if (in_array(strtolower($glue), array('and', 'or'))) {
            $suffix = '__';
        }
        if (!is_array($params)) {
            $result['fields'] = $params;
            return $result;
        }
        if (is_array($params)) {
            $result['fields'] = '';
            foreach ($params as $fields => $value) {
                $operator = '';
                if (strpos($fields, ' ') !== FALSE) {
                    list($fields, $operator) = explode(' ', $fields, 2);
                    if (!in_array($operator, $allow_operator)) {
                        $operator = '';
                    }
                }
                if (empty($operator)) {
                    $fields = trim($fields);
                    if (is_array($value)) {
                        $operator = 'IN';
                    } else {
                        $operator = '=';
                    }
                } elseif ($operator == '+=') {
                    $operator = " = `$fields` + ";
                } elseif ($operator == '-=') {
                    $operator = " = `$fields` - ";
                }
                if (is_array($value)) {
                    $insql = array();
                    foreach ($value as $k => $v) {
                        $insql[] = ":{$suffix}{$fields}_{$k}";
                        $result['params'][":{$suffix}{$fields}_{$k}"] = is_null($v) ? '' : $v;
                    }
                    $result['fields'] .= $split . "`$fields` {$operator} (".implode(",", $insql).")";
                    $split = ' ' . $glue . ' ';
                } else {
                    $result['fields'] .= $split . "`$fields` {$operator}  :{$suffix}$fields";
                    $split = ' ' . $glue . ' ';
                    $result['params'][":{$suffix}$fields"] = is_null($value) ? '' : $value;
                }
            }
        }
        return $result;
    }

}