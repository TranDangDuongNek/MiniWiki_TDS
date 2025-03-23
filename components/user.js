// constructor function
function User(
    username,
    email,
    avatar = "https://i.pinimg.com/originals/7c/d3/d4/7cd3d4a24e4812ed74b90cb8a55a692.jpg",

) {
    // tạo thuộc tính (property) cho đối tượng
    // this là từ khóa đại diện cho đối tượng được tạo ra từ constructor function
    this.username = username;
    this.email = email;
    this.avatar = avatar;

    // tạo phương thức (method) cho đối tượng
    this.displayName = function(uid) {
        console.log(`Username: ${this.username}, Email: ${this.email}`);
    };
}
