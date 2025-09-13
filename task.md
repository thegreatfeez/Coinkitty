🚀 Project 1: Crypto Portfolio Tracker (Without Wallet Integration)

A web app where users can search, track, and simulate their crypto holdings.

Features to Build

Homepage – Show a list of top cryptocurrencies (using a free API like CoinGecko
).

Search Functionality – Let users search for a crypto by name/symbol.

Crypto Details Page – Clicking a coin shows details: price, market cap, 24h change, chart (fetch historical data).

Add to Portfolio – User can input how much of a coin they “own” (saved in state or localStorage).

Portfolio Page – Show all saved coins with total balance and P/L calculation.

Protected Route – Portfolio page only accessible after login (mock login with React Context or simple auth state).

Performance Optimizations – Use useMemo, React.memo, useCallback for re-renders when data changes.

What You’ll Practice

Fetching and rendering API data.

State management & controlled forms (adding crypto amounts).

Routing + protected routes (login/portfolio).

Context for global state (portfolio across pages).

Code splitting & memoization for performance.

Real-world Web3 relevance (crypto tracking).