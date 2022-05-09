window.document.onkeydown = function(e) {
  if (e.keyCode == 27) {
    lightbox_close();
  }
}

function lightbox_open() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  window.scrollTo(0, 0);
  document.getElementById('light').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  lightBoxVideo.play();
}

function lightbox_close() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  document.getElementById('light').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  lightBoxVideo.pause();
}

window.document.onkeydown = function(e) {

  if (e.keyCode == 27) {
    lightbox_close1();
  }
}

function lightbox_open1() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo1");
  window.scrollTo(0, 0);
  document.getElementById('middle').style.display = 'block';
  document.getElementById('fade1').style.display = 'block';
  lightBoxVideo.play();
}

function lightbox_close1() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo1");
  document.getElementById('middle').style.display = 'none';
  document.getElementById('fade1').style.display = 'none';
  lightBoxVideo.pause();
}

window.document.onkeydown = function(e) {

  if (e.keyCode == 27) {
    lightbox_close2();
  }
}

function lightbox_open2() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo2");
  window.scrollTo(0, 0);
  document.getElementById('dark').style.display = 'block';
  document.getElementById('fade2').style.display = 'block';
  lightBoxVideo.play();
}

function lightbox_close2() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo2");
  document.getElementById('dark').style.display = 'none';
  document.getElementById('fade2').style.display = 'none';
  lightBoxVideo.pause();
}