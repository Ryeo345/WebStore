const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Coupon = require('./Coupons');
const LineItem  = require('./LineItem');
const path = require('path');
const fs = require('fs');

let root = path.dirname(path.dirname(__dirname));

const filePath = path.join(root, 'static', 'categories-seed-data.json');
const jsonData = fs.readFileSync(filePath, 'utf-8');

const data = JSON.parse(jsonData);

console.log(data);
User.hasMany(Order);
Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const price = {
  "Extras": 0.50,
  "Wings": 4.99,
  "Drinks": 2.99,
  "Sides": 7.99,
  "Saucy Bowls": 9.99,
  "Saucy Bites": 4.99,
  "Desserts": 6.99,
  "Papadias": 5.99,
  "Pizza": 9.99

}

const createProduct = (productGroup, productArr, categoryName) => {
  productGroup.map(pizza => {
    productArr.push(
        Product.create(
            {
              name: pizza.title,
              image: 'http://www.papajohns.com' + pizza.webImageURL,
              category: categoryName,
              price: price[categoryName]
            }
        ))
  })
}

const numGen = (min, max) => {
  const rand = Math.random() * (max - min) + min;
  return Math.floor(rand);
}

Product.addHook('beforeValidate', (product) => {

  if(!product.totalCal){
      product.totalCal = numGen(100, 350);
  }
  if(!product.calFat){
    product.calFat = numGen(60, (product.totalCal/2));
  }
  if(!product.totalFat){
    product.totalFat = numGen(10, 20);
  }
  if(!product.satFat){
    product.satFat = numGen(5, (product.totalFat-5));
  }
  if(!product.transFat){
    product.transFat = numGen(0, 1);
  }
  if(!product.cholesterol){
    product.cholesterol = numGen(20, 40);
  }
  if(!product.sodium){
    product.sodium = numGen(500, 1000);
  }
  if(!product.totalCarbs){
    product.totalCarbs = numGen(25, 40);
  }
  if(!product.fiber){
    product.fiber = numGen(0, 5);
  }
  if(!product.sugars){
    product.sugars = numGen(0, 5);
  }
  if(!product.protein){
    product.protein = numGen(10, 20);
  }

})

const syncAndSeed = async()=> {
  try {
    await conn.sync({force: true});
    const productArr = [];
    data.data.menuCategories.forEach(mc => {
      createProduct(mc.sections[0].productGroups, productArr, mc.name)
    })
    const products = await Promise.all(productArr);

    const [John, Robin, Tom] = await Promise.all([
      User.create({
        username: 'JOHN2023',
        password: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@gmail.com',
        }),
      User.create({
        username: 'ROBIN2023',
        password: '123',
        firstName: 'Robin',
        lastName: 'Hood',
        email: 'Robin.Hood@gmail.com'
        }),
      User.create({
        username: 'TOM2023',
        password: '123',
        firstName: 'Tom',
        lastName: 'Hardy',
        email: 'Tom.Hardy@gmail.com'
        }),
    ]);
    // console.log(products);
    await John.update({isAdmin:true})
    // John.addToCart({ product: products[5], quantity: 3})
    await Coupon.create({name:'PIZZA40',discount:40.00})
    await Coupon.create({name:'PIZZA10',discount:10.00})


    // const [extra, meat, pcs, veggie, pepperoni, deluxe, spinach, cbr] = await Promise.all([
    //   Product.create({
    //     name: 'ExtravaganZZa',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_ZZ.jpg',
    //   }),
    //   Product.create({
    //     name: 'MeatZZa',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_MX.jpg',
    //   }),
    //   Product.create({
    //     name: 'Philly Cheese Steak',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_PIZPH.jpg',
    //   }),
    //   Product.create({
    //     name: 'Pacific Veggie',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_PIZPV.jpg',
    //   }),
    //   Product.create({
    //     name: 'Ultimate Pepperoni',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_PIZPX.jpg',
    //   }),
    //   Product.create({
    //     name: 'Deluxe',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_DX.jpg',
    //   }),
    //   Product.create({
    //     name: 'Spinach & Feta',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_PISPF.jpg',
    //   }),
    //   Product.create({
    //     name: 'Chicken Bacon Ranch',
    //     image: 'https://cache.dominos.com/olo/6_108_5/assets/build/market/US/_en/images/img/products/larges/S_PIZCR.jpg',
    //   }),
    // ]);

    // const cart = await Tom.getCart();
    // await Tom.addToCart({product: extra, quantity: 1});
    // await Tom.addToCart({product: spinach, quantity: 1});
    // return {
    //   users: {
    //     John,
    //     Robin,
    //     Tom
    //   },
    //   products: {
    //     extra,
    //     meat,
    //     pcs,
    //     veggie,
    //     pepperoni,
    //     deluxe,
    //     spinach,
    //     cbr
    //   }
    // };
  }
  catch(err) {
    console.log(err);
  }
}


module.exports = {
  syncAndSeed,
  User,
  Product,
  LineItem,
  Coupon
};
