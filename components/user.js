
// constructor function
function User(
    username,
    email,
    avatar = "https://i.pinimg.com/originals/7c/d3/d4/7cd3d4a24e4812ad7d409c8ba55a5692.jpg",
    point = 0
) {
    // tạo thuộc tính (property) cho đối tượng
    // this là từ khóa đại diện cho đối tượng được tạo ra từ constructor function
    this.username = username;
    this.email = email;
    this.avatar = avatar;


    // tạo phương thức (method) cho đối tượng
    async function getUser(uid) {
        // get doc from firestore
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          // declare some var for current post
          this.username = docSnap.data().username;
          this.email = docSnap.data().email;
          this.avatar = docSnap.data().avatar;
        } else {
          // docSnap.data() will be undefined in this case
    console.log("No such document!");
        }
      }
}
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore-lite.js"; 

import {
    collection,
    getDocs,
    doc,
    setDoc,
    getDoc,
    query,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore-lite.js";

  import { firestore } from "./app.js";