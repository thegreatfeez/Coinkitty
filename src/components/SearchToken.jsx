import React from "react";
import { useNavigate } from "react-router-dom";
import { searchToken } from "../../api";

export default function SearchToken({ query, onTokenClick }) {
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            try {
                const tokens = await searchToken(query);
                setResults(tokens);
            } catch (err) {
                console.log("Search error:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleTokenClick = (tokenId) => {
        navigate(`/token/${tokenId}`);
        if (onTokenClick) {
            onTokenClick();
        }
    };

    if (!query.trim()) {
        return null;
    }

    return (
        <div className="absolute w-full top-full left-0 mt-2 z-50">
            {loading && (
                <div className="px-3 py-2 text-gray-400 text-sm bg-slate-800 rounded-lg border border-slate-700">
                    Searching...
                </div>
            )}

            {!loading && results.length === 0 && query.trim() && (
                <div className="px-3 py-2 text-gray-400 text-sm bg-slate-800 rounded-lg border border-slate-700">
                    No results found for "{query}"
                </div>
            )}

            {results.length > 0 && (
                <ul className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 max-h-60 overflow-y-auto">
                    {results.map((coin) => (
                        <li
                            key={coin.id}
                            onClick={() => handleTokenClick(coin.id)}
                            className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer transition-colors duration-200"
                        >
                            <img 
                                src={coin.thumb} 
                                alt={coin.name} 
                                className="w-6 h-6 rounded-full" 
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-white">{coin.name}</p>
                                <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
                            </div>
                            <div className="text-xs text-gray-500">
                                #{coin.market_cap_rank || 'N/A'}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}