// Danh sách gợi ý mẫu
const suggestions = [
    "Google",
    "GitHub",
    "Gmail",
    "Google Maps",
    "Google Drive",
    "Google Translate",
    "Chrome Extensions",
    "ChatGPT",
    "Coding Challenges",
    "Custom New Tab"
];

// Hàm xử lý tìm kiếm khi người dùng nhấn nút "Search" hoặc phím Enter
function searchGoogle() {
    var query = document.getElementById('searchInput').value; // Lấy giá trị tìm kiếm từ input
    if (query) {
        // Chuyển hướng đến Google với từ khóa tìm kiếm
        window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    } else {
        alert('Please enter a search query!');
    }
}

// Lắng nghe sự kiện khi nhấn phím Enter trong input tìm kiếm
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchGoogle(); // Gọi hàm tìm kiếm khi nhấn Enter
    }
});

// Hiển thị gợi ý khi người dùng nhập từ khóa
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = ''; // Xóa các gợi ý trước đó

    if (query.trim() === '') {
        suggestionBox.style.display = 'none'; // Ẩn gợi ý nếu input rỗng
        return;
    }

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query)
    );

    if (filteredSuggestions.length === 0) {
        suggestionBox.style.display = 'none';
        return;
    }

    suggestionBox.style.display = 'block'; // Hiển thị danh sách gợi ý

    filteredSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.classList.add('suggestion-item');
        li.onclick = () => {
            document.getElementById('searchInput').value = suggestion;
            suggestionBox.innerHTML = ''; // Ẩn gợi ý sau khi chọn
            suggestionBox.style.display = 'none';
            searchGoogle(); // Tìm kiếm từ gợi ý
        };
        suggestionBox.appendChild(li);
    });
});


// Chức năng tìm kiếm giọng nói
function searchVoice() {
    var recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        var query = event.results[0][0].transcript;
        document.getElementById('searchInput').value = query;
        searchGoogle(); // Gọi lại hàm tìm kiếm Google sau khi nhận diện giọng nói
    };

    recognition.onerror = function(event) {
        console.log('Speech recognition error: ' + event.error);
    };
}

// Chức năng tìm kiếm hình ảnh
function searchImage() {
    var query = document.getElementById('searchInput').value;
    if (query) {
        window.open("https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(query), "_blank");
    } else {
        window.open("https://images.google.com/imghp", "_blank");
    }
}