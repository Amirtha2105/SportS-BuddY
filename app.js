// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const registerForm = document.getElementById('registerForm');
const eventForm = document.getElementById('eventForm');
const eventsList = document.getElementById('eventsList');

// Authentication - using Email ID and Password
// Login credentials

loginBtn.addEventListener('click', async () => {
    const email = prompt("Enter your email id:");
    const password = prompt("Enter the password:");
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        toggleUI(true);
    } catch (err) {
        alert(err.message);
    }
});

// Logout procedure
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert("Logged out!");
        toggleUI(false);
    } catch (err) {
        alert(err.message);
    }
});

// New user Registration before logging in
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registered successfully!");
    } catch (err) {
        alert(err.message);
    }
});

// Adding Event details here
eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('eventName').value;
    const location = document.getElementById('eventLocation').value;
    const time = document.getElementById('eventTime').value;
    const desc = document.getElementById('eventDesc').value;
    try {
        await addDoc(collection(db, "events"), { name, location, time, desc });
        alert("Event added!");
        loadEvents();
    } catch (err) {
        alert(err.message);
    }
});

// Loading Event details in Firestore database

async function loadEvents() {
    if (!eventsList) return; // Ensures that the element exists
    eventsList.innerHTML = ""; // Clears the list before uploading
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
        const event = doc.data();
        const li = document.createElement("li");
        li.textContent = `${event.name} at ${event.location} on ${event.time}.  ${event.desc}`;
        li.style.marginBottom="10px";
        li.style.fontSize="1.2rem";
        
    
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', async () => {
            await deleteDoc(doc(db, "events", doc.id));
            loadEvents();
        });
        li.appendChild(deleteBtn);

        //Appending to eventsList
        eventsList.appendChild(li);
    });
}
// Toggle UI
function toggleUI(isLoggedIn) {
    document.getElementById('registerSection').classList.toggle('hidden', isLoggedIn);
    document.getElementById('addEventSection').classList.toggle('hidden', !isLoggedIn);
    logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
}
// Load events initially
loadEvents();