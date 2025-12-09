const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../data/store/users');


const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'Error when creating the token' )
            } else {
                resolve( token );
            }
        })

    })
}

const validateJWT = async( req = request, res = response, next ) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    // Extract the token by removing the "Bearer" 
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader;

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in request'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );

        //Read from in-memory-data
        const user = users.find((u) => u.id === uid);

        if( !user ) {
            return res.status(401).json({
                msg: 'Invalid token-user does not exists'
            })
        }    
        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(400).json({
            msg: 'Invalid token'
        })
    }

}

module.exports = {
    generateJWT,validateJWT
}