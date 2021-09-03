const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const util = require("util");
require("dotenv").config();
const supabasejs = require("@supabase/supabase-js");
const cors = require("cors");

const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

const viewsDirectoryPath = path.join(__dirname, "/views");

const port = process.env.PORT || 8888;

// Get api of all todo
app.get("/list-todos", async (req, res) => {
  try {
    const results = await supabase
      .from("todo_app")
      .select("*")
      .order("index_number");
    const data = results.data;
    res.json({ data });
  } catch (e) {
    res.status(500).send({ e });
  }
});

// Get api of a selected todo
app.get("/read-todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await supabase
      .from("todo_app")
      .select("*")
      .order("index_number")
      .match({ id });
    const data = results.data;
    res.json({ data });
  } catch (e) {
    res.status(500).send({ e });
  }
});

// Add todo
app.post("/add-todos", async (req, res) => {
  const todo = req.body.todo;

  try {
    const results = await supabase.from("todo_app").select("*");
    let isNoData = results.data.length === 0;
    let maxIndexNumber = 0;
    if (!isNoData) {
      const maxIndexNumberQuery = await supabase
        .from("todo_app")
        .select("index_number")
        .order("index_number", { ascending: false })
        .limit(1);
      maxIndexNumber = maxIndexNumberQuery.data[0].index_number;
    }

    await supabase
      .from("todo_app")
      .insert([{ todo, index_number: maxIndexNumber + 1024 }]);

    res.redirect("/");
  } catch (e) {
    res.status(500).send({ e });
  }
});

// Change order of todo
app.post("/order-todos/:id", async (req, res) => {
  const id = req.params.id;
  let prevElIndexNumber = req.body.prevElIndexNumber;
  let nextElIndexNumber = req.body.nextElIndexNumber;
  let currElIndexNumber;

  if (prevElIndexNumber === undefined) {
    currElIndexNumber = nextElIndexNumber - 512;
  } else if (nextElIndexNumber === undefined) {
    currElIndexNumber = prevElIndexNumber + 512;
  } else {
    currElIndexNumber = Math.floor((prevElIndexNumber + nextElIndexNumber) / 2);
  }

  try {
    await supabase
      .from("todo_app")
      .update({ index_number: currElIndexNumber })
      .match({ id });
    if (
      Math.abs(currElIndexNumber - prevElIndexNumber) <= 1 ||
      Math.abs(currElIndexNumber - nextElIndexNumber) <= 1
    ) {
      // CREATE VIEW public.todo_row_number AS
      // SELECT *, ROW_NUMBER() OVER (ORDER BY index_number) as orderedData FROM todo_app;
      // return the table with a row number to each row
      const datas = await supabase.from("todo_row_number");
      await Promise.all(
        datas.data.map(async (element) => {
          await supabase
            .from("todo_app")
            .update({ index_number: element.ordereddata * 1024 })
            .match({ id: element.id });
        })
      );
    }
    res.end();
  } catch (e) {
    res.status(500).send({ e });
  }
});

// Edit todo
app.post("/edit-todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = req.body.newValue;

  try {
    await supabase.from("todo_app").update({ todo }).match({ id });
    res.redirect("/");
  } catch (e) {
    res.status(500).send({ e });
  }
});

// Delete todo
app.post("/delete-todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await supabase.from("todo_app").delete().match({ id });
    res.redirect("/");
  } catch (e) {
    res.status(500).send({ e });
  }
});

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000/");
});
app.listen(port);
