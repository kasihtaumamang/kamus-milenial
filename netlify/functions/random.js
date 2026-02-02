// API Function: Get random word
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
    // Read dictionary data
    const dataPath = path.join(__dirname, '../../data/dictionary.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const words = JSON.parse(data);

    // Get random word
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: randomWord
      })
    };
  } catch (error) {
    console.error('Error getting random word:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to get random word',
        message: error.message
      })
    };
  }
};
