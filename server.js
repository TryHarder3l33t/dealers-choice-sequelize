//Node test nodemon start
console.log("Everything is good to go");
//logging help
console.log(`"\u001b[1;35m <---------------------------->" `);
console.log(`"\u001b[1;42m" ${Date().toString()} "\u001b[0m"`);

//
//Sequelize setup
//
const Sequelize = require("sequelize");
// //Deployment
// var sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
//development
const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgresql://ericrodgers@localhost/acme_country_club"
);

//Connection Test
const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize has authenticated");
  } catch (error) {
    console.log(`Sequelize is broke ${error}`);
  }
};
// //Run test to setup then comment it out
// test();
//

//
//Express setup
//
const express = require("express");
const app = express();

const home = require("./views/pages/home.js");
const category = require("./views/pages/category");
const detail = require("./views/pages/detail.js");
const PORT = process.env.PORT || 2800;
app.listen(PORT, function () {
  console.log(`Express is listening on ${PORT}`);
});
//

//
//Sequel Relation And Seed
//
//relation row will be named categoryId
const Category_Candy = sequelize.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    valideate: {
      notEmpty: {
        args: true,
        msg: "This candy category is empty",
      },
    },
  },
});

const Candy = sequelize.define("candy", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    valideate: {
      notEmpty: {
        args: true,
        msg: "The candy is missing",
      },
    },
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
    valideate: {
      notEmpty: {
        args: true,
        msg: "The price is missing",
      },
    },
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    valideate: {
      notEmpty: {
        args: true,
        msg: "The price is missing",
      },
    },
  },
});

Candy.belongsTo(Category_Candy);
Category_Candy.hasMany(Candy);

const go = async () => {
  try {
    await sequelize.sync({ force: true });
    const gum = await Category_Candy.create({ name: "gum" });
    const soda = await Category_Candy.create({ name: "soda" });
    const chocolate = await Category_Candy.create({ name: "chocolate" });
    const chips = await Category_Candy.create({ name: "chips" });
    const hardcandy = await Category_Candy.create({ name: "hardcandy" });

    await Candy.create({
      name: "Trident Mint",
      categoryId: gum.id,
      price: 6.99,
      image:
        "https://m.media-amazon.com/images/I/81Ir+qKVetL._SX679_PIbundle-10,TopRight,0,0_AA679SH20_.jpg",
    });
    await Candy.create({
      name: "Kit Kat",
      categoryId: chocolate.id,
      price: 7.99,
      image: "https://m.media-amazon.com/images/I/71HJ7+MuZ0L._SX679_.jpg",
    });

    await Candy.create({
      name: "Hershey",
      categoryId: chocolate.id,
      price: 9.99,
      image: "https://m.media-amazon.com/images/I/913tt9lrZDL._SX679_.jpg",
    });
    await Candy.create({
      name: "Coke",
      categoryId: soda.id,
      price: 1.99,
      image: "https://m.media-amazon.com/images/I/61eoLkLztdL._SX679_.jpg",
    });
    await Candy.create({
      name: "Jolly Ranchers",
      categoryId: hardcandy.id,
      price: 1.99,
      image: "https://m.media-amazon.com/images/I/81bC8VDTGDL._SX679_.jpg",
    });
    await Candy.create({
      name: "Bazooka",
      categoryId: gum.id,
      price: 3.99,
      image: "https://m.media-amazon.com/images/I/91d5F5-WthL._SX679_.jpg",
    });
    await Candy.create({
      name: "Dipsy Doodles",
      categoryId: chips.id,
      price: 5.99,
      image: "https://m.media-amazon.com/images/I/61NZfnFCMhL._SY879_.jpg",
    });
    await Candy.create({
      name: "Pepsi",
      categoryId: soda.id,
      price: 1.99,
      image: "https://m.media-amazon.com/images/I/810Gxp9gz1L._SX679_.jpg",
    });
    await Candy.create({
      name: "Hershey Kisses",
      categoryId: chocolate.id,
      price: 0.99,
      image:
        "https://m.media-amazon.com/images/I/81k36ywZ0BL._SX679_PIbundle-12,TopRight,0,0_AA679SH20_.jpg",
    });
    await Candy.create({
      name: "Nacho Doritos",
      categoryId: chips.id,
      price: 16.99,
      image: "https://m.media-amazon.com/images/I/812U+3TeC9L._SX679_.jpg",
    });

    await Candy.create({
      name: "Trident Orange",
      categoryId: gum.id,
      price: 4.99,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51dhhpbLowL._SX300_SY300_QL70_FMwebp_.jpg",
    });
  } catch (error) {
    console.log(error);
  }
};
go();

//routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (req.method === "POST" && req.query._method) {
    req.method = req.query._method;
  }
  next();
});

app.post("/candyshop", async (req, res) => {
  try {
    console.log(req.body);
    const candy = await Candy.create(req.body);
    res.redirect("/candyshop");
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.redirect("/candyshop");
});

app.get("/candyshop", async (req, res) => {
  try {
    const candies = await Candy.findAll();
    const candyCategories = await Category_Candy.findAll();
    res.send(home(candies, candyCategories));
  } catch (error) {
    console.log(error);
  }
});
app.get("/category/:id", async (req, res) => {
  try {
    const reqCandyId = req.params.id;
    const candies = await Candy.findAll({
      where: {
        categoryId: reqCandyId,
      },
    });
    res.send(category(candies));
  } catch (error) {
    console.log(error);
  }
});

app.get("/detail/:id", async (req, res) => {
  const candyId = req.params.id;
  const candy = await Candy.findByPk(candyId);
  res.send(detail(candy));
});

app.delete("/candyshop/delete/:id", async (req, res) => {
  try {
    const candy = await Candy.findByPk(req.params.id);
    await candy.destroy();

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
