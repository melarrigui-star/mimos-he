// controllers/user.js
import { getUsers, obtenerUsuarioPorId } from '../models/user.js';

// Obtener todos los usuarios
export const getUsersController = async (req, res) => {
    try {
        const { data, error } = await getUsers();
        
        if (error) {
            console.error('Error al obtener usuarios:', error);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }

        return res.json({ usuarios: data });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener usuario por ID
export const getUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params; // ← Error corregido: era res.params

        if (!id) {
            return res.status(400).json({ error: 'ID es requerido' });
        }

        const { data, error } = await obtenerUsuarioPorId(id);

        if (error || !data) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.json({ usuario: data });
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};