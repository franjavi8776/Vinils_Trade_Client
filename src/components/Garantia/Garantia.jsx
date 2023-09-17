import React from 'react'

function Garantia() {
  return (
    <div className='w-full min-h-[110vh] flex justify-center items-center'>
    <div className="bg-black bg-opacity-90  text-white w-[50%] m-auto p-8 flex flex-col items-center dark:bg-slate-200 dark:text-black ">
    <h1 className="text-3xl font-semibold text-red-600 mb-8">CONDICIONES PARA DEVOLUCION</h1>
    <p className="text-lg w-[80%] m-auto mb-3">
      <span className="font-semibold text-red-600">1. Objeto:</span> Este contrato establece las condiciones bajo las cuales se aceptarán las devoluciones 
      de productos comprados en el sitio web de La Empresa.
    </p>
    <p className="text-lg w-[80%] m-auto mb-3">
      <span className="font-semibold text-red-600">2. Devoluciones:</span> El Cliente tiene derecho a solicitar una devolución de un producto comprado 
      en el sitio web de La Empresa dentro de un plazo de 15 días a partir de la fecha de entrega del producto,
      sujeto a las siguientes condiciones:
    </p>
    <p className="text-lg w-[80%] m-auto mb-3">
      <span className="font-semibold text-red-600">3. Condiciones de Devolución:</span> El producto debe estar en su estado original, sin signos evidentes de uso, daño o desgaste.
      Todos los componentes originales del producto (por ejemplo, carátulas, fundas, insertos) deben estar incluidos y en buen estado.
      El producto debe ser devuelto en su embalaje original.
    </p>
    <p className="text-lg w-[80%] m-auto mb-3">
      <span className="font-semibold text-red-600">4. Procedimiento de Devolución:</span> El Cliente deberá notificar a La Empresa su intención de devolver el producto dentro del plazo de 15 días desde la fecha de entrega.
      La Empresa proporcionará al Cliente una etiqueta de envío prepagado o instrucciones para la devolución del producto.
      El Cliente se hará cargo de empacar y enviar el producto de acuerdo con las instrucciones proporcionadas por La Empresa.
      La Empresa inspeccionará el producto devuelto y, si cumple con las condiciones establecidas 
      en este contrato, procesará la devolución y reembolsará el precio de compra original al Cliente.
    </p>
    <p className="text-lg w-[80%] m-auto mb-3">
      <span className="font-semibold text-red-600">5. Excepciones:</span> Este contrato no se aplica a productos dañados durante el envío o productos defectuosos. 
      En caso de recibir un producto dañado o defectuoso, el Cliente debe notificar a La Empresa de inmediato, 
      y La Empresa se hará responsable de proporcionar un reemplazo o un reembolso completo.
    </p>
    <p className="text-lg w-[80%] m-auto mb-3">
      <span className="font-semibold text-red-600">6. Jurisdicción y Ley Aplicable:</span> Este contrato se regirá e interpretará de acuerdo con las leyes de [Jurisdicción], 
      y cualquier disputa que surja en relación con este contrato se resolverá exclusivamente en los tribunales de [Jurisdicción].
    </p>
    <p className="text-lg w-[80%] m-auto mb-3">
      <span className="font-semibold text-red-600">7. Aceptación:</span> El Cliente acepta y entiende las condiciones establecidas en este contrato y 
      se compromete a cumplirlas al solicitar una devolución de producto.
    </p>
  </div>
  </div>
  
  )
}

export default Garantia