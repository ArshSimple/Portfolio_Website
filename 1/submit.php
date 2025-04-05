<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Honeypot check (should be empty)
    if (!empty($_POST["website"])) {
        header("Location: contact.html?status=bot");
        exit;
    }

    // Sanitize input
    $name = htmlspecialchars(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"] ?? ''));

    // Validate required fields
    if ($name === '' || $email === '' || $message === '') {
        header("Location: contact.html?status=empty");
        exit;
    }

    // Format message
    $entry = "Date: " . date("Y-m-d H:i:s") . PHP_EOL;
    $entry .= "Name: $name" . PHP_EOL;
    $entry .= "Email: $email" . PHP_EOL;
    $entry .= "Message: $message" . PHP_EOL;
    $entry .= str_repeat("-", 40) . PHP_EOL;

    // Save to file
    file_put_contents("messages.txt", $entry, FILE_APPEND);

    // Redirect back with success
    header("Location: contact.html?status=success");
    exit;
} else {
    // Block direct access
    header("Location: contact.html");
    exit;
}
?>
