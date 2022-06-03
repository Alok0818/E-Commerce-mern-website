const express = require("express");
const Todos = require("../models/ProductsModal");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    console.log(req.body);
    const data = await Todos.create(req.body);
    return res.send(data);
  } catch (error) {
    return res.send(500).send({ message: error.message });
  }
});

// find all   http://localhost:2345/product

router.get("", async (req, res) => {
  try {
    const data = await Todos.find().lean().exec();
    console.log(data);
    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
});

// find by id  http://localhost:2345/product/id/6280f7c90
router.get("/id/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await Todos.findById(req.params.id).lean().exec();
    console.log(data);
    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
});

// added filter of category discount rating sorting http://localhost:2345/product/women-tops?discount=60&rating=3.7


router.get("/:id", async (req, res) => {
  try {
    var mysort = { "price.sp": req.query.sorting || "" };
    const rating = req.query.rating || 0;
    const discount = req.query.discount || 0;

    const user = await Todos.find().sort(mysort).lean().exec();

    const filterCtegory = user.filter((e) => e.tag === req.params.id);

    const filterRating = filterCtegory.filter(
      (e) => e.customer_rating >= rating
    );

    const filterDiscount = filterRating.filter(
      (e) => e.price.discount >= discount
    );

    return res.send(filterDiscount);
  } catch (error) {
    ``;
    return res.send(error);
  }
});


module.exports = router;


// https://e-commerce-reacttt.herokuapp.com/