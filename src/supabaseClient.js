import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbxvnoggpocyjgfrgopg.supabase.co'; // TODO: Replace with your actual Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieHZub2dncG9jeWpnZnJnb3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTcwMjUsImV4cCI6MjA2NzE5MzAyNX0.AwwzCofDKK3NWBLGvzk3AU8ZDshn13vdu4P5Gvo5Zw8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 