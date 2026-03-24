// --- KONFIGURASI FIREBASE (Ganti dengan data lo!) ---
const firebaseConfig = {
    apiKey: "AIzaSy...",
    databaseURL: "https://proyek-lo-default-rtdb.firebaseio.com/",
    projectId: "proyek-lo",
};

// Inisialisasi
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("shadow_prompts");
const container = document.getElementById('prompt-container');

// Fungsi Inject Prompt Baru
function submitNewPrompt() {
    const title = document.getElementById('pTitle').value;
    const content = document.getElementById('pContent').value;

    if (title && content) {
        db.push({
            title: title,
            content: content,
            timestamp: Date.now()
        });
        document.getElementById('pTitle').value = "";
        document.getElementById('pContent').value = "";
    } else {
        alert("Isi data dulu!");
    }
}

// Render Kartu Real-time
db.on('child_added', (snapshot) => {
    const data = snapshot.val();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${data.title}</h3>
        <div class="prompt-text">${data.content}</div>
        <button class="copy-btn" onclick="copyText('${data.content.replace(/'/g, "\\'")}')">COPY PROMPT 📋</button>
    `;
    container.prepend(card); // Terbaru di atas
});

// Fitur Copy Mobile
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Prompt Copied! Let's Break It. 💀");
    });
}
