import { createClient } from '@supabase/supabase-js';
import { DEFAULT_SITE_DATA } from '../data/defaultData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const TABLE_NAME = 'site_config';

/**
 * Fetch latest live site data from Supabase Cloud
 */
export async function fetchCloudSiteData() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('content')
      .eq('id', 'kings99_main')
      .single();

    if (error) {
      // If table/record doesn't exist yet, we initialize it
      console.warn('Supabase fetch notice (will initialize if new):', error.message);
      return null;
    }
    return data?.content || null;
  } catch (err) {
    console.error('Error fetching from Supabase cloud:', err);
    return null;
  }
}

/**
 * Save updated site data to Supabase Cloud in real-time
 */
export async function saveCloudSiteData(siteData) {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({
        id: 'kings99_main',
        content: siteData,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving to Supabase cloud:', err);
    return false;
  }
}
