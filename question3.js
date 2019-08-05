// employee - 30% discount
// affiliate - 10% discount
// customer > 2 y - 5% discount
// each $100 - $5 discount
// discount of percent not apply to groceries
// only get one percentage based discounts on a bill

// fix currency

const PERCENTAGE_UNIT = 'percentage';
const MONEY_UNIT = 'money';
const GROCERY_TYPE = 'grocery';

const DiscountSettings = [
  {
    type: 'employee',
    unit: PERCENTAGE_UNIT,
    value: 30
  },
  {
    type: 'affiliate',
    unit: PERCENTAGE_UNIT,
    value: 10
  },
  {
    type: 'customer > 2 yr',
    unit: PERCENTAGE_UNIT,
    value: 5
  },
  {
    type: 'perMoney',
    unit: MONEY_UNIT,
    value: [100, 5]
  }
];

module.exports.BillDiscount = function(bill) {
  bill = Object.assign({}, bill);

  const discountSettings = Object.freeze(DiscountSettings);

  function getGroceryAmount() {
    const { items } = bill;
    return items
      .filter(i => i.type === GROCERY_TYPE)
      .reduce((a, c) => (a += c.value), 0);
  }

  function getPercentageDiscountSetting() {
    const { userType } = bill;
    return discountSettings.filter(
      s => userType.indexOf(s.type) > -1 && s.unit === PERCENTAGE_UNIT
    );
  }

  function getMaxgetPercentageDiscount(discounts) {
    return discounts.map(i => i.value).reduce((a, b) => Math.max(a, b));
  }

  function getDiscountWithPercentage() {
    const { amount } = bill;

    let realAmount = amount;

    const groceryAmount = getGroceryAmount();
    if (groceryAmount == amount) return 0;

    if (groceryAmount) realAmount = realAmount - groceryAmount;

    const discounts = getPercentageDiscountSetting();
    if (!discounts || !discounts.length) return 0;

    const valueDiscounts = getMaxgetPercentageDiscount(discounts);

    const discountValue = (realAmount / 100) * valueDiscounts;
    return discountValue;
  }

  function getMoneySetting(){
    return discountSettings.find(i => i.unit === MONEY_UNIT);
  }

  function getDiscountPerMoney() {
    const { amount } = bill;

    const discountMoney = getMoneySetting();
    const discount = discountMoney.value;

    if (amount < discount[0]) return 0;

    const amountWillDiscount = amount - (amount % discount[0]);
    const discountValue = (amountWillDiscount / discount[0]) * discount[1];
    return discountValue;
  }

  function getDiscount() {
    return getDiscountWithPercentage() + getDiscountPerMoney();
  }

  function getBillAftterDiscount() {
    const { amount } = bill;

    let amountDiscount = getDiscount();
    return amount - amountDiscount;
  }

  function getBill() {
    return bill;
  }

  return {
    getBill,
    getDiscount,
    getBillAftterDiscount,
    getDiscountPerMoney,
    getDiscountWithPercentage
  };
};
