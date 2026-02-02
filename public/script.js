// Kamus Milenial - JavaScript
let allWords = [];
let filteredWords = [];

// Load dictionary data
async function loadDictionary() {
    try {
        showLoading(true);
        const response = await fetch('/api/words');
        const result = await response.json();
        
        if (result.success) {
            allWords = result.data;
            filteredWords = allWords;
            displayWords(filteredWords);
            updateStats();
        } else {
            console.error('Failed to load dictionary');
        }
    } catch (error) {
        console.error('Error loading dictionary:', error);
        // Fallback: try to load from local file
        try {
            const response = await fetch('../data/dictionary.json');
            allWords = await response.json();
            filteredWords = allWords;
            displayWords(filteredWords);
            updateStats();
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
    } finally {
        showLoading(false);
    }
}

// Display words in the word list
function displayWords(words) {
    const wordList = document.getElementById('wordList');
    const noResults = document.getElementById('noResults');
    
    if (words.length === 0) {
        wordList.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    wordList.innerHTML = words.map(word => `
        <div class="word-card" data-id="${word.id}">
            <div class="word-title">${word.kata}</div>
            <div class="word-category">${word.kategori}</div>
            <div class="word-definition">${word.definisi}</div>
            <div class="word-example">"${word.contoh}"</div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    document.getElementById('totalWords').textContent = allWords.length;
    document.getElementById('searchResults').textContent = filteredWords.length;
}

// Show/hide loading indicator
function showLoading(show) {
    const loading = document.getElementById('loadingIndicator');
    loading.style.display = show ? 'block' : 'none';
}

// Search functionality
function searchWords(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredWords = allWords;
    } else {
        filteredWords = allWords.filter(word => 
            word.kata.toLowerCase().includes(searchTerm) ||
            word.definisi.toLowerCase().includes(searchTerm) ||
            word.contoh.toLowerCase().includes(searchTerm)
        );
    }
    
    displayWords(filteredWords);
    updateStats();
}

// Filter by category
function filterByCategory(category) {
    if (category === '') {
        filteredWords = allWords;
    } else {
        filteredWords = allWords.filter(word => word.kategori === category);
    }
    
    displayWords(filteredWords);
    updateStats();
}

// Combine search and filter
function applySearchAndFilter() {
    const searchQuery = document.getElementById('searchInput').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let results = allWords;
    
    // Apply search
    if (searchQuery.trim() !== '') {
        const searchTerm = searchQuery.toLowerCase().trim();
        results = results.filter(word => 
            word.kata.toLowerCase().includes(searchTerm) ||
            word.definisi.toLowerCase().includes(searchTerm) ||
            word.contoh.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    if (categoryFilter !== '') {
        results = results.filter(word => word.kategori === categoryFilter);
    }
    
    filteredWords = results;
    displayWords(filteredWords);
    updateStats();
}

// Modal functionality
function setupModal() {
    const modal = document.getElementById('apiModal');
    const btn = document.getElementById('apiDocsLink');
    const span = document.getElementsByClassName('close')[0];
    
    btn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    }
    
    span.onclick = function() {
        modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load dictionary on page load
    loadDictionary();
    
    // Setup modal
    setupModal();
    
    // Search button click
    document.getElementById('searchBtn').addEventListener('click', function() {
        applySearchAndFilter();
    });
    
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applySearchAndFilter();
        }
    });
    
    // Real-time search
    document.getElementById('searchInput').addEventListener('input', function() {
        applySearchAndFilter();
    });
    
    // Category filter change
    document.getElementById('categoryFilter').addEventListener('change', function() {
        applySearchAndFilter();
    });
    
    // Add some fun effects
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add transition to stat cards
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease';
    });
});

// Log for debugging
console.log('Kamus Milenial loaded! 🔥');
