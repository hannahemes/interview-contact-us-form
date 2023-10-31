<?php

//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


//Load Composer's autoloader
require './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

//error reporting 
error_reporting(E_ALL);
ini_set('display_errors', 'on');

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.ethereal.email';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['email'];
    $mail->Password = $_ENV['password'];
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;  

    //Recipients
    $mail->setFrom($_REQUEST['email']);
    $mail->addAddress($_ENV['email']);     //Add a recipient
    $mail->addReplyTo($_REQUEST['email'], $_REQUEST['name']);

    //Content
    $mail->isHTML(false);    //Set email format to HTML
    $mail->Subject = $_REQUEST['subject'];
    $mail->Body    = $_REQUEST['message'];
    $mail->AltBody = $_REQUEST['message'];

    $mail->send();

    $success = "Thanks for contacting us. We will get back to you shortly";

    echo json_encode($success);

} catch (Exception $e) {

    $error = "Something went wrong. Try again later: {$mail->ErrorInfo}";

    echo json_encode($error);

}

?>