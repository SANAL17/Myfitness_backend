const admin = require('../Model/adminSchema')

 const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};


//Register
exports.adminRegister = async (req, res) => {
  console.log('inside admin register function');
  try {
    const {  secretkey, username, email, password } = req.body
    console.log( secretkey, username, email, password);
    const existingAdmin = await admin.findOne({ email })
    if (existingAdmin) {
      res.status(402).json('Admin already exists')
    }
    else {
      const hashedPassword = await hashPassword(password);
      const newAdmin = new admin({
        secretkey,username,  email,password:hashedPassword,
      })
      await newAdmin.save()
      res.status(200).json('Admin created successfully')
    }

  }
  catch (err) {
    res.status(500).json('Server error ' + err.message)
  }
}

//login

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if admin exists
      const adminCheck = await admin.findOne({ email });
      console.log(admin);
  
      if (!adminCheck) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, adminCheck.password);
      console.log(isMatch);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
     // Generate JWT token
      const token = jwt.sign({ adminId: adminCheck._id }, 'secret', { expiresIn: '1h' });
      console.log(token);
  
      res.status(200).json({adminCheck, token });
    } catch (error) {
      console.error('Error logging in admin:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

