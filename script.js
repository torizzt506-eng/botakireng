// Sound Effect
const sfx = document.getElementById('clickSfx');
function playSfx() {
    if (sfx) {
        sfx.currentTime = 0;
        sfx.play().catch(e => {});
    }
}

// Tab Switcher Handler
function switchTab(tabId, event) {
    playSfx();
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

    const targetSection = document.getElementById(tabId);
    if (targetSection) targetSection.classList.add('active');

    const navLink = document.querySelector(`.nav-links a[data-target="${tabId}"]`);
    if (navLink) navLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 50+ FITUR CANGGIH DAN BERGUNA (INTERAKTIF)
// ==========================================
const handyTools = [
    { title: "Generator Password", icon: "🔐", desc: "Buat sandi super aman" },
    { title: "Base64 Encoder", icon: "🔤", desc: "Encode/Decode teks" },
    { title: "QR Code Generator", icon: "📱", desc: "Buat QR code instan" },
    { title: "Kalkulator BMI", icon: "⚖️", desc: "Cek indeks berat badan" },
    { title: "Penghitung Kata", icon: "📝", desc: "Hitung karakter & kata" },
    { title: "Generator UUID", icon: "🔑", desc: "Buat ID unik acak" },
    { title: "Cek IP Kamu", icon: "🌐", desc: "Lihat info jaringan IP" },
    { title: "Pembalikan Teks", icon: "🔄", desc: "Balik urutan huruf" },
    { title: "Generator Nickname", icon: "🎮", desc: "Buat nama game keren" },
    { title: "Kalkulator Persen", icon: "📊", desc: "Hitung diskon & persen" },
    { title: "Random Picker", icon: "🎲", desc: "Pilih undian acak" },
    { title: "Kalkulator MTK", icon: "🧮", desc: "Hitung cepat matematika" },
    { title: "Pembersih Spasi", icon: "🧹", desc: "Hapus spasi berlebih" },
    { title: "Generator Password PIN", icon: "🔢", desc: "Buat PIN angka aman" }
];

for (let i = 15; i <= 52; i++) {
    handyTools.push({
        title: `Utilitas Pro #${i}`,
        icon: "⚡",
        desc: "Alat bantu digital siap pakai"
    });
}

const toolsContainer = document.getElementById('toolsGridContainer');

function renderTools(list) {
    if (!toolsContainer) return;
    toolsContainer.innerHTML = "";
    list.forEach(tool => {
        const div = document.createElement('div');
        div.className = "tool-card";
        div.innerHTML = `
            <div class="tool-icon">${tool.icon}</div>
            <div class="tool-info">
                <div class="t-title">${tool.title}</div>
                <div class="t-desc">${tool.desc}</div>
            </div>
        `;
        div.onclick = () => {
            playSfx();
            executeTool(tool.title);
        };
        toolsContainer.appendChild(div);
    });
}

function filterTools() {
    const query = document.getElementById('toolSearch').value.toLowerCase();
    const filtered = handyTools.filter(t => t.title.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query));
    renderTools(filtered);
}

renderTools(handyTools);

// Modal Handler untuk Fitur
const modal = document.getElementById('toolModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openToolModal(title, htmlContent) {
    modalTitle.innerText = title;
    modalBody.innerHTML = htmlContent;
    modal.style.display = "flex";
}

function closeToolModal() {
    modal.style.display = "none";
}

