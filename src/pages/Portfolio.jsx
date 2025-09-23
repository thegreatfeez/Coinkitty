import React from "react"
import { useNavigate } from "react-router-dom";

import { usePortfolio } from '../contexts/PortfolioContext';

export default function Portfolio() {
    const { portfolio, removeToken, getPortfolioStats } = usePortfolio();
    const stats = getPortfolioStats();
    const navigate = useNavigate();

    if (portfolio.length === 0) {
        return (
            <div className="bg-gray-900 text-white min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                   
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                            <p className="text-gray-400">An overview of your crypto portfolio performance.</p>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                        >
                            <span className="text-xl">+</span>
                            Add Transaction
                        </button>
                    </div>

                    
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg mb-6">No tokens in your portfolio yet.</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-medium transition-colors"
                        >
                            Add Your First Token
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
              
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                        <p className="text-gray-400">An overview of your crypto portfolio performance.</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <span className="text-xl">+</span>
                        Add Transaction
                    </button>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Total Portfolio Value</p>
                        <p className="text-3xl font-bold">${stats.totalValue.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Total Profit / Loss</p>
                        <p className={`text-3xl font-bold ${stats.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${stats.totalGainLoss.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">24h Change</p>
                        <p className={`text-3xl font-bold ${stats.percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stats.percentageChange >= 0 ? '+' : ''}{stats.percentageChange.toFixed(2)}%
                        </p>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">Holdings</h2>
                        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 text-gray-400 text-sm font-medium">
                                <div className="col-span-3">COIN</div>
                                <div className="col-span-2 text-right">PRICE</div>
                                <div className="col-span-2 text-right">HOLDINGS</div>
                                <div className="col-span-2 text-right">P/L</div>
                                <div className="col-span-3 text-right">ACTIONS</div>
                            </div>

                            
                            {portfolio.map((item) => {
                                const currentValue = (item.tokenData?.current_price || 0) * item.quantity;
                                const investmentValue = item.purchasePrice * item.quantity;
                                const gainLoss = currentValue - investmentValue;
                                const percentageChange = investmentValue > 0 ? (gainLoss / investmentValue) * 100 : 0;

                                return (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750 transition-colors">
                                       
                                        <div className="col-span-3 flex items-center gap-3">
                                            <img 
                                                src={item.tokenData?.image} 
                                                alt={item.tokenData?.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold">{item.tokenData?.name}</p>
                                                <p className="text-gray-400 text-sm">{item.tokenData?.symbol?.toUpperCase()}</p>
                                            </div>
                                        </div>

                                        
                                        <div className="col-span-2 text-right">
                                            <p className="font-semibold">${item.tokenData?.current_price?.toLocaleString() || '0.00'}</p>
                                            <p className="text-gray-400 text-sm">vs ${item.purchasePrice}</p>
                                        </div>

                                        
                                        <div className="col-span-2 text-right">
                                            <p className="font-semibold">${currentValue.toLocaleString()}</p>
                                            <p className="text-gray-400 text-sm">{item.quantity} {item.tokenData?.symbol?.toUpperCase()}</p>
                                        </div>

                                        
                                        <div className="col-span-2 text-right">
                                            <p className={`font-semibold ${gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                ${gainLoss.toLocaleString()}
                                            </p>
                                            <p className={`text-sm ${percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
                                            </p>
                                        </div>

                                        
                                        <div className="col-span-3 text-right flex justify-end gap-2">
                                            <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => removeToken(item.id)}
                                                className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Portfolio Allocation</h2>
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                            
                            <div className="flex items-center justify-center mb-8">
                                <div className="relative w-40 h-40">
                                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 opacity-80"></div>
                                    <div className="absolute inset-6 bg-gray-800 rounded-full flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400">Total</p>
                                            <p className="text-xl font-bold">${stats.totalValue.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="space-y-4">
                                {portfolio.map((item, index) => {
                                    const currentValue = (item.tokenData?.current_price || 0) * item.quantity;
                                    const percentage = stats.totalValue > 0 ? (currentValue / stats.totalValue) * 100 : 0;
                                    const colors = ['bg-blue-500', 'bg-green-400', 'bg-purple-500', 'bg-yellow-400', 'bg-red-400'];

                                    return (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                                                <span className="font-medium">{item.tokenData?.name}</span>
                                            </div>
                                            <span className="font-bold">{percentage.toFixed(2)}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}