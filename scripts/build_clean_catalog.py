#!/usr/bin/env python3
"""
build_clean_catalog.py
Standardizes Numa Skin product catalog (8 Singles + 42 Bundles)
Following Dotfiles, SEO-friendly, and Brand guidelines.
- Zero Shopee / marketplace mentions
- Zero packing / shipping / unboxing mentions
- Zero CTA in descriptions and meta tags
- SEO-friendly Titles, Subtitles, Handles, Meta Titles (<=60), Meta Descriptions (<=155)
- Image SEO filenames & SEO Alt tags
"""

import os
import json
import re
import shutil

DOCS_DIR = "/Users/ongki/Documents/shopee/numaskin"
DATA_DIR = os.path.join(DOCS_DIR, "data")
IMAGES_DIR = os.path.join(DOCS_DIR, "public/images/products")
SEO_IMAGES_DIR = os.path.join(DOCS_DIR, "public/images/seo")
PRODUCTS_MD_DIR = os.path.join(DOCS_DIR, "content/products")
BUNDLES_MD_DIR = os.path.join(DOCS_DIR, "content/bundles")

os.makedirs(SEO_IMAGES_DIR, exist_ok=True)

# 8 Core Singles Master Definitions
SINGLES_CONFIG = {
    "deep-sea-water-facial-wash-gel-100ml": {
        "title": "Numa Skin Deep Sea Water Facial Wash Gel 100ml",
        "subtitle": "Pembersih Wajah Lembut Anti-Aging & Mencerahkan dengan 5% Niacinamide",
        "handle": "numa-skin-deep-sea-water-facial-wash-100ml",
        "metaTitle": "Numa Skin Deep Sea Water Facial Wash Gel 100ml",
        "metaDescription": "Pembersih wajah anti aging dengan Deep Sea Water dan 5% Niacinamide untuk membersihkan pori secara lembut tanpa membuat kulit kering atau tertarik.",
        "productType": "Facial Cleanser",
        "tags": ["numa skin", "facial wash", "cleanser", "deep sea water", "anti aging", "brightening", "gentle cleanser", "skin barrier", "bpom"],
        "collections": ["all-products", "cleanser-toner", "anti-aging-series"],
        "bpom": "NA18241203644",
        "netto": "100 ml",
        "texture": "Gel pembersih lembut berbusa halus non-stripping",
        "skinType": "Semua jenis kulit, kulit kering, kusam, tanda penuaan",
        "benefits": [
            ("Gentle Pore Cleansing", "Membersihkan kotoran hingga ke dalam pori-pori dengan busa lembut yang tidak membuat kulit kesat atau tertarik."),
            ("Barrier Support", "Menjaga kelembapan esensial dan memperkuat lapisan pelindung kulit setelah mencuci muka."),
            ("Brightening & Rejuvenating", "Membantu menyamarkan kulit kusam dan merawat elastisitas kulit agar tampak segar dan kenyal.")
        ],
        "actives": [
            ("Deep Sea Water", "Kaya mineral esensial (magnesium, kalsium, kalium) untuk hidrasi intensif dan keseimbangan alami kulit."),
            ("5% Niacinamide", "Mencerahkan warna kulit tidak merata dan merawat kekuatan skin barrier."),
            ("Vitamin E & Glycerin", "Menutrisi dan mengunci kelembapan alami kulit sepanjang hari.")
        ],
        "usage": [
            "Basahi seluruh wajah dengan air bersih.",
            "Tuangkan gel secukupnya pada telapak tangan dan busakan secara lembut.",
            "Pijat perlahan ke seluruh wajah dengan gerakan melingkar, hindari area mata langsung.",
            "Bilas hingga bersih dan keringkan wajah sebelum melanjutkan ke treatment lotion atau toner."
        ]
    },
    "deep-sea-water-treatment-lotion-150ml": {
        "title": "Numa Skin Deep Sea Water Treatment Lotion 150ml",
        "subtitle": "Hydrating Toner & Essence Anti-Aging untuk Memperkuat Skin Barrier",
        "handle": "numa-skin-deep-sea-water-treatment-lotion-150ml",
        "metaTitle": "Numa Skin Deep Sea Water Treatment Lotion 150ml",
        "metaDescription": "Hydrating toner anti aging dengan Deep Sea Water yang menghidrasi mendalam, meredakan kemerahan, dan memperkuat skin barrier wajah.",
        "productType": "Hydrating Toner",
        "tags": ["numa skin", "treatment lotion", "toner", "deep sea water", "hydrating toner", "skin barrier", "anti aging", "calming", "bpom"],
        "collections": ["all-products", "cleanser-toner", "anti-aging-series"],
        "bpom": "NA18220101675",
        "netto": "150 ml (Full Size)",
        "texture": "Cairan lotion ringan menyegarkan cepat meresap",
        "skinType": "Semua jenis kulit, dehidrasi, kemerahan, sensitif",
        "benefits": [
            ("Deep Hydration Infusion", "Menembus lapisan kulit terdalam untuk memberikan kelembapan tahan lama."),
            ("Barrier Restoration", "Menenangkan kulit sensitif dan merawat skin barrier yang teriritasi ringan."),
            ("Optimal Prep", "Mempersiapkan kulit agar produk perawatan berikutnya dapat terserap lebih sempurna.")
        ],
        "actives": [
            ("Deep Sea Water", "Sumber mineral alami yang merevitalisasi dan menjaga keseimbangan pH kulit."),
            ("Multi-Moisturizing Complex", "Menjaga kadar air kulit tetap optimal sepanjang hari."),
            ("Anti-Irritant Actives", "Meredakan kemerahan dan menyejukkan kulit lelah.")
        ],
        "usage": [
            "Gunakan setelah mencuci wajah dalam kondisi kulit masih sedikit lembap.",
            "Tuangkan 3–5 tetes lotion pada telapak tangan atau kapas steril.",
            "Tepuk-tepuk lembut ke seluruh permukaan wajah dan leher hingga meresap sempurna.",
            "Lanjutkan dengan penggunaan serum atau pelembap."
        ]
    },
    "deep-sea-water-treatment-lotion-50ml": {
        "title": "Numa Skin Deep Sea Water Treatment Lotion 50ml",
        "subtitle": "Hydrating Toner Travel Size untuk Kelembapan Kulit Kapan Saja",
        "handle": "numa-skin-deep-sea-water-treatment-lotion-50ml",
        "metaTitle": "Numa Skin Deep Sea Water Treatment Lotion 50ml",
        "metaDescription": "Hydrating toner travel size 50ml dengan Deep Sea Water alami untuk menjaga kelembapan, kesegaran, dan kekuatan skin barrier saat bepergian.",
        "productType": "Hydrating Toner",
        "tags": ["numa skin", "treatment lotion", "toner", "travel size", "deep sea water", "hydrating toner", "skin barrier", "bpom"],
        "collections": ["all-products", "cleanser-toner", "anti-aging-series"],
        "bpom": "NA18220101675",
        "netto": "50 ml (Travel Size)",
        "texture": "Cairan lotion ringan menyegarkan cepat meresap",
        "skinType": "Semua jenis kulit, praktis untuk bepergian",
        "benefits": [
            ("On-the-Go Hydration", "Ukuran travel-friendly yang praktis dibawa untuk rehidrasi kulit kapan saja."),
            ("Quick Barrier Refresh", "Menyejukkan kulit yang lelah dan kering akibat terpapar AC atau sinar matahari."),
            ("Smooth Prep", "Membuat kulit langsung segar dan lembap sebelum aplikasi makeup atau sunscreen.")
        ],
        "actives": [
            ("Deep Sea Water", "Mineral laut murni untuk nutrisi dan keseimbangan hidrasi sel kulit."),
            ("Skin Calming Factors", "Menenangkan kulit yang stres atau rentan kemerahan.")
        ],
        "usage": [
            "Tuangkan beberapa tetes ke telapak tangan.",
            "Tepuk perlahan pada wajah dan leher hingga meresap merata.",
            "Dapat digunakan pagi, malam, atau kapan pun kulit membutuhkan hidrasi instan."
        ]
    },
    "adenosine-moisturizer-with-deep-sea-water-30gr": {
        "title": "Numa Skin Adenosine Deep Sea Water Moisturizer 30g",
        "subtitle": "Pelembap Intensif Anti-Aging untuk Mengunci Elastisitas & Nutrisi Kulit",
        "handle": "numa-skin-adenosine-deep-sea-water-moisturizer-30g",
        "metaTitle": "Numa Skin Adenosine Deep Sea Water Moisturizer 30g",
        "metaDescription": "Pelembap anti aging dengan Adenosine dan Deep Sea Water untuk menyamarkan garis halus, mengencangkan kulit, dan mengunci kelembapan intensif.",
        "productType": "Moisturizer",
        "tags": ["numa skin", "adenosine", "moisturizer", "anti aging", "deep sea water", "skin barrier", "wrinkle care", "firming", "bpom"],
        "collections": ["all-products", "moisturizer-day-cream", "anti-aging-series"],
        "bpom": "NA18230107871",
        "netto": "30 gr",
        "texture": "Krim lembut kaya nutrisi tanpa rasa lengket",
        "skinType": "Kulit normal, kering, dehidrasi, dan tanda penuaan",
        "benefits": [
            ("Wrinkle & Fine Line Care", "Adenosine bekerja aktif merawat elastisitas kulit dan menyamarkan garis halus."),
            ("Deep Moisture Lock", "Mengunci kelembapan hingga lapisan kulit terdalam agar tidak mudah kering."),
            ("Skin Barrier Plumping", "Memberikan efek kulit kenyal, halus, dan tampak lebih awet muda.")
        ],
        "actives": [
            ("Adenosine", "Bahan aktif anti-aging teruji klinis untuk peremajaan dan stimulasi kolagen."),
            ("Deep Sea Water", "Memberi pasokan hidrasi mineral esensial yang berkelanjutan."),
            ("Nutritive Emollients", "Melindungi lapisan pelindung kulit dari radikal bebas.")
        ],
        "usage": [
            "Gunakan setelah pengaplikasian toner dan serum.",
            "Ambil krim secukupnya dan oleskan merata ke area wajah dan leher.",
            "Pijat lembut ke arah atas hingga krim menyerap sempurna.",
            "Gunakan pagi dan malam hari secara teratur."
        ]
    },
    "calming-hydrating-barrier-gloss-gel-moisturizer-30ml": {
        "title": "Numa Skin Calming Barrier Gloss Gel Moisturizer 30ml",
        "subtitle": "Gel Pelembap Ringan Penenang Kulit untuk Tampilan Sehat & Dewy Glow",
        "handle": "numa-skin-calming-barrier-gloss-gel-moisturizer-30ml",
        "metaTitle": "Numa Skin Calming Barrier Gloss Gel Moisturizer 30ml",
        "metaDescription": "Gel pelembap penenang skin barrier ringan dengan efek dewy gloss alami, menyerap cepat, dan merawat kulit berminyak atau berjerawat.",
        "productType": "Moisturizer",
        "tags": ["numa skin", "gloss gel", "moisturizer", "barrier gel", "calming", "hydrating", "dewy skin", "acne friendly", "bpom"],
        "collections": ["all-products", "moisturizer-day-cream", "anti-aging-series"],
        "bpom": "NA18230100779",
        "netto": "30 ml",
        "texture": "Gel transparan sejuk, ringan, dan cepat meresap",
        "skinType": "Kulit berminyak, kombinasi, berjerawat, sensitif",
        "benefits": [
            ("Instant Calming", "Meredakan iritasi ringan, kemerahan, dan sensasi panas pada kulit seketika."),
            ("Oil-Free Dewy Glow", "Memberikan hidrasi optimal dengan kilau sehat tanpa menyumbat pori-pori."),
            ("Lightweight Barrier Defense", "Memperbaiki ketahanan skin barrier tanpa rasa berminyak atau berat.")
        ],
        "actives": [
            ("Soothing Gel Base", "Menenangkan peradangan ringan dan menjaga kesegaran kulit."),
            ("Hydration Micro-Network", "Mengalirkan molekul air ke sel kulit secara konstan."),
            ("Marine Botanical Extracts", "Merawat tekstur kulit agar tetap halus dan pori tampak tersamar.")
        ],
        "usage": [
            "Aplikasikan pada wajah yang telah dibersihkan dan diberi toner/serum.",
            "Ratakan gel ke seluruh wajah dan leher.",
            "Tepuk perlahan hingga lapisan gel meresap sempurna.",
            "Ideal digunakan pagi hari sebelum tabir surya atau sebagai base makeup."
        ]
    },
    "pdrn-alpha-arbutin-tone-up-day-cream-30gr": {
        "title": "Numa Skin PDRN Alpha Arbutin Tone-Up Day Cream 30g",
        "subtitle": "Krim Pagi Pencerah Instan & Perawatan Anti-Aging dengan UV Protection",
        "handle": "numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g",
        "metaTitle": "Numa Skin PDRN Alpha Arbutin Tone-Up Day Cream 30g",
        "metaDescription": "Day cream pencerah alami dengan PDRN dan Alpha Arbutin untuk meratakan warna kulit seketika dan merawat keremajaan kulit sepanjang hari.",
        "productType": "Day Cream",
        "tags": ["numa skin", "day cream", "pdrn", "alpha arbutin", "tone up", "brightening", "anti aging", "glowing", "bpom"],
        "collections": ["all-products", "moisturizer-day-cream", "anti-aging-series"],
        "bpom": "NA18240107890",
        "netto": "30 gr",
        "texture": "Krim lembut tone-up natural tanpa white-cast abu-abu",
        "skinType": "Semua jenis kulit, warna kulit tidak merata, kusam",
        "benefits": [
            ("Natural Tone-Up", "Mencerahkan kulit seketika dengan hasil transparan natural yang menyatu dengan warna kulit."),
            ("PDRN Cellular Rejuvenation", "Mendukung perbaikan sel kulit dan meningkatkan elastisitas jangka panjang."),
            ("Dark Spot Minimizer", "Alpha Arbutin membantu memudarkan tampilan noda hitam dan hiperpigmentasi.")
        ],
        "actives": [
            ("PDRN (Polydeoxyribonucleotide)", "Bahan aktif regenerasi seluler untuk keremajaan kulit yang kenyal."),
            ("Alpha Arbutin", "Bahan pencerah efektif untuk menyamarkan bintik hitam dan warna kulit kusam."),
            ("Moisture Shield", "Melindungi kelembapan kulit saat beraktivitas di siang hari.")
        ],
        "usage": [
            "Gunakan pada pagi atau siang hari setelah rangkaian pembersih, toner, dan serum.",
            "Ambil secukupnya lalu ratakan ke seluruh wajah dan leher.",
            "Dapat digunakan tersendiri untuk tampilan wajah glowing natural atau sebelum bedak/makeup."
        ]
    },
    "oxydew-sunscreen-luceane-spf50-pa4plus-30ml": {
        "title": "Numa Skin Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml",
        "subtitle": "Tabir Surya Ringan Perlindungan Maksimal & Anti-Polusi Tanpa White Cast",
        "handle": "numa-skin-oxydew-sunscreen-luceane-spf50-30ml",
        "metaTitle": "Numa Skin Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml",
        "metaDescription": "Sunscreen SPF 50+ PA++++ ringan dengan Luceane™ anti-pollution shield untuk melindungi kulit dari sinar UVA/UVB dan polusi tanpa white cast.",
        "productType": "Sunscreen",
        "tags": ["numa skin", "sunscreen", "spf 50", "pa++++", "luceane", "uv protection", "anti pollution", "no white cast", "bpom"],
        "collections": ["all-products", "sunscreen-protection", "anti-aging-series"],
        "bpom": "NA18241700684",
        "netto": "30 ml",
        "texture": "Lotion seringan air, tidak lengket, bebas white-cast",
        "skinType": "Semua jenis kulit, termasuk kulit berminyak dan sensitif",
        "benefits": [
            ("Broad Spectrum Defense", "Perlindungan tinggi SPF 50+ PA++++ menangkal bahaya UVA dan UVB penyebab photo-aging."),
            ("Luceane™ Anti-Pollution Shield", "Membantu melindungi sel kulit dari partikel polusi dan radikal bebas lingkungan."),
            ("Comfortable Matte-Dewy Finish", "Cepat meresap, tidak perih di mata, dan tidak menyebabkan kilap minyak berlebih.")
        ],
        "actives": [
            ("Modern UV Filters", "Kombinasi filter UV generasi baru yang stabil dan nyaman di kulit."),
            ("Luceane™ Complex", "Teknologi perlindungan anti-oksidatif terhadap stresor lingkungan."),
            ("Hydrating Agents", "Menjaga keseimbangan hidrasi kulit di bawah terik matahari.")
        ],
        "usage": [
            "Gunakan sebagai langkah terakhir dalam rutinitas skincare pagi hari.",
            "Kocok perlahan, lalu oleskan secara merata ke seluruh wajah dan leher sebanyak dua ruas jari.",
            "Tunggu 1–2 menit hingga meresap sebelum beraktivitas di luar ruangan atau mengaplikasikan riasan.",
            "Aplikasikan kembali setiap 2–3 jam jika terpapar matahari intens atau berkeringat."
        ]
    },
    "nad-plus-booster-anti-aging-whitening-serum-20ml": {
        "title": "Numa Skin NAD+ Booster Anti-Aging Serum 20ml",
        "subtitle": "Serum Konsentrat Rejuvenasi Seluler untuk Kulit Kencang & Cerah Merata",
        "handle": "numa-skin-nad-booster-anti-aging-serum-20ml",
        "metaTitle": "Numa Skin NAD+ Booster Anti-Aging Serum 20ml",
        "metaDescription": "Serum anti aging dengan NAD+ Booster berkonsentrasi tinggi untuk mengencangkan kulit, menyamarkan tanda penuaan dini, dan mencerahkan secara intensif.",
        "productType": "Face Serum",
        "tags": ["numa skin", "serum", "nad+", "booster serum", "anti aging", "brightening", "firming", "skin rejuvenation", "bpom"],
        "collections": ["all-products", "serum-treatment", "anti-aging-series"],
        "bpom": "NA18242000231",
        "netto": "20 ml",
        "texture": "Serum konsentrat halus cepat meresap berenergi tinggi",
        "skinType": "Semua jenis kulit, khususnya kulit lelah, kusam, tanda penuaan",
        "benefits": [
            ("Cellular Rejuvenation", "Mendukung produksi energi seluler untuk mempercepat regenerasi kulit secara optimal."),
            ("Intensive Firming", "Merawat kekencangan dan elastisitas kulit sehingga tampak lebih muda dan kenyal."),
            ("Radiance Glow", "Membantu menyamarkan noda gelap dan mengembalikan kilau cerah alami wajah.")
        ],
        "actives": [
            ("NAD+ Booster Complex", "Molekul inovatif yang mendorong revitalisasi sel dan melawan penuaan dini."),
            ("Peptide & Antioxidant Blend", "Mendukung pembentukan kolagen dan pertahanan terhadap radikal bebas."),
            ("High-Purity Botanical Extracts", "Menutrisi dan menenangkan kulit agar tetap seimbang.")
        ],
        "usage": [
            "Gunakan pada wajah yang telah dibersihkan dan disiapkan dengan treatment lotion.",
            "Teteskan 2–3 tetes serum langsung ke dahi dan kedua pipi.",
            "Ratakan ke seluruh wajah dan leher dengan gerakan memijat ke arah atas secara lembut.",
            "Gunakan pada pagi dan malam hari sebelum pelembap."
        ]
    }
}

