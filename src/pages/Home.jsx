import { fetchCryptoPrices } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const tokensPerPage = 50;
  const totalPages = Math.ceil(prices.length / tokensPerPage);

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

 
  const startIndex = (currentPage - 1) * tokensPerPage;
  const currentTokens = prices.slice(startIndex, startIndex + tokensPerPage);

if (error) {
    return (
      <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-25 animate-ping"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            We encountered an issue while fetching your data. This could be due to a network problem or an issue with our servers. Please check your internet connection or try again later.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry
            </button>
            
            <button 
              onClick={() => navigate(-1)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-500 text-sm">
              Error details: {error}
            </p>
          </div>
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
          <div className="grid grid-cols-6 gap-6 px-6 py-4 bg-slate-700 text-sm font-medium text-gray-300 uppercase tracking-wider">
            <div>#</div>
            <div>Name</div>
            <div>Price</div>
            <div>24h Change</div>
            <div>Market Cap</div>
            <div>24h Volume</div>
          </div>

          {currentTokens.map((coin, index) => (
            <div
              key={coin.id}
              onClick={() => handleTokenClick(coin.id)}
              className={`grid grid-cols-6 gap-6 px-6 py-4 items-center border-b border-slate-700 hover:bg-slate-700 cursor-pointer transition-colors duration-200 ${index === currentTokens.length - 1 ? "border-b-0" : ""}`}
            >
              <div className="text-gray-400 font-medium">
                {startIndex + index + 1}
              </div>

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

      {prices.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}