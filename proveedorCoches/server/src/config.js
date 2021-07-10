'use strict'

module.exports = {
  
  DB_URL: "mongodb+srv://dbUser:Sdprac2021@cluster0.dot2w.mongodb.net/coches?retryWrites=true&w=majority",
  port: process.env.PORT || 3002,

}


/*
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));
*/


