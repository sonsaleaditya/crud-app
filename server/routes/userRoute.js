const express = require('express');
const {create,getAll, getOne,update, deleteUser, deleteAllUser} = require('../controller/userController')
/// we use router to export the any route to export anywher 
// insted of defining index.js we define it separtely by using 
// express.router() method
const route = express.Router();

route.post('/create',create);
route.get('/get-all',getAll)
route.get('/get-one/:id',getOne)
route.put('/update/:id',update);
route.delete('/delete/:id',deleteUser);
route.delete('/delete-all',deleteAllUser);

module.exports = route;
