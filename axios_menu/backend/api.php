<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM pilota ORDER BY nev");
            $readData = $stmt->fetchAll();
            echo json_encode(['status' => 'Read success!', 'readData' => $readData]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'Read error!', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("INSERT INTO pilota (az, nev, nem, szuldat, nemzet) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['az'],
                $data['nev'],
                $data['nem'],
                $data['szuldat'],
                $data['nemzet']
            ]);
            echo json_encode(['status' => 'Create success!', 'id' => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'Create error!', 'message' => $e->getMessage()]);
        }
        break;

    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("UPDATE pilota SET nev=?, nem=?, szuldat=?, nemzet=? WHERE az=?");
            $stmt->execute([
                $data['nev'],
                $data['nem'],
                $data['szuldat'],
                $data['nemzet'],
                $data['az']
            ]);
            echo json_encode(['status' => 'Update success!']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'Update error!', 'message' => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("DELETE FROM pilota WHERE az=?");
            $stmt->execute([$data['az']]);
            echo json_encode(['status' => 'Delete success!']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'Delete error!', 'message' => $e->getMessage()]);
        }
        break;
}
