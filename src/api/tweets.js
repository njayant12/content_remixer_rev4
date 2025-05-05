import { supabase } from './supabase';

export async function saveTweet(text) {
  const { data, error } = await supabase
    .from('saved_tweets')
    .insert([{ text }]);
  if (error) throw error;
  return data;
}

export async function getSavedTweets() {
  const { data, error } = await supabase
    .from('saved_tweets')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteTweet(id) {
  const { error } = await supabase
    .from('saved_tweets')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function updateTweet(id, newText) {
  const { data, error } = await supabase
    .from('saved_tweets')
    .update({ text: newText })
    .eq('id', id);
  if (error) throw error;
  return data;
} 