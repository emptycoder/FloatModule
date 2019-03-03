<?php
$files = $_REQUEST['files'];
$arr = explode("~", $files);

foreach ($arr as &$value)
{
	unlink("temp/".$value);
}
?>