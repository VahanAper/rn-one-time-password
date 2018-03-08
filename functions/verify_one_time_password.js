const admin = require('firebase-admin');

module.exports = (request, response) => { // eslint-disable-line
    if (!request.body.phone || !request.body.code) {
        return response.status(422).send({
            error: 'Phone and code must be provided.'
        });
    }
    
    const phone = String(request.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(request.body.code);
    
    admin.auth().getUser(phone)
        .then(() => { // eslint-disable-line
            const ref = admin.database().ref(`users/${phone}`);
            
            ref.on('value', (snapshot) => { // eslint-disable-line
                // Stop listening on('value') event
                ref.off();
                
                const user = snapshot.val();
                
                if (user.code !== code || !user.codeValid) {
                    return response.status(422).send({
                        error: 'Code is not valid.'
                    });
                }
                
                ref.update({ codeValid: false });
                
                admin.auth().createCustomToken(phone) // eslint-disable-line
                    .then(token => response.send({ token }))
                    .catch(error => response.status(422).send({ error }));
            });
        })
        .catch((error) => response.status(422).send({ error }));
};
