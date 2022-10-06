const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create([
      {
        title: "Tomato Egg Stir Fry",
        level: "Easy Peasy",
        ingredient: [
          "Tomato",
          "Eggs",
          "Ginger",
          "Garlic",
          "Viniger",
          "Salt",
          "Sugar",
          "Ketchup",
        ],
        cuisine: "chinese",
        dishType: "main_course",
        duration: 10,
        creator: "Q",
      },
    ]);
  })
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.collection.insertMany(data, (error, docs) => {});
  })
  .then((recipe) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
