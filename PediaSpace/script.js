const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const toast = (msg) => {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove("show"), 2600);
};

/* ---------- DATA (simulasi front-end) ---------- */
// Divisi standar. Tambah/ubah di sini untuk mengubah pilihan di form "Tambah Kegiatan".
const DIVISIONS = ["Acara", "Konsumsi", "Dekorasi", "Humas", "PDD", "Desain"];

// ===== DAFTAR KEGIATAN =====
// img       : FOTO yang tampil di kartu halaman depan.
//             Simpan file di folder assets/ lalu ganti path-nya (contoh: "assets/kegiatan-1.jpg").
//             Kalau file tidak ada, kartu otomatis menampilkan warna + nomor.
// divisions : divisi yang dibutuhkan. Ini yang jadi pilihan di form pendaftaran.
const activities = [
  {
    id: 1,
    name: "Seminar × Go To School 2026",
    category: "NON HIMA",
    date: "05—07 Juli 2026",
    status: "On Going",
    desc: "Program kerja untuk memperkenalkan dan mempromosikan Pendidikan Multimedia kepada siswa SMA/SMK.",
    img: "assets/kegiatanGTS.JPG" /* FOTO: ganti path ini */,
    fb: "fb1",
    featured: true,
    divisions: ["Acara", "Humas", "PDD", "Desain"],
  },
  {
    id: 2,
    name: "Pedia Competition 2026",
    category: "NON HIMA",
    date: "21—26 Oktober 2026",
    status: "On Going",
    desc: "Ajang kompetisi dan kreativitas mahasiswa.",
    img: "assets/kegiatanPEDITION.jpeg" /* FOTO: ganti path ini */,
    fb: "fb2",
    divisions: ["Acara", "Konsumsi", "Dekorasi", "Desain"],
  },
  {
    id: 3,
    name: "Triwulan 2026",
    category: "HIMA",
    date: "06 Februari 2026",
    status: "Done",
    desc: "Kegiatan evaluasi dan koordinasi internal.",
    img: "assets/kegiatanTRIWULAN.jpeg" /* FOTO: ganti path ini */,
    fb: "fb3",
    divisions: DIVISIONS.slice(),
  },
  {
    id: 4,
    name: "Masa Bimbingan Pendidikan Multimedia 2026",
    category: "NON HIMA",
    date: "13—15 November 2026",
    status: "Coming Soon",
    desc: "Kegiatan pendampingan dan pengembangan mahasiswa Pendidikan Multimedia.",
    img: "assets/kegiatanMBPM.JPG" /* FOTO: ganti path ini */,
    fb: "fb4",
    divisions: DIVISIONS.slice(),
  },
];

