import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gshqceyiyrninkuaugjn.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzaHFjZXlpeXJuaW5rdWF1Z2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzAxOTgsImV4cCI6MjA4ODQwNjE5OH0.Ed4qnx2jHh_mxUVUN4XpLgbRDT6NorLoIrh8AK36LKo"

export const supabase = createClient(supabaseUrl, supabaseKey)