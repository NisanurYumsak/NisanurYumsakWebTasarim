/* ==========================================================================
   1. ÜRÜNLER SAYFASI: SEPETE ÜRÜN EKLEME MANTIĞI
   ========================================================================== */

// Sayfadaki tüm "Sepete Ekle" butonlarını bulup tıklama olayını dinliyoruz
const ekleButonlari = document.querySelectorAll('.sepete-ekle-btn');

if (ekleButonlari.length > 0) {
    ekleButonlari.forEach(buton => {
        buton.addEventListener('click', function() {
            // Tıklanan butonun üzerindeki ürün bilgilerini nesneye çeviriyoruz
            const urun = {
                id: this.getAttribute('data-id'),
                ad: this.getAttribute('data-ad'),
                fiyat: parseFloat(this.getAttribute('data-fiyat')),
                resim: this.getAttribute('data-resim'),
                adet: 1
            };

            // Tarayıcı hafızasından mevcut sepeti alıyoruz, yoksa boş liste oluşturuyoruz
            let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
            
            // Ürün sepette zaten var mı kontrol ediyoruz
            const varMi = sepet.find(item => item.id === urun.id);

            if (varMi) {
                varMi.adet += 1; // Varsa miktarını artırıyoruz
            } else {
                sepet.push(urun); // Yoksa listeye yeni ürün ekliyoruz
            }

            // Sepetin güncel halini tarayıcıya kaydediyoruz
            localStorage.setItem('sepet', JSON.stringify(sepet));
            alert(`${urun.ad} sepetinize eklendi!`);
        });
    });
}

/* ==========================================================================
   2. SEPETİM SAYFASI: LİSTELEME VE GÜNCELLEME MANTIĞI
   ========================================================================== */

// Sepetim sayfasındaki listeleme alanını seçiyoruz
const sepetKonteyner = document.getElementById('sepet-listesi');
const toplamFiyatYazi = document.getElementById('toplam-fiyat-yazi');

// Bu fonksiyon sepet sayfasındaki HTML içeriğini dinamik olarak günceller
function sepetiListele() {
    // Eğer sepet sayfasında değilsek fonksiyonun hata vermesini engelliyoruz
    if (!sepetKonteyner) return;

    let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    sepetKonteyner.innerHTML = ""; // Listeyi temizliyoruz
    let toplamTutar = 0;

    if (sepet.length === 0) {
        sepetKonteyner.innerHTML = "<p class='sepet-bos-mesaj'>Sepetiniz şu anda boş.</p>";
        if (toplamFiyatYazi) toplamFiyatYazi.innerText = "0 TL";
        return;
    }

    // Sepetteki her ürün için dinamik birer satır oluşturuyoruz
    sepet.forEach(urun => {
        let urunToplami = urun.fiyat * urun.adet;
        toplamTutar += urunToplami;

        const urunSatiri = document.createElement('div');
        urunSatiri.className = 'sepet-urun-satiri';
        urunSatiri.innerHTML = `
            <img src="${urun.resim}" alt="${urun.ad}" class="sepet-urun-resim">
            <div class="sepet-urun-bilgi">
                <h4>${urun.ad}</h4>
                <p>Birim Fiyat: ${urun.fiyat} TL</p>
            </div>
            <div class="sepet-adet-alani">
                <button onclick="adetDegistir('${urun.id}', -1)">-</button>
                <span>${urun.adet}</span>
                <button onclick="adetDegistir('${urun.id}', 1)">+</button>
            </div>
            <div class="sepet-urun-toplam">${urunToplami} TL</div>
        `;
        sepetKonteyner.appendChild(urunSatiri);
    });

    if (toplamFiyatYazi) {
        toplamFiyatYazi.innerText = toplamTutar + " TL";
    }
}

// Adet artırma ve azaltma fonksiyonu (Dinamik mantık)
function adetDegistir(urunId, deger) {
    let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    const urun = sepet.find(item => item.id === urunId);

    if (urun) {
        urun.adet += deger;
        // Eğer adet sıfıra veya altına düşerse ürünü sepetten siliyoruz
        if (urun.adet <= 0) {
            sepet = sepet.filter(item => item.id !== urunId);
        }
        localStorage.setItem('sepet', JSON.stringify(sepet));
        sepetiListele(); // Listeyi anlık olarak yeniliyoruz
    }
}

// Sayfa açıldığında sepet listeleme fonksiyonunu otomatik çalıştırıyoruz
document.addEventListener('DOMContentLoaded', sepetiListele);// Sepeti tamamen temizleyen fonksiyon
const temizleBtn = document.getElementById('sepeti-temizle-btn');
if (temizleBtn) {
    temizleBtn.addEventListener('click', function() {
        if(confirm("Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?")) {
            localStorage.removeItem('sepet');
            sepetiListele(); // Ekranı anında güncelle
        }
    });
}