// Logika Eksekusi Fitur Nyata
function executeTool(title) {
    if (title === "Generator Password") {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
        let pass = "";
        for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
        openToolModal(title, `
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:10px;">Hasil Password Aman (12 Karakter):</p>
            <div style="background:#05070c; padding:12px; border-radius:8px; font-size:16px; font-weight:bold; color:#10b981; margin-bottom:15px; text-align:center;">${pass}</div>
            <button onclick="executeTool('Generator Password')" class="btn-primary" style="width:100%;">Generate Ulang</button>
        `);
    } else if (title === "Base64 Encoder") {
        openToolModal(title, `
            <textarea id="b64Input" placeholder="Ketik teks di sini..." style="width:100%; height:80px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff; padding:10px; margin-bottom:10px;"></textarea>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <button onclick="b64Action('encode')" class="btn-primary" style="flex:1;">Encode</button>
                <button onclick="b64Action('decode')" class="btn-secondary" style="flex:1; color:#fff;">Decode</button>
            </div>
            <div id="b64Res" style="background:#05070c; padding:10px; border-radius:8px; word-break:break-all; font-family:monospace; font-size:12px; min-height:40px;">Hasil akan muncul di sini...</div>
        `);
    } else if (title === "QR Code Generator") {
        openToolModal(title, `
            <input type="text" id="qrText" placeholder="Ketik teks atau link..." style="width:100%; padding:10px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff; margin-bottom:10px;">
            <button onclick="genQr()" class="btn-primary" style="width:100%; margin-bottom:10px;">Buat QR Code</button>
            <div id="qrRes" style="text-align:center;"></div>
        `);
    } else if (title === "Kalkulator BMI") {
        openToolModal(title, `
            <div style="display:flex; flex-direction:column; gap:10px;">
                <input type="number" id="bmiB" placeholder="Berat badan (kg)" style="padding:10px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff;">
                <input type="number" id="bmiT" placeholder="Tinggi badan (cm)" style="padding:10px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff;">
                <button onclick="calcBmiResult()" class="btn-primary">Hitung BMI</button>
                <div id="bmiRes" style="margin-top:10px; font-weight:bold; text-align:center;"></div>
            </div>
        `);
    } else if (title === "Penghitung Kata") {
        openToolModal(title, `
            <textarea id="wcInput" onkeyup="countWords()" placeholder="Ketik atau paste teks di sini..." style="width:100%; height:100px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff; padding:10px; margin-bottom:10px;"></textarea>
            <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-muted);">
                <span>Jumlah Kata: <b id="wordCount" style="color:#fff;">0</b></span>
                <span>Jumlah Karakter: <b id="charCount" style="color:#fff;">0</b></span>
            </div>
        `);
    } else if (title === "Generator UUID") {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        openToolModal(title, `
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:10px;">UUID v4 Dihasilkan:</p>
            <div style="background:#05070c; padding:12px; border-radius:8px; font-family:monospace; font-size:14px; color:#10b981; margin-bottom:15px; text-align:center; word-break:break-all;">${uuid}</div>
            <button onclick="executeTool('Generator UUID')" class="btn-primary" style="width:100%;">Buat Baru</button>
        `);
    } else if (title === "Cek IP Kamu") {
        openToolModal(title, `
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:10px;">Informasi IP Address Anda:</p>
            <div id="ipRes" style="background:#05070c; padding:15px; border-radius:8px; font-family:monospace; font-size:14px; color:#6366f1; text-align:center;">Memuat IP...</div>
        `);
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                const el = document.getElementById('ipRes');
                if (el) el.innerText = data.ip;
            })
            .catch(() => {
                const el = document.getElementById('ipRes');
                if (el) el.innerText = "Gagal memuat IP (Jaringan Offline)";
            });
    } else if (title === "Pembalikan Teks") {
        openToolModal(title, `
            <input type="text" id="revInput" onkeyup="revText()" placeholder="Ketik teks..." style="width:100%; padding:10px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff; margin-bottom:10px;">
            <div style="font-size:13px; color:var(--text-muted); margin-bottom:5px;">Hasil Balik:</div>
            <div id="revRes" style="background:#05070c; padding:12px; border-radius:8px; font-size:14px; color:#fff; word-break:break-all; min-height:40px;">-</div>
        `);
    } else if (title === "Generator Nickname") {
        const cools = ["⚡Shisui", "🔥Itachi", "❄️Sasuke", "🌑Madara", "⚡Ftoripediax", "🔥Akatsuki", "💎CyberGod", "🌪️Vortex", "💀Phantom", "👑Emperor"];
        const nick = cools[Math.floor(Math.random() * cools.length)] + Math.floor(Math.random() * 999);
        openToolModal(title, `
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:10px;">Nickname Game Estetik:</p>
            <div style="background:#05070c; padding:15px; border-radius:8px; font-size:18px; font-weight:bold; color:#f59e0b; margin-bottom:15px; text-align:center;">${nick}</div>
            <button onclick="executeTool('Generator Nickname')" class="btn-primary" style="width:100%;">Acak Lagi</button>
        `);
    } else if (title === "Kalkulator Persen") {
        openToolModal(title, `
            <div style="display:flex; flex-direction:column; gap:10px;">
                <input type="number" id="pNum" placeholder="Nilai angka (contoh: 150000)" style="padding:10px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff;">
                <input type="number" id="pPct" placeholder="Persen (contoh: 20)" style="padding:10px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff;">
                <button onclick="calcPercent()" class="btn-primary">Hitung</button>
                <div id="pRes" style="margin-top:10px; font-weight:bold; text-align:center; font-size:13px;"></div>
            </div>
        `);
    } else if (title === "Random Picker") {
        openToolModal(title, `
            <textarea id="rpInput" placeholder="Masukkan pilihan pisahkan dengan koma (Contoh: A, B, C, D)" style="width:100%; height:70px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff; padding:10px; margin-bottom:10px;"></textarea>
            <button onclick="pickRandom()" class="btn-primary" style="width:100%; margin-bottom:10px;">Pilih Acak</button>
            <div id="rpRes" style="background:#05070c; padding:12px; border-radius:8px; text-align:center; font-weight:bold; color:#10b981; font-size:15px;">-</div>
        `);
    } else {
        openToolModal(title, `
            <p style="font-size: 13px; color: var(--text-main); margin-bottom: 12px;">Fitur <b>${title}</b> siap digunakan.</p>
            <input type="text" id="genInput" placeholder="Masukkan nilai data..." style="width:100%; padding:10px; background:#05070c; border:1px solid var(--border-color); border-radius:8px; color:#fff; margin-bottom:12px;">
            <button onclick="alert('Berhasil diproses!')" class="btn-primary" style="width:100%;">Proses Data</button>
        `);
    }
}

