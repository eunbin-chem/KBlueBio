import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, PATCH, DELETE, OPTIONS',
  'Content-Type': 'application/json',
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase server environment variables are not configured.');
  }

  return createClient(url, serviceRoleKey);
}

function verifyPassword(password) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD is not configured.');
  }
  return password === adminPassword;
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (!['POST', 'PATCH', 'DELETE'].includes(event.httpMethod)) {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body.' });
  }

  const { password, id, ...payload } = body;

  if (!password) {
    return jsonResponse(401, { error: 'Password is required.' });
  }

  try {
    if (!verifyPassword(password)) {
      return jsonResponse(401, { error: 'Incorrect password.' });
    }
  } catch (error) {
    return jsonResponse(500, { error: error.message });
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (error) {
    return jsonResponse(500, { error: error.message });
  }

  try {
    if (event.httpMethod === 'POST') {
      const { category, title, date, author, views, content, files } = payload;

      if (!category || !title || !date || !content) {
        return jsonResponse(400, { error: 'category, title, date, and content are required.' });
      }

      const { data, error } = await supabase
        .from('news_posts')
        .insert({
          category,
          title,
          date,
          author: author || '홍보팀',
          views: views ?? 0,
          content,
          files: files ?? [],
          is_published: true,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        return jsonResponse(500, { error: error.message });
      }

      return jsonResponse(201, { data });
    }

    if (event.httpMethod === 'PATCH') {
      if (!id) {
        return jsonResponse(400, { error: 'id is required.' });
      }

      const updateData = {};
      if (payload.category !== undefined) updateData.category = payload.category;
      if (payload.title !== undefined) updateData.title = payload.title;
      if (payload.date !== undefined) updateData.date = payload.date;
      if (payload.author !== undefined) updateData.author = payload.author;
      if (payload.views !== undefined) updateData.views = payload.views;
      if (payload.content !== undefined) updateData.content = payload.content;
      if (payload.files !== undefined) updateData.files = payload.files;
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('news_posts')
        .update(updateData)
        .eq('id', id)
        .eq('is_published', true)
        .select()
        .single();

      if (error) {
        return jsonResponse(500, { error: error.message });
      }

      if (!data) {
        return jsonResponse(404, { error: 'Post not found.' });
      }

      return jsonResponse(200, { data });
    }

    if (event.httpMethod === 'DELETE') {
      if (!id) {
        return jsonResponse(400, { error: 'id is required.' });
      }

      const { data, error } = await supabase
        .from('news_posts')
        .update({ is_published: false, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('is_published', true)
        .select()
        .single();

      if (error) {
        return jsonResponse(500, { error: error.message });
      }

      if (!data) {
        return jsonResponse(404, { error: 'Post not found.' });
      }

      return jsonResponse(200, { success: true });
    }
  } catch (error) {
    return jsonResponse(500, { error: error.message || 'Unexpected server error.' });
  }

  return jsonResponse(405, { error: 'Method not allowed.' });
};
