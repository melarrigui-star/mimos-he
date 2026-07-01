import { obtenerTodosUsuarios, obteid, actualizarusuario as actualizarusuarioModelo, eliminar } from '../models/user.js';

export const obteneruser = async (req, res) => {
    try {
        const { data, error } = await obtenerTodosUsuarios();
        if (error) return res.status(500).json({ error: 'Error al obtener usuarios' });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno' });
    }
};

export const buscarusuarioid = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await obteid(id);
        if (error || !data) return res.status(404).json({ error: 'Usuario no encontrado' });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno' });
    }
};

export const actualizarusuario = async (req, res) => { 
    try {
        const { id } = req.params;
        // Aquí llamamos a la función del modelo con su nuevo nombre interno
        const { data, error } = await actualizarusuarioModelo(id, req.body);
        if (error) return res.status(500).json({ error: 'Error al actualizar en la base de datos' });
        return res.json({ message: 'Usuario actualizado con éxito', data });
    } catch (error) {
        return res.status(500).json({ error: 'Error interno' });
    }
};

export const eliminarusuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await eliminar(id);
        if (error) return res.status(500).json({ error: 'Error al eliminar' });
        return res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({ error: 'Error interno' });
    }
};