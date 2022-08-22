const express = require("express");
const yup = require("yup");
const app = express(); //create server
const PORT = 3000;
const users = [];

const parseBody = express.json();
const validate = async (req, res, next) => {
  const validationSchema = yup.object({
    name: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
    password: yup.string().trim().required(),
    gender: yup.boolean(),
  });
  try {
    req.body = await validationSchema.validate(req.body);
    next();
  } catch (error) {
    res.send(error.message)
  }
}
const createUser = (req, res)=>{
  try {
    const user = req.body;
    user.id = users.length;
    delete user.password;
    user.createdAt = new Date();
    users.push(user);
    console.log(users);
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }
}

//app.get("/users", showUsers)
app.post("/user", parseBody, validate, createUser);
//app.put("/user/:id", parseBody, validate, updateUser); 
app.delete("/user/:id", (req, res) => {
  res.send('user => ' + req.params.id)
});

app.listen(PORT, () => {
  console.log("server started at port " + PORT);
});
