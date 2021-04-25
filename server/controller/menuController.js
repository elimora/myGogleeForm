const pool = require("../models/database")

exports.createMenu = async (req,res) => {
    try{
        const name = req.body.name;
        const result = await pool.query(`INSERT INTO menu (nombre_menu) 
        VALUES (${name}) RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.createSub = async (req,res) => {
    try{
        const name = req.body.name;
        const menu = req.body.form;
        const parent = req.body.parent;
        const result = await pool.query(`INSERT INTO subnivel (nombre_subnivel, id_menu, parent_id_subnivel) 
        VALUES (${name},${menu},${parent}) RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getMenus = async (req,res) => {
    try{
        const result = await pool.query(`SELECT * FROM menu`);
        return res.json(result.rows);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getAllSub = async (req,res) => {
    try{
        const name = req.body.name;
        const result = await pool.query(`SELECT * FROM subnivel`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.getSubByMenu = async (req,res) => {
    try{
        const menu = req.body.menu;
        const result = await pool.query(`SELECT * FROM subnivel INNER JOIN menu USING(id_menu)  
        WHERE menu.nombre_menu=${menu}`);
        return res.json(result.rows);
    }
    catch(error){
        return res.json(error);
    }
}

exports.changeMenuName = async (req,res) => {
    try{
        const oldname = req.body.oldname;
        const newname = req.body.newname;
        const result = await pool.query(`UPDATE menu SET nombre_menu=${newname}  
        WHERE nombre_menu=${oldname} RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.updateSub = async (req,res) => {
    try{
        const oldname = req.body.oldname;
        const newname = req.body.newname;
        const parent = req.body.parent;
        const result = await pool.query(`UPDATE subnivel SET nombre_subnivel=${newname}, parent_id_subnivel=${parent}  
        WHERE nombre_subnivel=${oldname} RETURNING *`);
        return res.json(result.rows[0]);
    }
    catch(error){
        return res.json(error);
    }
}

exports.deleteMenu = async (req,res) => {
    try{
        const name = req.body.name;
        await pool.query(`DELETE FROM menu WHERE nombre_menu=${name}`);
        return res.json({message:"Menu eliminado."});
    }
    catch(error){
        return res.json(error);
    }
}

exports.deleteSub = async (req,res) => {
    try{
        const name = req.body.name;
        await pool.query(`DELETE FROM subnivel WHERE nombre_subnivel=${name}`);
        return res.json({message:"Subnivel eliminado."});
    }
    catch(error){
        return res.json(error);
    }
}