let nodeMailer = require('nodemailer');
let variables = require('./variables.json');
var bcrypt = require('bcryptjs');

module.exports = {

    enviaEmail: function (template, to, subject, comunidad, username, password) {
        console.log('Pasó por enviaEmail')
        let contenido
        //Lee el contenido del template
        fs.readFile('./emailTemplates/' + template, function (err, data) {
            if (err) {
                throw err;
            }
            contenido = data.toString()
            contenido = contenido.replace('xxcomunidadxx', comunidad);
            contenido = contenido.replace('xxusernamexx', username)
            contenido = contenido.replace('xxpasswordxx', password)

            let transporter = nodeMailer.createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: 465,
                secure: true,
                auth: {
                    user: variables.envioEmail.user,
                    pass: variables.envioEmail.pass
                }
            });
            let mailOptions = {
                from: variables.envioEmail.from, // sender address
                to: to,
                subject: subject,
                text: '',
                html: contenido
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            })
        });
    },

    encripta: function (pass) {
        var hash = bcrypt.hashSync(pass, 8);
        return hash;
    },
    
    randomKey: function (length) {
        var result = '';
        var characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'; //6 elementos en un universo de 33 = 1.291.467.969 posibilidades
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log('CodigoCliente: ' + result)
        return result;
    },
 
    getLastDayOfMonth: function (month) {
        let salida
        switch (month) {
            case 1:
                salida = 31
                break;
            case 2:
                salida = 28
                break;
            case 3:
                salida = 31
                break;
            case 4:
                salida = 30
                break;
            case 5:
                salida = 31
                break;
            case 6:
                salida = 30
                break;
            case 7:
                salida = 31
                break;
            case 8:
                salida = 31
                break;
            case 9:
                salida = 30
                break;
            case 10:
                salida = 31
                break;
            case 11:
                salida = 30
                break;
            case 12:
                salida = 31
                break;
        }
        return salida;
    }
}