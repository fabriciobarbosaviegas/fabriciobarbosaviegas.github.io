var supportsOrientationChange = "onorientationchange" in window,

    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {

location.reload();

}, false);

window.addEventListener('scroll', () => {
    let nav = document.querySelector('nav');
    if (window.scrollY > 0 && !nav.classList.contains("fixed-top")){
        nav.classList.add("fixed-top");
        nav.classList.add("bg-dark");
    }
    else if(window.scrollY == 0 && nav.classList.contains("fixed-top")){
        nav.classList.remove("fixed-top");
        nav.classList.remove("bg-dark");
    }
})

var canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 17;
canvas.height = window.innerHeight;

var letters = 'MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!MECONTRATA!';
letters = letters.split('');

var fontSize = 10,
columns = canvas.width / fontSize;

var drops = [];
for (var i = 0; i < columns; i++) {
drops[i] = 1;
}

function draw() {
ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
        drops[i] = 0;
    }
}
}


setInterval(draw, 33);  

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap has-primary-color">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
