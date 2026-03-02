export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existing = await user.findOne({email});
        if(!existing){
            return res.status(404).json({message: "user not found"});
        }
    } 
    catch (error) {
        return res.status(500).json({message: error.message});
    }
    const ispasshashed = await bcrypt.compare(password, existing.password);
    if(!ispasshashed){
        return res.status(400).json({message: "invalid credentials"});
    }
};