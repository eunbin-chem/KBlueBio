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

function mapPayloadToRow(payload, generatedId) {
  return {
    id: payload.id || generatedId || `custom-ip-${Date.now()}`,
    type: payload.type,
    title_ko: payload.titleKo,
    title_en: payload.titleEn,
    journal_ko: payload.journalKo ?? '',
    journal_en: payload.journalEn ?? '',
    authors_ko: payload.authorsKo ?? '',
    authors_en: payload.authorsEn ?? '',
    date: payload.date,
    status_ko: payload.statusKo,
    status_en: payload.statusEn,
    number: payload.number ?? null,
    summary_ko: payload.summaryKo,
    summary_en: payload.summaryEn,
    link: payload.link ?? null,
    tags: payload.tags ?? [],
    files: payload.files ?? [],
    is_published: true,
    updated_at: new Date().toISOString(),
  };
}

function mapPatchPayload(payload) {
  const updateData = {};

  if (payload.type !== undefined) updateData.type = payload.type;
  if (payload.titleKo !== undefined) updateData.title_ko = payload.titleKo;
  if (payload.titleEn !== undefined) updateData.title_en = payload.titleEn;
  if (payload.journalKo !== undefined) updateData.journal_ko = payload.journalKo;
  if (payload.journalEn !== undefined) updateData.journal_en = payload.journalEn;
  if (payload.authorsKo !== undefined) updateData.authors_ko = payload.authorsKo;
  if (payload.authorsEn !== undefined) updateData.authors_en = payload.authorsEn;
  if (payload.date !== undefined) updateData.date = payload.date;
  if (payload.statusKo !== undefined) updateData.status_ko = payload.statusKo;
  if (payload.statusEn !== undefined) updateData.status_en = payload.statusEn;
  if (payload.number !== undefined) updateData.number = payload.number;
  if (payload.summaryKo !== undefined) updateData.summary_ko = payload.summaryKo;
  if (payload.summaryEn !== undefined) updateData.summary_en = payload.summaryEn;
  if (payload.link !== undefined) updateData.link = payload.link;
  if (payload.tags !== undefined) updateData.tags = payload.tags;
  if (payload.files !== undefined) updateData.files = payload.files;

  updateData.updated_at = new Date().toISOString();
  return updateData;
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
      const { type, titleKo, titleEn, date, statusKo, statusEn, summaryKo, summaryEn } = payload;

      if (!type || !titleKo || !titleEn || !date || !statusKo || !statusEn || !summaryKo || !summaryEn) {
        return jsonResponse(400, {
          error: 'type, titleKo, titleEn, date, statusKo, statusEn, summaryKo, and summaryEn are required.',
        });
      }

      const row = mapPayloadToRow(payload);

      const { data, error } = await supabase
        .from('papers_patents')
        .insert(row)
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

      const updateData = mapPatchPayload(payload);

      const { data, error } = await supabase
        .from('papers_patents')
        .update(updateData)
        .eq('id', id)
        .eq('is_published', true)
        .select()
        .single();

      if (error) {
        return jsonResponse(500, { error: error.message });
      }

      if (!data) {
        return jsonResponse(404, { error: 'Record not found.' });
      }

      return jsonResponse(200, { data });
    }

    if (event.httpMethod === 'DELETE') {
      if (!id) {
        return jsonResponse(400, { error: 'id is required.' });
      }

      const { data, error } = await supabase
        .from('papers_patents')
        .update({ is_published: false, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('is_published', true)
        .select()
        .single();

      if (error) {
        return jsonResponse(500, { error: error.message });
      }

      if (!data) {
        return jsonResponse(404, { error: 'Record not found.' });
      }

      return jsonResponse(200, { success: true });
    }
  } catch (error) {
    return jsonResponse(500, { error: error.message || 'Unexpected server error.' });
  }

  return jsonResponse(405, { error: 'Method not allowed.' });
};
