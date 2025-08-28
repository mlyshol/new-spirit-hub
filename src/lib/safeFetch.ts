export async function safeFetchItems<T>(
  url: string,
  fallback: T
): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return fallback;
  }
}