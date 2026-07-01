import { supabase } from "../config/supabase.js";

// Crear código de recuperación
export const crearCodigoRecuperacion = async (usuarioId, codigo) => {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

  const { data, error } = await supabase
    .from('códigos_de_recuperación') 
    .insert([
      {
        usuario_id: usuarioId,   // Coincide con tu columna usuario_id
        código: codigo,          // Coincide con tu columna código (con tilde)
        expira_en: expiresAt.toISOString() // Coincide con tu columna expira_en
      }
    ])
    .select();

  return { data, error };
};

// Obtener código válido no utilizado por usuario
export const obtenerCodigoValido = async (usuarioId, codigo) => {
  const { data, error } = await supabase
    .from('códigos_de_recuperación')
    .select('*')
    .eq('usuario_id', usuarioId)
    .eq('código', codigo)
    .eq('usado', false)
    .gt('expira_en', new Date().toISOString())
    .single();

  return { data, error };
};

// Marcar código como usado
export const marcarComoUsado = async (codigoId) => {
  const { data, error } = await supabase
    .from('códigos_de_recuperación')
    .update({ usado: true })
    .eq('identificacion', codigoId); // Revisa si tu clave primaria es 'identificacion' o 'id'

  return { data, error };
};