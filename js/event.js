document.addEventListener("DOMContentLoaded", function () {
    const events = document.querySelectorAll(".event-images div");

    // Dữ liệu chứa video trailer của các event
    const eventVideos = {
        "Operation I.C.E Event": "https://www.youtube.com/embed/zbhiiS3uAfk",
        "TDS x PLS DONATE Event": "https://www.youtube.com/embed/GXBV10rh9OY",
        "Hexscape Event": "https://www.youtube.com/embed/5s6clsJMtlM",
        "The Classic Event": "https://www.youtube.com/embed/wfjkn6jI1Gw",
        "The Hunt Event": "https://www.youtube.com/embed/Brb9GMJpDJg",
        "Krampus' Revenge Event": "https://www.youtube.com/embed/4zku5lWLRiI",
        "Lunar Overture Event": "https://www.youtube.com/embed/x_v0MXniUSM",
        "Violent Night Event": "https://www.youtube.com/embed/IpYtAfVVhTE",
        "Duck Hunt Event": "https://www.youtube.com/embed/UqVBk0IC0qA",
        "Solar Eclipse Event": "https://www.youtube.com/embed/YOUR_VIDEO_ID_10"
    };
    

    // Tạo container để hiển thị thông tin chi tiết
    const eventDetails = document.createElement("div");
    eventDetails.classList.add("event-details");
    document.body.appendChild(eventDetails);

    events.forEach(event => {
        event.addEventListener("click", function () {
            const eventName = event.querySelector(".event-name").textContent;
            const eventCaption = event.querySelector(".caption").textContent;
            const eventImage = event.querySelector("img").src;
            const videoURL = eventVideos[eventName] || ""; // Lấy video từ danh sách

            // Hiển thị thông tin event + video
            eventDetails.innerHTML = `
                <div class="event-popup">
                    <span class="close-btn">&times;</span>
                    <h2>${eventName}</h2>
                    <img src="${eventImage}" alt="${eventName}">
                    <p>${eventCaption}</p>
                    ${videoURL ? `<iframe width="100%" height="315" src="${videoURL}" frameborder="0" allowfullscreen></iframe>` : ""}
                </div>
            `;

            eventDetails.style.display = "flex";

            // Đóng popup khi bấm vào dấu X
            document.querySelector(".close-btn").addEventListener("click", function () {
                eventDetails.style.display = "none";
            });
        });
    });
});
