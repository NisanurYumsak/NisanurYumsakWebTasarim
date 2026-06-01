
const ekleButonlari = document.querySelectorAll('.sepete-ekle-btn');

if (ekleButonlari.length > 0) {
    ekleButonlari.forEach(buton => {
        buton.addEventListener('click', function() {
            const urun = {
                id: this.getAttribute('data-id'),
                ad: this.getAttribute('data-ad'),
                fiyat: parseFloat(this.getAttribute('data-fiyat')),
                resim: this.getAttribute('data-resim'),
                adet: 1
            };
            let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
            const varMi = sepet.find(item => item.id === urun.id);

            if (varMi) {
                varMi.adet += 1; 
            } else {
                sepet.push(urun); 
            }
            localStorage.setItem('sepet', JSON.stringify(sepet));
            alert(`${urun.ad} sepetinize eklendi!`);
        });
    });
}

const sepetKonteyner = document.getElementById('sepet-listesi');
const toplamFiyatYazi = document.getElementById('toplam-fiyat-yazi');

function sepetiListele() {
    if (!sepetKonteyner) return;

    let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    sepetKonteyner.innerHTML = ""; 
    let toplamTutar = 0;

    if (sepet.length === 0) {
        sepetKonteyner.innerHTML = "<p class='sepet-bos-mesaj'>Sepetiniz şu anda boş.</p>";
        if (toplamFiyatYazi) toplamFiyatYazi.innerText = "0 TL";
        return;
    }

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
function adetDegistir(urunId, deger) {
    let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    const urun = sepet.find(item => item.id === urunId);

    if (urun) {
        urun.adet += deger;
        if (urun.adet <= 0) {
            sepet = sepet.filter(item => item.id !== urunId);
        }
        localStorage.setItem('sepet', JSON.stringify(sepet));
        sepetiListele(); 
    }
}

document.addEventListener('DOMContentLoaded', sepetiListele);
const temizleBtn = document.getElementById('sepeti-temizle-btn');
if (temizleBtn) {
    temizleBtn.addEventListener('click', function() {
        if(confirm("Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?")) {
            localStorage.removeItem('sepet');
            sepetiListele(); 
        }
    });
}
function odemeYap() {
    let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    
    if (sepet.length === 0) {
        alert("Sepetiniz boşken ödeme adımına geçemezsiniz! 🛒");
        return;
    }
    
    alert("Ödeme işlemi şu anda gerçekleştirilemiyor.");
}

function klasikOyunKontrol() {
    
    const inputKutusu = document.getElementById('klasik-cevap-input');
    const sonucYazisi = document.getElementById('quiz-sonuc');
    
    
    if (!inputKutusu || !sonucYazisi) {
        console.error("Hata: HTML elementleri bulunamadı!");
        return;
    }

    
    const kullaniciCevabi = inputKutusu.value.toLowerCase();
    
    
    const gecerliMalzemeler = ['sucuk', 'sosis', 'mısır', 'kaşar', 'mantar', 'zeytin', 'un', 'maya', 'kekik'];
    
    let bilinenMalzemeSayisi = 0;

    
    gecerliMalzemeler.forEach(malzeme => {
        if (kullaniciCevabi.includes(malzeme)) {
            bilinenMalzemeSayisi++;
        }
    });

    
    if (bilinenMalzemeSayisi >= 3) {
        sonucYazisi.innerText = "🎉 Harika! Tarifteki malzemeleri başarıyla bildiniz. 20 TL İndirim Kodunuz: LEZZET20";
        sonucYazisi.style.color = "#2a9d8f";
    } else {
        sonucYazisi.innerText = `❌ En az 3 malzeme bilmeniz gerekiyor. Şu an ${bilinenMalzemeSayisi} malzeme eşleşti. Lütfen tarifi tekrar inceleyip virgüllerle yazın!`;
        sonucYazisi.style.color = "#e56b6f";
    }
}
