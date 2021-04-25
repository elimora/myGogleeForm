const pool = require("../models/database")

exports.createRoles = async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM rol")
        if(result.rows.length < 2){
            const rol1 = "admin";
            const des1 = "Tiene acceso a creacion y manipulacion de formularios.";
            const rol2 = "normal";
            const des2 = "Puede responder a los formularios.";
            await pool.query(`INSERT INTO rol (nombre_rol,descripcion,id_rol) VALUES (${rol1},${des1},1)`);
            await pool.query(`INSERT INTO rol (nombre_rol,descripcion,id_rol) VALUES (${rol2},${des2},2) `);
            return res.json({message:"DB innit."});
        }
        else
        return res.json({message:"DB innit."});
    }
    catch(error){
        return res.json(error);
    }
}

