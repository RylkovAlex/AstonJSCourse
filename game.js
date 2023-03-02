const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Auto = require('./task1.js');

class Game {
  #Auto;
  #car;
  #trackLength;
  #competitors = [];

  constructor(trackLength = 1500, AutoClass = Auto) {
    this.#trackLength = trackLength;
    this.#Auto = AutoClass;
    console.log(
      `\nHi! This is survival race! You need to drive a track ${trackLength} points long...`
    );
    this.init();
  }

  createСompetitors(count) {
    for (let i = 0; i < count; i++) {
      const carTypes = Object.values(this.#Auto.CAR_TYPE_ENUM);
      const carOptions = Object.values(this.#Auto.OPTION_ENUM);
      const randomCarType = carTypes[getRandomInt(carTypes.length)];
      const randomCar = this.#Auto[`create${randomCarType}`](
        `Opponent number ${i + 1}`
      );
      while (randomCar.totalPoints < this.#Auto.MAX_TOTAL_POINTS) {
        const randomOption = carOptions[getRandomInt(carOptions.length)];
        randomCar.upgrade(randomOption);
      }
      this.#competitors.push(randomCar);
    }
  }

  init() {
    const carTypes = Object.values(this.#Auto.CAR_TYPE_ENUM);
    console.log('To start, select the type of your car:\n');
    carTypes.forEach((value, idx) => console.log(`${idx + 1} - ${value}`));
    readline.question(
      '\nJust type the number of car-type and press ENTER.\n',
      (carTypeNumber) => {
        const parsedCarTypeNumber = Math.abs(Number.parseInt(carTypeNumber));
        if (
          Number.isNaN(parsedCarTypeNumber) ||
          parsedCarTypeNumber > carTypes.length
        ) {
          console.error(
            `\nCouldn't parse car-type number, try again please:\n`
          );
          return this.init();
        }
        this.#car = this.#Auto[`create${carTypes[parsedCarTypeNumber - 1]}`]();
        this.chouseCarName();
      }
    );
  }

  chouseCarName() {
    console.clear();
    readline.question(
      'Type the name of your car and press ENTER.\n',
      (carName) => {
        this.#car.name = carName;
        this.selectСompetitorsCount();
      }
    );
  }

  selectСompetitorsCount() {
    console.clear();
    readline.question(
      'Ok! Now enter the number of opponents you whant to play and press ENTER.\n',
      (competitorsCount) => {
        const parsedСompetitorsCount = Number.parseInt(competitorsCount);
        if (Number.isNaN(parsedСompetitorsCount)) {
          console.error(
            `\nCouldn't parse number of opponents, try again please:\n`
          );
          return this.selectСompetitorsCount();
        }
        this.createСompetitors(parsedСompetitorsCount);
        const cars = this.#Auto.compare([this.#car, ...this.#competitors]);
        console.clear();
        console.log(
          `Ok, the following cars will take part in the race\n`,
          cars,
          `\n`
        );
        this.upgradeCar();
      }
    );
  }

  upgradeCar() {
    console.log(
      `You have ${
        this.#Auto.MAX_TOTAL_POINTS - this.#car.totalPoints
      } points to upgrade your car. There are several options to upgrade:\n`
    );
    const options = Object.values(this.#Auto.OPTION_ENUM);
    options.forEach((value, idx) => console.log(`${idx + 1} - ${value}`));
    readline.question(
      'Type the number of option you whant to upgrade.\n',
      (optionNumber) => {
        const parsedOptionNumber = Math.abs(Number.parseInt(optionNumber));
        if (
          Number.isNaN(parsedOptionNumber) ||
          parsedOptionNumber > options.length
        ) {
          console.error(`\nCouldn't parse option number, try again please:\n`);
          return this.upgradeCar();
        }
        this.#car.upgrade(options[parsedOptionNumber - 1]);
        if (this.#car.totalPoints < this.#Auto.MAX_TOTAL_POINTS) {
          console.clear();
          console.log(`\nOk, car was upgraded!`);
          return this.upgradeCar();
        } else {
          return this.start();
        }
      }
    );
  }

  start() {
    const cars = this.#Auto.compare([...this.#competitors, this.#car]);
    console.clear();
    console.log(`Great! All players are on the strat.`);
    readline.question(
      'Now you are ready to play! Just press ENTER to start.\n',
      (_) => {
        this.calculateWinner();
      }
    );
  }

  calculateWinner() {
    const winners = [this.#car, ...this.#competitors]
      .filter((car) => car.powerReserve >= this.#trackLength)
      .sort((a, b) => b.speed - a.speed);
    console.clear();
    console.log(`Here are all winers:\n`);
    winners.forEach((car, idx) => {
      console.log(`Place ${idx + 1}: `, car.name);
    });
    readline.close();
  }
}

const game = new Game(1500);

function getRandomInt(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
