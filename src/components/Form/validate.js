export function validateVinylsForm(input) {
    let errors = {};

    // Validación del campo Nombre
    if (!input.Name) {
        errors.Name = "Debes ingresar un nombre";
    } else if (input.Name.length >= 30) {
        errors.Name = "El nombre no puede tener más de 30 caracteres";
    }

    // Validación del campo Artista
    if (!input.Artist) {
        errors.Artist = "Debes ingresar un artista";
    } else if (input.Artist.length >= 20) {
        errors.Artist = "El nombre del artista no puede tener más de 20 caracteres";
    }

    // Validación del campo Género
    if (!input.Gender) {
        errors.Gender = "Debes seleccionar un género";
    } else if (input.Gender.length >= 20) {
        errors.Gender = "El genero no puede tener más de 20 caracteres";
    }

    // Validación del campo Descripción
    if (!input.Description) {
        errors.Description = "Debes ingresar una descripción";
    } else if (input.Description.length >= 120) {
        errors.Description = "La descripción no puede tener más de 200 caracteres";
    }

    // Validación del campo Año
    if (!input.Year) {
        errors.Year = "Debes ingresar un año";
    } else if (isNaN(input.Year) || input.Year < 1900 || input.Year > new Date().getFullYear()) {
        errors.Year = "El año debe ser un número entre 1900 y el año actual";
    }

    // Validación del campo Precio
    if (!input.Price) {
        errors.Price = "Debes ingresar un precio";
    } else if (isNaN(input.Price) || input.Price <= 0) {
        errors.Price = "El precio debe ser un número mayor que 0";
    }

    // Validación del campo Condición
    if (!input.Condition) {
        errors.Condition = "Debes seleccionar una condición";
    }

    // Validación del campo Imagen
    if (!input.Image) {
        errors.Image = "Debes ingresar una imagen";
    }

    return errors;
}