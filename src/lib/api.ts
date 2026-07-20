export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as { error?: string };

  if (response.status === 401) {
    throw new ApiError(data.error ?? 'Incorrect password.', 401);
  }

  if (!response.ok) {
    throw new ApiError(data.error ?? 'Request failed.', response.status);
  }

  return data as T;
}

export async function createNewsPost(
  password: string,
  payload: Omit<import('../types').NewsPost, 'id' | 'views'> & { views?: number },
) {
  const response = await fetch('/.netlify/functions/news-posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, ...payload }),
  });
  return parseResponse<{ data: import('../types').NewsPostRow }>(response);
}

export async function updateNewsPost(
  password: string,
  id: string,
  payload: Partial<Omit<import('../types').NewsPost, 'id'>>,
) {
  const response = await fetch('/.netlify/functions/news-posts', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, id, ...payload }),
  });
  return parseResponse<{ data: import('../types').NewsPostRow }>(response);
}

export async function deleteNewsPost(password: string, id: string) {
  const response = await fetch('/.netlify/functions/news-posts', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, id }),
  });
  return parseResponse<{ success: boolean }>(response);
}

export async function createPaperPatent(
  password: string,
  payload: Omit<import('../types').IPItem, 'id'> & { id?: string },
) {
  const response = await fetch('/.netlify/functions/papers-patents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, ...payload }),
  });
  return parseResponse<{ data: import('../types').PaperPatentRow }>(response);
}

export async function updatePaperPatent(
  password: string,
  id: string,
  payload: Partial<Omit<import('../types').IPItem, 'id'>>,
) {
  const response = await fetch('/.netlify/functions/papers-patents', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, id, ...payload }),
  });
  return parseResponse<{ data: import('../types').PaperPatentRow }>(response);
}

export async function deletePaperPatent(password: string, id: string) {
  const response = await fetch('/.netlify/functions/papers-patents', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, id }),
  });
  return parseResponse<{ success: boolean }>(response);
}
