const Error = () => {
  return (
    <div className="h-[78vh] flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-4">
          RUTA NO ENCONTRADA
        </h1>
        <p className="text-2xl text-gray-700 text-center">
          Lo sentimos, la página que estás buscando no se encuentra disponible.
        </p>
      </div>
    </div>
  );
};

export default Error;
