export const validateLoginForm = (user) => {
    const errors = {};
  
    if (!user.email) {
      errors.email = "El campo de correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "El formato del correo electrónico es inválido.";
    }
  
    if (!user.password) {
      errors.password = "El campo de contraseña es obligatorio.";
    } else if (user.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    } else if (user.password.length > 20) {
      errors.password = "La contraseña no debe exceder los 20 caracteres.";
    }
  
    return errors;
};