# 42 Bundles Clean Mapping
BUNDLES_CONFIG = {
    "paket-lengkap-6-in-1-complete-routine": {
        "title": "Numa Skin Paket Lengkap 6-in-1 Routine",
        "subtitle": "Rangkaian Terlengkap 6 Langkah untuk Kulit Awet Muda & Cerah",
        "handle": "numa-skin-paket-lengkap-6-in-1-routine",
        "metaDescription": "Paket skincare lengkap 6-in-1 Numa Skin: Facial Wash, Treatment Lotion, Adenosine, Day Cream, NAD+ Serum, dan Oxydew Sunscreen untuk perawatan total."
    },
    "paket-ultimate-anti-aging-set-150ml": {
        "title": "Numa Skin Paket Ultimate Anti-Aging 150ml",
        "subtitle": "Set Lengkap Peremajaan Kulit dengan Treatment Lotion Full Size",
        "handle": "numa-skin-paket-ultimate-anti-aging-150ml",
        "metaDescription": "Paket ultimate anti aging Numa Skin dengan Treatment Lotion 150ml, Adenosine, PDRN Day Cream, Oxydew Sunscreen, dan NAD+ Serum berizin resmi BPOM."
    },
    "paket-ultimate-anti-aging-set-50ml": {
        "title": "Numa Skin Paket Ultimate Anti-Aging 50ml",
        "subtitle": "Set Lengkap Peremajaan Kulit Praktis dengan Treatment Lotion 50ml",
        "handle": "numa-skin-paket-ultimate-anti-aging-50ml",
        "metaDescription": "Paket perawatan anti-aging lengkap dengan Treatment Lotion 50ml, pelembap Adenosine, Day Cream PDRN, tabir surya SPF 50+, dan serum NAD+."
    },
    "paket-complete-routine-4-in-1-150ml": {
        "title": "Numa Skin Paket Complete Routine 4-in-1 150ml",
        "subtitle": "Empat Langkah Esensial Perawatan Wajah Anti Aging Full Size",
        "handle": "numa-skin-paket-complete-routine-4-in-1-150ml",
        "metaDescription": "Paket perawatan 4-in-1 Numa Skin: Treatment Lotion 150ml, Adenosine Moisturizer, Oxydew Sunscreen, dan NAD+ Booster Serum untuk hasil maksimal."
    },
    "paket-complete-routine-4-in-1-50ml": {
        "title": "Numa Skin Paket Complete Routine 4-in-1 50ml",
        "subtitle": "Empat Langkah Esensial Perawatan Wajah Anti Aging Travel Size",
        "handle": "numa-skin-paket-complete-routine-4-in-1-50ml",
        "metaDescription": "Kombinasi 4 produk esensial Numa Skin: Treatment Lotion 50ml, Adenosine Moisturizer, Oxydew Sunscreen, dan NAD+ Serum untuk hidrasi dan keremajaan."
    },
    "paket-triple-protection-3-in-1": {
        "title": "Numa Skin Paket Triple Protection 3-in-1",
        "subtitle": "Tiga Perlindungan Utama: Pembersih, Pelembap, dan Tabir Surya",
        "handle": "numa-skin-paket-triple-protection-3-in-1",
        "metaDescription": "Paket 3 langkah perlindungan harian: Deep Sea Water Facial Wash, Adenosine Moisturizer, dan Oxydew Sunscreen SPF 50+ PA++++."
    },
    "paket-anti-aging-trio": {
        "title": "Numa Skin Paket Anti-Aging Trio",
        "subtitle": "Trio Formulasi Khusus Merawat Kekencangan & Elastisitas Wajah",
        "handle": "numa-skin-paket-anti-aging-trio",
        "metaDescription": "Paket Anti-Aging Trio Numa Skin terdiri dari NAD+ Booster Serum, Adenosine Moisturizer, dan Oxydew Sunscreen untuk perlindungan dan peremajaan intensif."
    },
    "paket-age-repair-trio-150ml": {
        "title": "Numa Skin Paket Age Repair Trio 150ml",
        "subtitle": "Trio Perbaikan Skin Barrier & Tanda Penuaan dengan Lotion 150ml",
        "handle": "numa-skin-paket-age-repair-trio-150ml",
        "metaDescription": "Kombinasi perbaikan kulit dewasa: Treatment Lotion 150ml, Adenosine Moisturizer, dan PDRN Tone-Up Day Cream untuk meratakan warna kulit."
    },
    "paket-age-defense-trio": {
        "title": "Numa Skin Paket Age Defense Trio",
        "subtitle": "Trio Pertahanan Kulit dari Penuaan Dini & Sinar Matahari",
        "handle": "numa-skin-paket-age-defense-trio",
        "metaDescription": "Pertahanan optimal kulit harian dengan PDRN Day Cream, Adenosine Moisturizer, dan Oxydew Sunscreen SPF 50+ dari Numa Skin."
    },
    "paket-rejuvenating-trio-150ml": {
        "title": "Numa Skin Paket Rejuvenating Trio 150ml",
        "subtitle": "Trio Rejuvenasi Kulit Intensif dengan Treatment Lotion 150ml",
        "handle": "numa-skin-paket-rejuvenating-trio-150ml",
        "metaDescription": "Paket regenerasi sel kulit Numa Skin: NAD+ Booster Serum, Adenosine Moisturizer, dan Treatment Lotion 150ml untuk kulit kenyal dan cerah."
    },
    "paket-rejuvenating-trio-50ml": {
        "title": "Numa Skin Paket Rejuvenating Trio 50ml",
        "subtitle": "Trio Rejuvenasi Kulit Intensif dengan Treatment Lotion 50ml",
        "handle": "numa-skin-paket-rejuvenating-trio-50ml",
        "metaDescription": "Paket peremajaan kulit praktis Numa Skin: NAD+ Booster Serum, Adenosine Moisturizer, dan Treatment Lotion 50ml untuk hidrasi dan elastisitas."
    },
    "paket-glow-up-routine-adenosine": {
        "title": "Numa Skin Paket Glow Up Adenosine",
        "subtitle": "Rutinitas Pembersihan, Hidrasi Toner, dan Pelembap Adenosine",
        "handle": "numa-skin-paket-glow-up-adenosine",
        "metaDescription": "Rangkaian pembersih facial wash, hydrating lotion 150ml, dan pelembap Adenosine Numa Skin untuk kulit glowing, bersih, dan ternutrisi."
    },
    "paket-glow-up-routine-gloss-gel": {
        "title": "Numa Skin Paket Glow Up Gloss Gel",
        "subtitle": "Rutinitas Pembersihan, Hidrasi Toner, dan Calming Gloss Gel",
        "handle": "numa-skin-paket-glow-up-gloss-gel",
        "metaDescription": "Paket perawatan kulit segar dan dewy: Facial Wash 100ml, Treatment Lotion 150ml, dan Gloss Gel Moisturizer 30ml untuk kulit kenyal bebas kusam."
    },
    "paket-youth-glow-duo-150ml": {
        "title": "Numa Skin Paket Youth Glow Duo 150ml",
        "subtitle": "Duo Pencerah & Peremajaan Kulit dengan Treatment Lotion 150ml",
        "handle": "numa-skin-paket-youth-glow-duo-150ml",
        "metaDescription": "Paket Youth Glow Numa Skin memadukan PDRN Day Cream dan Treatment Lotion 150ml untuk kulit bercahaya alami dan terlindungi sepanjang hari."
    },
    "paket-youth-glow-duo-50ml": {
        "title": "Numa Skin Paket Youth Glow Duo 50ml",
        "subtitle": "Duo Pencerah & Peremajaan Kulit dengan Treatment Lotion 50ml",
        "handle": "numa-skin-paket-youth-glow-duo-50ml",
        "metaDescription": "Kombinasi praktis PDRN Day Cream dan Treatment Lotion 50ml untuk hidrasi instan dan kecerahan kulit merata."
    },
    "paket-clean-and-glow": {
        "title": "Numa Skin Paket Clean & Glow Duo",
        "subtitle": "Duo Pembersih Wajah & Serum Konsentrat NAD+ Booster",
        "handle": "numa-skin-paket-clean-and-glow",
        "metaDescription": "Dua langkah efektif untuk kulit bersih dan bercahaya: Deep Sea Water Facial Wash 100ml dan NAD+ Booster Serum 20ml."
    },
    "paket-fresh-and-hydrate": {
        "title": "Numa Skin Paket Fresh & Hydrate Duo",
        "subtitle": "Duo Pembersih Wajah Lembut & Treatment Lotion 150ml",
        "handle": "numa-skin-paket-fresh-and-hydrate",
        "metaDescription": "Fondasi perawatan kulit sehat: Facial Wash 100ml untuk pori bersih dan Treatment Lotion 150ml untuk mengembalikan hidrasi seketika."
    },
    "paket-daily-protection": {
        "title": "Numa Skin Paket Daily Protection Duo",
        "subtitle": "Duo Pembersih Wajah & Tabir Surya SPF 50+ PA++++",
        "handle": "numa-skin-paket-daily-protection",
        "metaDescription": "Perlindungan kulit sehari-hari dengan Facial Wash Gel 100ml dan Oxydew Sunscreen SPF 50+ PA++++ bebas rasa lengket."
    },
    "paket-daily-care-adenosine": {
        "title": "Numa Skin Paket Daily Care Adenosine",
        "subtitle": "Duo Pembersih Lembut & Pelembap Anti-Aging Adenosine",
        "handle": "numa-skin-paket-daily-care-adenosine",
        "metaDescription": "Kombinasi harian Facial Wash Gel 100ml dan Adenosine Moisturizer 30g untuk merawat kelembapan dan elastisitas kulit setiap hari."
    },
    "paket-daily-care-gloss-gel": {
        "title": "Numa Skin Paket Daily Care Gloss Gel",
        "subtitle": "Duo Pembersih Lembut & Pelembap Calming Gloss Gel",
        "handle": "numa-skin-paket-daily-care-gloss-gel",
        "metaDescription": "Perawatan harian ringan: Facial Wash Gel 100ml dan Calming Barrier Gloss Gel Moisturizer 30ml untuk kulit segar dan seimbang."
    },
    "paket-daily-glow": {
        "title": "Numa Skin Paket Daily Glow Duo",
        "subtitle": "Duo Pembersih Lembut & PDRN Tone-Up Day Cream",
        "handle": "numa-skin-paket-daily-glow",
        "metaDescription": "Paket Daily Glow Numa Skin memadukan Facial Wash 100ml dan PDRN Tone-Up Day Cream 30g untuk kulit bersih dan cerah seketika."
    },
    "paket-skin-protection-duo": {
        "title": "Numa Skin Paket Skin Protection Duo",
        "subtitle": "Duo Perlindungan Seluler: Serum NAD+ & Sunscreen SPF 50+",
        "handle": "numa-skin-paket-skin-protection-duo",
        "metaDescription": "Kombinasi antioksidan dan proteksi matahari: NAD+ Booster Serum 20ml dan Oxydew Sunscreen SPF 50+ PA++++ untuk perlindungan ganda."
    },
    "paket-skin-recharge-duo-150ml": {
        "title": "Numa Skin Paket Skin Recharge Duo 150ml",
        "subtitle": "Duo Rehidrasi & Energi Seluler dengan Lotion 150ml",
        "handle": "numa-skin-paket-skin-recharge-duo-150ml",
        "metaDescription": "Kembalikan vitalitas kulit lelah dengan Treatment Lotion 150ml dan NAD+ Booster Serum 20ml dari Numa Skin."
    },
    "paket-skin-recharge-duo-50ml": {
        "title": "Numa Skin Paket Skin Recharge Duo 50ml",
        "subtitle": "Duo Rehidrasi & Energi Seluler dengan Lotion 50ml",
        "handle": "numa-skin-paket-skin-recharge-duo-50ml",
        "metaDescription": "Paket recharge kulit travel-friendly: Treatment Lotion 50ml dan NAD+ Booster Serum 20ml untuk kulit kenyal dan berenergi."
    },
    "paket-timeless-skin-set": {
        "title": "Numa Skin Paket Timeless Skin Set",
        "subtitle": "Duo Serum NAD+ & Pelembap Calming Gloss Gel",
        "handle": "numa-skin-paket-timeless-skin-set",
        "metaDescription": "Perawatan anti-aging bertekstur ringan: NAD+ Booster Serum 20ml dan Calming Barrier Gloss Gel 30ml untuk kulit halus dan awet muda."
    },
    "paket-nad-youth-boost-set": {
        "title": "Numa Skin Paket NAD+ Youth Boost Set",
        "subtitle": "Duo Serum Konsentrat NAD+ & Pelembap Adenosine",
        "handle": "numa-skin-paket-nad-youth-boost-set",
        "metaDescription": "Dua formula anti-aging andalan: NAD+ Booster Serum 20ml dan Adenosine Moisturizer 30g untuk mengatasi garis halus dan kerutan."
    },
    "paket-luminous-duo": {
        "title": "Numa Skin Paket Luminous Duo",
        "subtitle": "Duo Pencerah Kulit: Day Cream PDRN & Serum NAD+",
        "handle": "numa-skin-paket-luminous-duo",
        "metaDescription": "Kombinasi pencerah intensif PDRN Tone-Up Day Cream 30g dan NAD+ Booster Serum 20ml untuk warna kulit cerah merata."
    },
    "paket-daily-protection-duo-pdrn": {
        "title": "Numa Skin Paket Protection Duo PDRN",
        "subtitle": "Duo Day Cream PDRN & Tabir Surya SPF 50+ PA++++",
        "handle": "numa-skin-paket-protection-duo-pdrn",
        "metaDescription": "Proteksi siang hari maksimal dengan PDRN Tone-Up Day Cream 30g dan Oxydew Sunscreen SPF 50+ PA++++."
    },
    "paket-hydra-glow-duo": {
        "title": "Numa Skin Paket Hydra Glow Duo",
        "subtitle": "Duo Pelembap Adenosine & Krim Pagi PDRN Tone-Up",
        "handle": "numa-skin-paket-hydra-glow-duo",
        "metaDescription": "Nutrisi kelembapan dan tampilan cerah seketika: Adenosine Moisturizer 30g dan PDRN Tone-Up Day Cream 30g dari Numa Skin."
    },
    "paket-moist-glow-duo": {
        "title": "Numa Skin Paket Moist Glow Duo",
        "subtitle": "Duo Calming Gloss Gel & Krim Pagi PDRN Tone-Up",
        "handle": "numa-skin-paket-moist-glow-duo",
        "metaDescription": "Paket pelembap segar dan tone-up natural: Calming Gloss Gel 30ml dan PDRN Tone-Up Day Cream 30g untuk hasil dewy glowing."
    },
    "paket-bundling-sunscreen-dan-gloss-gel": {
        "title": "Numa Skin Paket Sunscreen & Gloss Gel",
        "subtitle": "Duo Tabir Surya Ringan SPF 50+ & Gel Pelembap Sejuk",
        "handle": "numa-skin-paket-sunscreen-dan-gloss-gel",
        "metaDescription": "Kombinasi nyaman kulit berminyak: Oxydew Sunscreen SPF 50+ PA++++ 30ml dan Calming Barrier Gloss Gel Moisturizer 30ml."
    },
    "paket-bundling-sunscreen-dan-toner-150ml": {
        "title": "Numa Skin Paket Sunscreen & Toner 150ml",
        "subtitle": "Duo Hidrasi Maksimal & Perlindungan UV Harian",
        "handle": "numa-skin-paket-sunscreen-dan-toner-150ml",
        "metaDescription": "Treatment Lotion 150ml berpadu dengan Oxydew Sunscreen SPF 50+ PA++++ 30ml untuk menjaga kadar air dan memproteksi kulit dari sinar matahari."
    },
    "paket-bundling-sunscreen-dan-toner-50ml": {
        "title": "Numa Skin Paket Sunscreen & Toner 50ml",
        "subtitle": "Duo Hidrasi Travel Size & Perlindungan UV Harian",
        "handle": "numa-skin-paket-sunscreen-dan-toner-50ml",
        "metaDescription": "Paket praktis bepergian: Treatment Lotion 50ml dan Oxydew Sunscreen SPF 50+ PA++++ 30ml untuk kulit terlindungi di mana saja."
    },
    "paket-bundling-sunscreen-adenosine-dan-toner-150ml": {
        "title": "Numa Skin Paket Sunscreen, Adenosine & Toner 150ml",
        "subtitle": "Trio Perlindungan, Pelembap Anti-Aging & Toner 150ml",
        "handle": "numa-skin-paket-sunscreen-adenosine-toner-150ml",
        "metaDescription": "Tiga langkah esensial harian: Treatment Lotion 150ml, Adenosine Moisturizer 30g, dan Oxydew Sunscreen SPF 50+ PA++++ 30ml."
    },
    "paket-bundling-sunscreen-adenosine-dan-toner-50ml": {
        "title": "Numa Skin Paket Sunscreen, Adenosine & Toner 50ml",
        "subtitle": "Trio Perlindungan, Pelembap Anti-Aging & Toner 50ml",
        "handle": "numa-skin-paket-sunscreen-adenosine-toner-50ml",
        "metaDescription": "Kombinasi harian lengkap: Treatment Lotion 50ml, Adenosine Moisturizer 30g, dan Oxydew Sunscreen SPF 50+ PA++++ 30ml."
    },
    "paket-bundling-adenosine-dan-sunscreen": {
        "title": "Numa Skin Paket Adenosine & Sunscreen",
        "subtitle": "Duo Pelembap Anti-Aging Adenosine & Tabir Surya SPF 50+",
        "handle": "numa-skin-paket-adenosine-dan-sunscreen",
        "metaDescription": "Kombinasi nutrisi pencegah penuaan dan perlindungan sinar UV: Adenosine Moisturizer 30g dan Oxydew Sunscreen SPF 50+ PA++++ 30ml."
    },
    "paket-bundling-adenosine-dan-toner-150ml": {
        "title": "Numa Skin Paket Adenosine & Toner 150ml",
        "subtitle": "Duo Pelembap Anti-Aging & Treatment Lotion 150ml",
        "handle": "numa-skin-paket-adenosine-dan-toner-150ml",
        "metaDescription": "Perawatan mendalam skin barrier: Treatment Lotion 150ml dan Adenosine Moisturizer 30g untuk kulit lembap, kenyal, dan sehat."
    },
    "paket-bundling-toner-50ml-dan-gloss-gel": {
        "title": "Numa Skin Paket Toner 50ml & Gloss Gel",
        "subtitle": "Duo Hidrasi Segar Praktis & Calming Gloss Gel",
        "handle": "numa-skin-paket-toner-50ml-dan-gloss-gel",
        "metaDescription": "Paket hidrasi ringan: Treatment Lotion 50ml dan Calming Barrier Gloss Gel 30ml untuk menenangkan kulit kemerahan dan lelah."
    },
    "paket-bundling-toner-150ml-dan-gloss-gel": {
        "title": "Numa Skin Paket Toner 150ml & Gloss Gel",
        "subtitle": "Duo Treatment Lotion 150ml & Calming Gloss Gel",
        "handle": "numa-skin-paket-toner-150ml-dan-gloss-gel",
        "metaDescription": "Kombinasi hidrasi penuh: Treatment Lotion 150ml dan Calming Gloss Gel 30ml untuk kulit kenyal bercahaya dewy look."
    },
    "paket-hemat-twin-pack-toner-2x150ml": {
        "title": "Numa Skin Paket Twin Pack Toner 2x150ml",
        "subtitle": "Duo Treatment Lotion Full Size Ekstra Hemat 2x150ml",
        "handle": "numa-skin-paket-twin-pack-toner-2x150ml",
        "metaDescription": "Paket hemat 2 botol Treatment Lotion 150ml Numa Skin untuk perawatan hidrasi jangka panjang dan skin barrier kuat."
    },
    "paket-duo-toner-full-size-and-travel-size": {
        "title": "Numa Skin Paket Duo Toner 150ml + 50ml",
        "subtitle": "Paket Komplit Treatment Lotion Full Size & Travel Size",
        "handle": "numa-skin-paket-duo-toner-150ml-50ml",
        "metaDescription": "Kombinasi Treatment Lotion 150ml untuk di rumah dan 50ml praktis dibawa bepergian, menjaga kulit terhidrasi kapan saja."
    },
    "paket-exclusive-package-lotion-gloss-gel-pouch": {
        "title": "Numa Skin Paket Exclusive Lotion & Gloss Gel",
        "subtitle": "Paket Eksklusif Treatment Lotion 150ml, 50ml & Gloss Gel",
        "handle": "numa-skin-paket-exclusive-lotion-gloss-gel",
        "metaDescription": "Paket eksklusif Numa Skin berisi Treatment Lotion 150ml, Treatment Lotion 50ml, Calming Gloss Gel 30ml, dan pouch cantik."
    }
}

