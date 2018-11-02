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
    q: 'rijk',
    sort: 'title',
    facet: ['genre(thriller)','type(book)'],
    refine: true,
    librarian: true,
    page: 1
  })

  .then(results => JSON.parse(results))
  .then(results => {
    // filter data
    let raw_data = raw_json(results);
    let core_data = core_json(results);
    let auteurs = get_auteurs(core_data);
    let book_object = create_book_obj(core_data);

    // do Something with filterd data
    let add_a_decennium = add_decennium(book_object);
    let filter_by_decennium = filter_decennium(add_a_decennium);
    // hier kan j ealtij nog combi
    let filter_by_gerne = filter_gerne(boeken);
    // let genre_pagenum_comparing = comparing(book_object);

  })
  .catch(err => console.log(err)) // Something went wrong in the request to the API

function raw_json(results) {
  // console.log(results);
}

function core_json(results) {
  let core_json = results.aquabrowser.results.result;
  // console.log(core_json);
  return core_json;
}

function get_auteurs(data) {
  let all_authors = data.map(data => data.authors)
  // console.log(all_authors)
  return all_authors
}

function create_book_obj(data) {
  let boek = []
  data.forEach(data => {
    // console.log(data);
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
        "Geen pages" : data.description['physical-description']['$t'],

      id: (typeof data.id['$t'] === "undefined" ||
          typeof data.id === "undefined") ?
        "Ik heb geen id" : data.id['$t']
    })
  })
  // console.log(boek);
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

function filter_decennium(boeken){
  boeken.forEach(boek => {
    if (boeken[boek.decennium]) {
      boeken[boek.decennium].push(boek)
    } else {
      boeken[boek.decennium] = [boek]
    }
  })
  // console.log(boeken["10s"].length);
}

function filter_gerne(boeken){
  boeken.forEach(boek => {
    if (boeken[boek.gerne]) {
      boeken[boek.gerne].push(boek)
    } else {
      boeken[boek.gerne] = [boek]
    }
  })
  console.log(boeken["thriller"].length);
}
