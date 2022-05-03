const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/user/:tokenU', async (req, res) => {
    const { token } = req.params;
    const users = await pool.query('SELECT * FROM users WHERE tokenU = ?', [token]);
    if (users.length <= 0) {
        res.json({ status: 'Token Not Valid' });
    }
    const user = users[0];
    res.json(user);
});

router.put('/guardar-salas/:tokenS', async (req, res) => {
    const { token } = req.params;
    const { content } = req.body;
    const salas = await pool.query('SELECT * FROM salas WHERE tokenS= ?', [token]);
    if (salas.length <= 0) {
        res.json({ status: 'Token Not Valid' });
    }
    const projectId = salas[0].id;
    await pool.query('UPDATE salas SET xml = ? WHERE id= ?', [content, projectId], (err, rows, filds) => {
        if (!err) {
            res.json({ status: 'Project Updated Successfully' });
        } else {
            res.json({ status: 'ERROR! Could not Update Project' });
        }
    });
    res.json({ status: 'Project Updated Successfully' });
});


router.get('/cargar-salas/:token', async (req, res) => {
    const { token } = req.params;
    const salas = await pool.query('SELECT * FROM salas WHERE tokenS= ?', [token]);
    if (salas.length <= 0) {
        res.json({ status: 'Token Not Valid' });
    }
    const projectId = salas[0];
    res.json(projectId);
});



module.exports = router;