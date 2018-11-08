// removed the Wrappper due to a problem
const OBA = require('oba-api');

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: '1e19898c87464e239192c8bfe422f280'
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)
// Client returns a promise which resolves the APIs output in JSON
// Example search to the word 'rijk' sorted by title:

client.get('search', {
    q: "format:book",
    sort: 'title',
    facet: ['genre(Detective )', 'type(book)'],
    refine: true,
    librarian: true,
    page: 3
  })

  .then(results => JSON.parse(results))
  .then(results => {
    client.get('refine', {
        rctx: "AWNkYOZmYGcwzDfMKiouLTY1TKooNUrLLkzNLEysKMnIZGZk4MxNzMxjYGYQT8svyk0ssUrKz8@mBBGMzNKZ8UWpycUFqUUFiemprEYGTAwPzjHeKr9VznSvj4lR40gGIwMDe35SIgMDg6J$UX5$iX5OZmFpZoo$UIy9tCiHgTUvhxEA",
        count: 100
      })
      .then(response => JSON.parse(response))
      .then(response => {

        let metadata = response.aquabrowser.facets.facet
        let genre_object = []
// boi al die verschillende opties
        let genreCounts = metadata.find(item => item.id == "Genre").value
        genreCounts = genreCounts.map(genre => {
          return {
            count: genre.count,
            genre: genre.id
          }
        })
        // console.log(genreCounts);

        //  metadata.forEach(type => {
        //   if (type.id === "Genre") {
        //     genre_object.push({
        //       genre: type.value
        //     })
        //   }
        //   return genre_object
        // })


        // console.log(genreCounts);

      })

    let raw_data = raw_json(results);
    let core_data = core_json(results);
    let auteurs = get_auteurs(core_data);
    let book_object = create_book_obj(core_data);

    // do Something with filterd data
    // I did this ceperate

    let add_a_decennium = add_decennium(book_object);

    // Filter functions

    let filter_by_decennium = filter_decennium(add_a_decennium);
    let filter_by_genre = filter_genre(add_a_decennium);
    let filter_by_author = filter_author(add_a_decennium);

    // get / visual funtions
    // Is this to much chaining?
    // werkt wel maar anders opgelost

    // let count_by_author = count_author(filter_by_author);
    // let genre_pagenum_comparing = comparing(book_object);

  })
  .catch(err => console.log(err)) // Something went wrong in the request to the API

// these functions are no longer needed
// but ill keepem just in case stuff changes
function raw_json(results) {
  // console.log(results);
}

function core_json(results) {
  let core_json = results.aquabrowser.results.result;
  return core_json;
}


// real stuff starts here
function get_auteurs(data) {
  let all_authors = data.map(data => data.authors)
  // console.log(all_authors)
  return all_authors
}

function create_book_obj(data) {
  let boek = []
  data.forEach(data => {
    boek.push({
      title: (typeof data.titles['short-title'] === "undefined") ?
        "Geen title" : data.titles['short-title']['$t'],

      author: (typeof data.authors === "undefined" ||
          typeof data.authors['main-author']['search-term'] === "undefined") ?
        "Geen author" : data.authors['main-author']['search-term'],

      publisher: (typeof data.publication === "undefined" ||
          typeof data.publication.publishers === "undefined" ||
          typeof data.publication.publishers.publisher['search-term'] === "undefined") ?
        "Geen uitgever" : data.publication.publishers.publisher['search-term'],

      genre: (typeof data.genres === "undefined" || typeof data.genres.genre === "undefined") ?
        "Geen genre" : data.genres.genre['search-term'],

      releasedate: (typeof data.publication === "undefined" ||
          typeof data.publication.year['search-term'] === "undefined") ?
        "Geen releasedate" : data.publication.year['search-term'],

      decennium: "",

      pages: (typeof data.description === "undefined" ||
          typeof data.description['physical-description'] === "undefined") ?
        // parseint maakt er een number van en gooit al het on nodige weg
        // deze reguliere expressie zorgt er voor dat hij niet stuk gaat op romeinse cijferss
        // .match(/\d+/g).map(Number);
        "Geen pages" : parseInt(data.description['physical-description']['$t'].match(/\d+/g).map(Number), 10),

      id: (typeof data.id['$t'] === "undefined" ||
          typeof data.id === "undefined") ?
        "Ik heb geen id" : data.id['$t'],

      oba_url: (typeof data.frabl['detail-page'] === "undefined" ||
          typeof data.frabl === "undefined") ?
        "https://www.oba.nl/home.html" : data.frabl[0]['detail-page']
        // ,
// Not used and brings an issue i dont have time to solve now
      // cover: (typeof data.coverimages === "undefined" ||
      //     typeof data.coverimages.coverimage === "undefined") ? // Cover is een array die ik nog moet mappen
      //   "http://www.placecage.com/c/100/200" : data.coverimages.coverimage[0]["$t"]

    })

  })
  console.log(boek);

  return boek
}

function add_decennium(boeken) {
  // boeken.forEach(boek => {
  //   boek.decennium = boek.releasedate.charAt(2) + "0s";
  // })
  boeken = boeken.map(boek => {
    boek.decennium = boek.releasedate.charAt(2) + "0s";
    return boek
  })
  return boeken
}

function filter_decennium(boeken) {
  boeken.forEach(boek => {
    if (boeken[boek.decennium]) {
      boeken[boek.decennium].push(boek)
    } else {
      boeken[boek.decennium] = [boek]
    }
  })
  // console.log(boeken);
  // console.log(boeken["10s"].length);
  return boeken

}

function filter_genre(boeken) {
  boeken.forEach(boek => {
    if (boeken[boek.genre]) {
      boeken[boek.genre].push(boek)
    } else {
      boeken[boek.genre] = [boek]
    }
  })
  // console.log(boeken["Thriller"].length);
  // console.log(boeken);
  return boeken

}

function filter_author(boeken) {
  boeken.forEach(boek => {
    if (boeken[boek.author]) {
      boeken[boek.author].push(boek)
    } else {
      boeken[boek.author] = [boek]
    }
  })
  // console.log(boeken);
  // console.log(boeken);
  return boeken

}

function count_author(author) {
  // console.log(author);
  //   console.log(author.map(a => a.author));

}
