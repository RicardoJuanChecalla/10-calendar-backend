const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const CrearUsuario = async (req, res = express.response)=>{
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        usuario = new Usuario( req.body );
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync( password , salt);
        await usuario.save();
        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

const LoginUsuario = async (req, res = express.response )=>{
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario NO existe con ese correo'
            });
        }
        //Confirmar contraseña
        const ValidPassword = bcrypt.compareSync( password, usuario.password );
        if(!ValidPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            }); 
        }
        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

const RevalidarToken = async (req, res)=>{
    const {uid, name} = req;
    //Generar nuestro JWT
    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        uid, 
        name,
        token
    })
};

module.exports = {
    CrearUsuario,
    LoginUsuario,
    RevalidarToken
};