function getFilmData(tit, orTitle, lang, voto) {
  var film = {
    title: tit,
    originalTitle: orTitle,
    language: lang,
    vote: voto
  }

  return film;
}

function getFilms() {
  var searchedFilm = $("#search-bar").val();

  var outData = {
    api_key: "2b352ef135f4227af9390b0e5a73bdc2",
    language: "it-IT",
    query: searchedFilm
  }
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,
    success: function(inData) {

      for (var i = 0; i < inData.results.length; i++) {
        var film = inData.results[i];

        var filmData = getFilmData(film.title, film.original_title, film.original_language, film.vote_average);

        var source = $("#film-template").html();
        var compiled = Handlebars.compile(source);
        var finalHtml = compiled(filmData);

        $(".films").append(finalHtml);
      }
    },
    error: function (request, state, error) {
      console.log("request " + request);
      console.log("state " + state);
      console.log("error " + error);
    }
  })
}

function init() {
  $("#search-btn").click(getFilms)
}

$(init);

//
// var source = $("#entry-template").html();
// var compiled = Handlebars.compile(source);
// var finalHtml = compiled(data);
