const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const supabasejs = require('@supabase/supabase-js');

const SUPABASE_KEY = process.env.SUPABASE_KEY;

const SUPABASE_URL = process.env.SUPABASE_URL;
const supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

export default async function orderTodos(req, res) {
  const id = req.query.id;
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
      .from('todo_app')
      .update({ index_number: currElIndexNumber })
      .match({ id });
    if (
      Math.abs(currElIndexNumber - prevElIndexNumber) <= 1 ||
      Math.abs(currElIndexNumber - nextElIndexNumber) <= 1
    ) {
      const { data } = await supabase.from('todo_row_number');

      await Promise.all(
        data.map(async (element) => {
          await supabase
            .from('todo_app')
            .update({ index_number: element.ordereddata * 1024 })
            .match({ id: element.id });
        })
      );
    }

    res.status(200).json({ message: 'OK' });
  } catch (e) {
    res.status(500).send({ e });
  }
}
