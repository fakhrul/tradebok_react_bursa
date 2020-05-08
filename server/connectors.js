const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoUri = process.env.CONNECTION_STRING;
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});



// mongoose.connect(
//   process.env.CONNECTION_STRING,
//   { useNewUrlParser: true },
//   (error) => {
//     if (error) console.log("Database Connection Error----", error);
//     else console.log("Database connected");
//   }
// );

const player = new Schema({
  position: String,
  name: String,
  team: String,
  String,
  jerseyNumber: Number,
  wonSuperBowl: Boolean,
});

module.exports = mongoose.model("Player", player);
