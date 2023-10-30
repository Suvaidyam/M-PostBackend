const LoginHistory = require('../../Model/LoginHistory');
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'fhjkdfghdfgjkdfjkhgjkdfgj';

module.exports = async (req, res, next) => {
    try {
        let { token } = req.headers;
        console.log(token)
        if (token) {
            let decoded = JWT.verify(token, JWT_SECRET);
            // console.log('veryToken', decoded);
            let { lhId,  email, _id , gender} = decoded;
            // console.log(decoded)

            let loginHistory = await LoginHistory.findById(lhId);
            if(!loginHistory){
                return res.status(401).json({ message: 'Unauthorized: Login history not found' });
            }else if (loginHistory.logoutTime) {
            return res.status(401).json({ message: 'Unauthorized: Invalid logoutTime' });
            };

            req.decoded = decoded
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized: token required' });
        }
    } catch (error) {
        return res.status(401).json({ message: error  });
    }
}