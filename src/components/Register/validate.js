const validate = (input) => {
  const errors = {};
  if (!input.name) {
    errors.name = "Requerido";
  } else if (input.name.length >= 35) {
    errors.name = "Menos caracteres";
  }
  if (input.confirmarContraseña !== input.password) {
      errors.confirmarContraseña = "Debe coincidir con la contraseña";
    } 
    if (input.password.length < 6) {
      errors.password = "Debe tener mas de 6 caracteres"
    }
    if(input.phoneNumber.length > 10){
      errors.phoneNumber =  "El teléfono no debe exceder los 10 dígitos"
    }
    if (!input.phoneNumber) {
      errors.phoneNumber = "Campo obligatorio";
    }
    const ciudadRegex = /^[a-zA-Z\s]+$/; // Permite letras y espacios
    if (!input.ciudad) {
      errors.ciudad = "Campo obligatorio";
    } else if (!ciudadRegex.test(input.ciudad)) {
      errors.ciudad = "Ciudad no válida";
    }
    
    if(!input.codArea){
      errors.codArea = "Campo obligatorio"
    }
    if(input.codArea.length > 6){
      errors.codArea = "Menos caracteres"
    }
  if (!input.email) {
    errors.email = "Campo obligatorio";
  } else if (!isValidEmail(input.email)) {
    errors.email= "Correo inválido";
  }

  if (!input.country) {
    errors.country = "Debes ingresar un pais";
  } else if (input.country.length >= 35) {
    errors.country =
      "El nombre del pais no puede tener más de 35 caracteres";
  }
  return errors;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default validate