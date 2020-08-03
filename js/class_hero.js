// Deklariranje klase Hero
class Hero {
  intelligence = 0;
  strength = 0;
  speed = 0;
  durability = 0;
  power = 0;
  combat = 0;

  constructor(name, powerstats, image) {
    this.name = name;

    if (powerstats.intelligence != "null") {
      this.intelligence = powerstats.intelligence;
    }
    if (powerstats.strength != "null") {
      this.strength = powerstats.strength;
    }
    if (powerstats.speed != "null") {
      this.speed = powerstats.speed;
    }
    if (powerstats.durability != "null") {
      this.durability = powerstats.durability;
    }
    if (powerstats.power != "null") {
      this.power = powerstats.power;
    }
    if (powerstats.combat != "null") {
      this.combat = powerstats.combat;
    }
    this.image = image.url;
  }
}
