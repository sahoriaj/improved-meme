<?php
// Site Configuration
define('SITE_NAME', 'iLoveIMG Clone');
define('SITE_URL', 'http://' . $_SERVER['HTTP_HOST']);
define('CURRENT_YEAR', date('Y'));

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set default timezone
date_default_timezone_set('UTC');
?>
