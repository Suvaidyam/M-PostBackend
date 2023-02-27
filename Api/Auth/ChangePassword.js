const User = require("../../Model/User");

const ChangePassword = async (req, res) => {
  try {
    let password = req.body.password;
    let email = req.body.email;

    let user = await User.findOne({ email });
    if (user) {
      user.password = password;
      await user.save();
      return res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      return res.status(200).json({ message: "User does not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = ChangePassword;
