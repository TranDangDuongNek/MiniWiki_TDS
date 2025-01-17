// Khóa API để truy cập vào dịch vụ YouTube Data API
const API_KEY = 'AIzaSyBjD-p6Tl-EilAWZV3780x7Rwn0C092W8Q'; // Khu bỏ key youtube

// Danh sách video tìm kiếm được
let videoList = [];
// Chỉ số của video hiện tại trong danh sách
let currentIndex = 0;

// Thiết lập sự kiện cho nút tìm kiếm video
document.getElementById('searchButton').addEventListener('click', searchVideos);
// Thiết lập sự kiện cho nút quay lại video trước
document.getElementById('prevButton').addEventListener('click', () => changeVideo(-1));
// Thiết lập sự kiện cho nút chuyển sang video tiếp theo
document.getElementById('nextButton').addEventListener('click', () => changeVideo(1));

// Hàm tìm kiếm video trên YouTube dựa trên từ khóa nhập vào
function searchVideos() {
    // Lấy từ khóa tìm kiếm từ ô nhập liệu
    const query = document.getElementById('searchInput').value;
    // Tạo URL cho yêu cầu tìm kiếm video với khóa API và từ khóa tìm kiếm
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=10&type=video`;
    // số lượng video ta có thể tuỳ chỉnh maxResults=....

    // Gửi yêu cầu đến API và xử lý phản hồi
    fetch(url)
        .then(response => response.json()) // Chuyển đổi phản hồi thành định dạng JSON
        .then(data => {
            videoList = data.items; // Lưu danh sách video vào biến videoList
            currentIndex = 0; // Đặt lại chỉ số video hiện tại về 0
            const maxVideos = videoList.length; // Xác định số video tối đa
            console.log(`Số video tối đa: ${maxVideos}`); // In ra số video tối đa
            displayVideos(); // Gọi hàm để hiển thị video
        });
}

// Hàm hiển thị video hiện tại trong danh sách
function displayVideos() {
    // Lấy phần tử div để hiển thị danh sách video
    const videoListDiv = document.getElementById('videoList');
    videoListDiv.innerHTML = ''; // Xóa nội dung hiện tại của div

    // Kiểm tra nếu có video trong danh sách
    if (videoList.length > 0) {
        // Lặp qua các video và hiển thị 2 video một lần
        // for (let i = 0; i < 2; i++) {
        const video = videoList[currentIndex]; // Lấy video hiện tại
        const videoId = video.id.videoId; // Lấy ID video
        // Tạo nội dung HTML cho video
        const videoElement = `
            <div class="video">
                <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${video.snippet.title}</p>
            </div>
        `;
        videoListDiv.innerHTML = videoElement; // Hiển thị video
        }
    }
// }
// Hàm thay đổi video hiện tại (trước hoặc sau)
function changeVideo(direction) {
    currentIndex += direction; // Thay đổi chỉ số video hiện tại
    // Đảm bảo chỉ số không nhỏ hơn 0
    if (currentIndex < 0) currentIndex = 0;
    // Đảm bảo chỉ số không vượt quá số lượng video trong danh sách
    if (currentIndex >= videoList.length) currentIndex = videoList.length - 1;
    displayVideos(); // Gọi hàm để hiển thị video mới
}
