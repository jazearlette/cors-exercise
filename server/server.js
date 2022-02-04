const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

function injectCors(req, res, next) {
  const corsConfig = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  for (const key in corsConfig) {
    if (Object.hasOwnProperty.call(corsConfig, key)) {
      res.setHeader(key, corsConfig[key]);
    }
  }
  next();
}

const Database = {
  students: [
    {
      id: 1,
      name: "Melly Dury",
      age: 54,
      sex: "F",
      location: "England",
      program: "Msc. Commentary",
    },
    {
      id: 2,
      name: "Judas Iscariot",
      age: 25,
      sex: "M",
      location: "Egypt",
      program: "Msc. Betrayal",
    },
    {
      id: 3,
      name: "John Doe",
      age: 23,
      sex: "M",
      location: "U.S.A",
      program: "Msc. PlaceHolding",
    },
    {
      id: 4,
      name: "Ada Lovelace",
      age: 19,
      sex: "F",
      location: "U.S.A",
      program: "Msc. Programming",
    },
  ],
};

app.use(injectCors);

app.get("/", (req, res) => res.json({ welcome: "Welcome to our site" }));
app.get("/api/students", cors(), (req, res) => {
  if (req.query.limit && /^\d+$/.test(req.query.limit)) {
    res.json({ students: Database.students.slice(0, req.query.limit) });
    return;
  }
  res.json({ students: Database.students });
});
app.get("/api/student/:id", (req, res) => {
  if (req.params.id) {
    res.json({
      student: Database.students.filter((student) => {
        return student.id === parseInt(req.params.id);
      })[0],
    });
    return;
  }
  res.json({ student: {} });
});
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
