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

/// forgate passwor
exports.forgetPassword= async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).json({ error: 'sorry the email you provieded not found  please register first or try anaoatrher' })
// check if user is already verified
 if(user.isVerified === false) return res.status(400).json({ error: 'this email is not varefied please verify' })
 

   token=  generateAuthToken(user)
    if(!token){
        return res.status(400).json({ error: 'something went wrong' })
    }

    const c_url = `${process.env.CLIENT_URL}/resetpassword/${token.token}`
    //send email
    sendEmail({
        from:process.env.SMTP_USER,
        to:user.email,
        subject:"reset password  link",
        text:`hello, \n\n please reste  your password by cliking below link below Link:\n\n http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token}`,
        html:`<a href='${c_url}'  >Click here to Reset Password </a>`
    })
    res.json({message: ' password reset link has been sent'})
}

/// reset password

// exports.resetPassword = async (req,res)=>{
//     let token = await Token.findOne({token:req.params.token})
//          if( !token){
//              return res.status(400).json({ error: 'invalid token or token may have exprire' })
//          }
 
     
//      let user = await user.findOne({_id:token.userId})
//         if(!user){
//             return res.status(400).json({ error: 'invalid user for this token ' })
//          }
//      user.password= req.body.password
//      user = await user.save()
//      if(!user){
//          return res.status(400).json({ error: 'failed to reset password ' })
//      }
//      res.json({message:"password has been rest"})
//  }
 
// user list

exports.userList = async (req,res)=>{
    const user = await userModel.find().select('-hashed_password -salt')
    if(!user)  return res.status(400).json({ error: 'something went wrong ' })
    res.send(user)
}

// single user

exports.singleUserView = async(req,res)=>{
    const {id}= req.params
    const user = await userModel.findById({_id:id}).select('-hashed_password -salt')
    if(!user) return res.status(400).json({ error: 'something went wrong ' })
    res.send(user)
}

