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

export default async function editTodos(req, res) {
  const id = req.query.id;
  const todo = req.body.newValue;

  try {
    const { error } = await supabase
      .from('todo_app')
      .update({ todo })
      .match({ id });

    if (error) throw Error(error.message);
    res.status(200).send({ message: 'OK' });
  } catch (e) {
    res.status(500).send({ e });
  }
}
