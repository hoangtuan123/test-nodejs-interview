const {
  expect
} = require('chai');
const {
  BillDiscount
} = require('./question3');

describe('question 3', function () {
  describe('test discount', () => {
    it('discount with employee and affiliate', () => {
      const bill = {
        userType: ['employee', 'affiliate'],
        amount: 990,
        items: [{
          type: 'noGrocery',
          value: 990,
          name: 'Not grocery 1'
        }]
      };

      /// 990 / 100 * 30 = 297
      /// 990 -> 45
      /// 297 + 45
      BillDiscount.constructor(bill);
      const amount = BillDiscount.getDiscount();

      expect(amount).to.equal(342);
    });

    it('discount with empty discount', () => {
      const bill = {
        userType: [],
        amount: 990,
        items: [{
          type: 'noGrocery',
          value: 990,
          name: 'Not grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getDiscount();

      expect(amount).to.equal(45);
    });

    it('net payable with empty discount 1', () => {
      const bill = {
        userType: [],
        amount: 990,
        items: [{
          type: 'noGrocery',
          value: 990,
          name: 'Not grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getBillAftterDiscount();

      expect(amount).to.equal(945);
    });

    it('net payable with empty discount 2', () => {
      const bill = {
        userType: [],
        amount: 1000,
        items: [{
          type: 'noGrocery',
          value: 1000,
          name: 'Not grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getBillAftterDiscount();

      expect(amount).to.equal(950);
    });

    it('only discount percentage with empty usertype', () => {
      const bill = {
        userType: [],
        amount: 1000,
        items: [{
          type: 'noGrocery',
          value: 1000,
          name: 'Not grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getDiscountWithPercentage();

      expect(amount).to.equal(0);
    });

    it('only discount percentage with employee usertype', () => {
      const bill = {
        userType: ['employee'],
        amount: 1000,
        items: [{
          type: 'noGrocery',
          value: 1000,
          name: 'Not grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getDiscountWithPercentage();

      expect(amount).to.equal(300);
    });

    it('only discount per money with empty usertype', () => {
      const bill = {
        userType: [],
        amount: 1000,
        items: [{
          type: 'noGrocery',
          value: 1000,
          name: 'Not grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getDiscountPerMoney();

      expect(amount).to.equal(0);
    });

    it('only discount per percentage with grocery 1', () => {
      const bill = {
        userType: ['employee'],
        amount: 1000,
        items: [{
            type: 'grocery',
            value: 10,
            name: 'grocery 1'
          },
          {
            type: 'grocery',
            value: 10,
            name: 'grocery 2'
          },
          {
            type: 'grocery',
            value: 10,
            name: 'grocery 3'
          },
          {
            type: 'noGrocery',
            value: 970,
            name: 'Not grocery 1'
          }
        ]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getDiscountWithPercentage();

      expect(amount).to.equal(291);
    });

    it('only discount per percentage with grocery 1', () => {
      const bill = {
        userType: ['employee'],
        amount: 1000,
        items: [{
          type: 'grocery',
          value: 1000,
          name: 'grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getDiscountWithPercentage();

      expect(amount).to.equal(0);
    });

    it('get bill with grocery', () => {
      const bill = {
        userType: ['employee'],
        amount: 1000,
        items: [{
          type: 'grocery',
          value: 1000,
          name: 'grocery 1'
        }]
      };

      BillDiscount.constructor(bill);
      const amount = BillDiscount.getBillAftterDiscount();

      expect(amount).to.equal(950);
    });
  })
});
