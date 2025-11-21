// --- FUNGSI PERHITUNGAN WETON ---
function hitungWeton(tanggalInput) {
    const date = new Date(tanggalInput);
    
    if (isNaN(date)) return null;

    // 1. Hari List
    const hariList = [
        { nama: "Minggu", neptu: 5 },
        { nama: "Senin", neptu: 4 },
        { nama: "Selasa", neptu: 3 },
        { nama: "Rabu", neptu: 7 },
        { nama: "Kamis", neptu: 8 },
        { nama: "Jumat", neptu: 6 },
        { nama: "Sabtu", neptu: 9 }
    ];

    const dayIndex = date.getDay(); 
    const hari = hariList[dayIndex];

    // 2. Pasaran List
    const pasaranList = [
        { nama: "Legi", neptu: 5 },
        { nama: "Pahing", neptu: 9 },
        { nama: "Pon", neptu: 7 },
        { nama: "Wage", neptu: 4 },
        { nama: "Kliwon", neptu: 8 }
    ];

    // Perhitungan Pasaran (Menggunakan UNIX Epoch Time)
    const timeSince1970 = date.getTime() / 86400000; 
    const pasaranIndex = Math.floor(timeSince1970) % 5;
    const pasaran = pasaranList[pasaranIndex];

    const totalNeptu = hari.neptu + pasaran.neptu;

    return {
        hari: hari.nama,
        pasaran: pasaran.nama,
        neptu: totalNeptu
    };
}

// --- FUNGSI RAMALAN JODOH ---
function ramalanJodoh(totalNeptu) {
    const sisa = totalNeptu % 7;

    const ramalanList = {
        1: {
            nama: "Wasesa Segara",
            arti: "Kalian akan menjadi pasangan yang memiliki keluhuran budi pekerti, mudah memberikan maaf, memiliki wibawa dimata orang lain, dan berlapang dada dalam berbagai hal."
        },
        2: {
            nama: "Tunggak Semi",
            arti: "Kalian akan menjadi pasangan yang memiliki rezeki melimpah dalam rumah tangga."
        },
        3: {
            nama: "Satria Wibawa",
            arti: "Kalian akan menjadi pasangan yang dalam kehidupan rumah tangganya memiliki kemuliaan dan keluhuran didalam keluarga maupun masyarakat."
        },
        4: {
            nama: "Sumur Sinaba",
            arti: "Pasangan anda memiliki pengetahuan atau kepandaian yang luar biasa sehingga sering menjadi tempat bertanya bagi orang lain."
        },
        5: {
            nama: "Satria Wirang",
            arti: "Anda dan pasangan akan sering menanggung malu dan kesusahan."
        },
        6: {
            nama: "Bumi Kepetak",
            arti: "Rumah tangga anda akan tahan pada kondisi sengsara dan kalut hati. Kalian adalah pasangan yang rajin bekerja dan selalu menjaga kebersihan."
        },
        0: {
            nama: "Lebu Ketiup Angin",
            arti: "Kalian akan mengalami kehidupan yang sengsara, keinginan seringkali tidak terkabul, dan memiliki kecenderungan sering berpindah rumah."
        }
    };

    return ramalanList[sisa];
}

// --- DATA MAKNA HARI BAIK ---
const maknaHariBaik = {
    "Minggu": "Membawa kebahagiaan dan rezeki.",
    "Senin": "Rumah tangga langgeng dan damai.",
    "Selasa": "Banyak tantangan tapi kuat menghadapinya.",
    "Rabu": "Banyak keberuntungan dalam rumah tangga.",
    "Kamis": "Mendapatkan banyak rezeki dan doa baik.",
    "Jumat": "Hidup harmonis dan penuh kedamaian.",
    "Sabtu": "Cocok memulai kehidupan baru."
};

