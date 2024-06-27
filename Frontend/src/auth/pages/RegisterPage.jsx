import { useNavigate } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';

import { createUser } from "../helpers";
import { useForm } from "../../hooks/useForm";
import { Label } from "../../ui/components";
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPage = () => {

    const navigate = useNavigate();

    const {
        rol,
        nombre,
        apellido,
        email,
        password,
        telefono,
        direccion,
        onInputChange
    } = useForm({
        rol: '1',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        telefono: '',
        direccion: '',
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const onRegisterSubmit = async (event) => {
        event.preventDefault();


        const today = new Date();
        const fecha_registro = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const dataUser = {
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            password,
            fecha_registro
        }

        const respuesta = await createUser(dataUser);
        if (respuesta.message) {
            notifySuccess(respuesta.message);
        } else if (respuesta.error) {
            notifyError(respuesta.error);
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
                    </div>
                    <form>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col mr-3">

                                <Label htmlFor="nombre">Nombre:</Label>
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
                                <div className="flex flex-col">
                                    <Label htmlFor="direccion">Direccion de domicilio:</Label>
                                    <input
                                        type="text"
                                        className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                        name="direccion"
                                        value={direccion}
                                        onChange={onInputChange}
                                        placeholder="Direccion de domicilio"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="telefono">Telefono:</Label>
                                <input
                                    type="text"
                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                    name="telefono"
                                    value={telefono}
                                    onChange={onInputChange}
                                    placeholder="Telefono"
                                />
                            </div>
                        </div>

                        <Label htmlFor="email">Dirección de correo electrónico:</Label>
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
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            placeholder="Escribe tu contraseña"
                        />

                        <div className="flex items-center justify-center mt-3">
                            <button className="bg-primary-100 px-4 py-1 hover:bg-primary200 rounded-md my-1 w-full text-text100 font-semibold "
                                onClick={onRegisterSubmit}
                            >
                                Regístrate
                            </button>
                        </div>
                    </form>

                    <p className="text-xs block my-1 text-text-200" style={{ color: '#393f81' }}>¿Ya tienes cuenta?
                        <a
                            onClick={onLogin}
                            style={{ color: '#393f81' }} className="link"
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
