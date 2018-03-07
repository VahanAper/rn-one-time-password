const admin = require('firebase-admin');

module.exports = (request, response) => { // eslint-disable-line
    // Verify the user provided a phone
    if (!request.body.phone) {
        return response.status(422)
            .send({ error: 'Bad Input' });
    }
    
    // Format the phone number
    const phone = String(request.body.phone)
        // Remove any none digit symbols
        .replace(/[^\d]/g, '');
        
    // Create a new user account using the phone number
    admin.auth().createUser({ uid: phone })
        .then((user) => {
            return response.send(user);
        })
        .catch((err) => {
            return response.status(422).send({ error: err });
        });
};
