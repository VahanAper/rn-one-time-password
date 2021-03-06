const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (request, response) => { // eslint-disable-line
    if (!request.body.phone) {
        return response.status(422).send({
            error: 'You must provide a phone number.'
        });
    }
    
    const phone = String(request.body.phone).replace(/[^\d]/g, '');
    
    admin.auth().getUser(phone)
        .then((user) => { // eslint-disable-line
            const code = Math.floor((Math.random() * 8999 + 1000));
            
            twilio.messages.create({
                to: `+${phone}`,
                from: '+16153235722',
                body: `Your code is: ${code}`,
            }, (err) => { // eslint-disable-line
                if (err) {
                    return response.status(422).send(err);
                }
                
                admin.database().ref(`users/${phone}`)
                    .update({ code, codeValid: true }, () => {
                        response.send({ success: true });
                    });
            });
        })
        .catch(error => {
            response.status(422).send({ error, phone });
        });
};
