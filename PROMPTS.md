# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.
**Hasil:**
Viewed user-stories.md:1-100
Viewed rancangan-teknis.md:1-69
Viewed DESIGN.md:1-52
Viewed page.jsx:1-37
Viewed .env.example:1-14
Viewed package.json:1-25
Viewed KartuProduk.jsx:1-25
Ran command: List files in lib (`Get-ChildItem -Path lib -Recurse`)
Viewed schema.sql:1-49
Viewed PRD.md:1-60
Ran command: List components directory (`Get-ChildItem -Path components`)
Ran command: Check presence of env keys (`Get-Content .env.local | ForEach-Object { $_ -replace '=.*', '=***' }`)
Ran command: Search lib/supabase occurrences (`Select-String -Path "docs/*", "app/*", "components/*", "lib/*" -Pattern "lib/supabase" -SimpleMatch`)
Ran command: Search codebase for supabase references (`Get-ChildItem -Recurse -File -Exclude node_modules,.next,.git | Select-String -Pattern "supabase"`)

I'm checking the codebase for any existing Supabase helper conventions.

Checked task Search codebase for supabase references
Killed task Search codebase for supabase references
Ran command: List files in app (`Get-ChildItem -Path app -Recurse -File`)
Viewed page.jsx:1-41
Viewed page.jsx:1-28
Viewed data-contoh.js:1-60
Viewed globals.css:1-34
Ran command: Search for supabase client usages (`Get-ChildItem -Recurse -File | Select-String -Pattern "createServerClient|createClient|lib/supabase"`)
Killed task Search for supabase client usages
Ran command: Run npm run build (`npm run build`)
Checked task Run npm run build
Viewed FormProduk.jsx:1-35
Viewed CatatanBelumAktif.jsx:1-10
Viewed TabelProduk.jsx:1-47
Ran command: Verify env vars can be read (`node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); console.log('SUPABASE_URL defined:', !!process.env.SUPABASE_URL, 'SECRET defined:', !!process.env.SUPABASE_SECRET_KEY);"`)
Ran command: Verify Supabase query works (`node --env-file=.env.local -e "const { createClient } = require('@supabase/supabase-js'); console.log('SUPABASE_URL:', !!process.env.SUPABASE_URL, 'SUPABASE_SECRET_KEY:', !!process.env.SUPABASE_SECRET_KEY); const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY); supabase.from('produk').select('*').then(({ data, error }) => console.log('Result:', { count: data?.length, error }));"`)
Ran command: Check SUPABASE_URL string (`node --env-file=.env.local -e "console.log('URL format:', process.env.SUPABASE_URL);"`)
Ran command: Test query with normalized URL (`node --env-file=.env.local -e "const { createClient } = require('@supabase/supabase-js'); const rawUrl = process.env.SUPABASE_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, ''); console.log('Cleaned URL:', rawUrl); const supabase = createClient(rawUrl, process.env.SUPABASE_SECRET_KEY); supabase.from('produk').select('*').then(({ data, error }) => console.log('Result:', { count: data?.length, data: data?.slice(0, 2), error }));"`)
Created server.js
Created index.js
Created page.jsx
Ran command: Test project build (`npm run build`)
Ran command: Test Supabase client fetch in Node (`node --env-file=.env.local -e "import('./lib/supabase/server.js').then(async (m) => { const client = m.createServerClient(); const { data, error } = await client.from('produk').select('*').order('id', { ascending: true }); console.log('Products:', data); });"`)
Ran command: Test HalamanKatalog execution in Node (`node --env-file=.env.local -e "import('./app/page.jsx').then(async (m) => { const jsx = await m.default(); console.log('Rendered JSX type:', typeof jsx); });"`)
Ran command: Start Next.js production server on port 3001 (`npx next start -p 3001`)
Ran command: Fetch http://localhost:3001 (`Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing | Select-Object -ExpandProperty Content`)
Killed task Start Next.js production server on port 3001

Pekerjaan untuk **US-01: Katalog dari database** telah selesai.

### Ringkasan Perubahan

