# NewsTomotive

Portal berita otomotif modern, interaktif, dan responsif berbasis React. Web ini menyajikan kurasi berita mobil dan motor terkini untuk audiens Indonesia dengan pengalaman baca yang cepat, bersih, dan menarik.

## Highlight

- Berita otomotif terbaru (Indonesia)
- Halaman terpisah untuk Mobil dan Motor
- Pencarian cepat, refresh instan, dan hero headline
- Kartu berita animatif dengan tampilan dinamis
- Form newsletter dengan validasi (nama, email, preferensi)
- Desain responsif dengan gradien modern

## Demo Lokal (Cepat)

1. Masuk ke folder proyek
   - `cd web-otomotif`
2. Install dependensi
   - `npm install`
3. Jalankan server dev
   - `npm start`

Aplikasi akan berjalan pada http://localhost:3000

## Struktur Fitur

- **Home**: feed berita umum otomotif dengan headline utama
- **Mobil**: fokus berita mobil
- **Motor**: fokus berita motor
- **Newsletter**: form pendaftaran dengan validasi input

## Integrasi API

Sumber data menggunakan newsdata.io endpoint `api/1/latest` (country=id, category=technology).

- Feed umum: `q=otomotif` dan `q=kendaraan` (digabung & dedup)
- Mobil: `q=mobil`
- Motor: `q=motor`

File service ada di `src/services/newsApi.js` yang menyediakan:

- `fetchGeneralNews()`
- `fetchCarNews()`
- `fetchMotorNews()`

### Kunci API

Gunakan API key pribadi dengan menyimpan di `localStorage`:

`NEWS_API_KEY`

Jika tidak ada key, aplikasi memakai public key bawaan.

## Struktur Folder

- `public/` — HTML & metadata
- `src/`
  - `components/` — UI cards, hero, navbar, footer, form
  - `pages/` — Home, Mobil, Motor
  - `services/` — integrasi API
  - `App.js` — routing dan layout utama

