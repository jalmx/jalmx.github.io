(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

;

(function (d) {
  var btnMenu = d.getElementById('btn_menu');
  document.addEventListener('click', function (e) {
    if (e.target === btnMenu) return;
    var nav = d.getElementById('menu');
    nav.classList.remove('menu-active');
  });
  btnMenu.addEventListener('click', function (e) {
    e.preventDefault();
    var nav = d.getElementById('menu');
    nav.classList.toggle('menu-active');
  });
})(document);

(function (d) {
  var email = require('./modules/smtp');

  var sendMessage = d.getElementById('sendMessage');
  var name = d.getElementById('name');
  var mail = d.getElementById('mail');
  var message = d.getElementById('message');
  sendMessage.addEventListener('click', function (e) {
    var verifyEmail = function verifyEmail(mail) {
      var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      return regex.test(mail) ? true : false;
    };

    e.preventDefault();

    if (name.value && mail.value && message.value && verifyEmail(mail.value)) {
      console.log('se envia el correo');
      var subject = "Nombre '" + name.value + "' - Mensaje del sitio alejandro-leyva.com";
      email.send({
        Host: "smtp.elasticemail.com",
        Username: "jalmx89@gmail.com",
        Password: "876d6b01-642f-4be2-b6b9-c7ad6e1efca2",
        To: 'hola@alejandro-leyva.com',
        From: mail.value,
        Subject: subject,
        Body: message.value
      }).then(function (message) {
        if (message == '200') alert("Envío exitoso");else alert("Error al envíar mensaje, intente de nuevo.\nPuede envíar un correo a hola@alejandro-leyva.com");
      });
    } else {
      alert('Faltan datos o alguno es incorrecto');
    }
  });
})(document);
},{"./modules/smtp":2}],2:[function(require,module,exports){
/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
module.exports = Email;
},{}]},{},[1])