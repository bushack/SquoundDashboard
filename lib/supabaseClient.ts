import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://iuzzlezbfrousibmqbyk.supabase.co";
const supabaseAnonKey = "sb_publishable_zePXgc-YH-FyHi3JWypyVA_LSGQl-oZ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);