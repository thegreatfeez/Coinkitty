export async function fetchCryptoPrices() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1",
  );
  const data = await response.json();
  return data;
}

export async function searchToken(query) {
  if (!query) return null;

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`,
    );
    const data = await res.json();
    return data.coins;
  } catch (error) {
    console.error("Error searching token:", error);
    return [];
  }
}

export const fetchCryptoNews = async () => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`,
  );
  const data = await response.json();
  return data.articles;
};

export const fetchEducationalContent = async () => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=blockchain+education+guide&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`,
  );
  const data = await response.json();
  return data.articles || [];
};
