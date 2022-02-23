<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Movie.php';

// Instance database and connect
$database = new Database();
$db = $database->connect();

// Instanciate Movie Object
$newMovie = new Movie($db);

// Get raw posted data
$data = json_decode((file_get_contents("php://input")));

$newMovie->name = $data->name;
$newMovie->description = $data->description;
$newMovie->year = intval($data->year);
$newMovie->poster = $data->poster;

// Create the post
if (isset($newMovie->name) && isset($newMovie->description) && isset($newMovie->year) && isset($newMovie->poster) && $newMovie->create()) {
    echo json_encode(array('message' => 'New movie has been added.'));
} else {
    echo json_encode(array('message' => 'Error in adding the new movie.'));
}
