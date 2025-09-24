import React from "react";

const PortfolioContext = React.createContext()

const PORTFOLIO_ACTIONS = {
    LOAD_PORTFOLIO: 'LOAD_PORTFOLIO',
    ADD_TOKEN: 'ADD_TOKEN',
    UPDATE_TOKEN: 'UPDATE_TOKEN',
    REMOVE_TOKEN: 'REMOVE_TOKEN',
    CLEAR_PORTFOLIO: 'CLEAR_PORTFOLIO'
};

function portfolioReducer(state, action) {
    switch (action.type) {
        case PORTFOLIO_ACTIONS.LOAD_PORTFOLIO:
            return action.payload;
            
        case PORTFOLIO_ACTIONS.ADD_TOKEN:
            const existingTokenIndex = state.findIndex(item => item.tokenId === action.payload.tokenId);
            
            if (existingTokenIndex >= 0) {
                const updatedState = [...state];
                updatedState[existingTokenIndex] = {
                    ...updatedState[existingTokenIndex],
                    quantity: updatedState[existingTokenIndex].quantity + action.payload.quantity,
                    lastUpdated: new Date().toISOString()
                };
                return updatedState;
            } else {
                return [...state, {
                    ...action.payload,
                    id: Date.now().toString(),
                    dateAdded: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                }];
            }
            
        case PORTFOLIO_ACTIONS.UPDATE_TOKEN:
            return state.map(item => 
                item.id === action.payload.id 
                    ? { ...item, ...action.payload.updates, lastUpdated: new Date().toISOString() }
                    : item
            );
            
        case PORTFOLIO_ACTIONS.REMOVE_TOKEN:
            return state.filter(item => item.id !== action.payload.id);
            
        case PORTFOLIO_ACTIONS.CLEAR_PORTFOLIO:
            return [];
            
        default:
            return state;
    }
}

export const usePortfolio = () => {
    const context = React.useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};

export const PortfolioProvider = ({ children }) => {
    const [portfolio, dispatch] = React.useReducer(portfolioReducer, []);
    const [isInitialized, setIsInitialized] = React.useState(false);

    
    React.useEffect(() => {
        try {
            const savedPortfolio = localStorage.getItem('cryptoPortfolio');
            
            if (savedPortfolio && savedPortfolio !== 'undefined' && savedPortfolio !== 'null') {
                const parsedPortfolio = JSON.parse(savedPortfolio);
                
                if (Array.isArray(parsedPortfolio) && parsedPortfolio.length > 0) {
                    dispatch({ type: PORTFOLIO_ACTIONS.LOAD_PORTFOLIO, payload: parsedPortfolio });
                }
            }
        } catch (error) {
            console.error('Error loading portfolio from localStorage:', error);
        } finally {
            setIsInitialized(true);
        }
    }, []);

   
    React.useEffect(() => {
        if (!isInitialized) return;
        
        
        try {
            localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
        } catch (error) {
            console.error('Error saving portfolio to localStorage:', error);
        }
    }, [portfolio, isInitialized]);

    const addToken = (tokenData) => {
        dispatch({ type: PORTFOLIO_ACTIONS.ADD_TOKEN, payload: tokenData });
    };

    const updateToken = (id, updates) => {
        dispatch({ type: PORTFOLIO_ACTIONS.UPDATE_TOKEN, payload: { id, updates } });
    };

    const removeToken = (id) => {
        dispatch({ type: PORTFOLIO_ACTIONS.REMOVE_TOKEN, payload: { id } });
    };

    const clearPortfolio = () => {
        dispatch({ type: PORTFOLIO_ACTIONS.CLEAR_PORTFOLIO });
    };

    const getPortfolioStats = () => {
        const totalValue = portfolio.reduce((sum, item) => {
            const currentValue = (item.tokenData?.current_price || 0) * item.quantity;
            return sum + currentValue;
        }, 0);

        const totalInvestment = portfolio.reduce((sum, item) => {
            const investmentValue = item.purchasePrice * item.quantity;
            return sum + investmentValue;
        }, 0);

        const totalGainLoss = totalValue - totalInvestment;
        const percentageChange = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

        return {
            totalValue,
            totalInvestment,
            totalGainLoss,
            percentageChange,
            tokenCount: portfolio.length
        };
    };

    const value = {
        portfolio,
        addToken,
        updateToken,
        removeToken,
        clearPortfolio,
        getPortfolioStats,
        actions: PORTFOLIO_ACTIONS
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};