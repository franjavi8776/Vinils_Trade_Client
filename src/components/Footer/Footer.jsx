import { MdOutlineSell } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { PiArrowsCounterClockwiseDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postReview } from "../../redux/actions";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.token !== null);
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    email: "",
    comment: "",
    rating: null,
  });
  const dispatch = useDispatch();

  const notify1 = (message, type) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-white"
              : "bg-white p-1"
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
  const notify2 = (message, type) => {
    toast.custom(
      (t) => (
        <div className="custom-toast">
          <div className="bg-green-500 p-1 w-80 flex justify-center items-center rounded-2xl mt-14 relative text-black font-light">
            <div className="text-center justify-center text-lg">{message}</div>
          </div>
        </div>
      ),
      {
        duration: 1000,
        toastId: "custom-toast", // Usa el mismo toastId que en la configuración del Toaster específico
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      const ratingValue = parseInt(value);
      setComment({ ...comment, rating: ratingValue });
    } else {
      // Para otros campos como "email" o "comment", actualiza el estado correspondiente.
      setComment({ ...comment, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReview(comment));
    setComment({
      email: "",
      comment: "",
      rating: null,
    });
    notify2("Gracias por tu comentario");
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
            target="_blank"
            rel="noopener noreferrer"
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

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="email" className="block text-white text-sm mb-2">
                Email:
              </label>
              <input
                onChange={handleOnChange}
                value={comment.email}
                type="email"
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
                onChange={handleOnChange}
                value={comment.comment}
                name="comment"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Escribe tu comentario"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <p className="text-white text-sm  text-center mb-2">
                Calificación:
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div className="mr-2" key={value}>
                    <input
                      onChange={handleOnChange}
                      type="radio"
                      id={`star${value}`}
                      name="rating"
                      value={value}
                      checked={value === comment.rating}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor={`star${value}`}
                      className={`text-red-600 p-8 cursor-pointer ${
                        value <= comment.rating ? "text-red-600" : "text-white"
                      }`}
                      onClick={() => setComment({ ...comment, rating: value })}
                    >
                      &#9733;
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-white hover:text-black text-white mt-4  py-2 px-4 rounded"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Footer;