VIEW_DESCRIPTORS = [
    ("front", "Front View"),
    ("angle", "Product Angle View"),
    ("texture", "Texture & Formula Detail"),
    ("ingredients", "Key Ingredients & Benefits"),
    ("usage", "Application & Routine Guide"),
    ("packaging", "Packaging & Bottle Detail"),
    ("detail", "Close-up Feature View"),
    ("lifestyle", "Daily Routine Presentation"),
    ("gallery", "Product Overview")
]

def build_single_html(config):
    benefits_html = "\n".join([f"  <li><strong>{title}</strong> — {desc}</li>" for title, desc in config["benefits"]])
    actives_html = "\n".join([f"  <li><strong>{title}</strong> — {desc}</li>" for title, desc in config["actives"]])
    usage_html = "\n".join([f"  <li>{step}</li>" for step in config["usage"]])
    
    html = f"""<p class="product-subtitle"><em>{config['subtitle']}</em></p>
<p>{config['metaDescription']}</p>

<h3>Manfaat Utama</h3>
<ul>
{benefits_html}
</ul>

<h3>Bahan Aktif Unggulan</h3>
<ul>
{actives_html}
</ul>

<h3>Cara Penggunaan</h3>
<ol>
{usage_html}
</ol>

<h3>Spesifikasi Produk</h3>
<table>
  <tr><td><strong>Nomor BPOM</strong></td><td>{config['bpom']}</td></tr>
  <tr><td><strong>Netto / Isi</strong></td><td>{config['netto']}</td></tr>
  <tr><td><strong>Tekstur</strong></td><td>{config['texture']}</td></tr>
  <tr><td><strong>Tipe Kulit</strong></td><td>{config['skinType']}</td></tr>
</table>"""
    return html

