// Khóa API YouTube (Hãy thay bằng API Key của bạn)
const API_KEY = 'AIzaSyBjD-p6Tl-EilAWZV3780x7Rwn0C092W8Q'; 

// Danh sách video tìm kiếm được
let videoList = [];
let currentIndex = 0;

// Lấy các phần tử HTML cần thiết
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Tạo phần tử chứa gợi ý
const suggestionBox = document.createElement("div");
suggestionBox.setAttribute("id", "suggestionBox");
searchInput.parentNode.appendChild(suggestionBox);

// Danh sách từ khóa gợi ý
const suggestions = [
    "Tower Defense Simulator",
    "TDS best strategy",
    "How to farm money in Tower Defense Simulator",
    "Best towers in TDS",
    "TDS update 2024",
    "How to get Golden Crate in TDS",
    "Best event towers in TDS",
    "How to solo Fallen mode in TDS",
    "TDS new event leaks",
    "How to get Accelerator in TDS"
];

// Hiển thị gợi ý khi nhập
searchInput.addEventListener("input", function () {
    const userInput = searchInput.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (userInput.length > 0) {
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(userInput)
        );

        // Hiển thị tối đa 3 gợi ý
        filteredSuggestions.slice(0, 3).forEach(suggestion => {
            const suggestionItem = document.createElement("div");
            suggestionItem.textContent = suggestion;
            suggestionItem.classList.add("suggestion-item");

            // Khi click vào gợi ý, điền vào ô tìm kiếm
            suggestionItem.addEventListener("click", function () {
                searchInput.value = suggestion;
                suggestionBox.innerHTML = ""; // Ẩn danh sách sau khi chọn
            });

            suggestionBox.appendChild(suggestionItem);
        });

        // Nếu có nhiều hơn 3 gợi ý, cho phép cuộn
        if (filteredSuggestions.length > 3) {
            suggestionBox.style.overflowY = "scroll";
        } else {
            suggestionBox.style.overflowY = "hidden";
        }

        suggestionBox.style.display = "block";
    } else {
        suggestionBox.style.display = "none";
    }
});

// Ẩn danh sách gợi ý khi click ra ngoài
document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
        suggestionBox.style.display = "none";
    }
});

// Sự kiện tìm kiếm video
searchButton.addEventListener("click", searchVideos);
document.getElementById('prevButton').addEventListener('click', () => changeVideo(-1));
document.getElementById('nextButton').addEventListener('click', () => changeVideo(1));

// Hàm tìm kiếm video trên YouTube
function searchVideos() {
    const query = searchInput.value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=10&type=video`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            videoList = data.items;
            currentIndex = 0;
            displayVideo();
        });
}

// Chỉ hiển thị 1 video duy nhất
function displayVideo() {
    const videoListDiv = document.getElementById('videoList');
    videoListDiv.innerHTML = '';

    if (videoList.length > 0) {
        const video = videoList[currentIndex];
        const videoId = video.id.videoId;

        const videoElement = `
            <div class="video">
                <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${video.snippet.title}</p>
            </div>
        `;

        videoListDiv.innerHTML = videoElement;
    }
}

// Điều hướng giữa các video (chỉ một video xuất hiện tại một thời điểm)
function changeVideo(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= videoList.length) currentIndex = videoList.length - 1;
    displayVideo();
}