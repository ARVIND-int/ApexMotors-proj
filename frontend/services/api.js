const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function apiRequest(path, options = {}, fallbackValue = null) {
  if (!BASE_URL) {
    return fallbackValue;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    if (fallbackValue !== null && fallbackValue !== undefined) {
      return fallbackValue;
    }
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}