def build_bundle_html(title, subtitle, meta_desc):
    html = f"""<p class="product-subtitle"><em>{subtitle}</em></p>
<p>{meta_desc}</p>

<h3>Manfaat Rangkaian Paket</h3>
<ul>
  <li><strong>Perawatan Sinergis</strong> — Kombinasi formula yang dirancang saling melengkapi untuk hasil yang lebih cepat dan optimal.</li>
  <li><strong>Deep Sea Water Mineral Infusion</strong> — Seluruh produk diperkaya kebaikan mineral laut murni untuk menjaga hidrasi dan keseimbangan kulit.</li>
  <li><strong>Nilai Lebih Hemat</strong> — Penawaran bundling istimewa untuk mendukung rutinitas perawatan wajah berkelanjutan.</li>
</ul>

<h3>Urutan Pemakaian Rutin</h3>
<ol>
  <li><strong>Pembersih:</strong> Bersihkan wajah dengan Deep Sea Water Facial Wash Gel, bilas hingga bersih.</li>
  <li><strong>Hidrasi / Toner:</strong> Aplikasikan Treatment Lotion saat kulit masih sedikit lembap.</li>
  <li><strong>Nutrisi / Serum:</strong> Teteskan NAD+ Booster Serum dan ratakan dengan pijatan lembut ke arah atas.</li>
  <li><strong>Pelembap:</strong> Kunci hidrasi dengan pelembap Adenosine atau Calming Gloss Gel hingga meresap.</li>
  <li><strong>Proteksi Pagi:</strong> Gunakan Tone-Up Day Cream dan akhiri dengan Oxydew Sunscreen SPF 50+ PA++++ sebelum beraktivitas.</li>
</ol>

<h3>Spesifikasi Paket</h3>
<table>
  <tr><td><strong>Merek Resmi</strong></td><td>Numa Skin</td></tr>
  <tr><td><strong>Kategori</strong></td><td>Paket Perawatan Wajah (Skincare Set)</td></tr>
  <tr><td><strong>Status BPOM</strong></td><td>Seluruh produk dalam paket resmi berizin edar BPOM</td></tr>
  <tr><td><strong>Fokus Perawatan</strong></td><td>Anti-aging, mencerahkan, memperkuat skin barrier, hidrasi intensif</td></tr>
</table>"""
    return html

