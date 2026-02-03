# API Documentation - Kamus Milenial

API untuk Kamus Bahasa Gaul Indonesia Era 2000-an

## Base URL

```
https://your-app.netlify.app/api
```

Replace `your-app` with your actual Netlify site name.

## Authentication

No authentication required. API is open and free to use.

## Rate Limiting

Currently no rate limiting. Please use responsibly.

## CORS

All endpoints support CORS and can be accessed from:
- Web applications
- Mobile applications (iOS/Android)
- Desktop applications

## Endpoints

### 1. Get All Words

Retrieve all dictionary entries.

**Endpoint:** `GET /api/words`

**Response:**
```json
{
  "success": true,
  "count": 104,
  "data": [
    {
      "id": 1,
      "kata": "alay",
      "definisi": "Anak Layangan atau Anak Lebay...",
      "contoh": "Gaya rambutnya alay banget deh!",
      "kategori": "adjektif",
      "era": "2000s"
    },
    ...
  ]
}
```

**Status Codes:**
- 200: Success
- 500: Server error

**Example Usage:**

```javascript
// Vanilla JavaScript
fetch('https://your-app.netlify.app/api/words')
  .then(response => response.json())
  .then(data => console.log(data));

// Using async/await
async function getAllWords() {
  const response = await fetch('https://your-app.netlify.app/api/words');
  const data = await response.json();
  return data;
}
```

```python
# Python
import requests

response = requests.get('https://your-app.netlify.app/api/words')
data = response.json()
print(data)
```

```swift
// Swift (iOS)
if let url = URL(string: "https://your-app.netlify.app/api/words") {
    URLSession.shared.dataTask(with: url) { data, response, error in
        if let data = data {
            let decoder = JSONDecoder()
            let result = try? decoder.decode(APIResponse.self, from: data)
            print(result)
        }
    }.resume()
}
```

### 2. Search Words

Search for words by keyword in word, definition, or example. Automatically provides suggestions when no results are found.

**Endpoint:** `GET /api/search`

**Query Parameters:**
- `q` (required): Search keyword
- `generate` (optional): Set to `false` to disable auto-suggestions (default: `true`)

**Example Request:**
```
GET /api/search?q=alay
GET /api/search?q=unknown&generate=true
```

**Response (Results Found):**
```json
{
  "success": true,
  "query": "alay",
  "count": 5,
  "data": [
    {
      "id": 1,
      "kata": "alay",
      "definisi": "Anak Layangan atau Anak Lebay...",
      "contoh": "Gaya rambutnya alay banget deh!",
      "kategori": "adjektif",
      "era": "2000s"
    }
  ]
}
```

**Response (No Results - Auto-Suggestions):**
```json
{
  "success": true,
  "query": "galez",
  "count": 0,
  "data": [],
  "generated": true,
  "suggestions": [
    {
      "id": 6,
      "kata": "galau",
      "definisi": "Bingung, gelisah...",
      "contoh": "...",
      "kategori": "adjektif",
      "era": "2000s"
    }
  ],
  "message": "Kata \"galez\" tidak ditemukan. Berikut adalah kata-kata yang mungkin mirip atau terkait.",
  "hint": "Gunakan /api/generate?word=galez untuk mendapatkan entry yang di-generate otomatis."
}
```

**Status Codes:**
- 200: Success
- 400: Missing query parameter
- 500: Server error

**Example Usage:**

```javascript
// JavaScript
const searchQuery = 'baper';
fetch(`https://your-app.netlify.app/api/search?q=${encodeURIComponent(searchQuery)}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

```kotlin
// Kotlin (Android)
val url = "https://your-app.netlify.app/api/search?q=baper"
val request = Request.Builder().url(url).build()
client.newCall(request).enqueue(object : Callback {
    override fun onResponse(call: Call, response: Response) {
        val body = response.body?.string()
        // Parse JSON and handle response
    }
    override fun onFailure(call: Call, e: IOException) {
        // Handle error
    }
})
```

### 3. Get Word by ID

Retrieve a specific word by its unique ID.

**Endpoint:** `GET /api/word/{id}`

**Path Parameters:**
- `id` (required): Word ID (integer)

**Example Request:**
```
GET /api/word/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "kata": "alay",
    "definisi": "Anak Layangan atau Anak Lebay...",
    "contoh": "Gaya rambutnya alay banget deh!",
    "kategori": "adjektif",
    "era": "2000s"
  }
}
```

**Status Codes:**
- 200: Success
- 400: Invalid ID format
- 404: Word not found
- 500: Server error

**Example Usage:**

```javascript
// JavaScript
const wordId = 1;
fetch(`https://your-app.netlify.app/api/word/${wordId}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

### 4. Get Random Word

Get a random word from the dictionary.

