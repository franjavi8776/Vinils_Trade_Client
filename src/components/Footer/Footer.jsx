import { MdOutlineSell } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { PiArrowsCounterClockwiseDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.token !== null);
  const navigate = useNavigate();

  const notify1 = (message, type) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-white"
              : "bg-blue-500 p-1"
          } p-2 w-80 flex justify-center items-center rounded-2xl mt-14 relative text-black font-light`}
        >
          <div className="text-center justify-center text-lg">{message}</div>
          <div
            className="ml-5 text-red-900 text-2xl"
            onClick={() => t.dismiss()}
          >
            X
          </div>
        </div>
      ),
      {
        duration: 1000,
      }
    );
  };

  const handleOnClick = () => {
    if (isAuthenticated) {
      navigate("/selluser");
    } else {
      notify1("Debes iniciar sesión", "error");
    }
  };

  return (
    <div className="w-full min-h-[80vh] bg-black bg-opacity-90">
      <div className="w-full h-[35vh] flex justify-between items-center mb-10">
        <div
          onClick={handleOnClick}
          className="w-[30%] flex flex-col items-center text-white cursor-pointer"
        >
          <MdOutlineSell className="text-red-600 text-4xl mb-2 mt-1" />
          <h1 className="text-xl font-semibold">Vende Gratis</h1>
          <p className="hidden lg:flex text-red-600 text-center text-sm leading-6 w-80 mx-auto mt-1">
            Miles de personas quieren tus vinilos. Publica y verás qué pronto
            llegan las compras. ¡Tú no pagas nada!
          </p>
        </div>
        <div className="w-[30%] flex flex-col items-center text-white">
          <Link
            to="https://www.mercadopago.com.ar/cuenta#s-insurtech"
            className="w-[30%] flex flex-col items-center "
          >
            <AiOutlineLock className="text-red-600 text-4xl mb-2 mt-1" />
            <h1 className="text-xl font-semibold">Pago seguro</h1>
          </Link>
          <p className="hidden lg:flex text-red-600 text-center text-sm leading-6 w-80 mx-auto mt-1">
            Todos los pagos realizados a través de nuestra plataforma se
            procesan de manera segura mediante la pasarela de pago de Mercado
            Pago.
          </p>
        </div>
        <div className="w-[30%] flex flex-col items-center text-white">
          <Link to="/garantia" className="w-[30%] flex flex-col items-center ">
            <PiArrowsCounterClockwiseDuotone className="text-red-600 text-4xl mb-2" />
            <h1 className="text-xl font-semibold">Garantía</h1>
          </Link>
          <p className="hidden lg:flex text-red-600 text-center text-sm leading-6 w-80 mx-auto mt-1">
            Respaldamos la calidad y efectividad de nuestros servicios de venta
            de vinilos con una garantía sólida.
          </p>
        </div>
      </div>
      <div className="py-20 bg-transparent border-t border-white w-[85%] m-auto">
        <div className="container mx-auto flex flex-col items-center">
          <h3 className="text-xl text-white font-semibold mb-4">
            Tu opinión nos interesa
          </h3>
          <p className="text-white mb-4">
            Por favor, comparte tus sugerencias o comentarios acerca de la
            página:
          </p>

          <form className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="email" className="block text-white text-sm mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Ingresa tu email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-white text-sm mb-2"
              >
                Comentario:
              </label>
              <textarea
                id="comment"
                name="comment"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Escribe tu comentario"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <p className="text-white text-sm mb-2">Calificación:</p>
              <div className="flex">
                <div className="mr-2">
                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1" className="text-red-600">
                    &#9733;
                  </label>
                </div>
                <div className="mr-2">
                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2" className="text-red-600">
                    &#9733;
                  </label>
                </div>
                <div className="mr-2">
                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3" className="text-red-600">
                    &#9733;
                  </label>
                </div>
                <div className="mr-2">
                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4" className="text-red-600">
                    &#9733;
                  </label>
                </div>
                <div>
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5" className="text-red-600">
                    &#9733;
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-white hover:text-black text-white py-2 px-4 rounded"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
