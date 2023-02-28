function Company(name, salary) {
  let profit = 0;
  Object.defineProperties(this, {
    name: {
      value: name,
      writable: false,
      configurable: false,
      enumerable: false,
    },
    profit: {
      get() {
        return profit;
      },
      configurable: false,
      enumerable: false,
    },
  });
  this.income = (value) => (profit += value - salary);
  this.spend = (value) => (profit -= value);
  Company.addStaff(this);
}

Object.defineProperties(Company, {
  staffList: {
    value: [],
    writable: false,
    configurable: false,
    enumerable: false,
  },
  countStaff: {
    get() {
      return this.staffList.length;
    },
    configurable: false,
    enumerable: false,
  },
  money: {
    get() {
      return this.staffList.reduce((money, staff) => {
        return (money += staff.profit);
      }, 0);
    },
    configurable: false,
    enumerable: false,
  },
  /* staffList, countStaff, money можно задать как геттеры прямо в store,
  но тогда вывод в log Company.store не будет показывать значения, а будет выводить свойства как [Getter],
  поэтому реализовал store так: */
  store: {
    get() {
      return {
        staffList: this.staffList.map((staff) => ({
          name: staff.name,
          income: staff.profit,
        })),
        countStaff: this.countStaff,
        money: this.money,
      };
    },
    configurable: false,
    enumerable: true,
  },
});

Company.addStaff = function (staff) {
  this.staffList.push(staff);
};

Company.getLeaders = function () {
  const maxProfit = Math.max(...this.staffList);
  return this.staffList.filter((staff) => staff.profit === maxProfit);
};
