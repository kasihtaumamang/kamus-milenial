// API Function: Generate word suggestions if not found
const words = require('../../data/dictionary.json');

// Common word patterns and transformations for generating suggestions
function generateWordSuggestions(query) {
  const suggestions = [];
  const queryLower = query.toLowerCase();
  const searchLength = Math.min(queryLower.length, 3);
  
  // Pattern 1: Find similar words by partial matching
  const partialMatches = words.filter(word => 
    word.kata.toLowerCase().includes(queryLower.substring(0, searchLength)) ||
    queryLower.includes(word.kata.toLowerCase().substring(0, searchLength))
  ).slice(0, 3);
  
  suggestions.push(...partialMatches);
  
  // Pattern 2: Find words with similar category if we found any matches
  if (partialMatches.length > 0) {
    const category = partialMatches[0].kategori;
    const categoryMatches = words.filter(w => 
      w.kategori === category && !suggestions.includes(w)
    ).slice(0, 2);
    suggestions.push(...categoryMatches);
  }
  
  // Pattern 3: Generate a generic entry for unknown words (preserve original casing)
  const generatedEntry = {
    id: null,
    kata: query,
    definisi: `Kata "${query}" belum ada di kamus. Ini adalah hasil generate otomatis. Kata ini mungkin merupakan bahasa gaul baru atau variasi ejaan.`,
    contoh: `Contoh penggunaan: "Lagi ${query} nih."`,
    kategori: "unknown",
    era: "2000s",
    generated: true,
    suggestions: suggestions.slice(0, 5).map(w => ({
      kata: w.kata,
      definisi: w.definisi
    }))
  };
  
  return {
    generated: generatedEntry,
    relatedWords: suggestions.slice(0, 5)
  };
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
    // Get word from query parameters
    const query = event.queryStringParameters?.word || event.queryStringParameters?.q || '';
    
    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Query parameter "word" or "q" is required',
          example: '/api/generate?word=slangword'
        })
      };
    }

    // First, check if word exists in dictionary
    const existingWord = words.find(w => 
      w.kata.toLowerCase() === query.toLowerCase()
    );
    
    if (existingWord) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          found: true,
          query: query,
          data: existingWord,
          message: 'Word found in dictionary'
        })
      };
    }

    // Generate suggestions if word not found
    const result = generateWordSuggestions(query);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        found: false,
        query: query,
        data: result.generated,
        relatedWords: result.relatedWords,
        message: 'Word not found. Auto-generated entry with suggestions.'
      })
    };
  } catch (error) {
    console.error('Error generating word:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to generate word entry',
        message: error.message
      })
    };
  }
};
