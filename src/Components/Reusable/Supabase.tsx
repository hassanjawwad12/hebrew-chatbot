import { createClient } from '@supabase/supabase-js';

//connecting to supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
export const SupabaseClient = createClient(supabaseUrl, supabaseKey);
