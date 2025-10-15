(function(){
  // Guard: do nothing when the expected DOM is not present
  if (!document.getElementById('Content')) return;

    const body = document.querySelector("body");
    const swalst = Swal.mixin({
      timer: 2300,
      allowOutsideClick: false,
      showConfirmButton: false,
      timerProgressBar: true,
      imageHeight: 90,
    });
    const audio = new Audio(linkmp3.src);
    let ftganti = 0;
    let fungsi = 0;
    let fungsiAwal = 0;
    let deffotostiker = fotostiker.src;
    Content.style = "opacity:1;margin-top:16vh";
    const swals = Swal.mixin({
      allowOutsideClick: false,
      cancelButtonColor: "#FF0040",
      imageHeight: 80,
    });

    document.getElementById("kadoIn").onclick = function () {
      if (fungsiAwal == 0) {
        audio.play();
        fungsiAwal = 1;
        kadoIn.style = "transition:all .8s ease;transform:scale(10);opacity:0";
        wallpaper.style = "transform: scale(1.5);";
        ket.style = "display:none";
        setTimeout(initengahan, 300);
        setTimeout(inipesan, 500);
      }
    };

    // DIRECT NAME (changed here)
    function inipesan() {
      window.nama = "kumudvini"; 
      vketikhalo = "Happy Birthday, " + nama + "!";
      mulainama();
    }

    var tanya = "How about we celebrate your birthday in style?";
    var opstanya = "Your choice is:";
    var tompositif = "Absolutely, lets celebrate! \ud83c\udf89";
    var tomnegatif = "Maybe another time";

    async function pertanyaan() {
      var { isConfirmed: prtanya } = await swals.fire({
        title: nama + ", " + tanya,
        text: "" + opstanya,
        imageUrl: "" + fotostiker5.src,
        showCancelButton: true,
        confirmButtonText: "" + tompositif,
        cancelButtonText: "" + tomnegatif,
      });
      if (prtanya) {
        pesanwhatsapp = "Yes " + nama + ", let the birthday magic begin!";
        menuju();
      } else {
        pesanwhatsapp = nama + ", don't miss out on the birthday fun!";
        await swalst.fire({
          title: "" + kataditolak.innerHTML,
          timer: 2000,
          imageUrl: "" + stikerditolak.src,
        });
        menuju();
      }
    }
function initengahan(){
  kadoIn.style = "display:none";
  ket.style = "display:none";
  Content.style = "opacity:1;margin-top:0";
  bodyblur.style = "opacity:.7";
  wallpaper.style = "transform: scale(1.5);";
}

async function mulainama() {
  bodyblur.style = "opacity:0";
  wallpaper.style = "transform: scale(1);";
  fotostiker.style = "display:inline-flex;";
  setTimeout(ftmuncul, 200);
  setTimeout(kethalo, 500);
}

function ftmuncul() {
  if (ftganti == 0) { fotostiker.src = deffotostiker; }
  if (ftganti == 1) { fotostiker.src = fotostiker1.src; }
  if (ftganti == 2) { fotostiker.src = fotostiker2.src; }
  if (ftganti == 3) { fotostiker.src = fotostiker3.src; }
  if (ftganti == 4) { fotostiker.src = fotostiker4.src; }
  fotostiker.style = "display:inline-flex;opacity:1;transform:scale(1)";
}

function fthilang() {
  fotostiker.style = "display:inline-flex;opacity:1;transition:all .7s ease;transform:scale(.1)";
}

function jjfoto() {
  fotostiker.style.animation = "rto .8s infinite alternate";
}

function bqmuncul() {
  bq.style = "position:relative;opacity:1;visibility:visible;transform: scale(1);margin-top:0";
  mulaiketik1();
  fungsi = 1;
}

function bqhilang() {
  wallpaper.style = "transform: scale(2);";
  bodyblur.style = "opacity:.3";
  bq.style = "position:relative;transition:all .7s ease;";
}

function kethalo() {
  new TypeIt("#halo", {
    strings: ["" + vketikhalo],
    startDelay: 50,
    speed: 40,
    waitUntilVisible: true,
    afterComplete: function () {
      halo.innerHTML = vketikhalo;
      setTimeout(bqmuncul, 200);
    },
  }).go();
}

function tombol() {
  wallpaper.style = "transform: scale(1);";
  Tombol.style = "opacity:1;transform: scale(1);";
  fungsi = 1;
}

document.getElementById("By").onclick = function() {
  if (fungsi == 1) { pertanyaan(); }
  if (fungsi == 2) { menuju(); }
}

async function menuju(){
  await swals.fire('Yay!', 'And here comes another birthday surprise for you!', 'success');
  window.location = "./love/index.html";
}

vketik1 = kalimat.innerHTML;
kalimat.innerHTML = "";
function mulaiketik1(){
  new TypeIt("#kalimat", {
    strings: ["" + vketik1],
    startDelay: 400,
    speed: 20,
    cursor: false,
    deleteSpeed: 20,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      aktiopsL();
    },
  }).go();
}

opsLclick = 0;
opsLcheck = 0;
defopsL = opsL.innerHTML;
document.getElementById("bq").onclick = function() {
  if (opsLclick == 1) {
    if (opsLcheck == 1) { setTimeout(aktipesan1, 400); }
    if (opsLcheck == 2) { mulaiketik3(); }
    if (opsLcheck == 3) { mulaiketik4(); }
    if (opsLcheck == 4) { mulaiketik5(); }
    if (opsLcheck == 5) { kethalo2(); }
    otomatis();
    opsL.style.opacity = "0";
    opsLclick = 0;
  }
}

function aktiopsL() {
  opsL.innerHTML = defopsL;
  opsL.style.opacity = ".8";
  opsLclick = 1;
  opsLcheck += 1;
}

function gantiopsL() {
  opsL.innerHTML = "[ Tap one of the birthday icons! ]";
  opsL.style.opacity = ".8";
}

function otomatis() {
  kalimat.style = "opacity:0";
  setTimeout(otolanj, 400);
}

function otolanj() {
  kalimat.style = "opacity:1";
}

function aktipesan1() {
  kalimat.innerHTML = pesan1.innerHTML;
  kolombaru.style = "position:relative;opacity:1;transform:scale(1);";
}

vketik2 = pesan2.innerHTML;
vketik3 = pesan3.innerHTML;
function aktipesan2(){
  wallpaper.style = "transform: scale(1.5);";
  kolombaru.style = "";
  kalimat.innerHTML = "";
  new TypeIt("#kalimat", {
    strings: ["" + vketik2, "" + vketik3],
    startDelay: 20,
    speed: 30,
    cursor: true,
    deleteSpeed: 30,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      kalimat.innerHTML = vketik3;
      setTimeout(aktipesan4, 700);
    },
  }).go();
}

