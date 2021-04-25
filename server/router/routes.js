const {Router}= require('express'); 
const router= Router();    
const wjt= require('jsonwebtoken'); 

const appCtrl = require('../controller/controller'); 
const userCtrl = require("../controller/userController");
const formCtrl = require("../controller/formController");
const itemCtrl = require("../controller/itemController");
const menuCtrl = require("../controller/menuController");
const rolCtrl = require("../controller/rolController");
const answerCtrl = require("../controller/answerController");

//router.get('/',appCtrl.getUser); 
router.post('/login',appCtrl.loginUser); 
router.post('/register',appCtrl.registerUser);  
router.get('/taskForm',appCtrl.taskForm);  
router.get('/taskFormPrivate',verifyToken, appCtrl.FormPrivate); 
router.get('/profile',verifyToken, (req, res)=>{
    //console.log(`${req.userId}`); 
    res.send(`${req.userId}`) 
}) 

router.post('/create/user',userCtrl.createUser);
router.get('/user',userCtrl.getUser);
router.put('update/user',userCtrl.updateUser);
router.delete('/delete/user',userCtrl.deleteUser);

router.post('create/form',formCtrl.createForm);
router.get('/form',formCtrl.getFormByName);
router.get('list/form',formCtrl.getAllForms);
router.put('update/form',formCtrl.changeFormName);
router.put('form/asign',formCtrl.changeFormSub);
router.delete('/delete/form',formCtrl.deleteForm);

router.post('create/item',itemCtrl.createItem);
router.get('/list/item',itemCtrl.getAllItems);
router.get('/item/form',itemCtrl.getItemByForm);
router.get('/item/style',itemCtrl.getItemByStyle);
router.put('/update/item,',itemCtrl.updateItem);
router.put('update/style',itemCtrl.updateStyle);
router.delete('delete/item',itemCtrl.deleteItem);

router.post('/create/menu',menuCtrl.createMenu);
router.post('/create/sub',menuCtrl.createSub);
router.get('/menu',menuCtrl.getMenus);
router.get('/list/sub',menuCtrl.getAllSub);
router.get('/sub/menu',menuCtrl.getSubByMenu);
router.put('/update/menu',menuCtrl.changeMenuName);
router.put('/update/sub',menuCtrl.updateSub);
router.delete('/delete/menu',menuCtrl.deleteMenu);
router.delete('delete/sub',menuCtrl.deleteSub);

router.post('/innit/rol',rolCtrl.createRoles);

router.post('/create/response', answerCtrl.storeAnswer);
router.get('/response',answerCtrl.getAnswer);
router.put('/update/response',answerCtrl.updateAnswer);

module.exports= router;   
 

function verifyToken(req, res, next) {

    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
       return  res.status(401).send('Peticion no autorizada'); 
    }
    //console.log(req.headers.authorization)
   
    const token= req.headers.authorization.split(' ')[1]; 
    if (token===null) {
        return  res.status(401).send('Peticion no autorizada');  
    }

    const payload= wjt.verify(token,'secretkey'); 
    //console.log(payload)

    req.userId= payload._id; 
    next(); 
}
