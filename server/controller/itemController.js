const pool = require("../models/database")

exports.createItem= async (req,res) => {
    try{
        const form = req.body.form
        const question = req.body.question;
        const style = req.body.style;
        const selection = req.body.selection;
        const result = await pool.query(`INSERT INTO estilo (nombre_estilo,seleccion) 
        VALUES (${style},${selection}) RETURNING *`);

        const id_style = result.rows[0].id_estilo;
        const result2 = await pool.query(`INSERT INTO item (pregunta,id_estilo) 
        VALUES (${question},${id_style}) RETURNING *`);

        const result3 = await pool.query(`SELECT * FROM formulario WHERE nombre_formulario=${form}`);

        const id_form = result3.rows[0].id_formulario
        const id_item = result2.rows[0].id_item
        const result4 = await pool.query(`INSER INTO formulario_item (id_item,id_formulario)
        VALUES (${id_item},${id_form})`)
        
        return res.json(result2.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getAllItems = async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM item");
        return res.json(result.rows);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getItemByStyle = async (req,res) => {
    try{
        const style = req.body.style;
        const result = await pool.query(`SELECT * FROM item INNER JOIN estilo USING(id_estilo) 
        WHERE estilo.nombre_estilo=${style}`);
        return res.json(result.rows);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getItemByForm = async (req,res) => {
    try{
        const form = req.body.form;
        const result = await pool.query(`SELECT * FROM item INNER JOIN formulario_item USING(id_item) 
        INNER JOIN formulario USING(id_formulario) 
        WHERE formulario.nombre_formulario=${form}`);
        return res.json(result.rows);
    }
    catch(error){
        return res.json(error);
    }
}

exports.updateItem = async (req,res) => {
    try{
        const id = req.body.id;
        const question = req.body.question;
        const result = await pool.query(`UPDATE item SET pregunta=${question}
        WHERE id_item=${id} RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.updateStyle = async (req,res) => {
    try{
        const id = req.body.id;
        const style = req.body.style;
        const selection = req.body.selection;
        const result = await pool.query(`UPDATE estilo SET nombre_estilo=${style}, seleccion=${selection}
        WHERE id_item=${id} RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.deleteItem = async (req,res) => {
    try{
        const id = req.body.id;
        await pool.query(`DELETE FROM item WHERE id_item=${id}`);
        return res.json({message:"Item deleted."});
    }
    catch(error){
        return res.json(error);
    }
}