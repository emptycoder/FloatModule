<?php  
// определяем callback функцию основного окна которой вернем ответ по окончанию загрузки 
 function jsOnResponse($obj)  
 {  
 echo '<script type="text/javascript"> window.parent.onResponse("'.$obj.'"); </script> ';  
 }  
// определяем куда скопируем файл пользователя
 $dir = 'temp/';
 //$name = basename($_FILES['loadfile']['name']);
 $ext = explode(".", basename($_FILES['loadfile']['name']))[1];
 $name = "0";
 while(file_exists ($dir.$name.".".$ext)) { $name += 1; }
 $file = $dir.$name.".".$ext;
//копируем файл и получаем результат
 $success = move_uploaded_file($_FILES['loadfile']['tmp_name'], $file);  
//вызываем callback функцию и передаем ей результат
 jsOnResponse("{'filename':'" . basename($_FILES['loadfile']['name']) . "', 'success':'" . $success . "', 'filepath':'" . $name.".".$ext . "'}");  
?> 