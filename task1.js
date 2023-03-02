class Auto {
  static OPTION_ENUM = {
    FUEL: 'FUEL',
    LOW_FUEL_CONSUMPTION: 'LOW_FUEL_CONSUMPTION',
    DURABILITY: 'DURABILITY',
    SPEED: 'SPEED',
  };

  static CAR_TYPE_ENUM = {
    CIVILIAN: 'Civilian',
    SPORT: 'Sport',
    MILITARY: 'Military',
  };

  static MAX_TOTAL_POINTS = 12;
  static FUEL_CONSUMPTION_RATE = 0.1;
  static SPEED_RATE = 0.05;
  static DURABILITY_RATE = 0.01;

  static compare(cars) {
    const _cars = cars.map((car) => ({
      powerReserve: car.powerReserve,
      durability: car.durability,
      speed: car.speed,
      name: car.name,
    }));

    const { maxPowerReserve, maxDurability, maxSpeed } = _cars.reduce(
      (acc, car) => {
        if (car.powerReserve > acc.maxPowerReserve) {
          acc.maxPowerReserve = car.powerReserve;
        }
        if (car.durability > acc.maxDurability) {
          acc.maxDurability = car.durability;
        }
        if (car.speed > acc.maxSpeed) {
          acc.maxSpeed = car.speed;
        }
        return acc;
      },
      {
        maxPowerReserve: 0,
        maxDurability: 0,
        maxSpeed: 0,
      }
    );

    return _cars.map((car) => ({
      powerReserve:
        Math.round((car.powerReserve * 100) / maxPowerReserve) + ' %',
      durability: Math.round((car.durability * 100) / maxDurability) + ' %',
      speed: Math.round((car.speed * 100) / maxSpeed) + ' %',
      name: car.name,
    }));
  }

  #defaultFuel = 5;
  #defaultSpeed = 5;
  #defaultDurability = 5;
  #defaultFuelConsumption = 200;
  #fuel;
  #lowFuelConsumption;
  #durability;
  #speed;
  #name;

  static createCivilian(name = 'Unknown Car') {
    return new this({
      fuel: 2,
      lowFuelConsumption: 2,
      durability: 2,
      speed: 4,
      name,
    });
  }

  static createSport(name = 'Unknown Car') {
    return new this({
      fuel: 2,
      lowFuelConsumption: 1,
      durability: 1,
      speed: 6,
      name,
    });
  }

  static createMilitary(name = 'Unknown Car') {
    return new this({
      fuel: 2,
      lowFuelConsumption: 2,
      durability: 4,
      speed: 2,
      name,
    });
  }

  // TODO: raise ERROR if called outside Auto class:
  constructor({
    fuel = 0,
    lowFuelConsumption = 0,
    durability = 0,
    speed = 0,
    name = 'Unknown Car',
  }) {
    this.#fuel = fuel;
    this.#lowFuelConsumption = lowFuelConsumption;
    this.#durability = durability;
    this.#speed = speed;
    this.#name = name;
  }

  upgrade(option) {
    if (this.totalPoints === Auto.MAX_TOTAL_POINTS) {
      throw new Error(
        `You have reached the limit of ${Auto.MAX_TOTAL_POINTS} total points!`
      );
    }
    switch (option) {
      case Auto.OPTION_ENUM.FUEL:
        return (this.#fuel += 1);
      case Auto.OPTION_ENUM.LOW_FUEL_CONSUMPTION:
        return (this.#lowFuelConsumption += 1);
      case Auto.OPTION_ENUM.DURABILITY:
        return (this.#durability += 1);
      case Auto.OPTION_ENUM.SPEED:
        return (this.#speed += 1);
      default:
        throw new Error('Unknown car option!');
    }
  }

  get totalPoints() {
    return (
      this.#fuel + this.#lowFuelConsumption + this.#durability + this.#speed
    );
  }

  get totalFuel() {
    return this.#defaultFuel + this.#fuel;
  }

  get powerReserve() {
    return (
      this.totalFuel * this.#defaultFuelConsumption +
      this.totalFuel *
        Auto.FUEL_CONSUMPTION_RATE *
        this.#defaultFuelConsumption *
        this.#lowFuelConsumption
    );
  }

  get speed() {
    return (
      this.#defaultSpeed + this.#speed * Auto.SPEED_RATE * this.#defaultSpeed
    );
  }

  get durability() {
    return (
      this.#defaultDurability +
      this.#durability * Auto.DURABILITY_RATE * this.#defaultDurability
    );
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    return (this.#name = value);
  }
}

module.exports = Auto;
