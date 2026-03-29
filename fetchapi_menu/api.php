<?php

header("Content-Type: application/json");

require "db.php";

$method = $_SERVER["REQUEST_METHOD"];
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) {

    case "GET":
        $stmt = $pdo->query("SELECT * FROM eredmeny ORDER BY id DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case "POST":
        $stmt = $pdo->prepare("
            INSERT INTO eredmeny 
            (datum, pilotaaz, helyezes, hiba, csapat, tipus, motor)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $input["datum"],
            $input["pilotaaz"],
            $input["helyezes"],
            $input["hiba"],
            $input["csapat"],
            $input["tipus"],
            $input["motor"]
        ]);
        echo json_encode(["msg" => "ok"]);
        break;

    case "PUT":
        $stmt = $pdo->prepare("
            UPDATE eredmeny 
            SET datum=?, pilotaaz=?, helyezes=?, hiba=?, csapat=?, tipus=?, motor=?
            WHERE id=?
        ");
        $stmt->execute([
            $input["datum"],
            $input["pilotaaz"],
            $input["helyezes"],
            $input["hiba"],
            $input["csapat"],
            $input["tipus"],
            $input["motor"],
            $input["id"]
        ]);
        echo json_encode(["msg" => "updated"]);
        break;

    case "DELETE":
        $stmt = $pdo->prepare("DELETE FROM eredmeny WHERE id=?");
        $stmt->execute([$input["id"]]);
        echo json_encode(["msg" => "deleted"]);
        break;
}