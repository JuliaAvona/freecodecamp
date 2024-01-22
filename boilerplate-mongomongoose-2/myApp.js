require("dotenv").config();
let mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect(
    "mongodb+srv://Yamirya270997:Yamirya270997@cluster0.ffdfmmf.mongodb.net/mydb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });

  newPerson.save((err, data) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    return done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    return done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    return done(null, peopleFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    return done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    return done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      console.error(err);
      return done(err);
    }

    personFound.favoriteFoods.push("hamburger");
    personFound.save((saveErr, updatedPerson) => {
      if (saveErr) {
        console.error(saveErr);
        return done(saveErr);
      }
      return done(null, updatedPerson);
    });
  });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        console.error(err);
        return done(err);
      }
      return done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, removedDocument) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    return done(null, removedDocument);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, operationResult) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    return done(null, operationResult);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // Sort by name in ascending order (1 for ascending, -1 for descending)
    .limit(2) // Limit the results to 2 documents
    .select({ age: 0 }) // Exclude the age field
    .exec((err, data) => {
      if (err) {
        console.error(err);
        return done(err);
      }
      return done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
