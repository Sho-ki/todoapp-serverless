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

export default async function addTodos(req, res) {
  const todo = req.body.todo;

  try {
    const { data: todoData, error: getDataError } = await supabase
      .from('todo_app')
      .select('*');
    errorCheck(getDataError);

    let isNoData = todoData.length === 0;
    let maxIndexNumber = 0;
    if (!isNoData) {
      const maxIndexNumberQuery = await supabase
        .from('todo_app')
        .select('index_number')
        .order('index_number', { ascending: false })
        .limit(1);
      maxIndexNumber = maxIndexNumberQuery.data[0].index_number;
    }

    const { data: insertData, error: insertError } = await supabase
      .from('todo_app')
      .insert([{ todo, index_number: maxIndexNumber + 1024 }]);

    errorCheck(insertError);

    res.status(201).send({ message: 'Successfully Created' });
  } catch (e) {
    res.status(500).send({ e });
  }
}

function errorCheck(error) {
  if (error) throw Error(error.message);
}
