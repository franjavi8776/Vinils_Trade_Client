const validate = (input) => {
  const errors = {};

  if (!input.nombre) {
    errors.nombre = "Requerido";
  } else if (input.nombre.length >= 35) {
    errors.nombre = "Menos caracteres";
  }
  if (input.confirmarContraseña !== input.contraseña) {
    errors.confirmarContraseña = "Debe coincidir con la contraseña";
  }
  if (input.telefono.length > 10) {
    errors.telefono = "El teléfono no debe exceder los 10 dígitos"
  }
  if (!input.telefono) {
    errors.telefono = "Campo obligatorio";
  }
  const ciudadRegex = /^[a-zA-Z\s]+$/; // Permite letras y espacios
  if (!input.ciudad) {
    errors.ciudad = "Campo obligatorio";
  } else if (!ciudadRegex.test(input.ciudad)) {
    errors.ciudad = "Ciudad no válida";
  }

  if (!input.correo) {
    errors.correo = "Campo obligatorio";
  } else if (!isValidEmail(input.correo)) {
    errors.correo = "Correo inválido";
  }
  if (!input.pais) {
    errors.pais = "Debes ingresar un pais";
  } else if (input.pais.length >= 35) {
    errors.pais =
      "El nombre del pais no puede tener más de 35 caracteres";
  }
  return errors;
};


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default validate