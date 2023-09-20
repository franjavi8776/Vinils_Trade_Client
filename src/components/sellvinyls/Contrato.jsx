import React, { useState, useRef, useEffect } from "react";

const SellerContract = ({ onAccept, onReject }) => {
  const [showButtons, setShowButtons] = useState(false);
  const contractRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contractRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contractRef.current;
  
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          setShowButtons(true);
        } else {
          setShowButtons(false);
        }
      }
    };
  
    const contractElement = contractRef.current;
  
    if (contractElement) {
      contractElement.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      if (contractElement) {
        contractElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  

  const handleAccept = () => {
    onAccept();
  };

  const handleReject = () => {
    onReject();
  };

  return (
    <div
      className=" text-white min-h-screen w-[50%] flex flex-col items-center justify-center"
      style={{
        overflowY: "hidden", // Oculta el scroll de la página principal
      }}
    >
      <div
        className="max-w-lg w-[100vh] p-4 rounded-lg shadow-lg"
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
          minHeight: "50vh", // Altura mínima para permitir el scroll
          overflowY: "scroll", // Permitir scroll dentro del div
          maxHeight: "70vh", // Altura máxima para el div del contrato
        }}
        ref={contractRef}
      >
      <h2 className="text-2xl font-semibold mb-4">
  Contrato de Compra y Venta de Vinilos (Vendedor)
</h2>
<p>
  Este contrato ("Contrato") se celebra entre el vendedor y el comprador
  de los vinilos mencionados a continuación:
</p>
<h3 className="text-lg font-semibold mt-4">Detalles del Vendedor:</h3>
<p>
  Nombre del Vendedor: [Nombre del Vendedor]<br />
  Dirección del Vendedor: [Dirección del Vendedor]<br />
  Número de Teléfono del Vendedor: [Número de Teléfono del Vendedor]<br />
  Correo Electrónico del Vendedor: [Correo Electrónico del Vendedor]
</p>
<h3 className="text-lg font-semibold mt-4">Detalles de los Vinilos:</h3>
<p>
  Los siguientes vinilos se venderán en virtud de este Contrato:
  <ul>
    <li>
      Título del Vinilo 1: [Título del Vinilo 1]<br />
      Artista del Vinilo 1: [Artista del Vinilo 1]<br />
      Año del Vinilo 1: [Año del Vinilo 1]<br />
      Género del Vinilo 1: [Género del Vinilo 1]<br />
      Precio del Vinilo 1: [Precio del Vinilo 1]<br />
      Stock del Vinilo 1: [Stock del Vinilo 1]
    </li>
    <li>
      Título del Vinilo 2: [Título del Vinilo 2]<br />
      Artista del Vinilo 2: [Artista del Vinilo 2]<br />
      Año del Vinilo 2: [Año del Vinilo 2]<br />
      Género del Vinilo 2: [Género del Vinilo 2]<br />
      Precio del Vinilo 2: [Precio del Vinilo 2]<br />
      Stock del Vinilo 2: [Stock del Vinilo 2]
    </li>
    {/* Puedes agregar más vinilos según sea necesario */}
  </ul>
</p>
<h3 className="text-lg font-semibold mt-4">Reglas de Venta:</h3>
<ol className="list-decimal ml-6 mt-2">
  <li>
    <strong>Descripción de los Vinilos:</strong> El vendedor ha
    proporcionado una descripción precisa de los vinilos, que incluye el
    título, artista, año, género, precio y stock disponibles.
  </li>
  <li>
    <strong>Precio:</strong> El comprador acuerda pagar el precio
    acordado por los vinilos en la cantidad especificada.
  </li>
  <li>
    <strong>Condiciones del Producto:</strong> Los vinilos se encuentran
    en las condiciones descritas por el vendedor. Cualquier defecto o
    daño significativo se debe informar con anticipación.
  </li>
  <li>
    <strong>Envío:</strong> El vendedor se compromete a enviar los
    vinilos en un plazo de [plazo de envío] días hábiles después de
    recibir el pago del comprador.
  </li>
  <li>
    <strong>Devoluciones y Reembolsos:</strong> El comprador tiene derecho
    a devolver los vinilos en un plazo de [plazo de devolución] días a
    partir de la fecha de recepción si no están satisfechos con su compra.
    El vendedor emitirá un reembolso completo al recibir los vinilos en
    su estado original.
  </li>
  {/* Puedes agregar más términos y condiciones según sea necesario */}
</ol>
<p className="mt-4">
  Al hacer clic en "Aceptar", tanto el vendedor como el comprador
  confirman su acuerdo con los términos y condiciones de este Contrato de
  Compra y Venta de Vinilos. Si alguna de las partes no está de acuerdo
  con los términos, haga clic en "Rechazar" y no se procederá con la
  transacción.
</p>

      </div>
      {showButtons && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleAccept}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 focus:outline-none"
          >
            Aceptar
          </button>
          <button
            onClick={handleReject}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none"
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerContract;
