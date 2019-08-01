// employee - 30% discount
// affiliate - 10% discount
// customer > 2 y - 5% discount
// each $100 - $5 discount
// discount of percent not apply to groceries
// only get one percentage based discounts on a bill

// fix currency

// const billObj = {
//   userType: ['employee'],
//   amount: 1000,
//   items: [
//     {
//       type: 'grocery',
//       value: 10,
//       name: 'grocery 1'
//     },
//     {
//       type: 'grocery',
//       value: 10,
//       name: 'grocery 2'
//     },
//     {
//       type: 'grocery',
//       value: 10,
//       name: 'grocery 3'
//     },
//     {
//       type: 'noGrocery',
//       value: 970,
//       name: 'Not grocery 1'
//     }
//   ]
// };

const PERCENTAGE_UNIT = 'percentage';
const MONEY_UNIT = 'money';
const GROCERY_TYPE = 'grocery';

const discountSettings = [
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

function getDiscountWithPercentage(userType, amount, items) {
  let realAmount = amount;

  const groceryAmount = items.filter(i => i.type === GROCERY_TYPE).reduce((a, c) => a += c.value ,0);
  if (groceryAmount == amount) return 0;

  if (groceryAmount) realAmount = realAmount - groceryAmount;


  const discounts = discountSettings.filter(
    s => userType.indexOf(s.type) > -1 && s.unit === PERCENTAGE_UNIT
  );

  if (!discounts || !discounts.length) return 0;

  const valueDiscounts = discounts
    .map(i => i.value)
    .reduce((a, b) => Math.max(a, b));
  
  const discountValue = realAmount / 100 * valueDiscounts;
  return discountValue;
}

function getDiscountPerMoney(amount) {
  const discountMoney = discountSettings.find(i => i.unit === MONEY_UNIT);
  const discount = discountMoney.value;

  if (amount < discount[0]) return 0;

  const amountWillDiscount = amount - ( amount % discount[0]);
  const discountValue = amountWillDiscount / discount[0] * discount[1];
  return discountValue;
}

function getDiscount(userType, amount, items) {
  return getDiscountWithPercentage(userType, amount, items) + getDiscountPerMoney(amount);
}

function getBillAftterDiscount(billObj){
  let amountDiscount = getDiscount(billObj.userType, billObj.amount, billObj.items);
  return billObj.amount - amountDiscount;
}

module.exports.getDiscountWithPercentage = getDiscountWithPercentage;
module.exports.getDiscountPerMoney = getDiscountPerMoney;
module.exports.getDiscount = getDiscount;
module.exports.getBillAftterDiscount = getBillAftterDiscount;