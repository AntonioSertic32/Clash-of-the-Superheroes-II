// Deklariranje klase Game
class Game {
  heroes = [];

  polufinale = [];
  finale = [];
  winner = [];

  keys = ["intelligence", "strength", "speed", "durability", "power", "combat"];

  // Funkcija koja izvrsava borbe heroja
  Match(first, second) {
    var prvi_heroj = 0;
    var drugi_heroj = 0;
    var kraj = false;

    while (kraj != true) {
      var prvi_random_broj = this.keys.length * Math.random();
      var drugi_random_broj = this.keys.length * Math.random();

      var prvo_svojstvo = this.keys[prvi_random_broj << 0];
      var drugo_svojstvo = this.keys[drugi_random_broj << 0];

      var vrijednost_prvog =
        parseInt(first[prvo_svojstvo]) + parseInt(first[drugo_svojstvo]);
      var vrijednost_drugog =
        parseInt(second[prvo_svojstvo]) + parseInt(second[drugo_svojstvo]);

      if (vrijednost_prvog > vrijednost_drugog) {
        prvi_heroj++;

        if (prvi_heroj == 2) {
          kraj = true;

          console.log(
            "%c" +
              first.name +
              "%c - %c" +
              second.name +
              " %c" +
              prvi_heroj +
              " - " +
              drugi_heroj,
            "color: green",
            "color: white",
            "color: red",
            "color: white"
          );

          return first;
        }
      } else if (vrijednost_prvog < vrijednost_drugog) {
        drugi_heroj++;

        if (drugi_heroj == 2) {
          kraj = true;
          console.log(
            "%c" +
              first.name +
              "%c - %c" +
              second.name +
              " %c" +
              prvi_heroj +
              " - " +
              drugi_heroj,
            "color: red",
            "color: white",
            "color: green",
            "color: white"
          );

          return second;
        }
      }
    }
  }

  // Cetvrtfinale
  Quarterfinal() {
    console.log("********** Četvrtfinale **********");
    for (var i = 0; i < 8; i += 2) {
      // Ovdje bi se trebala pozivati Match funkcija u kojou bi se slala dva heroja i odigrala jedna borba i pozivala bi se dok jedan ne bi dosao do 2..
      // Te bi se nakon svakog Matcha mogli azurirati rezilatti u tablici
      this.polufinale.push(this.Match(this.heroes[i], this.heroes[i + 1]));
    }
  }

  // Polufinale
  Semifinal() {
    console.log("********** Polufinale **********");
    for (var i = 0; i < 4; i += 2) {
      this.finale.push(this.Match(this.polufinale[i], this.polufinale[i + 1]));
    }
  }

  // Finale
  Finale() {
    console.log("********** Finale **********");
    for (var i = 0; i < 2; i += 2) {
      this.winner.push(this.Match(this.finale[i], this.finale[i + 1]));
    }
  }
}
