;
((d) => {

    const btnMenu = d.getElementById('btn_menu')

    document.addEventListener('click', e => {

        if (e.target === btnMenu) return;

        const nav = d.getElementById('menu');
        nav.classList.remove('menu-active')

    })

    btnMenu.addEventListener('click', e => {
        e.preventDefault();
        const nav = d.getElementById('menu');
        nav.classList.toggle('menu-active')
    })


})(document);

((d) => {
    const email = require('./modules/smtp');
    const sendMessage = d.getElementById('sendMessage');
    const name = d.getElementById('name');
    const mail = d.getElementById('mail');
    const message = d.getElementById('message');

    sendMessage.addEventListener('click', (e) => {

        const verifyEmail = mail => {
            let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            return regex.test(mail) ? true : false;
        }
        e.preventDefault();

        if (name.value && mail.value && message.value && verifyEmail(mail.value)) {
            console.log('se envia el correo');

            const subject = "Nombre '" + name.value + "' - Mensaje del sitio alejandro-leyva.com";

            email.send({
                Host: "smtp.elasticemail.com",
                Username: "jalmx89@gmail.com",
                Password: "876d6b01-642f-4be2-b6b9-c7ad6e1efca2",
                To: 'hola@alejandro-leyva.com',
                From: mail.value,
                Subject: subject,
                Body: message.value
            }).then(
                message => {
                    if (message == '200')
                        alert("Envío exitoso");
                    else
                        alert("Error al envíar mensaje, intente de nuevo.\nPuede envíar un correo a hola@alejandro-leyva.com");
                }
            );

        } else {
            alert('Faltan datos o alguno es incorrecto')
        }
    });

})(document);

