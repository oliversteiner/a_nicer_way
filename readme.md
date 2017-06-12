 #### Frontend Engeniering
IMD St. Gallen 2017 

## Einzelarbeit
Oliver Steiner

DEMO: 
http://mollo.ch/a-nicer-way/


## Idee
Für die Präsentation meiner App "Nicer & Boss" brauche ich eine interaktive HTML-Seite, die anhand eines visualisierten 2-Tages-Ablaufes die Nutzung der App erklärt.

## Selbsteinschätzug
Ich will in den zwei Unterrichtstagen den grundsätzlichen Code für die Präsentations-Webseite erstellt haben.
Bei der Präsentation am 10. Juni soll die Webseite folgenden Stand haben:
 - Die Funktionalität ist ersichtlich
 - Die Keyfeatures sind implementiert
 
Keyfeatures:
 - Scrolling mit Parallax-Effect
 - Anzeige der aktuellen Timelinezeit und -Ort in der Statusleiste
 - Anzeige der aktuellen Timelineposition auf dem iPhone-Simulator  (für die spätere Verwendung als Steuerdaten in der App-Demo)

Nicht vollstädig ausgearbeit werden sein:
 - Grafiken
 - Daten (nur 3-4 Beispieldaten für eine nachvollziehbare Präsentation)

## Umfang und Funktionen der Webseite

### Elemente:
#### Hintergrund (Timeline)
  - Ein langer Scroll-Hintergrund mit einem dreifachen Paralax Effekt:
  1) vorne schnell
  2) mitte mitte
  3) hinten langsam
  
#### Eine Statusleiste
 - Anzeige von Tag / Nacht
 - Anzeige Datum und Zeit
 - Anzeige Ort
 - Anzeige Gemütszustand (optional)
    
#### Eine Navigation (ein / ausblendbar)
 - Springen zu bestimmten Abschnitten in der Timeline
    
#### iPhone Simulator
 - ein einblendbares iPhone, das mit dem Demo der Nicer-App gefüllt wird und seinen Inhalt je nach Ort in der Timeline seinen Zustand wechselt
 - Für die Präsentation am 10. ist noch nicht die App-Demo zu sehen, aber auf dem Screen des iPhones soll der aktuelle Status der Timeline erscheinen.

#### Remote-Kontrolle
 - eine weitere Idee ist es, die Präsentation über mein iPhone fernzusteuern. Dazu werde ich die Webseite über einen node.js server laufen lassen, den  ich per socket.io fernsteueren kann. 

## Ablauf der Erstellung
 - Daten und Content definieren und in Struktur bringen
 - Timeline-Abschnitte festlegen
 - Definition der Html-Elemente
 - Festlegen der Funktionen
 - Coden und testen
 - Grafiken erstellen (Wenn Zeit)
 
 ## Technisches
 - für ein zügiges Coden nutze ich **jQuery** und **Bootstrap**
 - Die Daten für die Timeline werde ich wohl als JSON definieren oder in einer CouchDB ablegen
 - Da dies kein Projekt ist, welches nach der Semesterarbeit weitergebraucht wird, werde ich zwar sauberen Code schreiben, aber nicht ein übertriebenes Engeniering betreiben. (Kein Atomic-Code, keine Unit-Tests, minimale Dokumentation)
 - Ich habe mich nach langem hin- und her nun doch entschieden, einen SASS / Typescript Weg zu gehen. Obwohl der Aufwand, eine entsprechende Umgebung aufzubauen einen halben Tag gebraucht hat, bin ich überzeugt damit schneller und sauberer ans Ziel zu kommen. 

## Dokumentation
 weitere Details sind im Dokument **documentation.md** zu finden.


 ## Installation
 - im Installationsverzeichnis  wechseln
  npm install
  gulp
 
 
 
 ## Copywright
 Das ist ein Schulprojekt, der Code steht zur freien Verfügung.
 Alle Bilder sind von mir, wenn sie weiterverwendet werden, bitte meinen Namen nennen und auf diese Seite verweisen.
 
 
<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.



## Erkentnisse

 Aus dem Programmieren dieses Projektes habe ich unter anderen folgende Lehren gezogen:
 - Funktionen auf die EventHandlers (z. B.: "click" ) angewant werden immer statisch verfügbar machen.
 - Globale variablen weiterhin vermeiden, aber nicht um allen Preis.
 - $().load geht auch in einer Klasse und können nachfolgend mit  $().ready verlinkt werden
 
 