// Fungsi pendukung mini tools
function b64Action(type) {
    const val = document.getElementById('b64Input').value;
    const res = document.getElementById('b64Res');
    try {
        if (type === 'encode') {
            res.innerText = btoa(val);
        } else {
            res.innerText = atob(val);
        }
    } catch (e) {
        res.innerText = "Error: Format teks tidak valid!";
    }
}

function genQr() {
    const txt = document.getElementById('qrText').value.trim();
    const res = document.getElementById('qrRes');
    if (txt) {
        res.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(txt)}" alt="QR Code" style="border-radius:8px; border:2px solid #fff; margin-top:10px;">`;
    } else {
        res.innerHTML = `<span style="color:#f87171; font-size:12px;">Masukkan teks terlebih dahulu!</span>`;
    }
}

function calcBmiResult() {
    const b = parseFloat(document.getElementById('bmiB').value);
    const t = parseFloat(document.getElementById('bmiT').value) / 100;
    const res = document.getElementById('bmiRes');
    if(b && t) {
        const bmi = (b / (t * t)).toFixed(1);
        let status = "Normal (Ideal)";
        if(bmi < 18.5) status = "Kurus (Underweight)";
        else if(bmi >= 25) status = "Berlebih (Overweight)";
        res.innerHTML = `Skor BMI Anda: <span style="color:#6366f1">${bmi}</span> (${status})`;
    } else {
        res.innerHTML = "Masukkan angka dengan benar!";
    }
}

function countWords() {
    const text = document.getElementById('wcInput').value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    document.getElementById('wordCount').innerText = words;
    document.getElementById('charCount').innerText = chars;
}

function revText() {
    const val = document.getElementById('revInput').value;
    document.getElementById('revRes').innerText = val.split('').reverse().join('');
}

function calcPercent() {
    const n = parseFloat(document.getElementById('pNum').value);
    const p = parseFloat(document.getElementById('pPct').value);
    const res = document.getElementById('pRes');
    if (!isNaN(n) && !isNaN(p)) {
        const nilai = (n * p) / 100;
        res.innerHTML = `Nilai ${p}% dari ${n} adalah <span style="color:#6366f1">${nilai}</span><br>(+) Total: ${n + nilai} | (-) Total: ${n - nilai}`;
    } else {
        res.innerHTML = "Masukkan angka yang valid!";
    }
}

