<?php
// Lead endpoint for the static site. Receives JSON, validates, then
//  1) forwards to the n8n webhook (LEAD_WEBHOOK_URL) and
//  2) emails LEAD_EMAIL_TO (fallback).
// Secrets live in ../../agentor-config.php (outside the web root, not in git). See config.sample.php.
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$cfg = ['LEAD_WEBHOOK_URL' => '', 'LEAD_EMAIL_TO' => 'R.latypov@plenergy.co.uk', 'TURNSTILE_SECRET' => ''];
$cfgFile = dirname(__DIR__, 2) . '/agentor-config.php';
if (is_file($cfgFile)) { $cfg = array_merge($cfg, include $cfgFile); }

$raw = file_get_contents('php://input');
if (strlen($raw) > 100000) { http_response_code(413); echo '{"ok":false}'; exit; }
$d = json_decode($raw, true);
if (!is_array($d)) { http_response_code(400); echo '{"ok":false}'; exit; }

// Honeypot: bots fill the hidden field. Pretend success.
if (!empty($d['hp'])) { echo '{"ok":true}'; exit; }

$types = ['consultation', 'discovery', 'assessment', 'free_mvp'];
$type = $d['form_type'] ?? '';
if (!in_array($type, $types, true)) { http_response_code(400); echo '{"ok":false}'; exit; }
$email = $d['email'] ?? '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(422); echo '{"ok":false,"error":"email"}'; exit; }

// Optional Cloudflare Turnstile verification.
if ($cfg['TURNSTILE_SECRET'] !== '') {
  $tok = $d['turnstile'] ?? '';
  $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
  curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_POSTFIELDS => ['secret' => $cfg['TURNSTILE_SECRET'], 'response' => $tok]]);
  $res = json_decode((string)curl_exec($ch), true); curl_close($ch);
  if (empty($res['success'])) { http_response_code(403); echo '{"ok":false,"error":"captcha"}'; exit; }
}
unset($d['hp'], $d['turnstile']);

$sent = false;
if ($cfg['LEAD_WEBHOOK_URL'] !== '') {
  $ch = curl_init($cfg['LEAD_WEBHOOK_URL']);
  curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10, CURLOPT_HTTPHEADER => ['Content-Type: application/json'], CURLOPT_POSTFIELDS => json_encode($d, JSON_UNESCAPED_UNICODE)]);
  curl_exec($ch); $code = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
  $sent = $code >= 200 && $code < 300;
}

$body = "New lead: $type\n\n" . json_encode($d, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$mail = @mail($cfg['LEAD_EMAIL_TO'], "[Agentura Labs] $type lead", $body, "From: no-reply@agentor.ai\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8");

// Last resort so a lead is never lost: append to a private log file.
if (!$sent && !$mail) { @file_put_contents(dirname(__DIR__, 2) . '/agentor-leads.log', $body . "\n---\n", FILE_APPEND | LOCK_EX); }

echo json_encode(['ok' => true, 'dev' => $cfg['LEAD_WEBHOOK_URL'] === '']);
