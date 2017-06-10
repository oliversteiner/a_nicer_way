# Dokumentation

Die Aufgabenstellung und Motivation sind im File "readme.md" zu finden

### Development-Umgebung:
    - mac OSX
    - Phpstorm
    - MAMP
    - iTerm

### Dateistruktur:

    nicer-way
        |
        |– daten/ (für Originalbilder, Texte, und Informationen zum Projekt)        
        |- src/ (die TypeScript- und SCSS-Dateien )
        |- node_modules/ (npm-Verwaltungsordner)
        |
        |- web/ (die funktionierende Webseite mit den generierten Files)
            |
            |- libraries/ (dritt-hersteller )
        
       

## Vorbereitungen

### Install Gulp
https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

### Install Gulp Typescript 
https://www.typescriptlang.org/docs/handbook/gulp.html

### Install Sass
https://www.npmjs.com/package/gulp-sass

### Install Utilities
(npm install)
- gulp-sourcemaps
- gulp-autoprefixer
- gulp-debug
- gulp-cssnano
- merge2

#### für die Kombination Typescript / jQuery
- @types/node
- @types/jquery
- @types/jqueryui

#### für die Datenbank
- pouchdb
@types/pouchdb


#### für die Remote-Kontrolle
- expressjs
- socket.io



### set up app
- gulp init
- write gulpfile.js
- add to git 

### Libraries installieren
- jquery
- bootstrap
- jquery parallax
- jquery gridhelper

- scrollTo (serialScroll)
  http://demos.flesler.com/jquery/serialScroll/
- stellar.js
  http://markdalgleish.com/projects/stellar.js/

## Time-Way Daten
- TimeWayId
- Time
- Date
- Place
- Feeling
- Message
- Notic


## Ablauf
- alle Files (noch ohne Inhalt) erstellt.
- index.html mit allen files verlinkt.
- index.html mit SCSS und Typescript gestestet.
- Alle Controller erstellt und getestet
- Pouchdb installiert, Form gebaut, mit Musterdaten gefüllt



