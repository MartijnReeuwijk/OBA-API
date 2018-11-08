# OBA-API 📚

With this CLI app you can filter the data from the OBA api by Gerne, Author, Decenia, and amount of pages

- [OBA-API 📚](#oba-api---)
  * [Getting Started 🎬](#getting-started---)
  * [Prerequisites](#prerequisites)
  * [Installation 💾](#installation---)
  * [Running 🏃‍♂️](#running------)
  * [Built With 🛠️](#built-with----)
  * [Data struggles](#data-struggles)
    + [Issue's DirtyData 🛁](#issue-s-dirtydata---)
    + [Data Nesting 🐦](#data-nesting---)
    + [Data output exemple 📝](#data-output-exemple---)
  * [Research questions❓](#research-questions-)
    + [Hypothesis](#hypothesis)
    + [Research questions conclusion ❓](#research-questions-conclusion--)
  * [Visualization 👀](#visualization---)
    + [Concept drawing ✏️](#concept-drawing---)
  * [Other files](#other-files)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments and Thanks](#acknowledgments-and-thanks)

## Getting Started 🎬

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You will need the following things properly installed on your computer.

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/) (with npm)
-   [Google Chrome](https://google.com/chrome/)

## Installation 💾

-   `git@github.com:MartijnReeuwijk/functional-programming.git`
-   `cd functional-programming`
-   `npm install rijkvanzanten/node-oba-api`
-   `npm install`

## Running 🏃‍♂️

For now its just a CLI client app
Just run the "app" by using this line of code inside the correct folder

-   `Node app.js`

## Built With 🛠️

-   [OBA](https://www.oba.nl/) - OBA
-   [D3](https://d3js.org/) - D3
-   [Observablehq](https://beta.observablehq.com) - Observablehq Used to test D3 and make the visuals

## Data struggles

### Issue's DirtyData 🛁

The data we get from the OBA-api is "dirty" some keys have no values and sometimes the keys just don't exist.
I never really heard of this concept before, but i think i handeld it pretty well.
I started by rebuilding the code to my own objects so i could easy acesss them.
This is the part of code i learned the most from.

```
pages: (typeof data.description === "undefined" ||
typeof data.description['physical-description'] === "undefined") ?
"Geen pages" : parseInt(data.description['physical-description']['$t'].match(/\d+/g).map(Number), 10)
```

I made this piece of code since the Oba sometimes used Roman Numerals to express pages. This piece of code removes the Roman Numerals so only the regular number remain.

### Data Nesting 🐦

Another problem was that the data is deeply nested so you need to go way to deep until you can select the books / results.
I solved this problem by the use of separate function that return the book results
```
function core_json(results) {
let core_json = results.aquabrowser.results.result;
return core_json;
}
```

I kept the results in a let instead of a straight return so i could console.log it easily to look at the data structure.
This will keep the rest of the Code cleaner.

### Data output exemple 📝

The data output should look something like this
```
    {
      title: 'Bewijs het maar',
      author: 'Rudy Soetewey',
      publisher: 'Uitgeverij Kramat',
      genre: 'Thriller',
      releasedate: '2015',
      decennium: '',
      pages: 339,
      id: '|oba-catalogus|1130214',
      oba_url: 'https://www.oba.nl/home.html'
      }
```

## Research questions❓

### Hypothesis
    The Thriller genre was on its highest point in the 70ties and 80ties where Stephen king led the charge.
    _first Hypothesis: Thrillers are the most written genres_
    _second Hypothesis: Books about spying and the cold war are on there highest point is the 80ties_

-   Sub-questions
-    [ ] Did the success of Stephen king influence other writers to write more Horror and this is visible in the genre
-    [x] What is the most written genre
-    [x] What is the leased written genre
-    [x] Which book has the most pages per genre
-    [x] What is the comparison between the length of the books in the genres
-    [x] Which publisher is most "successful" this is measured by book releases
-    [x] Total amount of books


### Research questions conclusion ❓

1.   **Total amount of books**
      -  The Oba has 91868 unique books who have a general genre some (books might fall out)
2.  **Horror is not a genre in the OBA**
      -  So ill compare thriller and Avonture-roman books instead
3.   **What is the most written genre?**
      -  The most written genre is psychologisch-verhaal with 11331 books makes it about 13% of all books
4.   **What is the least written genre?**
      -  The least written genre is Indisch-milieu with 4 books makes it about 0.0043% of all books
5.   **Which publisher is most "successful" this is measured by book releases**
      -  There find are to many publishers to really give a good measurement on books
6.  **What is the comparison between the length of the books in the genres**
      -  What is imidetly noticed is that the Thrillers have fluction in there range of pages.
      -  Most of the Thriller books are between 250/325 pages and the Avonture-roman are more between 350 / 500 pages.
      -  It turns out thrillers are in general below average book length while Avonture-roman are slightly above.

    > A study of more than 2,500 books appearing on New York Times bestseller and notable books lists and Google’s annual survey of the most discussed books reveals that the average length has increased from 320 pages in 1999 to 400 pages in 2014. Theguardian




## Visualization 👀

For the visualization i ran into a Big data problem. The data i can get from the API limits me since it would crash if I would request more than 140 books. My App would filter all the data in the correct way. So for the Visualization I used less books that originally wanted.
- [Comparison chart](https://beta.observablehq.com/@martijnreeuwijk/merged-chart-between-detective-and-thriller)
- [Thriller genre visual](https://beta.observablehq.com/@martijnreeuwijk/chart-that-shows-the-amount-of-pages-used-in-the-triller-gern)
- [Detective genre visual](https://beta.observablehq.com/@martijnreeuwijk/chart-that-shows-the-amount-of-pages-used-in-the-detective-ge)
 - [Bigest Genres with amount of books](https://beta.observablehq.com/@martijnreeuwijk/gerne-pie-charts)

### Concept drawing ✏️
In the end I was not able to make the chart as I wanted as may of may not be visible but I would like to add the picture at the start of the chart so you can see the book. I was able to make something like this with Ember from my previous assignment

![Concept drawing](https://github.com/MartijnReeuwijk/functional-programming/tree/master/assets/foto.png)

## Other files
This is the original Research plan you are able to read it in at your own leisure
- [Research plan](https://github.com/MartijnReeuwijk/functional-programming/tree/master/Research_plan.md)
- [Step by step what i did every day](https://github.com/MartijnReeuwijk/functional-programming/tree/master/proces.md)


## Authors

-   **Martijn Reeuwijk** - _Initial work_ - [MartijnReeuwijk](https://github.com/MartijnReeuwijk)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments and Thanks

-   Tech-treck squad
-   Thanks to [Jsonformatter](https://jsonformatter.curiousconcept.com/) by helping me better understand the data structure.
- The Guardian [are books getting longer?](https://www.theguardian.com/books/2015/dec/10/are-books-getting-longer-survey-marlon-james-hanya-yanagihara)
