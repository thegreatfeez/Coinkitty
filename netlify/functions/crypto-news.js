// @ts-nocheck
exports.handler = async (event, context) => {
  const API_KEY = process.env.NEWS_API_KEY;
  const { type = 'crypto' } = event.queryStringParameters || {};
  
  let url;
  if (type === 'education') {
    url = `https://newsapi.org/v2/everything?q=blockchain+education+guide&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`;
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed to fetch news', articles: [] }),
    };
  }
};