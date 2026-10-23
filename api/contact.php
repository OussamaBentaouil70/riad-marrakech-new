<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

$required = ['name', 'email', 'eventType', 'guestCount'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing $field"]);
        exit;
    }
}

$reference = $input['reference'] ?? 'RM-' . strtoupper(substr(md5(uniqid()), 0, 6));

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USERNAME'];
    $mail->Password = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = 'tls';
    $mail->Port = (int)$_ENV['SMTP_PORT'];

    $mail->setFrom($_ENV['FROM_EMAIL'], 'Riad Marrakech');
    $mail->addAddress($_ENV['ADMIN_EMAIL']);

    $mail->Subject = "New Event Inquiry: {$input['eventType']}";
    $mail->isHTML(true);
    $mail->Body = renderAdminTemplate($input, $reference);
    $mail->AltBody = renderAdminText($input, $reference);
    $mail->send();

    $userMail = new PHPMailer(true);
    $userMail->isSMTP();
    $userMail->Host = $_ENV['SMTP_HOST'];
    $userMail->SMTPAuth = true;
    $userMail->Username = $_ENV['SMTP_USERNAME'];
    $userMail->Password = $_ENV['SMTP_PASSWORD'];
    $userMail->SMTPSecure = 'tls';
    $userMail->Port = (int)$_ENV['SMTP_PORT'];

    $userMail->setFrom($_ENV['FROM_EMAIL'], 'Riad Marrakech');
    $userMail->addAddress($input['email'], $input['name']);
    $userMail->Subject = 'Thank you for your inquiry — Riad Marrakech';
    $userMail->isHTML(true);
    $userMail->Body = renderUserTemplate($input, $reference);
    $userMail->AltBody = renderUserText($input, $reference);
    $userMail->send();

    echo json_encode(['success' => true, 'redirect' => '/thank-you.html', 'reference' => $reference]);
} catch (Exception $e) {
    error_log("Mailer Error: {$mail->ErrorInfo}");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}

function renderAdminTemplate($data, $reference) {
    return '
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2c2620;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c16a45;">New Event Inquiry</h2>
            <p style="color: #6b5b4a;">Reference: <strong>' . htmlspecialchars($reference) . '</strong></p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">' . htmlspecialchars($data['name']) . '</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">' . htmlspecialchars($data['email']) . '</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">' . htmlspecialchars($data['phone'] ?? '') . '</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Event Type:</td><td style="padding: 8px;">' . htmlspecialchars($data['eventType']) . '</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Event Date:</td><td style="padding: 8px;">' . htmlspecialchars($data['eventDate'] ?? '') . '</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Guest Count:</td><td style="padding: 8px;">' . htmlspecialchars($data['guestCount']) . '</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Preferred Riad:</td><td style="padding: 8px;">' . htmlspecialchars($data['preferredRiad'] ?? '') . '</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px;">' . nl2br(htmlspecialchars($data['message'] ?? '')) . '</td></tr>
            </table>
        </div>
    </body>
    </html>';
}

function renderAdminText($data, $reference) {
    return "New Event Inquiry\nReference: $reference\n\n" .
        "Name: {$data['name']}\n" .
        "Email: {$data['email']}\n" .
        "Phone: {$data['phone']}\n" .
        "Event Type: {$data['eventType']}\n" .
        "Event Date: {$data['eventDate']}\n" .
        "Guest Count: {$data['guestCount']}\n" .
        "Preferred Riad: {$data['preferredRiad']}\n" .
        "Message: {$data['message']}";
}

function renderUserTemplate($data, $reference) {
    return '
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.8; color: #2c2620; background: #faf6ee;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: #fff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 24px rgba(44,38,32,0.1);">
                <h1 style="color: #c16a45; font-family: Georgia, serif; font-weight: 300; margin-bottom: 16px;">Thank you, ' . htmlspecialchars($data['name']) . '!</h1>
                <p style="font-size: 16px;">We\'ve received your inquiry for a <strong>' . htmlspecialchars($data['eventType']) . '</strong> and will be in touch shortly to discuss your private riad celebration in Marrakech.</p>
                <hr style="border: none; border-top: 1px solid #eadfc8; margin: 24px 0;">
                <p style="font-size: 14px; color: #6b5b4a;">Your reference: <strong>' . htmlspecialchars($reference) . '</strong></p>
                <p style="font-size: 14px; color: #6b5b4a; margin-top: 24px;">Warm regards,<br><strong>Riad Marrakech Team</strong></p>
            </div>
        </div>
    </body>
    </html>';
}

function renderUserText($data, $reference) {
    return "Thank you, {$data['name']}!\n\nWe've received your inquiry for a {$data['eventType']} and will be in touch shortly.\n\nYour reference: $reference\n\nWarm regards,\nRiad Marrakech Team";
}