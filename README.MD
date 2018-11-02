# Leerproces

## Stappen plan

 Load de data uit de OBA-API

## TODO list

- [x] Welke data ga ik gebruiken?
- [x] Wat ga ik vergelijken?
    \- Genre - Jaar
    \- Genre - Page
    \- Land uitgaven - Jaar
    \- Formaat - Aantalpages - Genre

## Problemen

-   Juiste data filteren
    `JSON.parse(results).aquabrowser.results.result.forEach(function(e){
        console.log(e['search-term'])`
        Krijg undefined terug

        `console.log(e.formats.format['search-term'])`
        De juiste selects zitten dieper dan je meteen inziet.

## Early concepten

-   Boekenstapen vergelijken
-   Boekenstapen vergelijken

# Week 1

## Dag 1

De kickof we maken een project voor de OBA waarbij we een API hebben gekregen. Daar gaan we data van de OBA uithalen en zo een verhaal te vertellen.

De api konden we makelijk fixen met een NPM package

## Dag 2

We moeten een aantal vragen bedenken hoe we over wat we kunnen laten zien met de infomatie die we hebben.
Hier onder de vragen.
- \[] Zijn er door het success van Steven King meer horror boeken verchenen? om dit teemuleren.
- \[] Wat is het overall meest geschreven genres.
- \[] Wat is het minst geschreven genre.
- \[] Wat is het dikste boek per decenia.
- \[] Welke uitgever is het meest succesvolle per decenia.

Verder heb ik met een array gewerkt om de data goed te laten zien ik heb de data gescheiden op basis van boek.

## Dag 3

Vandaag ga ik proberen de data goed op teslaan in een array zo dat ik deze buiten de functie kan manipuleren.
Antwoord van Titus: Je kan .Then chainen of functies in de .Then aanroepen en dan dat, zo ga ik dit doen.
Laurens Data-verkennen les:

-   Browser plugin voor JSON
-   console.table
-   Object.keys(data) Keys kan je op zoeken
-   Verbeter mijn staps gewijs denken ik zie veel voorbeelden die ik easy zelf kan maken, maar vindt het lastig omdit tebedeken.
-   Maak functie die elke onderwerp telt
-   Javascript Set voor uniqe values
-   Accumilators
-   ... Spread operators zet alles uit over een array.
-   Includes("iets").
-   Groep zelfde als mijn if-loop van frameworks
    Alles onderdelen los snap ik wel maar is erg lastig om dit zelf tebedenken zonder een voorbeeld.

Titus onderdeel:

-   Chain .then gaat per mutatie
-   Titus is Max verstappen want hij gaat snel
-   Info uit zn presentatie is wel nuttig voor later

Todo: Halloween.
- [X] clean data
- [X] get all auteurs

## Dag 4

-   Marathon lopen
    Veel proberen om de juiste data naar een object te sturen.
-    [x] probleem oplossen.
    Ik moest een .value er afhalen om het te laten werken.

-   Het fixen van een .map (https://stackoverflow.com/questions/30803168/data-map-is-not-a-function)
-    [x] Fixed

-   Maak object per book/result zo dat ik daar op kan sorteren.
-    [x] Objecten maken.
-    [x] Genre fixen

-   Hoe ga ik vergelijken van decenia, pak een na laatste nummer 19 *8* 0 zo zie ik in welk decenia het boek uit kwam en kan ik daar op vergelijken als deze met elkaar een komen.
(boeken uit de vorige eeuw moet nog een check over)

## Dag 5
- [x] Boeken object met genres
- [x] Filter op alleen Boeken
- [] Maak filter per decenia
- [] Maak teller van genre 
