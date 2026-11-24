// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6iItiAiyAo0czgZJpsDlZgoluWhFSv-4",
  authDomain: "marvin-portfolio-e525d.firebaseapp.com",
  projectId: "marvin-portfolio-e525d",
  storageBucket: "marvin-portfolio-e525d.firebasestorage.app",
  messagingSenderId: "867224014009",
  appId: "1:867224014009:web:c2a5688e39b1b58d501f68"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ... (rest of the code stays exactly the same)
// ---------------------------------------------------
// 1. HANDLE CONTACT FORM SUBMISSION (For contact.html)
// ---------------------------------------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const btn = contactForm.querySelector('button[type="submit"]');
        const status = document.getElementById('formStatus');

        btn.textContent = "Sending...";
        btn.disabled = true;

        try {
            // Save to Firestore Database
            await addDoc(collection(db, "messages"), {
                name: name,
                email: email,
                message: message,
                timestamp: new Date()
            });

            status.textContent = "Message sent successfully! I will reply shortly.";
            status.style.color = "green";
            contactForm.reset();
            
        } catch (error) {
            console.error("Error: ", error);
            status.textContent = "Oops! Something went wrong. Please use WhatsApp instead.";
            status.style.color = "red";
        } finally {
            btn.textContent = "Send message →";
            btn.disabled = false;
        }
    });
}

// ---------------------------------------------------
// 2. LOAD MESSAGES FOR ADMIN (For admin.html)
// ---------------------------------------------------
const adminContainer = document.getElementById('messages-container');

if (adminContainer) {
    async function loadMessages() {
        // Query the 'messages' collection, newest first
        const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
        if(querySnapshot.empty) {
            adminContainer.innerHTML = "<p>No messages yet.</p>";
            return;
        }

        let html = `<table>
            <tr><th>Date</th><th>Name</th><th>Email</th><th>Message</th></tr>`;
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.timestamp ? data.timestamp.toDate().toLocaleString() : "N/A";
            html += `<tr>
                <td>${date}</td>
                <td><strong>${data.name}</strong></td>
                <td><a href="mailto:${data.email}">${data.email}</a></td>
                <td>${data.message}</td>
            </tr>`;
        });
        
        html += `</table>`;
        adminContainer.innerHTML = html;
    }

    loadMessages();
}