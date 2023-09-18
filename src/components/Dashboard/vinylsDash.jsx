import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
// import { updateVinyl, disableVinyl, deleteVinyl } from "./";
import { getAllVinyls } from "../../redux/actions";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const VinylsDash = () => {
  const vinyls = useSelector((state) => state.vinyls);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllVinyls());
  }, [dispatch]);

  const columns = [
    {
      name: "Imagen",
      cell: (row) => (
        <img
          src={row.cover_image || "/ruta/a/imagen-por-defecto.png"}
          alt={`Imagen de ${row.title || "No especificado"}`}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      name: "ID",
      selector: (row) => row.id || "No especificado",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.title || "No especificado",
      sortable: true,
    },
    {
      name: "Género",
      selector: (row) => row.genre || "No especificado",
      sortable: true,
    },
    {
      name: "Año",
      selector: (row) => row.year || "No especificado",
      sortable: true,
    },
    {
      name: "Artista",
      cell: (row) => (
        <ul>
          {Array.isArray(row.artists) && row.artists.length > 0 ? (
            row.artists.map((artist) => <li key={artist.id}>{artist.name}</li>)
          ) : (
            <li>No especificado</li>
          )}
        </ul>
      ),
    },
    {
      name: "Estilo",
      selector: (row) => row.style || "No especificado",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleCreate(row)}
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <IoCreateOutline />
          </button>

          <button
            onClick={() => handleUpdate(row)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <AiOutlineEdit />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    navigate("/form");
  };
  //   const handleUpdate = (row) => {
  //     // Lógica para actualizar el vinilo
  //     dispatch(updateVinyl(row.id));
  //   };

  //   const handleDisable = (row) => {
  //     // Lógica para deshabilitar el vinilo
  //     dispatch(disableVinyl(row.id));
  //   };

  //   const handleDelete = (row) => {
  //     // Lógica para borrar el vinilo
  //     dispatch(deleteVinyl(row.id));
  //   };

  const filteredVinyls = vinyls.filter(
    (vinyl) =>
      vinyl.title.toLowerCase().includes(filterText.toLowerCase()) &&
      vinyl.genre.toLowerCase().includes(filterGenre.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full md:flex-row">
      <div className="md:w-full px-2">
        <div className="flex h-[8vh]  items-center pl-5">
          <div>
            <div className="w-[150px] h-[50px] clip-path-custom bg-slate-900 flex items-center justify-end ">
              <Link to="/dashboard">
                <h1 className="text-white pr-2">Volver al Inicio</h1>
              </Link>
            </div>
          </div>
          <h1 className="ml-[35%] text-2xl font-bold">Lista de vinilos</h1>
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Buscar por genero"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        />
        {/* <input
          type="text"
          placeholder="Buscar por año"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        /> */}
        <DataTable columns={columns} data={filteredVinyls} pagination />
      </div>
    </div>
  );
};

export default VinylsDash;
