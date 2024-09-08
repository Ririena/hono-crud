import { Hono } from 'hono';
import { supabase } from './utils/supabase';

const app = new Hono();

app.get('/', (c) => c.text('Hono!'))
app.post('/api/items', async (c) => {
  const { value1, value2 } = await c.req.json();
  const { data, error } = await supabase
    .from('backend')
    .insert([{ value1, value2 }]);
  
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json(data);
});

app.get('/api/items', async(c) => {
  const {data, error} = await supabase.from('backend').select('*')

  if(error) {
    return c.json({error: error.message}, 400)
  }
  return c.json(data)
})

app.get('/api/items/:id', async (c) => {
  const id = c.req.param('id');
  const { data, error } = await supabase
    .from('backend')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json(data);
});

app.put('/api/items/:id', async (c) => {
  const id = c.req.param('id');
  const { value1, value2 } = await c.req.json();
  const { data, error } = await supabase
    .from('backend')
    .update({ value1, value2 })
    .eq('id', id);
  
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json(data);
});

app.delete('/api/items/:id', async (c) => {
  const id = c.req.param('id');
  const { data, error } = await supabase
    .from('backend')
    .delete()
    .eq('id', id);
  
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json({ message: 'Item deleted' });
});


export default app;
