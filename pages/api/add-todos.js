const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const supabasejs = require("@supabase/supabase-js");
const cors = require("cors");

const SUPABASE_KEY = process.env.SUPABASE_KEY;

const SUPABASE_URL = process.env.SUPABASE_URL;
const supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

export default async function addTodos(req, res) {
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

    res.send("/");
  } catch (e) {
    res.status(500).send({ e });
  }
}
