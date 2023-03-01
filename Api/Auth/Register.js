const User = require('../../Model/User');
const WorkSpace = require('../../Model/WorkSpace');
const Environment = require('../../Model/Environment');

const Register = async (req, res) => {
    try {
        let { name, password, email, gender } = req.body;
        if (!name || !password || !email || !gender) {
            return res.status(400).json({ message: "All Fields are Required" })
        }else{
            let user = await User.findOne({ email });
            if(user){
                return res.status(400).json({ message: "User Already Exists" });
            }else{
                let user = await User.create({ name, password, email, gender});
                if(user){
                    let newUser = await User.findOne({email});
                    let created_by = newUser._id;
                    const workSpace = await WorkSpace.create({created_by});
                    let workspace_id = workSpace._id
                    let environment = await Environment.create({name:"Globals",created_by , workspace_id});
                }
                return res.status(200).json({ message: "User Successfully Created", user: user });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
}

module.exports = Register