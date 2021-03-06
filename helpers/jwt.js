const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    
    return new Promise((resolve, reject ) => {
        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
        // Duración del token
        expiresIn: '12h'
        }, (err, token ) => {
            if(err) {
                // No se pudo generar el token
                reject('No se pudo generar el JWT');
            } else {
                // Se generó TOKEN
                resolve( token ); 
            
            }
    })

    });
}

const comprobarJWT = ( token = '' ) => {
    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY);
        return [true, uid];
        
    } catch (error) {
        return [false, null];
        
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}