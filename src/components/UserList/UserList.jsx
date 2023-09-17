// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";


// const UserList = () => {
//     const dispatch = useDispatch();
//     const users = useSelector((state) => state.users);
  
    
  
//     // const handleDisableUser = (userId) => {
//     //   // Lógica para deshabilitar un usuario
//     //   dispatch(disableUser(userId));
//     // };
  
//     return (
//       <div className="w-full min-h-[80vh]">
//         <h2>Lista de Usuarios</h2>
//         <table>
//           <thead className="w-full h-[20px]">
//             <tr>
//               <th>Nombre</th>
//               <th>Email</th>
//               <th>Número</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>
//           <tbody >
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phoneNumber}</td>
//                 <td>
//                   <button > 
//                   {/* onClick={() => handleDisableUser(user.id)} */}
//                     Deshabilitar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };
  
  

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
// import { updateVinyl, disableVinyl, deleteVinyl } from "./"; 
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import {getUsersAndSuccess } from "../../redux/actions";

const UserList = () => {
  const Users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    // Cargar la lista de usuarios cuando el componente se monte
    dispatch(getUsersAndSuccess());
  }, [dispatch]);

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
            onClick={() => handleUpdate(row)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
           <AiOutlineEdit/>
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
           <AiOutlineDelete/>
          </button>
        </div>
      ),
    },
  ];

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

  const filteredUsers = Users.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
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
        <DataTable columns={columns} data={filteredUsers} pagination />
      </div>
    </div>
  );
};

export default UserList;