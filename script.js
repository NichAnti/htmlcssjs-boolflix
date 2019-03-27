function getFilmData(url, tit, orTitle, lang, voto) {

  voto = Math.ceil(voto / 2)

  var film = {

    img_url: "https://image.tmdb.org/t/p/w185/" + url,
    title: tit,
    originalTitle: orTitle,
    language: lang,
    vote: voto
  }

  return film;
}

function getFilmData(url, tit, orTitle, lang, voto) {

  voto = Math.ceil(voto / 2)

  var tv = {

    img_url: "https://image.tmdb.org/t/p/w185/" + url,
    title: tit,
    originalTitle: orTitle,
    language: lang,
    vote: voto
  }

  return tv;
}

function getTvs() {

  var searchedTv = $("#search-bar").val();

  var outData = {

    api_key: "2b352ef135f4227af9390b0e5a73bdc2",
    language: "it-IT",
    query: searchedTv
  }

  $.ajax({

    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: outData,
    success: function(inData) {

      $(".tvs").empty();

      for (var i = 0; i < inData.results.length; i++) {

        var tv = inData.results[i];

        var tvData = getFilmData(tv.backdrop_path, tv.name, tv.original_name, tv.original_language, tv.vote_average);

        var source = $("#tv-template").html();
        var compiled = Handlebars.compile(source);
        var finalHtml = compiled(tvData);

        $(".tvs").append(finalHtml);

        for(var j = 0; j < tvData.vote; j++) {

          $(".tv").eq(i).find(".fa-star").eq(j).removeClass("far").addClass("fas");
        }
      }
    },

    error: function (request, state, error) {

      console.log("request " + request);
      console.log("state " + state);
      console.log("error " + error);
    }
  })
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

      $(".films").empty();

      for (var i = 0; i < inData.results.length; i++) {

        var film = inData.results[i];

        var filmData = getFilmData(film.backdrop_path, film.title, film.original_title, film.original_language, film.vote_average);

        var source = $("#film-template").html();
        var compiled = Handlebars.compile(source);
        var finalHtml = compiled(filmData);

        $(".films").append(finalHtml);

        for(var j = 0; j < filmData.vote; j++) {

          $(".film").eq(i).find(".fa-star").eq(j).removeClass("far").addClass("fas");
        }
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

  $("#search-btn").click(function() {

    getFilms();
    getTvs();
    });

  $("#search-bar").keyup(function(event) {

    if(event.which == 13) {

      getFilms();
      getTvs();
    }
  });

}

$(init);

//
// var source = $("#entry-template").html();
// var compiled = Handlebars.compile(source);
// var finalHtml = compiled(data);
