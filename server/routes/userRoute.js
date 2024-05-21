const express = require('express');
const {create,getAll, getOne,update, deleteUser} = require('../controller/userController')
/// we use router to export the any route to export anywher 
// insted of defining index.js we define it separtely by using 
// express.router() method
const route = express.Router();

route.post('/create',create);
route.get('/getall',getAll)
route.get('/getone/:id',getOne)
route.put('/update/:id',update);
route.delete('/delete/:id',deleteUser);
module.exports = route;
