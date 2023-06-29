import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pfrjvsrdamasxbbewvxg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcmp2c3JkYW1hc3hiYmV3dnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxOTM1NDQsImV4cCI6MjAwMjc2OTU0NH0.6AKXrYVmdVpNevl7RLA2sU13tCAQSmPYnT5G1fhdSdE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
