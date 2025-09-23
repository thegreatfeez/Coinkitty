import { fetchCryptoPrices } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPrices() {
      try {
        setLoading(true);
        const data = await fetchCryptoPrices();
        setPrices(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching crypto prices:", err);
        setError("Failed to fetch cryptocurrency prices");
        setPrices([]);
      } finally {
        setLoading(false);
      }
    }
    getPrices();
  }, []);

  const handleTokenClick = (tokenId) => {
    navigate(`/token/${tokenId}`);
  };

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Cryptocurrency Prices</h1>
        <div className="p-4 border rounded-lg bg-red-50 border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8 text-white">
        Top Cryptocurrencies
      </h1>

      {loading ? (
        <div className="text-gray-300">Loading prices...</div>
      ) : prices.length === 0 ? (
        <div className="text-gray-300">No cryptocurrency data available.</div>
      ) : (
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-6 px-6 py-4 bg-slate-700 text-sm font-medium text-gray-300 uppercase tracking-wider">
            <div>Name</div>
            <div>Price</div>
            <div>24h Change</div>
            <div>Market Cap</div>
            <div>24h Volume</div>
          </div>

          {prices.map((coin, index) => (
            <div
              key={coin.id}
              onClick={() => handleTokenClick(coin.id)}
              className={`grid grid-cols-5 gap-6 px-6 py-4 items-center border-b border-slate-700 hover:bg-slate-700 cursor-pointer transition-colors duration-200 ${index === prices.length - 1 ? "border-b-0" : ""}`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold text-white">{coin.name}</div>
                  <div className="text-sm text-gray-400 uppercase">
                    {coin.symbol}
                  </div>
                </div>
              </div>

              <div className="text-white font-semibold">
                ${coin.current_price?.toLocaleString()}
              </div>

              <div
                className={`font-semibold ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>

              <div className="text-white">
                $
                {coin.market_cap
                  ? (coin.market_cap / 1e9).toFixed(0) + "B"
                  : "N/A"}
              </div>

              <div className="text-white">
                $
                {coin.total_volume
                  ? (coin.total_volume / 1e9).toFixed(2) + "B"
                  : "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
