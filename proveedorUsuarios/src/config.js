'use strict'

module.exports = {
  
  DB_URL: "mongodb+srv://dbUser:Sdprac2021@cluster0.dot2w.mongodb.net/usuarios?retryWrites=true&w=majority",
  port: process.env.PORT || 3001,
  secretToken: "Sdprac2021",
  tokenTime: 10, //10 min


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