def main():
    with open(os.path.join(DATA_DIR, "shopee_canonical_catalog.json")) as f:
        source_data = json.load(f)

    clean_catalog = {
        "singles": [],
        "bundles": [],
        "collections": [
            {
                "title": "Semua Produk",
                "handle": "all-products",
                "description": "Koleksi lengkap produk perawatan kulit resmi Numa Skin dengan formula Deep Sea Water, anti-aging, dan pencerah berkualitas tinggi.",
                "seoTitle": "Koleksi Skincare Numa Skin Resmi | Semua Produk",
                "seoDescription": "Temukan seluruh produk skincare resmi Numa Skin: pembersih wajah, hydrating toner, moisturizer, day cream, serum NAD+, dan sunscreen berizin BPOM."
            },
            {
                "title": "Pembersih & Toner",
                "handle": "cleanser-toner",
                "description": "Langkah awal esensial membersihkan dan mengembalikan hidrasi alami kulit dengan kebaikan mineral laut.",
                "seoTitle": "Pembersih Wajah & Hydrating Toner | Numa Skin",
                "seoDescription": "Facial wash gel lembut dan hydrating treatment lotion Numa Skin untuk membersihkan pori serta memperkuat skin barrier tanpa efek kering."
            },
            {
                "title": "Serum & Perawatan Intensif",
                "handle": "serum-treatment",
                "description": "Konsentrat nutrisi seluler untuk peremajaan, mengencangkan kulit, dan mengatasi tanda penuaan dini.",
                "seoTitle": "Serum Anti Aging & Whitening | Numa Skin",
                "seoDescription": "Serum konsentrat NAD+ Booster Numa Skin teruji merawat keremajaan kulit, memperbaiki elastisitas, dan mencerahkan warna kulit kusam."
            },
            {
                "title": "Pelembap & Krim Pagi",
                "handle": "moisturizer-day-cream",
                "description": "Krim pelembap kaya nutrisi dan day cream untuk menjaga elastisitas serta hidrasi kulit sepanjang hari.",
                "seoTitle": "Moisturizer & Tone-Up Day Cream | Numa Skin",
                "seoDescription": "Pelembap Adenosine, Gloss Gel penenang barrier, dan PDRN Tone-Up Day Cream dari Numa Skin untuk kulit kenyal dan glowing natural."
            },
            {
                "title": "Tabir Surya & Perlindungan",
                "handle": "sunscreen-protection",
                "description": "Perlindungan maksimal terhadap sinar UVA/UVB dan polusi lingkungan tanpa rasa lengket atau white cast.",
                "seoTitle": "Sunscreen SPF 50+ PA++++ Ringan | Numa Skin",
                "seoDescription": "Oxydew Sunscreen Numa Skin dengan SPF 50+ PA++++ dan teknologi Luceane™ melindungi kulit dari photo-aging dan polusi perkotaan."
            },
            {
                "title": "Paket Hemat & Bundling",
                "handle": "paket-hemat-bundling",
                "description": "Rangkaian produk komprehensif dengan penawaran hemat untuk hasil perawatan kulit yang maksimal dan sinergis.",
                "seoTitle": "Paket Hemat & Bundling Skincare | Numa Skin",
                "seoDescription": "Pilihan paket hemat skincare Numa Skin: Duo, Trio, Routine 4-in-1, dan Complete 6-in-1 Set untuk solusi perawatan wajah menyeluruh."
            },
            {
                "title": "Anti-Aging Series",
                "handle": "anti-aging-series",
                "description": "Rangkaian formulasi khusus untuk merawat elastisitas kulit, memudarkan garis halus, dan menjaga keremajaan wajah.",
                "seoTitle": "Rangkaian Perawatan Anti Aging Resmi | Numa Skin",
                "seoDescription": "Formula anti aging Numa Skin dengan perpaduan Deep Sea Water, Adenosine, PDRN, dan NAD+ untuk kulit kenyal, kencang, dan bercahaya."
            }
        ]
    }

    # Process Singles
    print("=== Processing 8 Singles ===")
    for s in source_data["singles"]:
        slug = s["slug"]
        if slug not in SINGLES_CONFIG:
            continue
        cfg = SINGLES_CONFIG[slug]
        
        # Prepare Media & SEO filenames
        seo_images = []
        source_img_dir = os.path.join(IMAGES_DIR, slug)
        if os.path.exists(source_img_dir):
            files = sorted([f for f in os.listdir(source_img_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
            for idx, fname in enumerate(files):
                ext = os.path.splitext(fname)[1].lower()
                suffix_key, view_desc = VIEW_DESCRIPTORS[idx % len(VIEW_DESCRIPTORS)]
                seo_filename = f"{cfg['handle']}-{idx+1:02d}-{suffix_key}{ext}"
                src_path = os.path.join(source_img_dir, fname)
                dest_path = os.path.join(SEO_IMAGES_DIR, seo_filename)
                shutil.copy2(src_path, dest_path)
                
                alt_text = f"{cfg['title']} - {view_desc}"
                if len(alt_text) > 120:
                    alt_text = alt_text[:120].strip()
                    
                seo_images.append({
                    "original_file": fname,
                    "seo_filename": seo_filename,
                    "local_path": dest_path,
                    "alt_text": alt_text,
                    "position": idx + 1
                })

        body_html = build_single_html(cfg)
        
        variants = []
        for v in s.get("variants", []):
            variants.append({
                "title": "Default Title",
                "price": str(v["price"]),
                "compareAtPrice": str(v["original_price"]),
                "sku": f"NUMA-{slug.upper()[:12]}",
                "inventoryQuantity": v.get("stock", 100),
                "requiresShipping": True
            })
        if not variants:
            variants.append({
                "title": "Default Title",
                "price": str(s["price"]),
                "compareAtPrice": str(s["original_price"]),
                "sku": f"NUMA-{slug.upper()[:12]}",
                "inventoryQuantity": 100,
                "requiresShipping": True
            })

        item_clean = {
            "slug": slug,
            "title": cfg["title"],
            "subtitle": cfg["subtitle"],
            "handle": cfg["handle"],
            "metaTitle": cfg["metaTitle"],
            "metaDescription": cfg["metaDescription"],
            "productType": cfg["productType"],
            "tags": cfg["tags"],
            "collections": cfg["collections"],
            "price": s["price"],
            "compareAtPrice": s["original_price"],
            "bodyHtml": body_html,
            "media": seo_images,
            "variants": variants,
            "bpom": cfg["bpom"],
            "netto": cfg["netto"]
        }
        clean_catalog["singles"].append(item_clean)

        # Update Markdown
        md_path = os.path.join(PRODUCTS_MD_DIR, f"{slug}.md")
        md_content = f"""---
title: "{cfg['title']}"
subtitle: "{cfg['subtitle']}"
slug: "{slug}"
handle: "{cfg['handle']}"
category: "skincare"
type: "single"
product_type: "{cfg['productType']}"
price: {s['price']}
price_formatted: "{s['price_formatted']}"
original_price: {s['original_price']}
original_price_formatted: "{s['original_price_formatted']}"
discount_percentage: {s.get('discount_percentage', 0)}
bpom_number: "{cfg['bpom']}"
netto: "{cfg['netto']}"
meta_title: "{cfg['metaTitle']}"
meta_description: "{cfg['metaDescription']}"
tags:
{chr(10).join(['  - ' + t for t in cfg['tags']])}
collections:
{chr(10).join(['  - ' + c for c in cfg['collections']])}
images:
{chr(10).join(['  - ' + img['seo_filename'] for img in seo_images])}
---

# {cfg['title']}
> *{cfg['subtitle']}*

## 🌟 Informasi Produk
- **Harga Resmi**: **{s['price_formatted']}**
- **Harga Normal**: ~~{s['original_price_formatted']}~~
- **Nomor BPOM**: `{cfg['bpom']}`
- **Netto**: `{cfg['netto']}`
- **Kategori**: `{cfg['productType']}`

---

## 📝 Deskripsi Produk
{body_html}
"""
        with open(md_path, "w") as f_md:
            f_md.write(md_content)
        print(f"Processed single: {cfg['title']}")

    # Process Bundles
    print("\n=== Processing 42 Bundles ===")
    for b in source_data["bundles"]:
        slug = b["slug"]
        if slug in BUNDLES_CONFIG:
            b_cfg = BUNDLES_CONFIG[slug]
            clean_title = b_cfg["title"]
            subtitle = b_cfg["subtitle"]
            handle = b_cfg["handle"]
            meta_desc = b_cfg["metaDescription"]
        else:
            clean_title = f"Numa Skin Paket {slug.replace('-', ' ').title()}"
            subtitle = "Rangkaian Perawatan Kulit Sinergis & Hemat"
            handle = f"numa-skin-{slug}"
            meta_desc = f"{clean_title}. {subtitle}. Seluruh produk bersertifikasi BPOM dengan formula teruji klinis."

        meta_title = clean_title
        tags = ["numa skin", "paket skincare", "skincare set", "bundling hemat", "anti aging", "bpom", "perawatan wajah"]
        collections = ["all-products", "paket-hemat-bundling", "anti-aging-series"]

        # Prepare Media & SEO filenames
        seo_images = []
        source_img_dir = os.path.join(IMAGES_DIR, slug)
        if os.path.exists(source_img_dir):
            files = sorted([f for f in os.listdir(source_img_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
            for idx, fname in enumerate(files):
                ext = os.path.splitext(fname)[1].lower()
                suffix_key, view_desc = VIEW_DESCRIPTORS[idx % len(VIEW_DESCRIPTORS)]
                seo_filename = f"{handle}-{idx+1:02d}-{suffix_key}{ext}"
                src_path = os.path.join(source_img_dir, fname)
                dest_path = os.path.join(SEO_IMAGES_DIR, seo_filename)
                shutil.copy2(src_path, dest_path)
                
                alt_text = f"{clean_title} - {view_desc}"
                if len(alt_text) > 120:
                    alt_text = alt_text[:120].strip()
                    
                seo_images.append({
                    "original_file": fname,
                    "seo_filename": seo_filename,
                    "local_path": dest_path,
                    "alt_text": alt_text,
                    "position": idx + 1
                })

        body_html = build_bundle_html(clean_title, subtitle, meta_desc)

        # Variants
        variants = []
        for v in b.get("variants", []):
            v_name = v.get("name") or "Default Title"
            v_name = v_name.strip() or "Default Title"
            variants.append({
                "title": v_name,
                "price": str(v["price"]),
                "compareAtPrice": str(v.get("original_price", v["price"])),
                "sku": f"NUMA-BND-{slug.upper()[:10]}-{len(variants)+1}",
                "inventoryQuantity": v.get("stock", 50),
                "requiresShipping": True
            })
        if not variants:
            variants.append({
                "title": "Default Title",
                "price": str(b["price"]),
                "compareAtPrice": str(b.get("original_price", b["price"])),
                "sku": f"NUMA-BND-{slug.upper()[:10]}",
                "inventoryQuantity": 50,
                "requiresShipping": True
            })

        bundle_clean = {
            "slug": slug,
            "title": clean_title,
            "subtitle": subtitle,
            "handle": handle,
            "metaTitle": meta_title,
            "metaDescription": meta_desc,
            "productType": "Skincare Set",
            "tags": tags,
            "collections": collections,
            "price": b["price"],
            "compareAtPrice": b["original_price"],
            "bodyHtml": body_html,
            "media": seo_images,
            "variants": variants
        }
        clean_catalog["bundles"].append(bundle_clean)

        # Update Markdown
        md_path = os.path.join(BUNDLES_MD_DIR, f"{slug}.md")
        md_content = f"""---
title: "{clean_title}"
subtitle: "{subtitle}"
slug: "{slug}"
handle: "{handle}"
category: "bundle"
type: "package"
product_type: "Skincare Set"
price: {b['price']}
price_formatted: "{b['price_formatted']}"
original_price: {b['original_price']}
original_price_formatted: "{b['original_price_formatted']}"
discount_percentage: {b.get('discount_percentage', 0)}
meta_title: "{meta_title}"
meta_description: "{meta_desc}"
tags:
{chr(10).join(['  - ' + t for t in tags])}
collections:
{chr(10).join(['  - ' + c for c in collections])}
images:
{chr(10).join(['  - ' + img['seo_filename'] for img in seo_images])}
---

# {clean_title}
> *{subtitle}*

## 🎁 Detail Penawaran Paket
- **Harga Paket**: **{b['price_formatted']}**
- **Harga Normal**: ~~{b['original_price_formatted']}~~
- **Kategori**: `Skincare Set / Paket Bundling`

---

## 📝 Deskripsi Paket
{body_html}
"""
        with open(md_path, "w") as f_md:
            f_md.write(md_content)
        print(f"Processed bundle: {clean_title}")

    # Write Master Clean Catalog
    out_json = os.path.join(DATA_DIR, "shopify_clean_catalog.json")
    with open(out_json, "w") as f_out:
        json.dump(clean_catalog, f_out, indent=2, ensure_ascii=False)
    print(f"\nDone! Saved clean catalog to {out_json}")
    print(f"Total singles: {len(clean_catalog['singles'])}, total bundles: {len(clean_catalog['bundles'])}")

if __name__ == "__main__":
    main()
