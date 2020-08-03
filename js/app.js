// Kreiranje objekta Game
var game = new Game();

// Dohvaca 10 jedinstvenih heroja
var id_array = [];
var i = 0;
while (i < 10) {
  var id = Math.floor(Math.random() * 732);
  if (jQuery.inArray(id, id_array) === -1) {
    id_array.push(id);
    CheckIn(id);
    i++;
  }
}

// Funkcija koja dohvaca heroje sa api-ja preko id-a
function CheckIn(id) {
  fetch("https://superheroapi.com/api/1495869663918880/" + id)
    .then((res) => res.json())
    .then((data) => {
      game.heroes.push(new Hero(data.name, data.powerstats, data.image));
    })
    .catch((error) => console.log("ERROR"));
}

// Manipulacija slajderom i thumbnail-ima
$(".prev").prop("disabled", true);
$(".prev").css({ "background-color": "initial", cursor: "default" });

setTimeout(() => {
  console.log(game.heroes);
  var brojac = 0;
  $("#thumbnail > a > .hero_icon").each(function () {
    $(this).attr("src", game.heroes[brojac].image);
    brojac++;
  });
  brojac = 0;
  $(".hero-container > img").each(function () {
    $(this).attr("src", game.heroes[brojac].image);
    brojac++;
  });
  $("#slider_hero_name").html(game.heroes[0].name);
}, 2000);

// Funkcionalnost odabira heroja
var trenutni_heroj = 0;

function Slajder(vrijednost) {
  trenutni_heroj++;
  var trenutni_heroj_class = ".hero-" + trenutni_heroj;
  $(trenutni_heroj_class).animate({ height: 0 }, 400);
  trenutni_heroj--;

  if (vrijednost == "prev") {
    trenutni_heroj--;
  } else if (vrijednost == "next") {
    trenutni_heroj++;
  } else if (vrijednost == "rand") {
    trenutni_heroj = Math.floor(Math.random() * 10);
    // napravit da ne moze bit trenutni heroj
  } else {
    trenutni_heroj = vrijednost;
  }

  var sljedeci_heroj_class = ".hero-" + ++trenutni_heroj;
  $(sljedeci_heroj_class).animate({ height: 320 }, 400);
  $("#slider_hero_name").html(game.heroes[--trenutni_heroj].name);

  if (trenutni_heroj == 0) {
    $(".prev").prop("disabled", true);
    $(".prev").css({ "background-color": "initial", cursor: "default" });
  } else {
    $(".prev").prop("disabled", false);
    $(".prev").css({ "background-color": "#003DA7", cursor: "pointer" });
  }

  if (trenutni_heroj == 9) {
    $(".next").prop("disabled", true);
    $(".next").css({ "background-color": "initial", cursor: "default" });
  } else {
    $(".next").prop("disabled", false);
    $(".next").css({ "background-color": "#003DA7", cursor: "pointer" });
  }

  $(".inFocus").removeClass("inFocus");
  var thumbnail = "#thumbnail a:nth-child(" + (trenutni_heroj + 1) + ") img";
  $(thumbnail).addClass("inFocus");
}

// Pocetak turnira

function Turnir() {
  $(".main-container").css("display", "none");
  $(".turnir-container").css("display", "grid");
  $(".pokreni").css("display", "none");

  Remove_two_heroes();
  $.when(Remove_two_heroes).done(() => {
    var brojac = 0;
    $(".cetvrtfinale").each(function () {
      $(this).attr("src", game.heroes[brojac].image);
      brojac++;
    });

    var timer = setInterval(() => {
      game.Quarterfinal();

      var brojac = 0;
      $(".quarterfinal").each(function () {
        $(this).html(game.results[brojac] + ":" + game.results[brojac + 1]);
        brojac += 2;
      });

      if (game.quarterfinalOver == true) {
        PokreniPolufinale();
        clearInterval(timer);
      }
    }, 2000);
  });
}

function PokreniPolufinale() {
  brojac = 0;
  $(".polufinale").each(function () {
    $(this).attr("src", game.polufinale[brojac].image);
    brojac++;
  });

  game.results = [0, 0, 0, 0];
  var timer = setInterval(() => {
    game.Semifinal();

    brojac = 0;
    $(".semifinal").each(function () {
      $(this).html(game.results[brojac] + ":" + game.results[brojac + 1]);
      brojac += 2;
    });

    if (game.semifinalOver == true) {
      PokreniFinale();
      clearInterval(timer);
    }
  }, 2000);
}

function PokreniFinale() {
  var brojac = 0;
  $(".finale").each(function () {
    $(this).attr("src", game.finale[brojac].image);
    brojac++;
  });

  game.results = [0, 0];
  var timer = setInterval(() => {
    game.Finale();

    $(".final").each(function () {
      $(this).html(game.results[0] + ":" + game.results[1]);
    });

    if (game.finalOver == true) {
      $(".pobjednik").attr("src", game.winner[0].image);
      clearInterval(timer);
    }
  }, 2000);
}

function Remove_two_heroes() {
  var trueFalse = 0;
  while (trueFalse < 2) {
    var random_heroj = Math.floor(Math.random() * game.heroes.length);
    if (random_heroj != trenutni_heroj) {
      game.heroes.splice(random_heroj, 1);
      trueFalse++;
    }
  }
}
// TO DO:
// - Ako bude vise od 5 nerješenih random pobjednik
// - Ak ne dohvati sliku..
// ...
