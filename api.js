
export async function fetchCryptoPrices() {
const response = await fetch(
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
);
const data = await response.json();
return data;
}

export async function searchToken(query) {
    if(!query) return null;

    try{
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
        const data = await res.json();
        return data.coins;
    } catch (error) {
        console.error("Error searching token:", error);
        return [];
    }
}