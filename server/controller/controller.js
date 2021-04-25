const pool = require("../models/database")
const wjt= require('jsonwebtoken'); 
const bcrypt= require('bcrypt');  
 
const appCtrl= {} 

appCtrl.registerUser= async (req,res)=>{ 
   
     const{ name, email, password, password2, rol_id}=req.body; 


     console.log({
         name,
         email,
         password,
         password2
     }); 
     const errors=[]; 

    if(!name||!email||!password||!password2){
        errors.push({message:'Todos los campos deben estar llenos'});
    }

    
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
     console.log('correo valido')
    } else {
     errors.push({message:'Correo no valido'});
    }

    if(password.length<6){
        errors.push({message:'El password debe tener al menos 6 caracteres'});
    } 

    if (password!==password2) {
         errors.push({message:'Los campos de password no coinciden'});
    }

    if(errors.length>0){
        res.send({errors})
    }else {
        //las validaciones fueron superadas 
        const hashPassword= await bcrypt.hash(password,10); 
        console.log('password encriptado: ', hashPassword);  

        const response = pool.query( `SELECT "id_usuario" FROM usuario WHERE "correo_usuario"= '${email}'`, (err,results)=>{
            if(err){                   // `SELECT "id_usuario" FROM usuario WHERE "correo_usuario" = '${elimorameta80@gmail.com}'`  
                throw err
            }
            
            if(results.rows.length>0){
                errors.push({message:'error: email ya registrado'}); 
                res.send({errors})
            }else{ 

            const response= pool.query(`insert into usuario (correo_usuario, nombre_usuario, password, rol_id) VALUES ('${email}','${name}','${hashPassword}', ${rol_id})`);
           
            console.log('paso'); 

            const response2 =  pool.query( `SELECT "id_usuario" FROM usuario WHERE "correo_usuario"= '${email}'`, (err,results)=>{
                if(err){                   // `SELECT "id_usuario" FROM usuario WHERE "correo_usuario" = '${elimorameta80@gmail.com}'`  
                    throw err
                } else{
                     //console.log('id Recuperado db: ',results.rows[0].id_usuario);  
            token =  wjt.sign({_id:results.rows[0].id_usuario},'secretkey');
            console.log('Usuario agregado a data base'); 
            console.log('token asignado: ', token); 
                }
           
            res.status(200).json({token:token});  

            })
            
            }
        })   
    }
};  

appCtrl.loginUser= async (req, res)=>{
    //console.log(req.body); 
   const {email, password}= req.body; 
   const hashPassword= await bcrypt.hash(password,10);

    const errors=[]; 

   const response2 = await pool.query( `SELECT "id_usuario" FROM usuario WHERE "correo_usuario"= '${email}'`); 

   if(response2.rows.length===0){

    console.log('correo no encontrado por vafor registrate'); 
    errors.push({message:'Usuario no registrado'});
   }

    if(!email||!password){  
        errors.push({message:'Todos los campos deben estar llenos'});
    }

    
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
     //console.log('correo valido')
    } else {
     errors.push({message:'Correo no valido'});
    }

    if(password.length<6){
        errors.push({message:'El password debe tener al menos 6 caracteres'});
    }

    if(errors.length>0){
    res.send({errors})
    
    }else {
        //console.log('susario id: ',  response2.rows[0].id_usuario); 
         const idUsuario=response2.rows[0].id_usuario;
    

        const token=  wjt.sign({_id:idUsuario},'secretkey');
        const response =  pool.query( `SELECT "password"  FROM usuario WHERE "correo_usuario"= '${email}'`, (err,results)=>{
            if(err){                    
                throw err
            }
            const consulta=results.rows[0].password;  
            //console.log(consulta); 
             
            if(bcrypt.compareSync(password, consulta)){
               const user= email
              // console.log('Correo y contaceña correctos'); 
               res.status(200).send(`token : ${token}`)
            }else{ 
              
                errors.push({message:'Clave invalida'});

                res.send({errors}) 
          
            }
        })

    }
}



appCtrl.taskForm= async (req, res)=>{
    res.json([
        {
            _id:1, 
            name: 'formulario 1', 
            description:'formulario de reconocimiento mecanico'
        }, 
        {
            _id:2, 
            name: 'formulario 2 ', 
            description:'formulario de analisis  de fallas'
        }, 
        {
            _id:3, 
            name: 'formulario 3', 
            description:'formulario de reporte de fallas'
        }, 
    ])
}

appCtrl.FormPrivate= async(req,res)=>{
    res.json([
        {
            _id:1, 
            name: 'formulario 1', 
            description:'formulario de reconocimiento mecanico'
        }, 
        {
            _id:2, 
            name: 'formulario 2 ', 
            description:'formulario de analisis  de fallas'
        }, 
        {
            _id:3, 
            name: 'formulario 3', 
            description:'formulario de reporte de fallas'
        }, 
    ])
}



module.exports =appCtrl; 
