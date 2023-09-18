import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
// import { updateVinyl, disableVinyl, deleteVinyl } from "./"; 
import { AiOutlineDelete } from "react-icons/ai";
import {getUsersAndSuccess, deleteUser } from "../../redux/actions";

const UserList = () => {
  const Users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const [filterCountry,setFilterCountry]=useState("");
  const [filterEmail,setFilterEmail]=useState("");

  useEffect(() => {
    // Cargar la lista de usuarios cuando el componente se monte
    dispatch(getUsersAndSuccess());
  }, [dispatch]);

  // tabla 
  const columns = [
    {
      name: "id",
      selector: (row) => row.id || "No especificado",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name || "No especificado",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "No especificado",
      sortable: true,
    },
    {
      name: "phoneNumber",
      selector: (row) => row.phoneNumber || "No especificado",
      sortable: true,
    },
    {
      name: "Ciudad",
      selector: (row) => row.city || "No especificado",
      sortable: true,
    },
    {
      name: "pais",
      selector: (row) => row.country || "No especificado",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
           <AiOutlineDelete/>
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
           
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (row) => {
    dispatch(deleteUser(row.id)); 
  };

  const filterByEmail = (userEmail, searchTerm) => {
    const regex = new RegExp(`\\b${searchTerm}\\b`, 'i'); 
    return regex.test(userEmail);
  };
  const filteredUsers = Users.filter((user) =>
  (user.name ? user.name.toLowerCase().includes(filterText.toLowerCase()) : false) &&
  (user.country ? user.country.toLowerCase().includes(filterCountry.toLowerCase()) : false) &&
  (user.email ? filterByEmail(user.email, filterEmail.toLowerCase()) : false)
);


  return (
    <div className="flex flex-col w-full h-full md:flex-row">
      <div className="md:w-full p-4">
        <h1 className="mb-4 text-xl font-bold">Usuarios</h1>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Buscar por Pais"
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        />
         <input
          type="text"
          placeholder="Buscar por Email"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        />
        <DataTable columns={columns} data={filteredUsers}  pagination />
      </div>
    </div>
  );
};

export default UserList;