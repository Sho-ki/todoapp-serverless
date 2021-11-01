const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const supabasejs = require('@supabase/supabase-js');
const cors = require('cors');

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

export default async function listTodos(req, res) {
  try {
    const { data, error } = await supabase
      .from('todo_app')
      .select('*')
      .order('index_number');

    if (error) throw Error(error.message);

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).send({ e });
  }
}
