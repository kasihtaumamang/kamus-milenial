// API Function: Search words
const words = require('../../data/dictionary.json');

// Generate suggestions for words not found
function generateSuggestions(query) {
  const queryLower = query.toLowerCase();
  
  // Find similar words by partial matching
  const suggestions = words.filter(word => 
    word.kata.toLowerCase().includes(queryLower.substring(0, 3)) ||
    queryLower.includes(word.kata.toLowerCase().substring(0, 3))
  ).slice(0, 5);
  
  return suggestions;
}

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
    const autoGenerate = event.queryStringParameters?.generate !== 'false'; // Enable by default
    
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

    // Search in kata, definisi, contoh, frasa, and terjemahan fields
    const searchTerm = query.toLowerCase();
    const results = words.filter(word => 
      word.kata.toLowerCase().includes(searchTerm) ||
      word.definisi.toLowerCase().includes(searchTerm) ||
      word.contoh.toLowerCase().includes(searchTerm) ||
      (word.frasa && word.frasa.toLowerCase().includes(searchTerm)) ||
      (word.terjemahan && word.terjemahan.toLowerCase().includes(searchTerm))
    );

    // If no results and auto-generation is enabled, provide suggestions
    if (results.length === 0 && autoGenerate) {
      const suggestions = generateSuggestions(query);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          query: query,
          count: 0,
          data: [],
          generated: true,
          suggestions: suggestions,
          message: `Kata "${query}" tidak ditemukan. Berikut adalah kata-kata yang mungkin mirip atau terkait.`,
          hint: `Gunakan /api/generate?word=${encodeURIComponent(query)} untuk mendapatkan entry yang di-generate otomatis.`
        })
      };
    }

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
