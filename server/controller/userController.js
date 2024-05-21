const User = require("../models/user.model");

const create = async (req, res) => {
  try {
    // get data from user
    const userData = new User(req.body);

    //whether data is passed or not
    if (!userData) {
      return res.status(404).json({ msg: "User data not found!!" });
    }
    // save if passed
    const savedData = await userData.save();
    res.status(200).json(savedData);
    console.log("data added succesfully")
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: " user not found" });
    } else {
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getOne= async (req,res)=>{
  try {
    const id = req.params.id;
     const userExist = await User.findById(id);
  if(!userExist){
    return res.status(404).json({msg : "user data not found!!"})
  }else{
    res.status(200).json(userExist);
  }
  } catch (error) {
    res.status(500).json({error : error});
  }
 
}

const update = async(req,res)=>{
  try {
      const id = req.params.id;
      const UserExist  = await User.findById(id);
      // check whether data exist or not 
      if(!UserExist){
        return res.status(401).json({msg : "User not found !1"})
      }else{
        // if exist update it
        const updatedData = await User.findByIdAndUpdate(id,req.body,{new : true});
        res.status(200).json({msg : "User Updated Succesfully !"});

      }
  } catch (error) {
    res.status(500).json({error : error});
    
  }
}

const deleteUser = async(req,res)=>{
  try {
    const id = req.params.id;
    const userExist = User.findById(id);
    if(!userExist){
      return res.status(401).json({msg : " user not found !!"})
    }else{
     await User.findByIdAndDelete(id);
     res.status(200).json({msg : "user deleted succesfully !!"})
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
}
module.exports = {getAll,create,getOne,update,deleteUser};
