import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
// import { updateVinyl, disableVinyl, deleteVinyl } from "./";
import { getAllVinyls,updateVinyls } from "../../redux/actions";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const VinylsDash = () => {
  const vinyls = useSelector((state) => state.allVinyls);

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [viniloEditado, setViniloEditado] = useState(null);
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
      name: "Disponibles",
      selector: (row) => row.stock || "No hay stock",
      sortable: true,
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
        <div key={row.id}>
        <ul>
        {Array.isArray(row.artists) && row.artists.length > 0 ? (
          row.artists.map((artist) => (
            <li>{artist.name}</li>
          ))
        ) : (
          <li key="no-artist">No especificado</li>
        )}
      </ul>
        </div>
      ),
    },
    {
      name: "Estilo",
      selector: (row) => row.style || "No especificado",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) =>
        isEditing && viniloEditado.id === row.id ? (
          renderEditForm()
        ) : (
          <div className="flex space-x-2">
              <button
            onClick={() => handleCreate(row)}
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <IoCreateOutline />
          </button>
            <button
              onClick={() => handleEdit(row)}
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
  const renderEditForm = () => {
    return (
      <div className="fixed inset-56 flex items-center justify-center z-50">
        <div className=" bg-white w-1/2 p-4 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-2">Editar Stock de Vinilo</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Stock:
              </label>
              <input
                className="w-full border border-gray-300 rounded p-2"
                type="number"
                value={viniloEditado.stock || 0}
                onChange={(e) =>
                  setViniloEditado({
                    ...viniloEditado,
                    stock: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const handleEdit = (row) => {
    setIsEditing(true);
    setViniloEditado(row);
  };
  const handleSave = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { id, stock } = viniloEditado;
    console.log(id, stock);
    dispatch(updateVinyls(id, stock));
  }
  
  // const handleCreate = () => {
  //   navigate("/form");
  // };
  // //   const handleUpdate = (row) => {
  // //     // Lógica para actualizar el vinilo
  // //     dispatch(updateVinyl(row.id));
  // //   };
  // };
  

  const handleCancel = (e) => {
  e.preventDefault()
    setIsEditing(false);
    setViniloEditado(null);
  };

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
