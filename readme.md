 #### Frontend Engeniering
IMD St. Gallen 2017 

## Einzelarbeit
Oliver Steiner

DEMO: 
http://mollo.ch/a-nicer-way/
Die Demoseite 2x laden, damit die Datenbank gefüllt wird!


## Idee
Für die Präsentation meiner App "Nicer & Boss" brauche ich eine interaktive HTML-Seite, die anhand eines visualisierten 2-Tages-Ablaufes die Nutzung der App erklärt.


Keyfeatures:
 - Scrolling mit Parallax-Effect
 - Anzeige der aktuellen Timelinezeit und -Ort in der Statusleiste
 - Anzeige der aktuellen Timelineposition auf dem iPhone-Simulator  (für die spätere Verwendung als Steuerdaten in der App-Demo)


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
- Wenn die Webseite über einen node.js Server läuft, kann die Präsentation über ein seperates Smartphone gesteuert werden.


 
 ## Technisches
 - viel **jQuery** und **Bootstrap**
 - Daten werden als JSON-Objekte gespeichert. Kann dank PouchDB in einer CouchDB gespeichert werden.
 - SASS
 - Typescript

## Dokumentation
 weitere Details sind im Dokument **documentation.md** zu finden.


 ## Installation
 - Downloaden
 - ins Installationsverzeichnis  wechseln
  npm install
  gulp
  node app.js
  im Browser: "localhost:3000";
  
 
 ## Copyright
 Das ist ein Schulprojekt, der Code steht zur freien Verfügung.
 Alle Bilder sind von mir, wenn sie weiterverwendet werden, bitte meinen Namen nennen und auf diese Seite verweisen.
 
<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
<img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a>
<br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.


## Quellen
Piktogramme: https://thenounproject.com/
 - Smartphone: https://thenounproject.com/search/?q=iphone%206&i=660535
