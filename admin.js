// Firebase modules 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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
const loginSection = document.getElementById("loginSection");
const adminActions = document.getElementById("adminActions");
const logoutBtn = document.getElementById("logoutBtn");

const loginForm = document.getElementById("loginForm");
const sportsForm = document.getElementById("sportsForm");
const cityForm = document.getElementById("cityForm");
const areaForm = document.getElementById("areaForm");

const sportsList = document.getElementById("sportsList");
const citiesList = document.getElementById("citiesList");
const areasList = document.getElementById("areasList");

// Login Functionality
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Admin logged in!");
        toggleUI(true);
        loadData();
    } catch (err) {
        alert(err.message);
    }
});

// Logout Functionality
logoutBtn.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Logged out!");
        toggleUI(false);
    } catch (err) {
        alert(err.message);
    }
});

// Toggle UI
function toggleUI(isLoggedIn) {
    loginSection.classList.toggle("hidden", isLoggedIn);
    adminActions.classList.toggle("hidden", !isLoggedIn);
}

// Add Sports
sportsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const sportName = document.getElementById("sportName").value;
    try {
        await addDoc(collection(db, "sports"), { name: sportName });
        alert("Sport added!");
        loadSports();
    } catch (err) {
        alert(err.message);
    }
});

// Add City
cityForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cityName = document.getElementById("cityName").value;
    try {
        await addDoc(collection(db, "cities"), { name: cityName });
        alert("City added!");
        loadCities();
    } catch (err) {
        alert(err.message);
    }
});

// Add Area
areaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const areaName = document.getElementById("areaName").value;
    try {
        await addDoc(collection(db, "areas"), { name: areaName });
        alert("Area added!");
        loadAreas();
    } catch (err) {
        alert(err.message);
    }
});

// Load Sports
async function loadSports() {
    sportsList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "sports"));
    querySnapshot.forEach((docSnap) => {
        const sport = docSnap.data();
        const li = document.createElement("li");
        li.textContent = sport.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
            await deleteDoc(doc(db, "sports", docSnap.id));
            alert("Sport deleted!");
            loadSports();
        });

        li.appendChild(deleteBtn);
        sportsList.appendChild(li);
    });
}

// Load Cities
async function loadCities() {
    citiesList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((docSnap) => {
        const city = docSnap.data();
        const li = document.createElement("li");
        li.textContent = city.name;
        citiesList.appendChild(li);
    });
}

// Load Areas
async function loadAreas() {
    areasList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "areas"));
    querySnapshot.forEach((docSnap) => {
        const area = docSnap.data();
        const li = document.createElement("li");
        li.textContent = area.name;

        areasList.appendChild(li);
    });
}

// Load Data
async function loadData() {
    loadSports();
    loadCities();
    loadAreas();
}
