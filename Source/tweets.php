<?php
$username = $_POST['user'];
$count = $_POST['count'];
$type = $_POST['type'];
$url = 'http://api.twitter.com/1/statuses/'.$type.'_timeline/'.$username;
$url .= '.json?=twitterCallback2&count='.$count;
print_r(file_get_contents($url));
?>