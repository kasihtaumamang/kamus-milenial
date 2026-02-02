# 🔥 Kamus Milenial - Bahasa Gaul Era 2000-an

![Classic 2000s Style](https://img.shields.io/badge/Era-2000s-ff69b4)
![Netlify Ready](https://img.shields.io/badge/Netlify-Ready-00C7B7)
![API](https://img.shields.io/badge/API-Mobile%20Ready-success)

Kamus lengkap bahasa gaul Indonesia era 2000-an dengan tampilan klasik yang nostalgis! 🎨✨

## 🌟 Fitur Utama

- **Tampilan Klasik 2000-an**: Design yang nostalgis dengan gradient warna-warni, Comic Sans, dan animasi bounce!
- **50+ Kata Gaul**: Koleksi lengkap kata-kata populer seperti alay, baper, galau, kepo, dan masih banyak lagi
- **Pencarian Real-time**: Cari kata dengan cepat menggunakan fitur pencarian yang responsif
- **Filter Kategori**: Filter berdasarkan jenis kata (adjektif, verba, nomina, dll)
- **API untuk Mobile**: RESTful API yang siap digunakan untuk aplikasi mobile
- **Responsive Design**: Tampil sempurna di desktop, tablet, dan smartphone
- **Netlify Ready**: Siap deploy dengan satu klik!

## 🚀 Quick Start

### Deploy ke Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kasihtaumamang/kamus-milenial)

### Local Development

1. Clone repository
```bash
git clone https://github.com/kasihtaumamang/kamus-milenial.git
cd kamus-milenial
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open browser
```
http://localhost:8888
```

## 📱 API Documentation

Base URL: `https://your-app.netlify.app/api`

### Endpoints

#### 1. Get All Words
```http
GET /api/words
```

**Response:**
```json
{
  "success": true,
  "count": 50,
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

#### 2. Search Words
```http
GET /api/search?q=alay
```

**Parameters:**
- `q` (required): Search keyword

**Response:**
```json
{
  "success": true,
  "query": "alay",
  "count": 1,
  "data": [...]
}
```

#### 3. Get Word by ID
```http
GET /api/word/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "kata": "alay",
    "definisi": "...",
    "contoh": "...",
    "kategori": "adjektif"
  }
}
```

#### 4. Get Random Word
```http
GET /api/random
```

**Response:**
```json
{
  "success": true,
  "data": {...}
}
```

## 🎨 Technology Stack

- **Frontend**: HTML5, CSS3 (dengan gradient dan animasi), Vanilla JavaScript
- **Backend**: Netlify Serverless Functions (Node.js)
- **Deployment**: Netlify
- **API**: RESTful JSON API dengan CORS support
- **Data**: JSON file-based dictionary

## 📂 Project Structure

```
kamus-milenial/
├── public/              # Frontend files
│   ├── index.html      # Main HTML file
│   ├── style.css       # Classic 2000s styling
│   └── script.js       # JavaScript logic
├── netlify/
│   └── functions/      # Serverless API functions
│       ├── words.js    # Get all words
│       ├── search.js   # Search endpoint
│       ├── word.js     # Get word by ID
│       └── random.js   # Random word
├── data/
│   └── dictionary.json # Dictionary data
├── netlify.toml        # Netlify configuration
├── package.json        # Dependencies
└── README.md           # Documentation
```

## 🎯 Use Cases

### Web Application
- Buka website dan mulai mencari kata gaul favorit kamu
- Filter berdasarkan kategori untuk menemukan kata yang tepat
- Bagikan dengan teman-teman untuk nostalgia bareng!

### Mobile Application
- Gunakan API untuk membuat aplikasi mobile (iOS/Android)
- Semua endpoint mendukung CORS
- Response format JSON yang mudah diparse

### Integration
```javascript
// Example: Fetch all words
fetch('https://your-app.netlify.app/api/words')
  .then(response => response.json())
  .then(data => console.log(data));

// Example: Search
fetch('https://your-app.netlify.app/api/search?q=alay')
  .then(response => response.json())
  .then(data => console.log(data));

// Example: Get random word
fetch('https://your-app.netlify.app/api/random')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🔧 Development

### Adding New Words

Edit `data/dictionary.json`:
```json
{
  "id": 51,
  "kata": "kata-baru",
  "definisi": "Definisi kata baru",
  "contoh": "Contoh penggunaan",
  "kategori": "adjektif",
  "era": "2000s"
}
```

### Customizing Style

Edit `public/style.css` untuk mengubah warna, font, atau animasi.

## 🌐 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Browsers

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more words to the dictionary
- Improve the UI/UX
- Add new features
- Fix bugs
- Improve documentation

## 💖 Credits

Made with ❤️ for the 2000s generation. Nostalgia never dies! 🔥

---

**Keywords**: kamus bahasa gaul, indonesian slang dictionary, 2000s era, alay, baper, galau, netlify, api mobile