// ===== DATA PENDAFTAR =====
// portfolio : { name, url } -> url = lokasi file portofolio (simpan di assets/portofolio/). null = tidak mengunggah.
const applications = [
  {
    name: "Putri Alfitri Audina",
    year: "2024",
    phone: "0812-0000-0001",
    activity: "Seminar × Go To School 2026",
    division: "Acara",
    division2: "Desain",
    reason1:
      "Saya suka mengatur alur kegiatan dan pernah menjadi koordinator acara di organisasi sekolah.",
    reason2: "Saya bisa membantu membuat materi visual kegiatan.",
    move: "Ya",
    portfolio: {
      name: "portofolio-putri.pdf",
      url: "assets/portofolio/putri.pdf",
    },
    date: "05 Juli 2026",
    status: "Diterima",
  },
  {
    name: "Putri Alfitri Audina",
    year: "2024",
    phone: "0812-0000-0001",
    activity: "Masa Bimbingan Pendidikan Multimedia 2026",
    division: "Desain",
    division2: "PDD",
    reason1:
      "Saya terbiasa memakai Figma dan Illustrator untuk poster dan feed.",
    reason2: "Saya ingin belajar dokumentasi dan editing video.",
    move: "Ya",
    portfolio: null,
    date: "13 Nov 2026",
    status: "Menunggu",
  },
  {
    name: "Asep Surasep",
    year: "2023",
    phone: "0812-0000-0002",
    activity: "Seminar × Go To School 2026",
    division: "Humas",
    division2: "Acara",
    reason1: "Saya nyaman berkomunikasi dengan pihak luar dan sekolah.",
    reason2: "Saya ingin ikut mengatur jalannya acara.",
    move: "Tidak",
    portfolio: null,
    date: "05 Juli 2026",
    status: "Diterima",
  },
  {
    name: "Shafira Firzha Nur A.",
    year: "2025",
    phone: "0812-0000-0003",
    activity: "Pedia Competition 2026",
    division: "PDD",
    division2: "Desain",
    reason1: "Saya punya pengalaman foto dan video untuk dokumentasi.",
    reason2: "Saya bisa membantu desain publikasi.",
    move: "Ya",
    portfolio: {
      name: "reel-shafira.pdf",
      url: "assets/portofolio/shafira.pdf",
    },
    date: "30 Okt 2026",
    status: "Ditolak",
  },
];
const certificates = [
  { name: "Seminar X GTS 2026", date: "30 Oktober 2026", status: "Terbit" },
  { name: "Pedia Competition 2026", date: "30 Oktober 2026", status: "Terbit" },
  { name: "MBPM 2026", date: "13 November 2026", status: "Terbit" },
  { name: "Seminar Ngopi 2026", date: "30 Oktober 2026", status: "Terbit" },
];
const MENUS = {
  user: [
    ["overview", "⌂", "Beranda"],
    ["apps", "▣", "Pendaftaran"],
    ["certs", "◇", "Sertifikat"],
  ],
  admin: [
    ["overview", "⌂", "Beranda"],
    ["acts", "▦", "Kelola Kegiatan"],
    ["apps", "▣", "Kelola Pendaftaran"],
    ["certs", "◇", "Sertifikat"],
  ],
};

/* ---------- SESI ---------- */
const KEY = "pediaSession";
let session = null;
try {
  session = JSON.parse(localStorage.getItem(KEY) || "null");
} catch {
  session = null;
}
const save = () => {
  try {
    session
      ? localStorage.setItem(KEY, JSON.stringify(session))
      : localStorage.removeItem(KEY);
  } catch {}
};
const first = (n) => n.split(" ")[0];

// Mengatur navbar: guest = Tentang & Kontak, member = Beranda, Proker & Kegiatan, Sertifikat + profile
function applySession() {
  document.body.dataset.auth = session ? session.role : "guest";
  if (session) {
    const ini = session.name.charAt(0).toUpperCase();
    $("#navAvatar").textContent = ini;
    $("#navName").textContent = first(session.name);
    $("#homeName").textContent = first(session.name);
    $("#dashAvatar").textContent = ini;
    $("#dashName").textContent = first(session.name);
    $("#dashSub").textContent =
      session.role === "admin" ? "Admin HIMA" : session.nim;
  }
}

/* ---------- NAVBAR ---------- */
$("#menuBtn").onclick = () => $("#mainNav").classList.toggle("show");
$$("#mainNav a").forEach(
  (a) => (a.onclick = () => $("#mainNav").classList.remove("show")),
);
$("#profileBtn").onclick = () => openDash("overview");
$("#homeDash").onclick = () => openDash("overview");

/* ---------- MODAL ---------- */
function openModal(id) {
  $("#" + id).classList.add("show");
  document.body.classList.add("lock");
}
function closeModals() {
  $$(".modal").forEach((m) => m.classList.remove("show"));
  document.body.classList.remove("lock");
}
$$("[data-open]").forEach((b) => (b.onclick = () => openModal(b.dataset.open)));
$("#loginBtn").onclick = () => openModal("loginModal");
$$("[data-close]").forEach((b) => (b.onclick = closeModals));
$$(".modal").forEach((m) =>
  m.addEventListener("click", (e) => {
    if (e.target === m) closeModals();
  }),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});

