const products = [
  // Starters (12 items)
  {
    id: 1,
    name: "Spring Rolls",
    price: 120,
    category: "starter",
    image: "../img/restro_prod/Spring Rolls.jpg",
  },
  {
    id: 2,
    name: "Garlic Bread",
    price: 100,
    category: "starter",
    image: "../img/restro_prod/Garlic Bread.jpg",
  },
 {
    "id": 3,
    "name": "Veg Pakora",
    "price": 110,
    "category": "starter",
    "image": "../img/restro_prod/Veg Pakora.jpeg"
  },
  {
    "id": 4,
    "name": "Paneer Tikka",
    "price": 150,
    "category": "starter",
    "image": "../img/restro_prod/Paneer Tikka.jpeg"
  },
  {
    "id": 5,
    "name": "Hara Bhara Kabab",
    "price": 130,
    "category": "starter",
    "image": "../img/restro_prod/Hara Bhara Kabab.jpeg"
  },
  {
    "id": 6,
    "name": "Cheese Balls",
    "price": 140,
    "category": "starter",
    "image": "../img/restro_prod/Cheese Balls.jpeg"
  },
  {
    "id": 7,
    "name": "Chicken Tikka",
    "price": 170,
    "category": "starter",
    "image": "../img/restro_prod/Chicken Tikka.jpeg"
  },
  {
    "id": 8,
    "name": "Fish Fingers",
    "price": 160,
    "category": "starter",
    "image": "../img/restro_prod/Fish Fingers.jpeg"
  },
  {
    "id": 9,
    "name": "Chili Paneer",
    "price": 145,
    "category": "starter",
    "image": "../img/restro_prod/Chili Paneer.jpeg"
  },
  {
    "id": 10,
    "name": "Stuffed Mushrooms",
    "price": 135,
    "category": "starter",
    "image": "../img/restro_prod/Stuffed Mushrooms.jpeg"
  },
  {
    "id": 11,
    "name": "Onion Rings",
    "price": 90,
    "category": "starter",
    "image": "../img/restro_prod/Onion Rings.jpeg"
  },
  {
    "id": 12,
    "name": "Corn Cheese Balls",
    "price": 125,
    "category": "starter",
    "image": "../img/restro_prod/Corn Cheese Balls.jpeg"
  },

  // Main Course (12 items)
 {
    "id": 13,
    "name": "Paneer Butter Masala",
    "price": 250,
    "category": "main",
    "image": "../img/restro_prod/Paneer Butter Masala.jpeg"
  },
  {
    "id": 14,
    "name": "Chicken Biryani",
    "price": 280,
    "category": "main",
    "image": "../img/restro_prod/Chicken Biryani.jpg"
  },
  {
    "id": 15,
    "name": "Veg Pulao",
    "price": 200,
    "category": "main",
    "image": "../img/restro_prod/Veg Pulao.jpeg"
  },
  {
    "id": 16,
    "name": "Dal Makhani",
    "price": 190,
    "category": "main",
    "image": "../img/restro_prod/Dal Makhani.jpeg"
  },
  {
    "id": 17,
    "name": "Butter Chicken",
    "price": 300,
    "category": "main",
    "image": "../img/restro_prod/Butter Chicken.jpeg"
  },
  {
    "id": 18,
    "name": "Rajma Chawal",
    "price": 180,
    "category": "main",
    "image": "../img/restro_prod/Rajma Chawal.jpeg"
  },
  {
    "id": 19,
    "name": "Chole Bhature",
    "price": 170,
    "category": "main",
    "image": "../img/restro_prod/Chole Bhature.jpeg"
  },
  {
    "id": 20,
    "name": "Kadai Paneer",
    "price": 240,
    "category": "main",
    "image": "../img/restro_prod/Kadai Paneer.jpeg"
  },
  {
    "id": 21,
    "name": "Mutton Curry",
    "price": 350,
    "category": "main",
    "image": "../img/restro_prod/Mutton Curry.jpeg"
  },
  {
    "id": 22,
    "name": "Egg Curry",
    "price": 220,
    "category": "main",
    "image": "../img/restro_prod/Egg Curry.jpeg"
  },
  {
    "id": 23,
    "name": "Aloo Gobi",
    "price": 160,
    "category": "main",
    "image": "../img/restro_prod/Aloo Gobi.jpeg"
  },
  {
    "id": 24,
    "name": "Veg Korma",
    "price": 210,
    "category": "main",
    "image": "../img/restro_prod/Veg Korma.jpeg"
  },

  // Desserts (12 items)
  {
    "id": 25,
    "name": "Gulab Jamun",
    "price": 80,
    "category": "dessert",
    "image": "../img/restro_prod/Gulab Jamun.jpg"
  },
  {
    "id": 26,
    "name": "Ice Cream",
    "price": 90,
    "category": "dessert",
    "image": "../img/restro_prod/Ice Cream.jpg"
  },
  {
    "id": 27,
    "name": "Rasmalai",
    "price": 100,
    "category": "dessert",
    "image": "../img/restro_prod/Rasmalai.jpeg"
  },
  {
    "id": 28,
    "name": "Brownie",
    "price": 120,
    "category": "dessert",
    "image": "../img/restro_prod/Brownie.jpeg"
  },
  {
    "id": 29,
    "name": "Cheesecake",
    "price": 150,
    "category": "dessert",
    "image": "../img/restro_prod/Cheesecake.jpeg"
  },
  {
    "id": 30,
    "name": "Chocolate Mousse",
    "price": 130,
    "category": "dessert",
    "image": "../img/restro_prod/Chocolate Mousse.jpeg"
  },
  {
    "id": 31,
    "name": "Kheer",
    "price": 95,
    "category": "dessert",
    "image": "../img/restro_prod/Kheer.jpeg"
  },
  {
    "id": 32,
    "name": "Jalebi",
    "price": 85,
    "category": "dessert",
    "image": "../img/restro_prod/Jalebi.jpeg"
  },
  {
    "id": 33,
    "name": "Fruit Salad",
    "price": 90,
    "category": "dessert",
    "image": "../img/restro_prod/Fruit Salad.jpeg"
  },
  {
    "id": 34,
    "name": "Falooda",
    "price": 110,
    "category": "dessert",
    "image": "../img/restro_prod/Falooda.jpeg"
  },
  {
    "id": 35,
    "name": "Custard",
    "price": 100,
    "category": "dessert",
    "image": "../img/restro_prod/Custard.jpeg"
  },
  {
    "id": 36,
    "name": "Carrot Halwa",
    "price": 120,
    "category": "dessert",
    "image": "../img/restro_prod/Carrot Halwa.jpeg"
  },

  // Beverages (12 items)
  {
    id: 37,
    name: "Lemonade",
    price: 60,
    category: "beverage",
    image: "../img/restro_prod/Lemonade.jpg",
  },
  {
    id: 38,
    name: "Espresso",
    price: 80,
    category: "beverage",
    image: "../img/restro_prod/Espresso.jpg",
  },
  {
    id: 39,
    name: "Cappuccino",
    price: 90,
    category: "beverage",
    image: "../img/restro_prod/Cappuccino.jpg",
  },
  {
    id: 40,
    name: "Latte",
    price: 85,
    category: "beverage",
    image: "../img/restro_prod/Latte.jpg",
  },
  {
    id: 41,
    name: "Mocha",
    price: 95,
    category: "beverage",
    image: "../img/restro_prod/Mocha.jpg",
  },
  {
    id: 42,
    name: "Americano",
    price: 75,
    category: "beverage",
    image: "../img/restro_prod/Americano.jpg",
  },
  {
    id: 43,
    name: "Macchiato",
    price: 88,
    category: "beverage",
    image: "../img/restro_prod/Macchiato.jpg",
  },
  {
    id: 44,
    name: "Flat White",
    price: 82,
    category: "beverage",
    image: "../img/restro_prod/Flat White.jpg",
  },
  {
    id: 45,
    name: "Iced Coffee",
    price: 78,
    category: "beverage",
    image: "../img/restro_prod/Iced Coffee.jpg",
  },
  {
    id: 46,
    name: "Masala Chai",
    price: 55,
    category: "beverage",
    image: "../img/restro_prod/Masala Chai.jpeg",
  },
  {
    id: 47,
    name: "Cold Coffee",
    price: 90,
    category: "beverage",
    image: "../img/restro_prod/Cold Coffee.jpeg",
  },
  {
    id: 48,
    name: "Green Tea",
    price: 65,
    category: "beverage",
    image: "../img/restro_prod/Green Tea.jpeg",
  }
];

export default products;
