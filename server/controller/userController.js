const pool = require("../models/database")

exports.createUser = async (req,res) => {
    try{
        const name = req.body.name;
        const mail = req.body.mail;
        const password = req.body.password;
        const rol = 2;
        const result = await pool.query(`INSERT INTO usuario (nombre_usuario,correo_usuario,password,id_rol) 
        VALUES (${name},${mail},${password},${rol}) RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getUser = async (req,res) => {
    try{
        const mail = req.body.mail;
        const result = await pool.query(`SELECT * FROM usuario WHERE correo_usuario=${mail}`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.updateUser = async (req,res) => {
    try{
        const oldmail = req.body.oldmail;
        const name = req.body.name;
        const mail = req.body.mail;
        const password = req.body.password;
        const result = await pool.query(`UPDATE usuario SET nombre_usuario=${name} ,correo_usuario=${mail} ,password=${password}  
        WHERE correo_usuario=${oldmail} RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.deleteUser = async (req,res) => {
    try{
        const mail = req.body.mail;
        await pool.query(`DELETE FROM usuario WHERE correo_usuario=${mail}`);
        return res.json({message:"User deleted."});
    }
    catch(error){
        return res.json(error);
    }
}