**Endpoint:** `GET /api/random`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 23,
    "kata": "gebetan",
    "definisi": "Orang yang sedang didekati atau disukai...",
    "contoh": "Gebetanku balas chat aku, seneng banget!",
    "kategori": "nomina",
    "era": "2000s"
  }
}
```

**Status Codes:**
- 200: Success
- 500: Server error

**Example Usage:**

```javascript
// JavaScript - Get Word of the Day
async function getWordOfTheDay() {
  const response = await fetch('https://your-app.netlify.app/api/random');
  const data = await response.json();
  return data.data;
}
```

### 5. Generate Word Entry

Generate or look up a word. If the word doesn't exist, automatically generates an entry with related suggestions.

**Endpoint:** `GET /api/generate`

**Query Parameters:**
- `word` or `q` (required): Word to generate or look up

**Example Request:**
```
GET /api/generate?word=gahar
GET /api/generate?q=alay
```

**Response (Word Found):**
```json
{
  "success": true,
  "found": true,
  "query": "alay",
  "data": {
    "id": 1,
    "kata": "alay",
    "definisi": "Anak Layangan atau Anak Lebay...",
    "contoh": "Gaya rambutnya alay banget deh!",
    "kategori": "adjektif",
    "era": "2000s"
  },
  "message": "Word found in dictionary"
}
```

**Response (Word Not Found - Auto-Generated):**
```json
{
  "success": true,
  "found": false,
  "query": "gahar",
  "data": {
    "id": null,
    "kata": "gahar",
    "definisi": "Kata \"gahar\" belum ada di kamus. Ini adalah hasil generate otomatis...",
    "contoh": "Contoh penggunaan: \"Lagi gahar nih.\"",
    "kategori": "unknown",
    "era": "2000s",
    "generated": true,
    "suggestions": [
      {
        "kata": "galau",
        "definisi": "Bingung, gelisah..."
      }
    ]
  },
  "relatedWords": [...],
  "message": "Word not found. Auto-generated entry with suggestions."
}
```

**Status Codes:**
- 200: Success
- 400: Missing query parameter
- 500: Server error

**Example Usage:**

```javascript
// JavaScript - Generate or lookup word
async function generateWord(word) {
  const response = await fetch(`https://your-app.netlify.app/api/generate?word=${encodeURIComponent(word)}`);
  const data = await response.json();
  
  if (data.found) {
    console.log('Word exists:', data.data);
  } else {
    console.log('Auto-generated:', data.data);
    console.log('Suggestions:', data.relatedWords);
  }
  
  return data;
}
```

```python
# Python - Generate word with fallback
import requests

def generate_word(word):
    url = f'https://your-app.netlify.app/api/generate?word={word}'
    response = requests.get(url)
    data = response.json()
    
    if data['found']:
        print(f"Word found: {data['data']['kata']}")
    else:
        print(f"Auto-generated: {data['data']['kata']}")
        if data.get('relatedWords'):
            print(f"Related words: {len(data['relatedWords'])}")
    
    return data

# Example
result = generate_word('gahar')
```

## Error Handling

All errors return a JSON response with the following format:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Response Object Structure

### Word Object

```typescript
interface Word {
  id: number;           // Unique identifier
  kata: string;         // The slang word
  definisi: string;     // Definition
  contoh: string;       // Usage example
  kategori: string;     // Word category
  era: string;          // Era (always "2000s")
}
```

### Categories (kategori)

- `adjektif` - Adjective
- `verba` - Verb
- `nomina` - Noun
- `singkatan` - Abbreviation
- `interjeksi` - Interjection
- `adverbia` - Adverb

## Best Practices

1. **Caching**: Cache responses to reduce API calls
2. **Error Handling**: Always handle errors gracefully
3. **URL Encoding**: Encode query parameters properly
4. **Retry Logic**: Implement retry logic for failed requests

## Example Mobile Apps

### React Native

```javascript
import React, { useState, useEffect } from 'react';

function DictionaryApp() {
  const [words, setWords] = useState([]);
  
  useEffect(() => {
    fetch('https://your-app.netlify.app/api/words')
      .then(response => response.json())
      .then(data => setWords(data.data))
      .catch(error => console.error(error));
  }, []);
  
  return (
    // Render your UI
  );
}
```

### Flutter

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<Word>> fetchWords() async {
  final response = await http.get(
    Uri.parse('https://your-app.netlify.app/api/words')
  );
  
  if (response.statusCode == 200) {
    final data = json.decode(response.body);
    return (data['data'] as List)
        .map((json) => Word.fromJson(json))
        .toList();
  } else {
    throw Exception('Failed to load words');
  }
}
```

## Support

For API issues or questions:
- Open an issue on GitHub
- Check the web app for API documentation modal
- Review the source code in `/netlify/functions`

## License

MIT License - Free to use for personal and commercial projects.
