const userModel = require('../Models/userModel')
const sendEmail = require('../Utils/sendEmail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateAuthToken = require('../Utils/generateAuthToken')

// register user


exports.userRegister = async (req, res) => {
    const {name, email, password}= req.body
   try {
    const user = await userModel.findOne({email:email})
    if (user) return res.status(400).json({ error: 'email already exist' })
    
        const hashpassword = await bcrypt.hash(password,10)
        const doc = new userModel({
                        name:name,
                        email:email,
                        password:hashpassword  
                    })
       const userdata= await doc.save();
       
       if(!userdata)return res.status(400).json({ error: 'Registration Failed' })
        const saved_user = await userModel.findOne({ email: email })
        // Generate JWT Token
        const token = generateAuthToken(saved_user) 
    
    const c_url = `${process.env.CLIENT_URL}`
    
    //send email
    sendEmail({
        from:process.env.SMTP_USER,
        to:saved_user.email,
        subject:"email varification link",
        text:"",
        html:`<p> hi ${saved_user.name}  please click here to <a href='${c_url}/verifyemail?${saved_user._id}'> verify </a> your email  </p>`
        })
        
    if(!sendEmail) return res.status(400).json({ error: 'Registration Failed' })
    return res.status(201).json({ success: "Successfully Register please verify your email ", "token": token })  
    res.send(token)

   } catch (error) {
    return res.status(400).json({ error: 'something went wrong' })
   }
}

/// register email verify

exports.verifiedEmail = async(req,res)=>{
    try {
        const upatedUser = await userModel.updateOne({_id:req.query.id},{$set:{isVerified:true}});
        if(upatedUser){
            res.redirect('/login');
        }
    } catch (error) {
        return res.status(400).json({ error: 'something went wrong' })
    }
}


/// user login
exports.login = async (req,res) =>{
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email:email})
        if(!user) return res.status(400).json({ error: 'invalid email or password !!' })
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ error: 'invalid email or password !!' })
        if(user.isVerified === false)  return res.status(400).json({ error: 'Please verify your email first to login' })
        const token = generateAuthToken(user)  
        res.send(token)
        

       // return res.status(201).json({ success:ess 'succfully login' })
    } catch (error) {
        console.log(error)
    }
}

