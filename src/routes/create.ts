// routes/create.js
import { supabase } from "../utils/supabase";

export default async (c: any) => {
  try {
    const body = c.req.body;
    if (!body) {
      return c.json({ error: 'Request body is missing' }, 400);
    }

    const { value1, value2 } = body;
    const { data, error } = await supabase
      .from('your_table')
      .insert([{ column1: value1, column2: value2 }]);

    if (error) return c.json({ error: error.message }, 400);
    return c.json(data, 201);
  } catch (error) {
    return c.json({ error: 'An error occurred' }, 500);
  }
};
