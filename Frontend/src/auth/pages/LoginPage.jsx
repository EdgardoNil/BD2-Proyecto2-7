import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';

import { useForm } from "../../hooks/useForm";
import { login as loginHelper } from "../helpers";
import { Label } from "../../ui/components";

import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { correo, password, onInputChange } = useForm({
    correo: '',
    password: '',
  });


  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onLogin = async (event) => {

    event.preventDefault();

    const dataLogin = {
      email: correo,
      password,
    }

    // login('Sebastian Martínez', 2, 1);

    const respuesta = await loginHelper(dataLogin);
    console.log(respuesta);

    // if()
    if (respuesta.id && respuesta.tipo) {
    //   notifyError("Usuario y/o contraseña son incorrectas.");
      const tipoUsuario = respuesta.tipo === 'cliente' ? 1 : 2;
      notifySuccess(`Bienvenido de vuelta`);
      await sleep(2000);
      login("nombreCompleto", tipoUsuario, respuesta.id);
    } else if (respuesta.error){
      notifyError(respuesta.error);
    } else {
      notifyError("Error interno en el servidor");
    }

    // login('Sebastian Martínez');

  }

  const onRegister = () => {

    console.log('Registar');

    navigate('/register', {
      replace: false
    });

  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-bg-200 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <br></br>
        <form>
          <Label htmlFor="username">Correo:</Label>
          <input
            className="w-full bg-300 text-200 px-4 py-2 rounded-md"
            type="email"
            name="correo"
            value={correo}
            onChange={onInputChange}
            placeholder="Correo"
          />

          <Label htmlFor="password">Contraseña:</Label>
          <input
            className="w-full bg-300 text-text-200 px-4 py-2 rounded-md"
            type="password" 
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="Escribe tu contraseña"
          />

          <p className="text-xs block my-1 text-text-200" style={{color: '#393f81'}}>¿No tienes una cuenta? 
            <a
              onClick={onRegister}
              style={{color: '#393f81'}} className="link"
              > Registrar aquí
              </a>
          </p>
          <br></br>
          <div className="flex items-center justify-center">
            <button 
              className="bg-primary-100 px-4 py-1 hover:bg-primary-200 rounded-md my-1 w-full text-100 font-semibold"
              onClick={onLogin}
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-center">
          </div>
        </form>
      </div>
      {/* {error && <ErrorModal message={error} onClose={() => setError(null)} />} */}
    </div>
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnHover
          theme="colored"
      />
    </>
  )
}