/* ---------- LOGIN / LOGOUT ---------- */
let role = "user";
$$(".role").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".role").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      role = b.dataset.role;
    }),
);
$("#loginForm").onsubmit = (e) => {
  e.preventDefault();
  const u = $("#loginUser").value.trim(),
    p = $("#loginPass").value;
  if (role === "admin") {
    if (u !== "admin" || p !== "admin123")
      return toast("Login admin demo: admin / admin123");
    session = { role: "admin", name: "Admin HIMA", nim: "admin" };
  } else {
    session = {
      role: "user",
      name: u === "2408764" ? "Putri Alfitri Audina" : u,
      nim: u,
    };
  }
  save();
  applySession();
  closeModals();
  e.target.reset();
  window.scrollTo(0, 0);
  toast("Selamat datang di PediaSpace.");
};
$("#logoutBtn").onclick = () => {
  session = null;
  save();
  applySession();
  closeDash();
  toast("Kamu sudah logout.");
};

/* ---------- KEGIATAN (halaman utama) ---------- */
let filter = "all";
const matches = (a) =>
  filter === "all" ||
  (filter === "hima" && a.category === "HIMA") ||
  (filter === "non-hima" && a.category === "NON HIMA") ||
  (filter === "ongoing" && a.status === "On Going");
function renderActivities() {
  const list = activities.filter(matches);
  $("#activityGrid").innerHTML = list.length
    ? list
        .map((a) => {
          const cls =
            a.status === "Done"
              ? "done"
              : a.status === "Coming Soon"
                ? "coming"
                : "";
          return `<article class="activity-card ${a.featured && filter === "all" ? "featured" : ""}">
<div class="a-photo"><div class="fb ${a.fb}">${String(a.id).padStart(2, "0")}</div>${a.img ? `<img src="${esc(a.img)}" alt="${esc(a.name)}" onerror="this.remove()">` : ""}<span class="tag ${cls}">${esc(a.status)}</span></div>
<div class="a-body"><div class="meta"><span>${esc(a.category)}</span><span>${esc(a.date)}</span></div><h3>${esc(a.name)}</h3><p>${esc(a.desc)}</p>
${a.status !== "Done" && a.divisions ? `<div class="chips">${a.divisions.map((d) => `<span class="chip">${esc(d)}</span>`).join("")}</div>` : ""}<div class="a-bottom">${a.status === "Done" ? '<span class="done-note">Pendaftaran ditutup</span>' : `<span>Open recruitment</span><button class="apply" data-apply="${a.id}">Daftar</button>`}</div></div></article>`;
        })
        .join("")
    : '<p class="empty">Belum ada kegiatan di kategori ini.</p>';
  $$("[data-apply]").forEach(
    (b) => (b.onclick = () => openApply(+b.dataset.apply)),
  );
}
$$(".filter").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".filter").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      filter = b.dataset.filter;
      renderActivities();
    }),
);

/* ---------- PENDAFTARAN ---------- */
// Pilihan divisi mengikuti divisi yang dibutuhkan di kegiatan terpilih
function fillDivisions(actName) {
  const act = activities.find((x) => x.name === actName);
  const divs =
    act && act.divisions && act.divisions.length ? act.divisions : DIVISIONS;
  $("#appDiv1").innerHTML = divs
    .map((d) => `<option>${esc(d)}</option>`)
    .join("");
  $("#appDiv2").innerHTML = divs
    .slice()
    .reverse()
    .map((d) => `<option>${esc(d)}</option>`)
    .join("");
}
function openApply(id) {
  $("#appActivity").innerHTML = activities
    .filter((x) => x.status !== "Done")
    .map(
      (x) => `<option ${x.id === id ? "selected" : ""}>${esc(x.name)}</option>`,
    )
    .join("");
  fillDivisions($("#appActivity").value);
  $("#appName").value = session && session.role === "user" ? session.name : "";
  openModal("applyModal");
}
$("#appActivity").onchange = () => fillDivisions($("#appActivity").value);
$("#applyForm").onsubmit = (e) => {
  e.preventDefault();
  const f = $("#appPortfolio").files[0];
  applications.unshift({
    name: $("#appName").value.trim(),
    year: $("#appYear").value.trim(),
    phone: $("#appPhone").value.trim(),
    activity: $("#appActivity").value,
    division: $("#appDiv1").value,
    division2: $("#appDiv2").value,
    reason1: $("#appReason").value.trim(),
    reason2: $("#appReason2").value.trim(),
    move: $("#appMove").value,
    // Portofolio yang diupload hanya bisa dibuka selama halaman belum di-refresh (belum ada backend)
    portfolio: f ? { name: f.name, url: URL.createObjectURL(f) } : null,
    date: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    status: "Menunggu",
  });
  closeModals();
  e.target.reset();
  toast("Pendaftaran berhasil dikirim.");
  if (document.body.classList.contains("dash")) renderDash();
};

