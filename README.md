# Portofolio — Fhira Excella Ramadhani

Website statis (HTML/CSS/JS murni, tanpa build tool) siap di-hosting gratis di GitHub Pages.

## Struktur file
```
.
├── index.html
├── style.css
├── script.js
└── images/       # semua foto & sertifikat, sudah dikompres
```

## Cara upload ke GitHub Pages

1. Buat repo baru di GitHub, misalnya `fhira-portfolio`.
2. Upload semua isi folder ini (jangan folder induknya, isinya langsung) ke repo:
   - Lewat web: klik **Add file → Upload files**, drag semua file & folder `images/`.
   - Atau lewat terminal:
     ```bash
     git init
     git add .
     git commit -m "Portofolio Fhira"
     git branch -M main
     git remote add origin https://github.com/USERNAME/fhira-portfolio.git
     git push -u origin main
     ```
3. Di repo, buka **Settings → Pages**.
4. Di bagian **Branch**, pilih `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, situs akan aktif di:
   `https://USERNAME.github.io/fhira-portfolio/`

## Yang bisa diedit gampang
- **Teks**: langsung edit di `index.html`, semua section ada komentarnya (`<!-- HERO -->`, dst).
- **Warna**: buka `style.css`, ubah nilai di bagian `:root` paling atas (`--maroon-800`, `--rose-500`, dst).
- **Foto**: ganti file di folder `images/` dengan nama yang sama, atau ubah path `src` di `index.html`.
- **Link sosial media**: cari `href="https://instagram.com"` dan `href="https://tiktok.com"` di bagian Social Media, ganti dengan link profil asli.

## Catatan
- Semua foto sudah diekstrak dan dikompres dari file PDF portofolio kamu.
- Foto potret sudah dihilangkan background hitamnya (transparent PNG).
- Font: **Anton** (judul besar) + **Work Sans** (teks), keduanya dari Google Fonts, otomatis termuat lewat internet.