// --- FUNGSI MENCARI HARI BAIK ---
function cariHariBaik(jumlah = 7) {
    const hasil = [];
    let date = new Date();
    // Set date ke besok hari
    date.setDate(date.getDate() + 1); 

    while (hasil.length < jumlah) {
        
        // Cek weton
        const hitung = hitungWeton(date.toISOString().split("T")[0]);
        
        // Simpan hari baik yang akan datang
        hasil.push({
            tanggal: date.toLocaleDateString("id-ID", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
            hari: hitung.hari,
            pasaran: hitung.pasaran,
            makna: maknaHariBaik[hitung.hari]
        });

        // Maju ke hari berikutnya
        date.setDate(date.getDate() + 1);
    }

    return hasil;
}

// --- FUNGSI TOGGLE SOLUSI (Akordeon) ---
function toggleSolusi(element) {
    // Toggle class 'active'
    element.classList.toggle('active');

    // Cari elemen detail (paragraf)
    const detail = element.querySelector('.solusi-detail');
    
    // Tampilkan atau sembunyikan detail
    if (element.classList.contains('active')) {
        detail.style.display = 'block';
    } else {
        detail.style.display = 'none';
    }
}


// --- FUNGSI UTAMA PROSES ---
function proses() {
    const t1 = document.getElementById("tanggal1").value;
    const t2 = document.getElementById("tanggal2").value;

    const p1 = hitungWeton(t1);
    const p2 = hitungWeton(t2);

    if (!p1 || !p2) {
        alert("Mohon pilih tanggal lahir kedua pasangan!");
        return;
    }

    const total = p1.neptu + p2.neptu;
    const ramalan = ramalanJodoh(total);
    const sisa = total % 7; 

    let tambahanHTML = "";

    // JIKA COCOK (SISA 1, 2, 3, 4)
    if ([1, 2, 3, 4].includes(sisa)) {

        const hariRekom = cariHariBaik(7);
        let htmlList = "<ul>";

        hariRekom.forEach(h => {
            htmlList += `
                <li>
                    <b>${h.hari} ${h.pasaran}</b> – ${h.tanggal}<br>
                    <i>Makna: ${h.makna}</i>
                </li>
            `;
        });

        htmlList += "</ul>";

        tambahanHTML = `
            <div class="hari-baik">
                <h3>🎉 Selamat, Weton Kalian COCOK!</h3>
                <h4>Berikut kami rekomendasikan 7 hari baik terdekat untuk menikah.</h4>
                ${htmlList}
                <p style="text-align: center; font-size: 13px; color: #888; margin-top: 15px;">Ingatlah, perhitungan weton adalah panduan, namun komunikasi, kesetiaan, dan saling pengertian adalah pilar utama pernikahan yang langgeng. Jangan lupa hafalkan tepuk sakinah!</p>
            </div>
        `;

    // JIKA TIDAK COCOK (SISA 5, 6, 0)
    } else {
        tambahanHTML = `
            <div class="solusi-buruk">
                <h3>Sayang Sekali, Weton Kalian Kurang Serasi.</h3>
                <h4>Tapi jangan terlalu kecewa, Tuhan-lah yang menentukan segalanya. Berikut solusi agar kalian tetap bisa menikah:</h4>
                <ul style="list-style-type: decimal; padding-left: 20px;">
                    <li class="solusi-item" onclick="toggleSolusi(this)">
                        <h4>Tirakat / Laku Spiritual</h4>
                        <p class="solusi-detail">Laku tirakat seperti puasa mutih, weton, atau Senin-Kamis, dipercaya dapat meredam energi negatif dari hasil hitungan buruk. Ini menjadi bentuk permohonan kepada Tuhan agar bahaya atau konflik yang dikhawatirkan dapat dielakkan.</p>
                    </li>
                    
                    <li class="solusi-item" onclick="toggleSolusi(this)">
                        <h4>Ruwatan</h4>
                        <p class="solusi-detail">Ruwatan adalah upacara spiritual untuk membuang kesialan. Bisa dilakukan secara sederhana oleh tokoh adat atau sesepuh, sebagai simbol pembersihan diri dan rumah tangga dari potensi energi buruk yang dibaca dari hitungan weton.</p>
                    </li>
                    
                    <li class="solusi-item" onclick="toggleSolusi(this)">
                        <h4>Tolak Bala / Sesajen</h4>
                        <p class="solusi-detail">Dalam praktik kejawen, beberapa sesajen seperti tumpeng kecil, bunga setaman, atau kembang telon bisa digunakan untuk menetralkan energi spiritual. Biasanya dilakukan di malam weton salah satu pasangan sebagai bentuk penyelarasan.</p>
                    </li>
                    
                    <li class="solusi-item" onclick="toggleSolusi(this)">
                        <h4>Memilih Hari Pernikahan yang Tepat</h4>
                        <p class="solusi-detail">Jika weton dianggap tidak serasi, maka pemilihan hari pernikahan menjadi sangat penting. Menentukan hari baik atau dino apik yang cocok dengan gabungan weton pasangan diyakini dapat menyeimbangkan energi dan menghindari halangan besar di awal pernikahan.</p>
                    </li>
                        </ul>
                        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 15px;">Penting: Jika hubungan dibangun atas dasar cinta dan tanggung jawab, weton hanyalah satu bagian kecil dari banyak faktor.</p>
                    </div>
        `;
    }

    // OUTPUT UTAMA
    const output = `
        <h2>Hasil Perhitungan Weton</h2>

        <p><b>Pria:</b> ${p1.hari} ${p1.pasaran} (Neptu: ${p1.neptu})</p>
        <p><b>Wanita:</b> ${p2.hari} ${p2.pasaran} (Neptu: ${p2.neptu})</p>
        <hr>
        <p><b>Total Neptu:</b> <b>${total}</b></p>
        <p><b>Sisa Perhitungan:</b> <b>${sisa}</b></p>
        <p><b>Ramalan Jodoh:</b> <b>${ramalan.nama}</b></p>
        <p style="margin-top: 5px;"><i>${ramalan.arti}</i></p>
        <hr>
        ${tambahanHTML}
    `;

    const hasilDiv = document.getElementById("hasil");
    hasilDiv.classList.remove("hidden");
    hasilDiv.innerHTML = output;

    // Scroll ke hasil
    hasilDiv.scrollIntoView({ behavior: 'smooth' });
}
