// Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxkzGG46VCq8I_fA7UhUFlwVSuC8FPZ_k",
    authDomain: "sportsbuddy-123.firebaseapp.com",
    projectId: "sportsbuddy-123",
    storageBucket: "sportsbuddy-123.firebasestorage.app",
    messagingSenderId: "412484153786",
    appId: "1:412484153786:web:3f837d39d7ac14b4266d83"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Element
const eventsList = document.getElementById("eventsList");

// Load Events
async function loadEvents() {
    eventsList.innerHTML = ""; // Clears the list before updating
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((docSnap) => {
        const event = docSnap.data();
        const li = document.createElement("li");
        li.innerHTML = `Event: ${event.name}<br>Location: ${event.location}<br>Time: ${event.time}<br>Description: ${event.desc}`;

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
            try {
                await deleteDoc(doc(db, "events", docSnap.id));
                alert("Event deleted successfully!");
                loadEvents(); // Refresh the list
            } catch (err) {
                alert("Error deleting event: " + err.message);
            }
        });
        li.appendChild(deleteBtn);
        eventsList.appendChild(li);
    });
}
   

// Load events on page load
document.addEventListener("DOMContentLoaded", loadEvents);