/* ---------- SERTIFIKAT & KONTAK ---------- */
$("#certForm").onsubmit = (e) => {
  e.preventDefault();
  const v = $("#certInput").value.trim();
  $("#certResult").textContent = v
    ? `Maaf, Sertifikat belum ditemukan untuk ${v}.`
    : "Masukkan nomor sertifikat atau NIM.";
};
$("#contactForm").onsubmit = (e) => {
  e.preventDefault();
  e.target.reset();
  toast("Pesan terkirim. Terima kasih!");
};

/* ---------- DASHBOARD ---------- */
let page = "overview";
const pill = (s) =>
  `<span class="pill ${s === "Diterima" ? "accept" : s === "Ditolak" ? "reject" : ""}">${esc(s)}</span>`;
const table = (heads, rows) =>
  `<div class="table-wrap"><table><thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
const certList = () =>
  `<div class="cert-list">${certificates.map((c) => `<div class="cert-item"><div><h3>${esc(c.name)}</h3><p>${esc(c.date)} · ${esc(c.status)}</p></div><button class="btn primary sm" data-act="toast:Download sertifikat demo.">Unduh ↗</button></div>`).join("")}</div>`;

function openDash(p = "overview") {
  page = p;
  document.body.classList.add("dash");
  window.scrollTo(0, 0);
  renderDash();
}
function closeDash() {
  document.body.classList.remove("dash");
  window.scrollTo(0, 0);
}
$("#backBtn").onclick = closeDash;

function renderDash() {
  const isAdmin = session.role === "admin";
  const menu = MENUS[session.role];
  if (!menu.some((m) => m[0] === page)) page = "overview";
  $("#dashRole").textContent = isAdmin
    ? "PEDIASPACE / ADMIN"
    : "PEDIASPACE / MAHASISWA";
  $("#dashTitle").textContent =
    page === "overview"
      ? isAdmin
        ? "Admin Dashboard"
        : `Halo, ${first(session.name)}!`
      : menu.find((m) => m[0] === page)[2];
  $("#dashNav").innerHTML = menu
    .map(
      (m) =>
        `<button class="dash-link ${m[0] === page ? "active" : ""}" data-page="${m[0]}">${m[1]} <span>${m[2]}</span></button>`,
    )
    .join("");
  $$("#dashNav .dash-link").forEach(
    (b) =>
      (b.onclick = () => {
        page = b.dataset.page;
        renderDash();
      }),
  );

  const mine = applications.filter((a) => a.name === session.name);
  let html = "";
  if (page === "overview" && !isAdmin) {
    html = `<p class="muted">Selamat datang kembali. Ini ringkasan aktivitasmu.</p>
<div class="dash-stats"><div><span>Pendaftaran</span><b>${mine.length}</b></div><div><span>Diterima</span><b>${mine.filter((a) => a.status === "Diterima").length}</b></div><div><span>Sertifikat</span><b>${certificates.length}</b></div></div>
<div class="dash-card"><div class="card-title"><h2>Informasi terbaru</h2></div><div class="notice"><b>Pengumuman:</b> Kamu diterima di pendaftaran <b>Seminar Multimedia 2026</b> sebagai staf divisi Acara.</div></div>`;
  } else if (page === "overview") {
    const wait = applications.filter((a) => a.status === "Menunggu").length;
    html = `<p class="muted">Kelola informasi kegiatan, pendaftar, dan sertifikat.</p>
