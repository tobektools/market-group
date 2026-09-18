# TOBEK TOOLS — V2 Website Promosi & Katalog

Versi ini sengaja dibuat sebagai **website promosi/company profile + katalog**, bukan marketplace.

## Tetap gratis
Tidak membutuhkan database online, login pelanggan, payment gateway, atau Supabase.

## Struktur
- `index.html` — halaman website
- `styles.css` — desain
- `app.js` — katalog, pencarian, filter, detail produk
- `products.json` — data produk
- `admin-katalog.html` — alat lokal untuk mengubah/import katalog dan menghasilkan `products.json`
- `products_template.csv` — template mass upload

## Cara update katalog
1. Buka `admin-katalog.html` di komputer.
2. Import CSV/Excel yang sudah disimpan sebagai CSV.
3. Periksa preview.
4. Export `products.json`.
5. Ganti `products.json` di repository GitHub.
6. GitHub Pages akan memperbarui katalog.

Catatan: alat admin lokal tidak menyimpan data ke server. Ini sengaja agar website tetap sederhana dan gratis.
