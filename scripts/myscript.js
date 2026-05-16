let tarcinAdet = 1;
let mayaAdet = 1;

const tarcinFiyat = 80;
const mayaFiyat = 35;

function sepetiGuncelle() {
    //Toplam tutarı hesapla
    let toplam = (tarcinAdet * tarcinFiyat) + (mayaAdet * mayaFiyat);
    
    document.getElementById("tarcin-adet-yazi").innerText = tarcinAdet;
    document.getElementById("maya-adet-yazi").innerText = mayaAdet;
    document.getElementById("toplam-fiyat-yazi").innerText = toplam + " TL";
}

function tarcinDegistir(deger) {
    tarcinAdet = tarcinAdet + deger;
    if (tarcinAdet < 0) {
        tarcinAdet = 0; 
    }
    sepetiGuncelle();
}

function mayaDegistir(deger) {
    mayaAdet = deger + mayaAdet;
    if (mayaAdet < 0) {
        mayaAdet = 0;
    }
    sepetiGuncelle();
}