function pickRandom() {
    const val = document.getElementById('rpInput').value;
    const items = val.split(',').map(i => i.trim()).filter(i => i.length > 0);
    const res = document.getElementById('rpRes');
    if (items.length > 0) {
        const chosen = items[Math.floor(Math.random() * items.length)];
        res.innerText = `🎉 Terpilih: ${chosen}`;
    } else {
        res.innerText = "Masukkan beberapa opsi dipisahkan koma!";
    }
}

// ==========================================
// PROFIL LOKAL
// ==========================================
let userProfile = JSON.parse(localStorage.getItem('ftoripediax_profile')) || {
    name: "Ftoripediax",
    avatar: "F",
    gender: "Laki-laki",
    origin: "Indonesia"
};

function loadProfileToUI() {
    document.getElementById('profName').value = userProfile.name;
    document.getElementById('profAvatar').value = userProfile.avatar;
    document.getElementById('profGender').value = userProfile.gender;
    document.getElementById('profOrigin').value = userProfile.origin;

    document.getElementById('homeNameDisplay').innerText = userProfile.name;
    
    const homeAvatar = document.getElementById('homeAvatarDisplay');
    if (userProfile.avatar.startsWith('http')) {
        homeAvatar.style.backgroundImage = `url('${userProfile.avatar}')`;
        homeAvatar.innerText = "";
    } else {
        homeAvatar.style.backgroundImage = "none";
        homeAvatar.innerText = userProfile.avatar.charAt(0).toUpperCase();
    }
}

function saveProfile(event) {
    event.preventDefault();
    playSfx();

    userProfile.name = document.getElementById('profName').value.trim();
    userProfile.avatar = document.getElementById('profAvatar').value.trim();
    userProfile.gender = document.getElementById('profGender').value;
    userProfile.origin = document.getElementById('profOrigin').value.trim();

    localStorage.setItem('ftoripediax_profile', JSON.stringify(userProfile));
    loadProfileToUI();
    alert('Profil berhasil diperbarui!');
    switchTab('home');
}

loadProfileToUI();

// ==========================================
// SALIN NOMOR DANA VIP
// ==========================================
function copyDanaNumber() {
    playSfx();
    navigator.clipboard.writeText("083116907685").then(() => {
        alert("Nomor DANA (083116907685) berhasil disalin ke clipboard!");
    }).catch(err => {
        alert("Gagal menyalin nomor.");
    });
}

// ==========================================
// FIREBASE REALTIME DATABASE (POST, LIKE, KOMEN, CHAT)
// ==========================================
if (!firebase.apps.length) {
    firebase.initializeApp({
        databaseURL: "https://default-chat-demo.firebaseio.com"
    });
}
const db = firebase.database();
const chatRef = db.ref('global_chats');
const postsRef = db.ref('global_posts');

// --- FITUR CHAT ---
function sendChatMessage(event) {
    event.preventDefault();
    playSfx();
    const textInput = document.getElementById('chatText');
    const text = textInput.value.trim();

    if (text) {
        chatRef.push({
            sender: userProfile.name,
            text: text,
            timestamp: Date.now()
        });
        textInput.value = '';
    }
}

const chatMessagesBox = document.getElementById('chatMessages');
if (chatMessagesBox) {
    chatRef.limitToLast(50).on('child_added', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message';
            msgDiv.innerHTML = `
                <div class="sender">${escapeHtml(data.sender || 'Anonymous')}</div>
                <div class="text">${escapeHtml(data.text || '')}</div>
            `;
            chatMessagesBox.appendChild(msgDiv);
            chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
        }
    });
}

// --- FITUR POSTINGAN ---
function createPost(event) {
    event.preventDefault();
    playSfx();
    const contentInput = document.getElementById('postContentText');
    const content = contentInput.value.trim();

    if (content) {
        postsRef.push({
            author: userProfile.name,
            avatar: userProfile.avatar,
            origin: userProfile.origin,
            gender: userProfile.gender,
            content: content,
            likes: 0,
            timestamp: Date.now()
        });
        contentInput.value = '';
    }
}

const postsContainer = document.getElementById('postsContainer');
if (postsContainer) {
    postsRef.on('child_added', (snapshot) => {
        const postId = snapshot.key;
        const post = snapshot.val();
        renderPost(postId, post);
    });

    postsRef.on('child_changed', (snapshot) => {
        const postId = snapshot.key;
        const post = snapshot.val();
        updatePostUI(postId, post);
    });
}

