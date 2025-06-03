<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!empty($_POST["website"])) {
        header("Location: contact.html?status=bot");
        exit;
    }

    $name = htmlspecialchars(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"] ?? ''));

    if ($name === '' || $email === '' || $message === '') {
        header("Location: contact.html?status=empty");
        exit;
    }

    $entry = "Date: " . date("Y-m-d H:i:s") . PHP_EOL;
    $entry .= "Name: $name" . PHP_EOL;
    $entry .= "Email: $email" . PHP_EOL;
    $entry .= "Message: $message" . PHP_EOL;
    $entry .= str_repeat("-", 40) . PHP_EOL;

    file_put_contents("messages.txt", $entry, FILE_APPEND);

    header("Location: contact.html?status=success");
    exit;
} else {
    header("Location: contact.html");
    exit;
}
?>