vketik4 = pesan4.innerHTML;
pesan4.innerHTML = "";
function aktipesan4(){
  wallpaper.style = "transform: scale(1);";
  fthilang();
  ftganti = 2;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan4", {
    strings: ["" + vketik4],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      pesan4.innerHTML = vketik4;
      setTimeout(aktipesan5, 700);
    },
  }).go();
}

vketik5 = pesan5.innerHTML;
pesan5.innerHTML = "";
function aktipesan5(){
  wallpaper.style = "transform: scale(1.5);";
  fthilang();
  ftganti = 3;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan5", {
    strings: ["" + vketik5],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      pesan5.innerHTML = vketik5;
      setTimeout(aktipesan6, 700);
    },
  }).go();
}

vketik6 = pesan6.innerHTML;
pesan6.innerHTML = "";
function aktipesan6(){
  wallpaper.style = "transform: scale(1);";
  fthilang();
  ftganti = 4;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan6", {
    strings: ["" + vketik6],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      pesan6.innerHTML = vketik6;
      // proceed to the next message (pesan7)
      setTimeout(aktipesan7, 700);
    },
  }).go();
}

vketik7 = pesan7.innerHTML;
pesan7.innerHTML = "";
function aktipesan7(){
  wallpaper.style = "transform: scale(1);";
  fthilang();
  ftganti = 5;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan7", {
    strings: ["" + vketik7],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: false,
    lifelike: true,
    afterComplete: function(){
      pesan7.innerHTML = vketik7;
      // proceed to pesan8, then show tombol
      setTimeout(aktipesan8, 700);
    },
  }).go();
}

vketik8 = pesan8.innerHTML;
pesan8.innerHTML = "";
function aktipesan8(){
  wallpaper.style = "transform: scale(1);";
  fthilang();
  ftganti = 8;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan8", {
    strings: ["" + vketik8],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: false,
    lifelike: true,
    afterComplete: function(){
      pesan8.innerHTML = vketik8;
      setTimeout(tombol, 400);
    },
  }).go();
}

var slov = 0;
document.getElementById("lv1").onclick = function() { lv1.style = "opacity:0"; slov += 1; this.onclick = null; checkslov(); }
document.getElementById("lv2").onclick = function() { lv2.style = "opacity:0"; slov += 1; this.onclick = null; checkslov(); }
document.getElementById("lv3").onclick = function() { lv3.style = "opacity:0"; slov += 1; this.onclick = null; checkslov(); }
document.getElementById("lv4").onclick = function() { lv4.style = "opacity:0"; slov += 1; this.onclick = null; checkslov(); }

function checkslov() {
  if (slov == 4) {
    kolombaru.style = "position:relative;transform:scale(1)";
    fthilang();
    ftganti = 1;
    setTimeout(ftmuncul, 300);
    otomatis();
    setTimeout(aktipesan2, 400);
  }
}

})();
