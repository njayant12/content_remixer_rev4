import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgpaokvszerucsguhlrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncGFva3ZzemVydWNzZ3VobHJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTc3MzU0OSwiZXhwIjoyMDYxMzQ5NTQ5fQ.idVT2BviIslUvU5hOAtiBlHZ4Le0HGWPBhZ7bKhy-jk';

export const supabase = createClient(supabaseUrl, supabaseKey); 