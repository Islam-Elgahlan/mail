const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3900
let cors = require("cors");
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "islam.elgahlan@gmail.com",
    pass: "dkjsysvxeedpvhrj",
  },
});

app.post("/", async (req, res) => {
  let {name, email,  phone, message } = req.body;
  let info = await transporter.sendMail({
    from: "islam.elgahlan@gmail.com",
    to: "mmodern2008@gmail.com",
    subject: "follow up mail ",
    html: ` <h1>Kindly Follow up with Mr: ${name} </h1>
    <p>name:  ${name} </p><p>email:  ${email} </p><p>phone:  ${phone} </p><p>Customer Message:  ${message} </p>
    `,
  });
  res.json({message:"sent"})
  // res.send(name);
  
  // console.log(res)
});
// app.get("/a" ,  (req,res) => {
// // console.log(req.body)
// res.json({message:"sucess"})
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