1. [`lib/supabase/server.js`](file:///c:/Users/Pongo/Documents/katalog-ekotias/lib/supabase/server.js) & [`lib/supabase/index.js`](file:///c:/Users/Pongo/Documents/katalog-ekotias/lib/supabase/index.js)
   - Membuat helper `createServerClient()` untuk menginisialisasi client Supabase di sisi server menggunakan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY` dari environment variable.
   - Dilengkapi normalisasi URL untuk menangani format endpoint Supabase secara aman.

2. [`app/page.jsx`](file:///c:/Users/Pongo/Documents/katalog-ekotias/app/page.jsx)
   - Mengambil data produk langsung dari tabel `produk` di Supabase secara asinkron di Server Component, menggantikan penggunaan data statis dari `lib/data-contoh.js`.
   - Menampilkan produk menggunakan komponen [`KartuProduk`](file:///c:/Users/Pongo/Documents/katalog-ekotias/components/KartuProduk.jsx) bawaan tanpa mengubah tampilannya.
   - Menampilkan tulisan `"Belum ada produk"` jika tabel kosong.
   - Menampilkan pesan error yang jelas jika query atau koneksi database gagal.
   - Menghapus komponen `CatatanBelumAktif`.

---

### Cara Mengetes

1. Jalankan aplikasi secara lokal:
   ```powershell
   npm run dev
   ```
2. Buka browser di [http://localhost:3000](http://localhost:3000).
3. **Katalog dari database**: Pastikan seluruh produk dari tabel `produk` di Supabase muncul lengkap dengan foto, nama, kategori, dan format harga rupiah.
4. **Kondisi kosong**: Jika tabel `produk` dikosongkan sementara di Supabase, halaman akan menampilkan tulisan *"Belum ada produk"*.
5. **Kondisi error**: Jika `SUPABASE_URL` atau `SUPABASE_SECRET_KEY` tidak sesuai di `.env.local`, halaman akan menampilkan pesan error yang jelas tanpa menyebabkan aplikasi crash.
**Perbaikan:**

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.
**Hasil:**
Viewed page.jsx:1-41
Viewed not-found.jsx:1-12
Created page.jsx
Ran command: Run npm run build (`npm run build`)
Checked task Run npm run build
Ran command: Start Next.js server on port 3001 (`npx next start -p 3001`)
Ran command: Fetch /produk/1 (`Invoke-WebRequest -Uri "http://localhost:3001/produk/1" -UseBasicParsing | Select-Object -ExpandProperty Content`)
Ran command: Fetch /produk/99999 and /produk/abc (`try { $res = Invoke-WebRequest -Uri "http://localhost:3001/produk/99999" -UseBasicParsing } catch { $_.Exception.Response.StatusCode.value__ }; try { $res2 = Invoke-WebRequest -Uri "http://localhost:3001/produk/abc" -UseBasicParsing } catch { $_.Exception.Response.StatusCode.value__ }`)
Killed task Start Next.js server on port 3001

Pekerjaan untuk **US-02: Detail produk** telah selesai.

### Ringkasan Perubahan

- [`app/produk/[id]/page.jsx`](file:///c:/Users/Pongo/Documents/katalog-ekotias/app/produk/%5Bid%5D/page.jsx):
  - Mengambil data satu produk dari tabel `produk` di Supabase berdasarkan parameter `id` URL di sisi server menggunakan `createServerClient` dari `lib/supabase`.
  - Memanggil `notFound()` jika produk tidak ditemukan atau query database gagal/tidak valid.
  - Mempertahankan tampilan dan elemen yang ada, termasuk komponen `TombolWhatsApp`.
  - Menghapus komponen `CatatanBelumAktif` dan import `cariProdukContoh` yang sudah tidak digunakan.

---

### Cara Mengetes

1. Jalankan aplikasi secara lokal:
   ```powershell
   npm run dev
   ```
2. **Detail produk yang ada**:
   - Buka katalog di [http://localhost:3000](http://localhost:3000) lalu klik salah satu produk (atau langsung kunjungi [http://localhost:3000/produk/1](http://localhost:3000/produk/1)).
   - Pastikan foto, nama produk, kategori, harga rupiah, deskripsi dari database, dan tombol WhatsApp muncul dengan benar.
3. **Produk yang tidak ada**:
   - Buka URL produk dengan id yang tidak ada, misalnya [http://localhost:3000/produk/99999](http://localhost:3000/produk/99999) atau [http://localhost:3000/produk/abc](http://localhost:3000/produk/abc).
   - Pastikan halaman beralih ke halaman 404 (*"Halaman tidak ditemukan"*).
**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.
**Hasil:**
Viewed toko.js:1-10
Viewed format.js:1-8
Viewed TombolWhatsApp.jsx:1-13
Ran command: Search for WhatsApp message text references (`Select-String -Path "docs/*", "lib/*", "components/*" -Pattern "Halo|wa\.me|pesan"`)
Viewed checklist-pengujian.md:1-27
Viewed page.jsx:1-43
Created TombolWhatsApp.jsx
Ran command: Run npm run build (`npm run build`)
Ran command: Test TombolWhatsApp output (`node -e "import('./components/TombolWhatsApp.jsx').then(m => { const jsx = m.default({ produk: { id: 1, nama: 'Kopi Bubuk Robusta 250 g', harga: 45000 } }); console.log('JSX props:', jsx.props); });"`)
Ran command: Test URL and encoding logic (`node -e "import('./lib/format.js').then(m => { const harga = m.formatRupiah(45000); const pesan = 'Halo, saya ingin memesan Kopi Bubuk Robusta 250 g (' + harga + ').'; const url = 'https://wa.me/6285278342106?text=' + encodeURIComponent(pesan); console.log('Formatted price:', harga); console.log('WhatsApp URL:', url); });"`)
Ran command: Start Next.js server on port 3001 (`npx next start -p 3001`)
Ran command: Check rendered HTML for WhatsApp button (`Invoke-WebRequest -Uri "http://localhost:3001/produk/1" -UseBasicParsing | Select-Object -ExpandProperty Content`)
Killed task Start Next.js server on port 3001

Pekerjaan untuk **US-03: Pesan via WhatsApp** telah selesai.

### Ringkasan Perubahan

- [`components/TombolWhatsApp.jsx`](file:///c:/Users/Pongo/Documents/katalog-ekotias/components/TombolWhatsApp.jsx):
  - Mengubah elemen tombol menjadi tag tautan `<a>` dengan tampilan styling yang sama (`bg-utama`, teks putih, padding, dll.).
  - Mengarahkan tautan ke `https://wa.me/<nomor>` dengan nomor WhatsApp toko yang diambil dari [`lib/toko.js`](file:///c:/Users/Pongo/Documents/katalog-ekotias/lib/toko.js).
  - Mengisi pesan otomatis berisi nama dan harga produk dalam format rupiah menggunakan [`formatRupiah`](file:///c:/Users/Pongo/Documents/katalog-ekotias/lib/format.js), yang di-encode menggunakan `encodeURIComponent`.
  - Membuka tautan di tab baru dengan atribut `target="_blank"` dan `rel="noopener noreferrer"`.
- Catatan `CatatanBelumAktif` terkait US-03 di halaman detail produk ([`app/produk/[id]/page.jsx`](file:///c:/Users/Pongo/Documents/katalog-ekotias/app/produk/%5Bid%5D/page.jsx)) sudah dipastikan bersih/terhapus.

---

### Cara Mengetes

1. Jalankan aplikasi secara lokal jika server belum berjalan:
   ```powershell
   npm run dev
   ```
2. Buka salah satu halaman detail produk di browser (misalnya [http://localhost:3000/produk/1](http://localhost:3000/produk/1)).
3. Klik tombol **Pesan via WhatsApp**.
4. Browser akan membuka tab baru ke alamat WhatsApp (`wa.me/6285278342106?text=...`) dengan pesan yang telah terisi otomatis (contoh: *"Halo, saya ingin memesan [Nama Produk] (Rp 45.000)."*).
**Perbaikan:**

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.
**Hasil:**
Viewed page.jsx:1-29
Viewed NavAdmin.jsx:1-19
Viewed Input.jsx:1-16
Viewed Tombol.jsx:1-26
Viewed actions.js
Ran command: Check @supabase/ssr module exports (`node -e "const ssr = require('@supabase/ssr'); console.log('SSR exports:', Object.keys(ssr));"`)
Ran command: Check @supabase/ssr type definitions (`node -e "const fs = require('fs'); const path = require('path'); const dts = fs.readFileSync(path.resolve('node_modules/@supabase/ssr/dist/index.d.ts'), 'utf8'); console.log(dts.slice(0, 1500));"`)
Ran command: List files in @supabase/ssr (`Get-ChildItem -Path "node_modules/@supabase/ssr" -Recurse -File`)
Viewed createServerClient.ts:1-60
Viewed createServerClient.ts:60-110
Viewed page.jsx:1-43
Viewed PROMPTS.md:1-205
Ran command: Check cookies export from next/headers (`node -e "const { cookies } = require('next/headers'); console.log(typeof cookies);"`)
Created server.js
Created actions.js
Created page.jsx
Created NavAdmin.jsx
Ran command: Test project build (`npm run build`)
Ran command: Test invalid login credentials with Supabase Auth (`node --env-file=.env.local -e "const { createClient } = require('@supabase/supabase-js'); const supabase = createClient(process.env.SUPABASE_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, ''), process.env.SUPABASE_PUBLISHABLE_KEY); supabase.auth.signInWithPassword({ email: 'wrong@example.com', password: 'wrongpassword' }).then(({ data, error }) => console.log('Auth test result:', { error: error?.message, status: error?.status }));"`)
Ran command: Start Next.js server on port 3001 (`npx next start -p 3001`)
Ran command: Verify login page and error display (`$html1 = (Invoke-WebRequest -Uri "http://localhost:3001/admin/login" -UseBasicParsing).Content; Write-Host "Has CatatanBelumAktif:" ($html1.Contains("CatatanBelumAktif") -or $html1.Contains("Login belum berfungsi")); $html2 = (Invoke-WebRequest -Uri "http://localhost:3001/admin/login?error=Email+atau+password+salah" -UseBasicParsing).Content; Write-Host "Has Error Msg:" ($html2.Contains("Email atau password salah"));`)
Ran command: Verify NavAdmin on /admin (`$htmlAdmin = (Invoke-WebRequest -Uri "http://localhost:3001/admin" -UseBasicParsing).Content; Write-Host "Has Keluar button:" $htmlAdmin.Contains("Keluar");`)
Killed task Start Next.js server on port 3001

Pekerjaan untuk **US-04: Login admin** telah selesai.

### Ringkasan Perubahan

1. [`lib/supabase/server.js`](file:///c:/Users/Pongo/Documents/katalog-ekotias/lib/supabase/server.js):
   - Menambahkan helper `createSessionClient()` menggunakan `@supabase/ssr` (`createServerClient`) dengan `cookies()` dari `next/headers`, `SUPABASE_URL`, dan `SUPABASE_PUBLISHABLE_KEY`.
   - Mengimplementasikan penanganan cookie session (`getAll` & `setAll`) untuk menyimpan dan mengelola sesi autentikasi admin di server.

2. [`app/admin/actions.js`](file:///c:/Users/Pongo/Documents/katalog-ekotias/app/admin/actions.js):
   - Membuat Server Action `login(formData)`: memvalidasi email & password, memproses autentikasi via `supabase.auth.signInWithPassword`, mengarahkan ke `/admin` jika berhasil, atau mengalihkan ke `/admin/login?error=...` dengan pesan kesalahan yang jelas jika gagal.
   - Membuat Server Action `keluar()`: memanggil `supabase.auth.signOut()` untuk menghapus sesi dan cookie login, lalu mengarahkan kembali ke `/admin/login`.

3. [`app/admin/login/page.jsx`](file:///c:/Users/Pongo/Documents/katalog-ekotias/app/admin/login/page.jsx):
   - Menghubungkan form login ke Server Action `login`.
   - Membaca parameter query `error` dari URL untuk menampilkan pesan kesalahan ketika login gagal.
   - Menghapus komponen `CatatanBelumAktif` tanpa mengubah tampilan form bawaan.

4. [`components/NavAdmin.jsx`](file:///c:/Users/Pongo/Documents/katalog-ekotias/components/NavAdmin.jsx):
   - Menghubungkan tombol "Keluar" ke Server Action `keluar` via form submit untuk mengakhiri sesi autentikasi admin tanpa mengubah posisi maupun tampilan tombol.

---

### Cara Mengetes

1. Pastikan server lokal berjalan:
   ```powershell
   npm run dev
   ```
2. Buka halaman login di [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
3. **Uji Login Gagal**:
   - Masukkan email atau password yang salah, lalu klik tombol **Masuk**.
   - Halaman akan memuat ulang dan menampilkan pesan error merah yang jelas (misalnya: *"Email atau password salah. Silakan periksa kembali."*).
4. **Uji Login Berhasil**:
   - Masukkan email dan password admin yang terdaftar di Supabase Auth milikmu.
   - Klik **Masuk**, kamu akan diarahkan ke halaman admin di [http://localhost:3000/admin](http://localhost:3000/admin).
5. **Uji Tombol Keluar**:
   - Di halaman admin, klik tombol **Keluar** di bagian kanan atas navigasi admin.
   - Sesi akan diakhiri dan browser akan diarahkan kembali ke [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
**Perbaikan:**

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini. 
**Hasil:**
Viewed page.jsx:1-43
Viewed actions.js:1-62
Created actions.js
Created page.jsx
Ran command: Run npm run build (`npm run build`)
Ran command: Start Next.js test server on port 3001 (`npx next start -p 3001`)
Ran command: Check password page responses (`$p1 = (Invoke-WebRequest -Uri "http://localhost:3001/admin/password" -UseBasicParsing).Content; Write-Host "No CatatanBelumAktif:" (-not ($p1.Contains("CatatanBelumAktif") -or $p1.Contains("Ganti password belum berfungsi"))); $p2 = (Invoke-WebRequest -Uri "http://localhost:3001/admin/password?error=Password+baru+minimal+8+karakter." -UseBasicParsing).Content; Write-Host "Has Error Msg:" $p2.Contains("Password baru minimal 8 karakter."); $p3 = (Invoke-WebRequest -Uri "http://localhost:3001/admin/password?berhasil=Password+berhasil+diganti." -UseBasicParsing).Content; Write-Host "Has Success Msg:" $p3.Contains("Password berhasil diganti.");`)
Killed task Start Next.js test server on port 3001

Pekerjaan untuk **US-05: Ganti password** telah selesai.

### Ringkasan Perubahan

1. [`app/admin/actions.js`](file:///c:/Users/Pongo/Documents/katalog-ekotias/app/admin/actions.js):
   - Membuat Server Action `gantiPassword`:
     - Memeriksa sesi admin yang sedang login melalui `supabase.auth.getUser()` di sisi server (jika sesi habis, diarahkan kembali ke `/admin/login`).
     - Memvalidasi password baru minimal 8 karakter.
     - Memvalidasi kesamaan antara password baru dan konfirmasi password.
     - Memperbarui password menggunakan `supabase.auth.updateUser({ password: passwordBaru })`.
     - Mengalihkan kembali ke `/admin/password` dengan parameter query `berhasil` jika sukses, atau `error` jika terdapat kesalahan.

2. [`app/admin/password/page.jsx`](file:///c:/Users/Pongo/Documents/katalog-ekotias/app/admin/password/page.jsx):
   - Menghubungkan form ke Server Action `gantiPassword`.
   - Menampilkan pesan berhasil (`text-utama`) atau pesan error (`text-bahaya`) yang jelas di atas kolom isian form sesuai parameter query.
   - Menghapus komponen `CatatanBelumAktif` tanpa mengubah tata letak maupun tampilan elemen form yang sudah ada.

---

### Cara Mengetes

1. Pastikan server lokal berjalan:
   ```powershell
   npm run dev
   ```
2. Pastikan kamu sudah login sebagai admin (buka [http://localhost:3000/admin/login](http://localhost:3000/admin/login) jika belum).
3. Buka halaman ganti password di [http://localhost:3000/admin/password](http://localhost:3000/admin/password).
4. **Uji Validasi Password Kurang dari 8 Karakter**:
   - Masukkan password baru kurang dari 8 karakter (misal: `12345`).
   - Klik **Simpan password**, halaman akan memunculkan pesan error *"Password baru minimal 8 karakter."*.
5. **Uji Validasi Konfirmasi Tidak Cocok**:
   - Masukkan password baru minimal 8 karakter, tetapi buat konfirmasi password berbeda.
   - Klik **Simpan password**, halaman akan memunculkan pesan error *"Konfirmasi password tidak sama."*.
6. **Uji Berhasil**:
   - Masukkan password baru yang valid (minimal 8 karakter) dan samakan konfirmasinya.
   - Klik **Simpan password**, halaman akan menampilkan pesan sukses *"Password berhasil diganti."*.
   - Kamu bisa menguji login ulang dengan password baru tersebut.
**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.
**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
