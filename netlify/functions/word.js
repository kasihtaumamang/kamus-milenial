// API Function: Get word by ID
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
    // Get ID from path
    const pathParts = event.path.split('/');
    const id = parseInt(pathParts[pathParts.length - 1]);

    if (isNaN(id)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid ID format',
          example: '/api/word/1'
        })
      };
    }

    // Read dictionary data
    const dataPath = path.join(__dirname, '../../data/dictionary.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const words = JSON.parse(data);

    // Find word by ID
    const word = words.find(w => w.id === id);

    if (!word) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Word not found',
          id: id
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: word
      })
    };
  } catch (error) {
    console.error('Error getting word:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to get word',
        message: error.message
      })
    };
  }
};
