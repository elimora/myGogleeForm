const pool = require("../models/database")

exports.storeAnswer= async (req,res) => {
    try{
        const answer = req.body.answer;
        const user = req.body.user;
        const form = req.body.form;
        const result = await pool.query(`INSERT INTO solicitud (respuesta,id_usuario,id_formulario) 
        VALUES (${answer},${user},${form}) RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getAnswer = async (req,res) => {
    try{
        const form = req.body.form;
        const user = req.body.user;
        const result = await pool.query(`SELECT * FROM solicitud 
        WHERE id_formulario=${form} AND id_usuario=${user}`);
        return res.json(result.rows);
    }
    catch(error){
        return res.json(error);
    }
}

exports.updateAnswer= async (req,res) => {
    try{
        const answer = req.body.answer;
        const user = req.body.user;
        const form = req.body.form;
        const result = await pool.query(`UPDATE solicitud SET respuesta=${answer}  
        WHERE id_formulario=${form} AND id_usuario=${user}RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}
