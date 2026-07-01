import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { crearUsuario, obteneremail } from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'mel';

export const registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const { data: usuarioExiste } = await obteneremail(email);
        if (usuarioExiste) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { data: nuevoUsuario, error } = await crearUsuario(nombre, email, hashedPassword, 'usuario');

        if (error) {
            return res.status(500).json({ error: "Error al crear el usuario" });
        }

        return res.status(201).json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email y password son requeridos" });
        }

        const { data: usuario, error } = await obteneremail(email);
        if (error || !usuario) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Usamos la columna exacta de la base de datos: "contraseña"
        const passwordValido = await bcrypt.compare(password, usuario["contraseña"]);
        if (!passwordValido) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = jwt.sign(
            { id: usuario.identificacion, email: usuario["correo electrónico"], rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({ message: "Login exitoso", usuario, token });
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};