import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://hjuscxfnsigrjbemmgqs.supabase.co'
const supabaseKey = 'sb_publishable_ISScGeHISLRCRqqOlVI3rA_mBKko7CU'

const supabase = createClient(
    supabaseUrl,
    supabaseKey
)