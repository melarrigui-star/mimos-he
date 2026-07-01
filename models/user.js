import { supabase } from "../config/supabase.js";

// Obtener todos los usuarios
export const obtenerTodosUsuarios = async () => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');
    return { data, error };
};

// Crear usuario
export const crearUsuario = async (nombre, email, contrasena, rol) => {
    const { data, error } = await supabase
        .from('usuarios')
        .insert([
            {
                nombre: nombre,
                "correo electrónico": email,
                "contraseña": contrasena,
                rol: rol || 'usuario'
            }
        ])
        .select();
    return { data, error };
};

// Buscar el usuario por email para el login y recuperación
export const obteneremail = async (email) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email) // <-- Cambia 'correo electrónico' por 'email' aquí
    .single();
    
  return { data, error };
};

// Obtener un usuario por id
export const obteid = async (id) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('identificacion', id)
        .single();
    return { data, error };
};

// Actualizar usuarios (contraseña o datos)
export const actualizarusuario = async (id, campos) => {
    const { data, error } = await supabase
        .from('usuarios')
        .update(campos)
        .eq('identificacion', id);
    return { data, error };
};

// Eliminar usuario
export const eliminar = async (id) => {
    const { data, error } = await supabase
        .from('usuarios')
        .delete()
        .eq('identificacion', id);
    return { data, error };
};