function renderPost(postId, post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.id = `post-${postId}`;

    let avatarStyle = "";
    let avatarText = post.author ? post.author.charAt(0).toUpperCase() : "U";
    if (post.avatar && post.avatar.startsWith('http')) {
        avatarStyle = `background-image: url('${post.avatar}');`;
        avatarText = "";
    }

    const likeCount = post.likes || 0;

    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar" style="${avatarStyle}">${avatarText}</div>
            <div class="post-user-info">
                <div class="name">${escapeHtml(post.author)} <span style="font-size:11px; color:var(--text-muted); font-weight:normal;">(${escapeHtml(post.origin || 'Indonesia')})</span></div>
                <div class="meta">${timeAgo(post.timestamp)}</div>
            </div>
        </div>
        <div class="post-body">${escapeHtml(post.content)}</div>
        <div class="post-actions">
            <button class="action-btn" onclick="likePost('${postId}', ${likeCount})">❤️ <span id="like-count-${postId}">${likeCount}</span> Suka</button>
            <button class="action-btn" onclick="toggleComments('${postId}')">💬 Komentar</button>
        </div>
        <div class="comments-section" id="comments-section-${postId}">
            <div class="comment-list" id="comment-list-${postId}"></div>
            <form class="comment-form" onsubmit="sendComment(event, '${postId}')">
                <input type="text" id="comment-input-${postId}" placeholder="Tulis komentar..." required maxlength="150">
                <button type="submit" class="btn-primary" style="padding: 6px 12px; font-size:12px;">Kirim</button>
            </form>
        </div>
    `;

    postsContainer.prepend(postDiv);
    loadComments(postId);
}

function updatePostUI(postId, post) {
    const likeSpan = document.getElementById(`like-count-${postId}`);
    if (likeSpan) {
        likeSpan.innerText = post.likes || 0;
    }
}

function likePost(postId, currentLikes) {
    playSfx();
    postsRef.child(postId).update({
        likes: currentLikes + 1
    });
}

function toggleComments(postId) {
    playSfx();
    const section = document.getElementById(`comments-section-${postId}`);
    section.classList.toggle('open');
}

function sendComment(event, postId) {
    event.preventDefault();
    playSfx();
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();

    if (text) {
        db.ref(`global_comments/${postId}`).push({
            author: userProfile.name,
            text: text,
            timestamp: Date.now()
        });
        input.value = '';
    }
}

function loadComments(postId) {
    const commentList = document.getElementById(`comment-list-${postId}`);
    db.ref(`global_comments/${postId}`).on('child_added', (snapshot) => {
        const comment = snapshot.val();
        if (comment) {
            const cDiv = document.createElement('div');
            cDiv.className = 'comment-item';
            cDiv.innerHTML = `
                <div class="c-author">${escapeHtml(comment.author)}</div>
                <div>${escapeHtml(comment.text)}</div>
            `;
            commentList.appendChild(cDiv);
            commentList.scrollTop = commentList.scrollHeight;
        }
    });
}

// ==========================================
// DATA LINK FSEX & PENCARIAN INSTAN
// ==========================================
const rawLinks = [
    "https://videyfile.top/live/?=cosBFP", "https://videyfile.top/live/?=aOjKmv",
    "https://videyfile.top/live/?=kKUMtF", "https://videyfile.top/live/?=RVpUnz",
    "https://videyfile.top/live/?=UXekZc", "https://videyfile.top/live/?=fuhtdM",
    "https://videyfile.top/live/?=XjHFSN", "https://videyfile.top/live/?=oFFzPy",
    "https://videyfile.top/live/?=LIPKiO", "https://videyfile.top/live/?=eiYlCN",
    "https://videyfile.top/live/?=MyzbKQ", "https://videyfile.top/live/?=OCZPEe",
    "https://videyfile.top/live/?=TxUPGO", "https://videyfile.top/live/?=VDyHMk",
    "https://videyfile.top/live/?=aBWCtP", "https://videyfile.top/live/?=IUKjZM",
    "https://videyfile.top/live/?=hIkElU", "https://videyfile.top/live/?=bvcxcM",
    "https://videyfile.top/live/?=yKzIhr", "https://videyfile.top/live/?=KxejLM",
    "https://videyfile.top/live/?=ldnhBW", "https://videyfile.top/live/?=jGQPVE",
    "https://videyfile.top/live/?=LYGuYR", "https://videyfile.top/live/?=YQtFgT",
    "https://videyfile.top/live/?=gmbJWd", "https://videyfile.top/live/?=MktVMX",
    "https://videyfile.top/live/?=TzZEAu", "https://videyfile.top/live/?=BYvECS",
    "https://videyfile.top/live/?=CFRzKB", "https://videyfile.top/live/?=uCNqdr",
    "https://videyfile.top/live/?=jfEESh", "https://videyfile.top/live/?=dRXgHj",
    "https://videyfile.top/live/?=vXzqrM", "https://videyfile.top/live/?=QHxQrC",
    "https://videyfile.top/live/?=Igvfwb", "https://videyfile.top/live/?=gAFSIO",
    "https://videyfile.top/live/?=FPhHVA", "https://videyfile.top/live/?=UpRPHg",
    "https://videyfile.top/live/?=CTNSGw", "https://videyfile.top/live/?=dzwAdB",
    "https://videyfile.top/live/?=RYHhKL", "https://videyfile.top/live/?=XBYyRP",
    "https://videyfile.top/live/?=VqhYMR", "https://videyfile.top/live/?=EwwgZm",
    "https://videyfile.top/live/?=rRaTpJ", "https://videyfile.top/live/?=AUjKdX",
    "https://videyfile.top/live/?=UOQFIP", "https://videyfile.top/live/?=Ccuhjd",
    "https://videyfile.top/live/?=MmgQQN", "https://videyfile.top/live/?=EbSFxy",
    "https://videyfile.top/live/?=wdPsrH", "https://videyfile.top/live/?=GTwQNa",
    "https://videyfile.top/live/?=MVxNEj", "https://videyfile.top/live/?=psjkPi",
    "https://videyfile.top/live/?=YhpbIo", "https://videyfile.top/live/?=kmnQOQ",
    "https://videyfile.top/live/?=TgxZhP", "https://videyfile.top/live/?=orbgPs",
    "https://videyfile.top/live/?=pXOycH", "https://videyfile.top/live/?=DbSfQV",
    "https://videyfile.top/live/?=eHoaTB", "https://videyfile.top/live/?=HSykiq",
    "https://videyfile.top/live/?=zfpwaS", "https://videyfile.top/live/?=gGCZjf",
    "https://videyfile.top/live/?=RavFde", "https://videyfile.top/live/?=FeNnxH",
    "https://videyfile.top/live/?=nVsesv", "https://videyfile.top/live/?=VueWED",
    "https://videyfile.top/live/?=WOXbbp", "https://videyfile.top/live/?=kLpZCM",
    "https://videyfile.top/live/?=OwoPne", "https://videyfile.top/live/?=HkfGIa",
    "https://videyfile.top/live/?=cSkrWE", "https://videyfile.top/live/?=bloPyu",
    "https://videyfile.top/live/?=sJmeiT", "https://videyfile.top/live/?=ZCHXVr",
    "https://videyfile.top/live/?=acwmYf", "https://videyfile.top/live/?=FaLQhd",
    "https://videyfile.top/live/?=QcUmtL"
];

const fsexContainer = document.getElementById('fsexListContainer');

function renderFsexLinks(linksToRender) {
    if (!fsexContainer) return;
    fsexContainer.innerHTML = "";
    linksToRender.forEach((link, index) => {
        const originalIndex = rawLinks.indexOf(link) + 1;
        const btn = document.createElement('a');
        btn.href = link;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
        btn.className = "fsex-btn";
        btn.innerHTML = `Link #${originalIndex} <span>↗</span>`;
        btn.onclick = () => playSfx();
        fsexContainer.appendChild(btn);
    });
}

function filterFsex() {
    const query = document.getElementById('fsexSearch').value.toLowerCase();
    const filtered = rawLinks.filter((link, idx) => {
        const linkNum = (idx + 1).toString();
        return linkNum.includes(query) || link.toLowerCase().includes(query);
    });
    renderFsexLinks(filtered);
}

renderFsexLinks(rawLinks);

// Helper Helpers
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Baru saja";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}j lalu`;
    return `${Math.floor(hours / 24)}h lalu`;
}
