// Reset mobile slider animation
function resetMobileSlider() {
  if (window.innerWidth > 600) return;
  currentMobileIndex = 0;
  for (let i = 0; i < aImg.length; i++) {
    aImg[i].classList.remove('active', 'slideout');
    aImg[i].style.opacity = 0;
  }
  aImg[0].classList.add('active');
  aImg[0].style.opacity = 1;
}

// ===== Configurable global variables =====
var radius = 260; // distance of images from center
var autoRotate = true; // auto rotate or not
var rotateSpeed = -120; // unit: seconds/360 degrees (slower, smoother)
var imgWidth = 150; // width of images (px)
var imgHeight = 200; // height of images (px)

// Background music (set 'null' to disable)
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

// ===================== start =======================
setTimeout(function() {
  // DOM and images are ready
  init();

  // Mobile sliding animation logic
  function isMobile() {
    return window.innerWidth <= 600;
  }

  let currentMobileIndex = 0;
  // Duration (ms) that outgoing animation runs before cleanup. Keep in sync with CSS.
  var OUT_DURATION = 2200; // increased to match new CSS durations (2.2s)

  function logDebug() {
    if (window && window.console && window.console.debug) return window.console.debug.bind(console);
    return function() {};
  }
  const debug = logDebug();

  function showMobileImage(idx, fastSwap = false) {
    if (!fastSwap) {
      // initial show: hide others and show target
      for (let i = 0; i < aImg.length; i++) {
        aImg[i].classList.remove('active', 'slideout');
        aImg[i].style.opacity = 0;
        aImg[i].style.visibility = 'hidden';
      }
      aImg[idx].style.visibility = 'visible';
      aImg[idx].classList.add('active');
      // allow CSS animation to fade it in
      currentMobileIndex = idx;
  debug('[slider] initial show index=', idx, 'time=', Date.now());
      return;
    }

    // Fast swap: overlap incoming and outgoing to avoid blink
    var curr = currentMobileIndex;
    if (curr === idx) return;
  // make sure incoming is visible and starts its fade-in
  aImg[idx].classList.remove('slideout');
  aImg[idx].style.visibility = 'visible';
  // ensure incoming is below outgoing during transition
  aImg[idx].style.zIndex = '900';
  aImg[idx].classList.add('active');
  // start slideout on current and bring it above
  aImg[curr].classList.add('slideout');
  aImg[curr].style.zIndex = '1000';
    // after outgoing finishes its animation, remove it
    setTimeout(() => {
      aImg[curr].classList.remove('active', 'slideout');
      aImg[curr].style.visibility = 'hidden';
      currentMobileIndex = idx;
    }, OUT_DURATION);
  }

  function startMobileSlider() {
    showMobileImage(0);
  const SLIDE_INTERVAL = 200; // ms per image (faster transitions)
  debug('[slider] starting; interval=', SLIDE_INTERVAL, 'OUT_DURATION=', OUT_DURATION);
  setInterval(() => {
      let nextIdx = (currentMobileIndex + 1) % aImg.length;
      debug('[slider] swapping', currentMobileIndex, '->', nextIdx, 'time=', Date.now());
      showMobileImage(nextIdx, true);
  }, SLIDE_INTERVAL);
  }

  // Preload images to avoid blank frames during transitions on mobile
  function preloadImages() {
    var imgs = Array.from(aImg);
    var promises = imgs.map(function(img) {
      try {
        if (img.complete) return Promise.resolve();
        if (img.decode) return img.decode().catch(function(){ /* ignore decode errors */ });
        return new Promise(function(resolve) { img.onload = img.onerror = resolve; });
      } catch (e) {
        return Promise.resolve();
      }
    });
    return Promise.all(promises);
  }

  if (isMobile()) {
    // Disable spin animation and scroll/drag
    ospin.style.animation = 'none';
    document.onpointerdown = null;
    document.onmousewheel = null;
    // Add a neutral mask behind images to hide any brief gaps
    if (!document.getElementById('mobile-mask')) {
      var m = document.createElement('div');
      m.id = 'mobile-mask';
      document.body.appendChild(m);
    }
    // Preload images then start slider to avoid blinking when images decode
    preloadImages().then(function() {
      // ensure all images are hidden except the first initial state handled by showMobileImage
      for (var i = 0; i < aImg.length; i++) {
        aImg[i].style.visibility = 'hidden';
        aImg[i].style.opacity = 0;
      }
      startMobileSlider();
    }).catch(function(){
      // fallback: start slider anyway
      startMobileSlider();
    });
  }
}, 500);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
// Only consider images with class 'main-slide' for the carousel/slider
var aImg = ospin.querySelectorAll('img.main-slide');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];

// Image container size
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Ground size (depends on radius)
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  // On mobile, don't apply 3D carousel transforms; clear any inline transform
  if (window.innerWidth <= 600) {
    for (var i = 0; i < aEle.length; i++) {
      aEle[i].style.transform = '';
      aEle[i].style.transition = "opacity 0.4s";
      aEle[i].style.transitionDelay = '0s';
      // ensure images are not positioned by 3D layout
      aEle[i].style.left = '0';
      aEle[i].style.top = '0';
      aEle[i].style.position = 'absolute';
    }
    return;
  }

  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform =
      "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1.2s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain tilt
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var desX = 0, desY = 0, tX = 0, tY = 10;

// Auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// Background music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
    <audio src="${bgMusicURL}" ${bgMusicControls ? 'controls' : ''} autoplay loop>
      <p>Your browser does not support the audio element.</p>
    </audio>`;
}

// ===== Interaction (drag/scroll) =====
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX, sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX, nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.025; // further reduced sensitivity for smoother/slower drag
    tY += desY * 0.025;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function () {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.05;
      tY += desY * 0.05;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };


  // No pinch-to-zoom or mobile gestures; only sliding animation
};

// Zoom in/out
document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};

// ===== WebGL glowing heart effect =====
// (unchanged except pink+gold colors in fragment shader)
