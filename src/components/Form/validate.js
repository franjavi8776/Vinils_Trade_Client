export function validateVinylsForm(input) {
  let errors = {};

  // Validación del campo Nombre
  if (!input.title) {
    errors.title = "Debes ingresar un nombre";
  } else if (input.title.length >= 30) {
    errors.title = "El nombre no puede tener más de 30 caracteres";
  }

  // Validación del campo Artista
  if (!input.artists) {
    errors.artists = "Debes ingresar un artista";
  } else if (input.artists.length >= 20) {
    errors.artists =
      "El nombre del artista no puede tener más de 20 caracteres";
  }

  // Validación del campo Género
  if (!input.gender) {
    errors.gender = "Debes seleccionar un género";
  } else if (input.gender.length >= 20) {
    errors.gender = "El genero no puede tener más de 20 caracteres";
  }

  // Validación del campo Descripción
  // if (!input.Description) {
  //     errors.Description = "Debes ingresar una descripción";
  // } else if (input.Description.length >= 120) {
  //     errors.Description = "La descripción no puede tener más de 200 caracteres";
  // }

  // Validación del campo Año
  if (!input.year) {
    errors.year = "Debes ingresar un año";
  } else if (
    isNaN(input.year) ||
    input.year < 1900 ||
    input.year > new Date().getFullYear()
  ) {
    errors.year = "El año debe ser un número entre 1900 y el año actual";
  }

  // Validación del campo Stock
  if (!input.stock) {
    errors.stock = "Debe ingresar stock";
  } 
  if (input.stock >= 20) {
    errors.stock = "Debe ser menor a 20"
  }
  if (input.stock < 0) {
    errors.stock = "Debe ser mayor que 0"
  }

  // Validacion del campo Pais
  if (!input.style) {
    errors.style = "Debe indicar un estilo";
  }

  // Validación del campo Precio
  if (!input.price) {
    errors.price = "Debes ingresar un precio";
  }
  if (isNaN(input.price) || input.price <= 19) {
    errors.price = "El precio debe ser un número mayor o igual a 20";
  }
  if (input.price >= 70) {
    errors.price = "El precio no puede ser mayor a 70"
  }


  // Validación del campo Condición
  // if (!input.Condition) {
  //     errors.Condition = "Debes seleccionar una condición";
  // }

  // Validación del campo Imagen
  if (!input.cover_image) {
    errors.cover_image = "Debes ingresar una imagen";
  }

  return errors;
}
