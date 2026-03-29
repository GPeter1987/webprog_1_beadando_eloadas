<?php
$config = json_decode(file_get_contents(__DIR__ . '/../../db/config.json'), true);

try {
    $pdo = new PDO(
        "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset=UTF8",
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
} catch (PDOException $e) {
    die(json_encode(['status' => 'Database connection failed', 'message' => $e->getMessage()]));
}
