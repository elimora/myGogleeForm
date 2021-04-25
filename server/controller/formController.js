const pool = require("../models/database")

exports.createForm = async (req,res) => {
    try{
        const name = req.body.name;
        const result = await pool.query(`INSERT INTO formulario (nombre_formulario) 
        VALUES (${name}) RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getAllForms = async (req,res) => {
    try{
        const result = await pool.query(`SELECT * FROM formulario`);
        return res.json(result.rows);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getFormByName = async (req,res) => {
    try{
        const name = req.body.name;
        const result = await pool.query(`SELECT * FROM formulario WHERE nombre_formulario=${name}`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.changeFormName = async (req,res) => {
    try{
        const oldname = req.body.oldname;
        const newname = req.body.newname;
        const result = await pool.query(`UPDATE formulario SET nombre_formulario=${newname}  
        WHERE nombre_formulario=${oldname} RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.changeFormSub = async (req,res) => {
    try{
        const name = req.body.name;
        const sub = req.body.sub;
        const result = await pool.query(`UPDATE formulario SET id_subnivel=${sub}  
        WHERE nombre_formulario=${name} RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.deleteForm = async (req,res) => {
    try{
        const name = req.body.name;
        await pool.query(`DELETE FROM formulario WHERE nombre_formulario=${name}`);
        return res.json({message:"User deleted."});
    }
    catch(error){
        return res.json(error);
    }
}