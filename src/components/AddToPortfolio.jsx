import React from "react";
import { fetchCryptoPrices } from "../../api";

export default function AddToPortfolio({ tokenId, isOpen, onClose, onSave }) {
    const [tokenData, setTokenData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [quantity, setQuantity] = React.useState("");
    const [purchasePrice, setPurchasePrice] = React.useState("");
    const [purchaseDate, setPurchaseDate] = React.useState("");

    React.useEffect(() => {
        if (isOpen && tokenId) {
            fetchTokenData();
        }
    }, [tokenId, isOpen]);

    const fetchTokenData = async () => {
        setLoading(true);
        setError(null);
        try {
           
            const data = await fetchCryptoPrices();
            
            
            const tokenInfo = data.find(coin => coin.id === tokenId);
            
            if (tokenInfo) {
                setTokenData(tokenInfo);
                setPurchasePrice(tokenInfo.current_price?.toString() || "");
                setPurchaseDate(new Date().toISOString().split('T')[0]);
            } else {
                setError(`Token with ID "${tokenId}" not found`);
            }
        } catch (err) {
            console.error("Error fetching token data:", err);
            setError('Failed to load token data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!quantity || parseFloat(quantity) <= 0) {
            return;
        }
        
        const portfolioData = {
            tokenId,
            quantity: parseFloat(quantity),
            purchasePrice: parseFloat(purchasePrice),
            purchaseDate,
            tokenData
        };
        onSave(portfolioData);
        resetForm();
        onClose();
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setQuantity("");
        setPurchasePrice("");
        setPurchaseDate("");
        setTokenData(null);
        setError(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 text-white p-6 rounded-lg max-w-md w-full mx-4">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p>Loading token data...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button 
                            onClick={handleCancel}
                            className="px-4 py-2 bg-slate-600 rounded-lg hover:bg-slate-500"
                        >
                            Close
                        </button>
                    </div>
                ) : tokenData ? (
                    <>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                {tokenData.image ? (
                                    <img src={tokenData.image} alt={tokenData.name} className="w-8 h-8 rounded-full" />
                                ) : (
                                    <span className="text-slate-800 font-bold">₿</span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Add {tokenData.name} to Portfolio</h2>
                                <p className="text-slate-400">Current Price: ${tokenData.current_price?.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    step="0.00000001"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Purchase Price (Optional)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={purchasePrice}
                                        onChange={(e) => setPurchasePrice(e.target.value)}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-8 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Purchase Date (Optional)</label>
                                <input
                                    type="date"
                                    value={purchaseDate}
                                    onChange={(e) => setPurchaseDate(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!quantity || parseFloat(quantity) <= 0}
                            >
                                Save to Portfolio
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}