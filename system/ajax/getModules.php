<?php
// übernommen aus dem 3. Semester HS 2020 von
// «finale_Version_ausfuehrlich_kommentiert»
// Speichert auf Zeilen 19-22 JSON als Datei, dieses wird geladen als Datenquelle
// gibt aber keine Daten zurück (Zeile 25)

// data.php laden (für DB-Verbindung)
require_once('../data.php');

$db = dbVerbindungErzeugen(); // in data.php
// SQL-Variable als String zusammenstellen
$sql = "SELECT * FROM modules;";
// SQL-Variable an Datenbank schicken und Ergebnist in Variable $resultat speichern
$resultat = $db->query($sql);
// Alle Datensätze aus $resultat in ein assoziatives Array umwandeln
// und in $resultatArray speichern
$resultatArray = $resultat->fetchAll();

// Inhalt des Arrays als JSON ausgeben
//echo json_encode($resultatArray);

// Datei auf Festplatte speichern
/*
$dieDatei = fopen("allePokemon.json","w");
fwrite ($dieDatei,json_encode($resultatArray));
fclose($dieDatei);
*/

// Meldung zurückgeben
echo "Datenbank abgechlossen";
?>
