<?php
//header('Content-Type: application/json; charset=utf-8');
$string = file_get_contents("https://www.youtube.com/");

// function 
// function makeArray($string){
    $result = array();
    $data = explode("><",$string);

    for($i=0;$i< count($data); $i++){
        $d = explode("",$data[$i]);
        $index = $d[0];
        $dataTag = "<".$data[$i].">";
        if(isset($result[$index])){
            array_push($result[$index],$dataTag);
        }else{
            $result[$index] = array($dataTag);
        }
    }

//     return "{test:1}";
// }


// $result = makeArray($data);

echo $data;
?>