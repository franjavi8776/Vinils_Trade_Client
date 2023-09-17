import {MdOutlineSell} from "react-icons/md"
import {AiOutlineLock} from "react-icons/ai"
import {PiArrowsCounterClockwiseDuotone} from "react-icons/pi"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.token !== null);
  const navigate=useNavigate()

  const notify1 = (message, type) => {
    toast.custom((t) => (
      <div
        className={`${
          type === 'success'
            ? 'bg-green-500'
            : type === 'error'
            ? 'bg-white'
            : 'bg-blue-500 p-1'
        } p-2 w-80 flex justify-center items-center rounded-2xl mt-14 relative text-black font-light`}
      >
        <div className="text-center justify-center text-lg">{message}</div>
        <div className="ml-5 text-red-900 text-2xl" onClick={() => t.dismiss()}>
          X
        </div>
      </div>
    ), {
      duration: 1000,
    });
  };

  const handleOnClick=()=>{
    if (isAuthenticated) {
      navigate("/selluser")
    } else {
      notify1('Debes iniciar sesión', 'error');
    }
  }

  return (
    <div className="w-full h-[20vh]  bg-black bg-opacity-90 flex justify-between items-center">
      <div onClick={handleOnClick} className="w-[30%] flex flex-col items-center text-white  cursor-pointer">
         <MdOutlineSell className="text-red-600 text-4xl mb-2 mt-1" />
         <h1 className="text-xl font-semibold">Vende Gratis</h1> 
         <p className="text-red-600 text-center text-sm leading-6 w-80 mx-auto mt-1">
          Miles de personas quieren tus vinilos. Publica y verás qué pronto llegan las compras. ¡Tú no pagas nada!
         </p>
      </div>
      <div className="w-[30%] flex flex-col items-center text-white ">
        <Link to="https://www.mercadopago.com.ar/cuenta#s-insurtech" className="w-[30%] flex flex-col items-center ">
         <AiOutlineLock className="text-red-600 text-4xl mb-2 mt-1" />
         <h1 className="text-xl font-semibold">Pago seguro</h1>
        </Link>
        <p className="text-red-600 text-center text-sm leading-6 w-80 mx-auto mt-1"
         >Todos los pagos realizados a través de nuestra plataforma se procesan de manera segura mediante la pasarela de pago de Mercado Pago.
        </p>
      </div>
      <div className="w-[30%] flex flex-col items-center text-white">
        <Link to="/garantia" className="w-[30%] flex flex-col items-center ">
         <PiArrowsCounterClockwiseDuotone className="text-red-600 text-4xl mb-2" />
         <h1 className="text-xl font-semibold">Garantía</h1>
        </Link>
        <p className="text-red-600 text-center text-sm leading-6 w-80 mx-auto mt-1"
         >Respaldamos la calidad y efectividad de nuestros servicios de venta de vinilos con una garantía sólida.
        </p>
      </div>
    </div>
  );
};

export default Footer;
