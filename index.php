<?php

// 导入机器人
require __DIR__ . '/PHPExcel/IOFactory.php';

$PHPReader = new PHPExcel_Reader_Excel2007();

$filePath = __DIR__ . '/cs.xlsx';

//判断文件类型
if (!$PHPReader->canRead($filePath)) {
    $PHPReader = new \PHPExcel_Reader_Excel5();

    if (!$PHPReader->canRead($filePath)) {
        echo 'no Excel';

        return false;
    }
}

$PHPExcel = $PHPReader->load($filePath);

/**读取excel文件中的第一个工作表*/
$currentSheet = $PHPExcel->getSheet(0);

/**取得最大的列号*/
$allColumn = $currentSheet->getHighestColumn();

/**取得一共有多少行*/
$allRow = $currentSheet->getHighestRow();

/**从第1行开始输出*/
for ($currentRow = 1; $currentRow <= $allRow; ++$currentRow) {
    /**从第A列开始输出*/
    for ($currentColumn = 'A'; $currentColumn <= $allColumn; ++$currentColumn) {
        $val = $currentSheet->getCellByColumnAndRow(ord($currentColumn) - 65, $currentRow)->getValue();
        /**ord()将字符转为十进制数*/
        $date[$currentRow - 1][] = $val;
    }
}

$endData = [];
foreach ($date as $key => $val) {
//    $data = [
//        'cityPosition' => "'" . $val[2] . "': [" . $val[4] . ',' . $val[5] . "],\r\n",
//    ];
    $data = [
        'city' => $val[2],
        'position' => $val[4] . ',' . $val[5]
    ];
    array_push($endData, $data);
}
$endData = removeDuplicate($endData);
//var_dump($endData);
$enddData = [];
for ($i = 1; $i < count($endData); $i++) {
    $data = [
        'cityPosition' => "'" . $endData[$i]['city'] . "': [" . $endData[$i]['position'] . "],\r\n",
    ];
    array_push($enddData, $data);
}

$file = 'log.txt';//要写入文件的文件名（可以是任意文件名），如果文件不存在，将会创建一个
for ($i = 0; $i < count($enddData); $i++) {
    file_put_contents($file, $enddData[$i]['cityPosition'], FILE_APPEND);
}

function removeDuplicate($array)
{
    $result = array();
    foreach ($array as $key => $value) {
        $has = false;
        foreach ($result as $val) {
            if ($val['city'] == $value['city']) {
                $has = true;
                break;
            }
        }
        if (!$has) {
            $result[] = $value;
        }
    }

    return $result;
}
