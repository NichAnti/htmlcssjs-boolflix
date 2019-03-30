function getLanUrl(lang) {

  var flagUrl = "";

  switch (lang) {
    case "en":
      flagUrl = "img/inglese.jpeg"
      break;
    case "es":
      flagUrl = "img/spagnolo.svg"
      break;
    case "fr":
      flagUrl = "img/francia.png"
      break;
    default:
      flagUrl = "img/Jolly-roger.svg"
      break;
  }

  return flagUrl;
}

function getImgUrl(url) {

  if(url == null)
  {
    return "img/defaultImg.png";
  }
  else {

    return "https://image.tmdb.org/t/p/w342" + url;
  }
}

function getFilmData(idid, url, tit, orTitle, lang, voto) {

  voto = Math.ceil(voto / 2)

  var film = {

    img_url: getImgUrl(url),
    title: tit,
    originalTitle: orTitle,
    language: lang,
    lan_url: getLanUrl(lang),
    vote: voto,
    id: idid
  }

  return film;
}

function getTvData(idid, url, tit, orTitle, lang, voto) {

  voto = Math.ceil(voto / 2)

  var tv = {

    img_url: getImgUrl(url),
    title: tit,
    originalTitle: orTitle,
    language: lang,
    lan_url: getLanUrl(lang),
    vote: voto,
    id: idid
  }

  return tv;
}

function addCast(movie_id) {

  var cast = "";

  var outData = {

    api_key: "2b352ef135f4227af9390b0e5a73bdc2"

  }

  $.ajax({

    url: "https://api.themoviedb.org/3/movie/" + movie_id + "/credits",
    method: "GET",
    data: outData,
    success: function(inData) {

      if(inData.cast.length > 5) {

        for (var i = 0; i < 5; i++) {

          if (i < 4) {

            cast += (inData.cast[i].name + ", ");
          }
          else {

            cast += (inData.cast[i].name + "...");
          }
        }
      }
      else {

        for (var i = 0; i < inData.cast.length; i++) {


          if (i < (inData.cast.length - 1)) {

            cast += (inData.cast[i].name + ", ");
          }
          else {

            cast += (inData.cast[i].name);
          }
        }
      }

      $("[data-id = " + movie_id + "]").find(".info").append("<span>" + cast + "</span>");
    },

    error: function (request, state, error) {
      console.log("request " + request);
      console.log("state " + state);
      console.log("error " + error);
    }
  })
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

      if(inData.results.length > 0) {

        $(".tv-title-section").show();
        $(".tvs").empty();

        for (var i = 0; i < inData.results.length; i++) {

          var tv = inData.results[i];

          var tvData = getTvData(tv.id, tv.poster_path, tv.name, tv.original_name, tv.original_language, tv.vote_average);

          var source = $("#tv-template").html();
          var compiled = Handlebars.compile(source);
          var finalHtml = compiled(tvData);

          $(".tvs").append(finalHtml);

          for(var j = 0; j < tvData.vote; j++) {

            $(".tv").eq(i).find(".fa-star").eq(j).removeClass("far").addClass("fas");
          }

          addCast(tv.id);

        }
      }
      else {
        $(".tv-title-section").hide();
        $(".tvs").empty();
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

      if(inData.results.length > 0) {

        $(".film-title-section").show();
        $(".films").empty();

        for (var i = 0; i < inData.results.length; i++) {

          var film = inData.results[i];

          var filmData = getFilmData(film.id, film.poster_path, film.title, film.original_title, film.original_language, film.vote_average);

          var source = $("#film-template").html();
          var compiled = Handlebars.compile(source);
          var finalHtml = compiled(filmData);

          $(".films").append(finalHtml);

          for(var j = 0; j < filmData.vote; j++) {

            $(".film").eq(i).find(".fa-star").eq(j).removeClass("far").addClass("fas");
          }

          addCast(film.id);
        }
      }
      else {
        $(".film-title-section").hide();
        $(".films").empty();
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