<div class="dash-stats"><div><span>Total kegiatan</span><b>${activities.length}</b></div><div><span>Pendaftar</span><b>${applications.length}</b></div><div><span>Sertifikat terbit</span><b>${certificates.length}</b></div><div><span>Menunggu review</span><b>${wait}</b></div></div>
<div class="dash-card"><div class="card-title"><h2>Aktivitas terbaru</h2></div><div class="feed"><p><b>${wait} pendaftar</b> menunggu verifikasi.</p><p>Kegiatan <b>${esc(activities[0] ? activities[0].name : "-")}</b> masih aktif.</p></div></div>`;
  } else if (page === "apps" && !isAdmin) {
    html =
      `<div class="card-title"><h2>Pendaftaran saya</h2><button class="btn primary sm" data-act="new-app">+ Daftar kegiatan</button></div>` +
      table(
        ["Kegiatan", "Divisi", "Tanggal", "Status"],
        mine.map(
          (a) =>
            `<tr><td><b>${esc(a.activity)}</b></td><td>${esc(a.division)}</td><td>${esc(a.date)}</td><td>${pill(a.status)}</td></tr>`,
        ),
      );
  } else if (page === "apps") {
    html =
      `<div class="card-title"><h2>Kelola pendaftaran</h2><span class="pill">${applications.length} pendaftar</span></div>` +
      table(
        ["Nama peserta", "Kegiatan", "Divisi", "Status", "Aksi"],
        applications.map(
          (a, i) =>
            `<tr><td><b>${esc(a.name)}</b></td><td>${esc(a.activity)}</td><td>${esc(a.division)}</td><td>${pill(a.status)}</td><td><button class="t-act" data-act="detail:${i}">Detail</button>${a.status === "Menunggu" ? `<button class="t-act" data-act="set:${i}:Diterima">Terima</button><button class="t-act" data-act="set:${i}:Ditolak">Tolak</button>` : ""}</td></tr>`,
        ),
      );
  } else if (page === "acts") {
    html =
      `<div class="card-title"><h2>Kelola kegiatan</h2><button class="btn primary sm" data-act="add-act">+ Tambah kegiatan</button></div>` +
      table(
        ["Nama kegiatan", "Kategori", "Tanggal", "Status", "Divisi", "Aksi"],
        activities.map(
          (a) =>
            `<tr><td><b>${esc(a.name)}</b></td><td>${esc(a.category)}</td><td>${esc(a.date)}</td><td><span class="pill">${esc(a.status)}</span></td><td>${(a.divisions || []).map((d) => `<span class="chip">${esc(d)}</span>`).join("")}</td><td><button class="t-act" data-act="toast:Fitur edit siap dikembangkan.">Edit</button><button class="t-act" data-act="del:${a.id}">Hapus</button></td></tr>`,
        ),
      );
  } else if (isAdmin) {
    html =
      `<div class="card-title"><h2>Kelola sertifikat</h2><button class="btn primary sm" data-act="toast:Form penerbitan sertifikat siap dikembangkan.">+ Terbitkan</button></div>` +
      table(
        ["Nama", "Kegiatan", "Tanggal", "Status", "Aksi"],
        certificates.map(
          (c) =>
            `<tr><td><b>Putri Alfitri Audina</b></td><td>${esc(c.name)}</td><td>${esc(c.date)}</td><td><span class="pill accept">${esc(c.status)}</span></td><td><button class="t-act" data-act="toast:Sertifikat siap diunduh.">Unduh</button></td></tr>`,
        ),
      );
  } else {
    html =
      `<div class="card-title"><h2>Sertifikat saya</h2></div>` + certList();
  }
  $("#dashBody").innerHTML = html;
}

// Semua tombol aksi di dashboard ditangani di sini
$("#dashBody").onclick = (e) => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const [type, a, c] = b.dataset.act.split(":");
  if (type === "toast") return toast(b.dataset.act.slice(6));
  if (type === "new-app") return openApply(1);
  if (type === "detail") return openDetail(+a);
  if (type === "add-act") return openModal("actModal");
  if (type === "del") {
    const i = activities.findIndex((x) => x.id === +a);
    if (i > -1) {
      activities.splice(i, 1);
      renderActivities();
      renderDash();
      toast("Kegiatan dihapus.");
    }
  }
  if (type === "set") {
    applications[+a].status = c;
    renderDash();
    toast(`Pendaftaran ${c.toLowerCase()}.`);
  }
};

// Detail pendaftar: alasan memilih divisi + portofolio
function openDetail(i) {
  const a = applications[i];
  const port = a.portfolio
    ? `<a class="btn outline sm" href="${esc(a.portfolio.url)}" target="_blank" rel="noopener">Buka portofolio ↗</a> <small>${esc(a.portfolio.name)}</small>`
    : "Tidak mengunggah portofolio";
  const row = (k, v) => `<div><small>${k}</small>${v}</div>`;
  $("#detailBody").innerHTML = `<div class="detail-grid">
