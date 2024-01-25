import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ngcbhaajqojvseinfuvr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nY2JoYWFqcW9qdnNlaW5mdXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0NzQ3NzAsImV4cCI6MjAyMDA1MDc3MH0.QAEJOCKEz-NcA50R-3T1uQjkXxQuhEnyuWUiJrUuGWo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
