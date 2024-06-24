import { useNavigate } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';

import { AuthContext } from "../context/AuthContext";
import { createUser } from "../helpers";
import { useForm } from "../../hooks/useForm";
import Logo from '../../assets/logo.svg';
import { Card, Label, Input } from "../../ui/components";
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPage = () => {

    //   const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        rol,
        nombre,
        apellido,
        fecha_nacimiento,
        genero,
        email,
        passwor,
        foto,
        especialidad,
        direccion,
        onInputChange
    } = useForm({
        rol: 0,
        email: '',
        passwor: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        genero: '',
        foto: '',
        especialidad: 0,
        direccion: '',
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const onRegisterSubmit = async (event) => {
        event.preventDefault();

        // console.log({ nombre, apellido, fecha_nacimiento, genero, email, passwor, foto, especialidad, direccion, rol });
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(passwor)) {
            notifyError('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.');
            return;
        }

        const dataUser = {
            nombre,
            apellido,
            fecha_nacimiento: fecha_nacimiento !== '' ? fecha_nacimiento : null,
            genero,
            email,
            pass: passwor,
            foto,
            id_especialidad: especialidad ? especialidad * 1: null,
            direccion,
            id_rol: rol * 1,
        }

        console.log(dataUser);

        const respuesta = await createUser(dataUser);
        if (respuesta.exito) {
            notifySuccess(respuesta.message);
        } else if (!respuesta.exito && !respuesta.e) {
            notifyError(respuesta.message);
        } else {
            notifyError("Error interno en el servidor");
        }

    }

    const onLogin = () => {
        navigate('/login', {
            replace: false
        });
    }

    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="bg-bg-200 max-w-md w-full p-10 rounded-md">
                <div className="flex justify-between mb-3">
                <div>
                    <h1 className="text-2xl font-bold">Registro</h1>
                </div>
                <div>
                <select
                                    className="w-full bg-bg300 text-text-200 px-4 py-2 rounded-md"
                                    name="rol"
                                    value={rol}
                                    onChange={onInputChange}
                                >
                                    <option value="">Selecciona tu rol</option>
                                    <option value={1}>Paciente</option>
                                    <option value={2}>Doctor</option>
                                </select>
                </div>
                </div>
                    {
                        rol === "1" || rol === "2" ? 
                        <form>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col mr-3">

                                <Label htmlFor="name">Nombre:</Label>
                                <input
                                    type="text"
                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onInputChange}
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="apellido">Apellido</Label>
                                <input
                                    type="text"
                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                    name="apellido"
                                    value={apellido}
                                    onChange={onInputChange}
                                    placeholder="Apellido"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col mr-3">
                                <Label htmlFor="genero">Genero:</Label>
                                <select
                                    className="w-full bg-bg300 text-text-200 px-4 py-2 rounded-md"
                                    name="genero"
                                    value={genero}
                                    onChange={onInputChange}
                                >
                                    <option value="">Selecciona tu género</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="foto">Imagen de perfil:</Label>
                                <input
                                    type="text"
                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                    name="foto"
                                    value={foto}
                                    onChange={onInputChange}
                                    placeholder="Ingresa la url"
                                />
                            </div>
                        </div>

                        <Label htmlFor="genero">Dirección de correo electrónico:</Label>
                        <input
                            type="email"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            placeholder="example@mail.com"
                        />
                        <Label htmlFor="password">Contraseña:</Label>
                        <input
                            type="password"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                            name="passwor"
                            value={passwor}
                            onChange={onInputChange}
                            placeholder="Escribe tu contraseña"
                        />
          {
            rol === "1" ? 
                <>
                    <Label htmlFor="fecha_nacimiento">Fecha de nacimiento:</Label>
                        <input
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                            type="date"
                            name="fecha_nacimiento"
                            value={fecha_nacimiento}
                            onChange={onInputChange}
                        />
                </>
            : 
            <div className="flex items-center justify-center">
            <div className="flex flex-col mr-3">

                <Label htmlFor="especialidad">Especialidad:</Label>
                <select
                                    className="w-full bg-bg300 text-text-200 px-4 py-2 rounded-md"
                                    name="especialidad"
                                    value={especialidad}
                                    onChange={onInputChange}
                                >
                                    <option value="">Selecciona tu especialidad</option>
                                    <option value={1}>Cardiología</option>
                                    <option value={2}>Dermatología</option>
                                    <option value={3}>Pediatría</option>
                                    <option value={4}>Neurología</option>
                                    <option value={5}>Ginecología</option>
                                    <option value={6}>Oftalmología</option>
                                </select>
            </div>
            <div className="flex flex-col">
                <Label htmlFor="direccion">Direccion de la Clinica:</Label>
                <input
                    type="text"
                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                    name="direccion"
                    value={direccion}
                    onChange={onInputChange}
                    placeholder="Direccion de la clinica"
                />
            </div>
        </div>

          }

                        
                        <div className="flex items-center justify-center my-3">

                            <div className="">
                                <div className="">
                                    {foto && (
                  <img
                    src={foto}
                    alt="Preview"
                    className="rounded-full"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <button className="bg-primary-100 px-4 py-1 hover:bg-primary200 rounded-md my-1 w-full text-text100 font-semibold "
                                onClick={onRegisterSubmit}
                            >
                                Regístrate
                            </button>
                        </div>
                    </form>
                        
                        : "Selecciona primero tu rol"
                    }

<p className="text-xs block my-1 text-text-200" style={{color: '#393f81'}}>¿Ya tienes cuenta? 
            <a
              onClick={onLogin}
              style={{color: '#393f81'}} className="link"
              > Ingresa aquí
              </a>
          </p>
                    
                </div>
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