${row("Nama", `<b>${esc(a.name)}</b>`)}${row("Angkatan", esc(a.year || "-"))}${row("Nomor telepon", esc(a.phone || "-"))}${row("Tanggal daftar", esc(a.date))}
${row("Kegiatan", esc(a.activity))}${row("Status", pill(a.status))}
${row("Divisi pilihan 1", esc(a.division))}${row("Divisi pilihan 2", esc(a.division2 || "-"))}
<div class="span"><small>Alasan memilih divisi 1</small><div class="reason">${esc(a.reason1 || "-")}</div></div>
<div class="span"><small>Alasan memilih divisi 2</small><div class="reason">${esc(a.reason2 || "-")}</div></div>
${row("Bersedia dipindahkan", esc(a.move || "-"))}${row("Portofolio", port)}</div>
${a.status === "Menunggu" ? `<div class="detail-actions"><button class="btn primary sm" data-set="${i}:Diterima">Terima</button><button class="btn outline sm" data-set="${i}:Ditolak">Tolak</button></div>` : ""}`;
  openModal("detailModal");
}
$("#detailBody").onclick = (e) => {
  const b = e.target.closest("[data-set]");
  if (!b) return;
  const [i, st] = b.dataset.set.split(":");
  applications[+i].status = st;
  closeModals();
  renderDash();
  toast(`Pendaftaran ${st.toLowerCase()}.`);
};

// Form tambah kegiatan: pilihan divisi + foto
$("#actDivChecks").innerHTML = DIVISIONS.map(
  (d) =>
    `<label><input type="checkbox" value="${esc(d)}" checked> ${esc(d)}</label>`,
).join("");
$("#actPhoto").onchange = () => {
  const f = $("#actPhoto").files[0],
    pv = $("#actPhotoPreview");
  pv.hidden = !f;
  if (f) pv.src = URL.createObjectURL(f);
};
$("#actForm").onsubmit = (e) => {
  e.preventDefault();
  const divs = [...$$("#actDivChecks input:checked")].map((c) => c.value);
  $("#actDivCustom")
    .value.split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .forEach((d) => {
      if (!divs.includes(d)) divs.push(d);
    });
  if (!divs.length) return toast("Pilih minimal satu divisi.");
  const f = $("#actPhoto").files[0];
  activities.push({
    id: Date.now(),
    name: $("#actName").value.trim(),
    category: $("#actCat").value,
    date: $("#actDate").value.trim(),
    status: $("#actStatus").value,
    desc: $("#actDesc").value.trim() || "Informasi kegiatan PediaSpace.",
    // FOTO: upload (sementara, hilang saat refresh) atau path file di folder assets/ (permanen)
    img: f ? URL.createObjectURL(f) : $("#actPhotoPath").value.trim(),
    fb: "fb1",
    divisions: divs,
  });
  renderActivities();
  renderDash();
  closeModals();
  e.target.reset();
  $("#actPhotoPreview").hidden = true;
  toast("Kegiatan berhasil ditambahkan.");
};

/* ---------- INIT ---------- */
renderActivities();
applySession();
