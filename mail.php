<?php
	$mail = $_REQUEST['email'];
	$name = $_REQUEST['name'];
	$message = $_REQUEST['message'];
	$files = $_REQUEST['files'];
	$form = $_REQUEST['form'];
	
	require("PHPMailer/class.phpmailer.php");

	if ($form == null) { $subj = "Сообщения пользователя"; $body = "Сообщения пользователя\n";}
	else { $subj = "Заказ первичной консультации"; $body = "Заказ первичной консультации\n"; }
	$body .= "Имя: ".$name."\nE-mail: ".$mail."\nСообщение: ".$message;
	
	$email = new PHPMailer();
	$email->From      = $_REQUEST['email'];
	$email->FromName  = $mail;
	$email->Subject   = $subj;
	$email->Body      = $body;

	$email->AddAddress( 'info@nkprofit.nl' );

	if ($files != null)
	{
		$arr = explode("~", $files);

		if (count($arr) > 0)
		{
			foreach ($arr as &$file) {
				if ($file != "undefined")
				{
					$email->AddAttachment("temp/".$file, basename("temp/".$file));
				}
			}
		}
	}
	
	if($email->Send())
	{
		foreach ($arr as &$value) {
			unlink($value);
		}
	}
?>