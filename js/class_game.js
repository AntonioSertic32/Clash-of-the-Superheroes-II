// Deklariranje klase Game
class Game {
  heroes = [];
  results = [0, 0, 0, 0, 0, 0, 0, 0];

  polufinale = [0, 0, 0, 0];
  finale = [0, 0];
  winner = [];

  quarterfinalOver = false;
  semifinalOver = false;
  finalOver = false;

  izgubljeniCetvrtfinalisti = [];

  keys = ["intelligence", "strength", "speed", "durability", "power", "combat"];

  // Funkcija koja izvrsava borbe heroja
  Match(first, second) {
    var prvi_heroj = 0;
    var drugi_heroj = 0;

    var kraj = false;

    while (kraj == false) {
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
        kraj = true;
        return 1;
      } else if (vrijednost_prvog < vrijednost_drugog) {
        drugi_heroj++;
        kraj = true;
        return 2;
      }
    }
  }

  // Cetvrtfinale
  Quarterfinal() {
    var brojac = 0;
    for (var i = 0; i < 8; i += 2) {
      if (this.heroes[i] != 0) {
        var rezultat = this.Match(this.heroes[i], this.heroes[i + 1]);

        if (rezultat == 1) {
          this.results[i]++;
          if (this.results[i] == 2) {
            this.polufinale[Math.round((i + 1) / 2 - 1)] = this.heroes[i];
            this.izgubljeniCetvrtfinalisti.push(this.heroes[i + 1]);
            this.heroes[i] = 0;
            this.heroes[i + 1] = 0;
          }
        } else {
          this.results[i + 1]++;
          if (this.results[i + 1] == 2) {
            this.polufinale[Math.round((i + 2) / 2 - 1)] = this.heroes[i + 1];
            this.izgubljeniCetvrtfinalisti.push(this.heroes[i]);
            this.heroes[i] = 0;
            this.heroes[i + 1] = 0;
          }
        }
      } else {
        brojac++;
        if (brojac == 4) {
          this.quarterfinalOver = true;
        }
      }
    }
  }

  // Polufinale
  Semifinal() {
    var brojac = 0;
    for (var i = 0; i < 4; i += 2) {
      if (this.polufinale[i] != 0) {
        var rezultat = this.Match(this.polufinale[i], this.polufinale[i + 1]);

        if (rezultat == 1) {
          this.results[i]++;
          if (this.results[i] == 2) {
            this.finale[Math.round((i + 1) / 2 - 1)] = this.polufinale[i];
            this.polufinale[i] = 0;
            this.polufinale[i + 1] = 0;
          }
        } else {
          this.results[i + 1]++;
          if (this.results[i + 1] == 2) {
            this.finale[Math.round((i + 2) / 2 - 1)] = this.polufinale[i];
            this.polufinale[i] = 0;
            this.polufinale[i + 1] = 0;
          }
        }
      } else {
        brojac++;
        if (brojac == 2) {
          this.semifinalOver = true;
        }
      }
    }
  }

  // Finale
  Finale() {
    for (var i = 0; i < 2; i += 2) {
      if (this.finale[i] != 0) {
        var rezultat = this.Match(this.finale[i], this.finale[i + 1]);

        if (rezultat == 1) {
          this.results[i]++;
          if (this.results[i] == 2) {
            this.winner.push(this.finale[i]);
            this.finale[i] = 0;
            this.finale[i + 1] = 0;
          }
        } else {
          this.results[i + 1]++;
          if (this.results[i + 1] == 2) {
            this.winner.push(this.finale[i + 1]);
            this.finale[i] = 0;
            this.finale[i + 1] = 0;
          }
        }
      } else {
        this.finalOver = true;
      }
    }
  }
}
