// API Function: Search words
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get search query from URL parameters
    const query = event.queryStringParameters?.q || '';
    
    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Query parameter "q" is required',
          example: '/api/search?q=alay'
        })
      };
    }

    // Read dictionary data
    const dataPath = path.join(__dirname, '../../data/dictionary.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const words = JSON.parse(data);

    // Search in kata, definisi, and contoh fields
    const searchTerm = query.toLowerCase();
    const results = words.filter(word => 
      word.kata.toLowerCase().includes(searchTerm) ||
      word.definisi.toLowerCase().includes(searchTerm) ||
      word.contoh.toLowerCase().includes(searchTerm)
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        query: query,
        count: results.length,
        data: results
      })
    };
  } catch (error) {
    console.error('Error searching dictionary:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to search dictionary',
        message: error.message
      })
    };
  }
};
