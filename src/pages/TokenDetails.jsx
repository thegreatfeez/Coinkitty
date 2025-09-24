import React from "react";
import { fetchCryptoPrices } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import AddToPortfolio from "../components/addToPortfolio";
import { usePortfolio } from "../contexts/PortfolioContext";

export default function TokenDetails() {
  const [tokenDetails, setTokenDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [timeframe, setTimeframe] = React.useState("1Y");
  const [chartType, setChartType] = React.useState("candlestick");
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const {addToken} = usePortfolio()

     const handleSaveToPortfolio = (portfolioData) => {
        addToken(portfolioData);
        alert('Token added to portfolio!');
        setIsOpen(false);
    };

  React.useEffect(() => {
    async function tokenDetail() {
      try {
        setLoading(true);
        const tokenData = await fetchCryptoPrices();
        const token = tokenData.find((coin) => coin.id === tokenId);
        setTokenDetails(token || null);
        setError(false);
      } catch (err) {
        console.error("Error fetching token data:", err);
        setError("Failed to fetch token data");
      } finally {
        setLoading(false);
      }
    }
    tokenDetail();
  }, [tokenId]);

  const generateChartData = () => {
    const dataPoints = {
      "1D": 24,
      "7D": 7,
      "30D": 30,
      "1Y": 12,
    };

    const pointCount = dataPoints[timeframe] || 24;
    const data = [];
    let basePrice = tokenDetails?.current_price || 50000;

    for (let i = 0; i < pointCount; i++) {
      const open = basePrice + (Math.random() - 0.5) * 2000;
      const close = open + (Math.random() - 0.5) * 1000;
      const high = Math.max(open, close) + Math.random() * 500;
      const low = Math.min(open, close) - Math.random() * 500;

      let timeLabel = "";
      const now = new Date();

      if (timeframe === "1D") {
        const hour = now.getHours() - (pointCount - 1 - i);
        timeLabel = `${hour < 0 ? hour + 24 : hour}:00`;
      } else if (timeframe === "7D") {
        const date = new Date(now);
        date.setDate(date.getDate() - (pointCount - 1 - i));
        timeLabel = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      } else if (timeframe === "30D") {
        const date = new Date(now);
        date.setDate(date.getDate() - (pointCount - 1 - i));
        timeLabel = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      } else if (timeframe === "1Y") {
        const date = new Date(now);
        date.setMonth(date.getMonth() - (pointCount - 1 - i));
        timeLabel = date.toLocaleDateString("en-US", { month: "short" });
      }

      data.push({
        x: i,
        time: timeLabel,
        open: Math.max(0, open),
        high: Math.max(0, high),
        low: Math.max(0, low),
        close: Math.max(0, close),
        price: Math.max(0, close),
      });
      basePrice = close;
    }
    return data;
  };

  const chartData = tokenDetails ? generateChartData() : [];

  if (loading) {
    return (
      <div className="bg-slate-900 text-white min-h-screen p-6 flex items-center justify-center">
        <div className="text-gray-300 text-xl">Loading token details...</div>
      </div>
    );
  }

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

  if (!tokenDetails) {
    return (
      <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-gray-300 text-xl">Token not found</div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return price ? `$${price.toLocaleString()}` : "N/A";
  };

  const formatPercentage = (percentage) => {
    if (!percentage) return "N/A";
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap) => {
    if (!marketCap) return "N/A";
    return `$${(marketCap / 1e9).toFixed(1)}B`;
  };

  const formatVolume = (volume) => {
    if (!volume) return "N/A";
    return `$${(volume / 1e9).toFixed(1)}B`;
  };

  const formatSupply = (supply) => {
    if (!supply) return "N/A";
    return `${(supply / 1e6).toFixed(1)}M ${tokenDetails.symbol?.toUpperCase()}`;
  };

  const Chart = ({ data, type }) => {
    if (!data.length) return null;

    const maxPrice = Math.max(
      ...data.map((d) => (type === "candlestick" ? d.high : d.price)),
    );
    const minPrice = Math.min(
      ...data.map((d) => (type === "candlestick" ? d.low : d.price)),
    );
    const priceRange = maxPrice - minPrice;
    const chartHeight = 300;
    const chartWidth = 800;
    const padding = { top: 20, right: 60, bottom: 40, left: 20 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const xStep = innerWidth / (data.length - 1);
    const candleWidth = Math.max(2, (innerWidth / data.length) * 0.7);

    const yAxisSteps = 6;
    const yAxisLabels = [];
    for (let i = 0; i <= yAxisSteps; i++) {
      const price = minPrice + (priceRange * i) / yAxisSteps;
      const y = padding.top + innerHeight - (i / yAxisSteps) * innerHeight;
      yAxisLabels.push({
        price: price,
        y: y,
        label:
          price >= 1000
            ? `${(price / 1000).toFixed(0)}K`
            : `${price.toFixed(0)}`,
      });
    }

    const xLabelStep = Math.ceil(data.length / 8);

    return (
      <div className="w-full h-80 bg-slate-800 rounded-lg p-4 relative">
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {yAxisLabels.map((label, i) => (
            <line
              key={`grid-${i}`}
              x1={padding.left}
              y1={label.y}
              x2={chartWidth - padding.right}
              y2={label.y}
              stroke="#334155"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {yAxisLabels.map((label, i) => (
            <text
              key={`y-label-${i}`}
              x={chartWidth - padding.right + 10}
              y={label.y + 4}
              fill="#94a3b8"
              fontSize="12"
              textAnchor="start"
            >
              {label.label}
            </text>
          ))}

          {type === "candlestick" ? (
            data.map((candle, index) => {
              const x = padding.left + (index * innerWidth) / (data.length - 1);
              const openY =
                padding.top +
                innerHeight -
                ((candle.open - minPrice) / priceRange) * innerHeight;
              const closeY =
                padding.top +
                innerHeight -
                ((candle.close - minPrice) / priceRange) * innerHeight;
              const highY =
                padding.top +
                innerHeight -
                ((candle.high - minPrice) / priceRange) * innerHeight;
              const lowY =
                padding.top +
                innerHeight -
                ((candle.low - minPrice) / priceRange) * innerHeight;

              const isGreen = candle.close > candle.open;
              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(Math.abs(closeY - openY), 1);

              return (
                <g key={index}>
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={isGreen ? "#10b981" : "#ef4444"}
                    strokeWidth="1"
                  />

                  <rect
                    x={x - candleWidth / 2}
                    y={bodyTop}
                    width={candleWidth}
                    height={bodyHeight}
                    fill={isGreen ? "#10b981" : "#ef4444"}
                  />
                </g>
              );
            })
          ) : (
            <>
              <defs>
                <linearGradient
                  id="priceGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <path
                d={`M ${padding.left} ${padding.top + innerHeight} ${data
                  .map((point, index) => {
                    const x =
                      padding.left + (index * innerWidth) / (data.length - 1);
                    const y =
                      padding.top +
                      innerHeight -
                      ((point.price - minPrice) / priceRange) * innerHeight;
                    return `L ${x} ${y}`;
                  })
                  .join(
                    " ",
                  )} L ${padding.left + innerWidth} ${padding.top + innerHeight} Z`}
                fill="url(#priceGradient)"
              />

              <path
                d={data
                  .map((point, index) => {
                    const x =
                      padding.left + (index * innerWidth) / (data.length - 1);
                    const y =
                      padding.top +
                      innerHeight -
                      ((point.price - minPrice) / priceRange) * innerHeight;
                    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ")}
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
              />

              {data.map((point, index) => {
                const x =
                  padding.left + (index * innerWidth) / (data.length - 1);
                const y =
                  padding.top +
                  innerHeight -
                  ((point.price - minPrice) / priceRange) * innerHeight;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#3b82f6"
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                );
              })}
            </>
          )}

          {data.map((point, index) => {
            if (index % xLabelStep !== 0 && index !== data.length - 1)
              return null;
            const x = padding.left + (index * innerWidth) / (data.length - 1);
            return (
              <text
                key={`x-label-${index}`}
                x={x}
                y={chartHeight - 10}
                fill="#94a3b8"
                fontSize="12"
                textAnchor="middle"
              >
                {point.time}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </button>

        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={tokenDetails.image}
                alt={tokenDetails.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {tokenDetails.name}
                </h1>
                <p className="text-slate-400 text-lg uppercase">
                  {tokenDetails.symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {formatPrice(tokenDetails.current_price)}
              </div>
              <div
                className={`text-lg font-semibold ${tokenDetails.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {formatPercentage(tokenDetails.price_change_percentage_24h)} ↑
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">24h Change</p>
                  <p
                    className={`text-lg font-semibold ${tokenDetails.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {formatPercentage(tokenDetails.price_change_percentage_24h)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">7d Change</p>
                  <p className="text-red-400 text-lg font-semibold">-5.1%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">30d Change</p>
                  <p className="text-green-400 text-lg font-semibold">+12.3%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Market Cap</p>
                  <p className="text-white text-lg font-semibold">
                    {formatMarketCap(tokenDetails.market_cap)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Price Chart</h2>
                <div className="flex gap-4">
                  <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
                    <button
                      onClick={() => setChartType("candlestick")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        chartType === "candlestick"
                          ? "bg-slate-600 text-white"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      Candles
                    </button>
                    <button
                      onClick={() => setChartType("line")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        chartType === "line"
                          ? "bg-slate-600 text-white"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      Line
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {["1D", "7D", "30D", "1Y"].map((period) => (
                      <button
                        key={period}
                        onClick={() => setTimeframe(period)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          timeframe === period
                            ? "bg-blue-500 text-white"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Chart data={chartData} type={chartType} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">
                About {tokenDetails.name}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {tokenDetails.name} is a cryptocurrency that operates on a
                decentralized network. It enables peer-to-peer transactions and
                is secured by cryptographic protocols. The network processes
                transactions through a distributed ledger system.
              </p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Market Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Volume (24h)</span>
                  <span className="text-white font-semibold">
                    {formatVolume(tokenDetails.total_volume)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Circulating Supply</span>
                  <span className="text-white font-semibold">
                    {formatSupply(tokenDetails.circulating_supply)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Supply</span>
                  <span className="text-white font-semibold">
                    {formatSupply(tokenDetails.total_supply)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Market Cap Rank</span>
                  <span className="text-white font-semibold">
                    #{tokenDetails.market_cap_rank || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              Add to Portfolio
            </button>
            {isOpen && (
              <AddToPortfolio
                tokenId={tokenId}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSave={handleSaveToPortfolio}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}