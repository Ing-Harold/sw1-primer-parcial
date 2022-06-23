const express = require('express');
const router = express.Router();
const { v4: uuidV4 } = require('uuid');

const pool = require('../database');

router.get('/user/:tokenU', async (req, res) => {
    const { tokenU } = req.params;
    console.log(tokenU + 'tokenUser');
    const users = await pool.query('SELECT * FROM users WHERE tokenU = ?', [tokenU]);
    if (users.length <= 0) {
        res.status(404).json({ status: 'Not Found' });
    }
    const user = users[0];
    const respuesta = {
        name: user.username,
        email: user.correo,
        token: user.tokenU
    }
    res.json(respuesta);
});

router.put('/guardar-diagrama/:tokenS', async (req, res) => {
    const { tokenS } = req.params;
    console.log(req.params);
    const { content } = req.body;
    console.log(req.body);
    const salas = await pool.query('SELECT * FROM salas WHERE tokenS = ?', [tokenS]);
    if (salas.length <= 0) {
        res.json({ status: 'Token Not Valid' });
    }
    const salaId = salas[0].id;
    await pool.query('UPDATE salas SET xml = ? WHERE id= ?', [content, salaId], (err, rows, filds) => {
        if (!err) {
            res.json({ status: 'Project Updated Successfully' });
        } else {
            res.json({ status: 'ERROR! Could not Update Project' });
        }
    });
    res.json({ status: 'Project Updated Successfully' });
});


router.get('/cargar-salas/:tokenS', async (req, res) => {
    console.log(req.params);
    console.log(req.params.tokenS);
    const { tokenS } = req.params;
    const salas = await pool.query('SELECT * FROM salas WHERE tokenS= ?', [tokenS]);
    if (salas.length <= 0) {
        res.status(404).json({ status: 'Token Not Valid' });
    }
    const sala = salas[0];
    console.log(sala + 'sala apis');
    const resultado = {
        id: sala.id,
        nombre: sala.title,
        descripcion: sala.description,
        user_id: sala.user_id,
        content: sala.xml,
        codigo: sala.tokenS
    }
    res.json(resultado);
});



module.exports = router;

//andres

// 1era api
router.post('/crearUser/:username', async (req, res) => {
    const { username } = req.params;
    console.log(req.params);
    const users = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length > 0) {
        res.status(404).json({ status: 'usuario ya existe' });
    } else {
        const newUser = {
            username
        };
        const token = uuidV4();
        console.log(token);
        newUser.token = token;
        const user = await pool.query('INSERT INTO users set ?', [newUser]);
        console.log(newUser);
        return res.status(200).json({
            newUser,
            message: 'usuario creado'
        });
    }// 
});

router.get('/userToken/:token', async (req, res) => {
    const { token } = req.params;
    console.log(token + 'tokenUser');
    const users = await pool.query('SELECT * FROM users WHERE token = ?', [token]);
    console.log(users);
    if (users.length <= 0) {
        res.status(404).json({ status: 'Not Found token de usuario incorrecto' });
    } else {
        const user = users[0];
        const respuesta = {
            name: user.username,
            token: user.token
        }
        return res.status(200).json({
            respuesta,
            message: 'usuario valido'
        });
    }
});
// tokken 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7InVzZXJuYW1lIjoicGFibG8ifSwiaWF0IjoxNjU1OTk5MDIzfQ.Tx8rjBPtpj_bAXg8r4lSU2lXdOYKq5q6ndzTxfjzziA


// 3era api crear puzzle
router.post('/createPuzzle', async (req, res) => {
    const { rowss, cols, imageName, pieceCount, showMenu, token} = req.body;
    
    const newPuzzle = {
        rowss,
        cols,
        imageName,
        pieceCount,
        showMenu,
        id: token,
    };
    console.log(newPuzzle);;
    const puzzle = await pool.query('INSERT INTO puzzle set ?', [newPuzzle]);
    console.log(puzzle);
    // const newPlayers = {
    //     users_id: userID,
    //     puzzle_id: puzzle.id
    // };
    // await pool.query('INSERT INTO players set ?', [newPlayers]);
    // res.redirect('/salas');
    return res.status(200).json({
        newPuzzle,
        message: 'creeado puzzle sucefull'
    });
});

router.get('/puzzle/:tokenP', async (req, res) => {
    const { tokenP } = req.params;
    console.log(tokenP + 'tokenPuzzle');
    const puzzle = await pool.query('SELECT * FROM puzzle WHERE id = ?', [tokenP]);
    if (puzzle.length <= 0) {
        res.status(404).json({ status: 'Not Found token incorrecto' });
    } else {
        const puzzleR = puzzle[0];
        console.log(puzzleR);
        const respuesta = {
            id: puzzleR.id,
            rowss: puzzleR.rowss,
            cols: puzzleR.cols,
            imageName: puzzleR.imageName,
            pieceCount: puzzleR.pieceCount,
            showMenu: puzzleR.showMenu,
        }
        return res.status(200).json({
            respuesta,
            message: 'token correcto del puzzle'
        });
    }
});