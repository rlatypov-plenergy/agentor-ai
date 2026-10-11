<?php
// Copy to <parent of web root>/agentor-config.php on the server (outside the public folder) and fill in. Never commit real values.
return [
  'LEAD_WEBHOOK_URL' => '',            // n8n webhook URL
  'LEAD_EMAIL_TO' => 'you@example.com',
  'TURNSTILE_SECRET' => '',            // optional Cloudflare Turnstile secret
];
