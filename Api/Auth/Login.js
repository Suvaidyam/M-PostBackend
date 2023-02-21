const User = require("../../Model/User");
const LoginHistory = require("../../Model/LoginHistory");
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'fhjkdfghdfgjkdfjkhgjkdfgj';

const Login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        } else{
            let userEmail = await User.findOne({ email });
            if (userEmail) {
                let user = await User.findOne({ email, password });
                if (user) {
                    let loginHistory = await LoginHistory.create({ user: user._id });
                    let token = JWT.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        company: user.company,
                        userType: user.userType,
                        lhId: loginHistory._id,
                        url: user.url
                    }, JWT_SECRET);
                    return res.json({
                        message: 'Login Successfully',
                        token: token
                    });
                } else{
                    return res.status(400).json({ message: 'Password is incorrect' });
                }
            } else {
                return res.status(400).json({ message: 'Email is incorrect' });
            };
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = Login;