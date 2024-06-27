import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Input } from '../../ui/components/Input';
import { Label } from '../../ui/components/Label';
import { AuthContext } from "../../auth";
import { Card } from '../../ui/components/Card';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Profile = () => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    email: '',
    genero: '',
    pass: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    foto: ''
  });

  const [preview, setPreview] = useState(null);
  const { user } = useContext(AuthContext);

  const {
    direccion,
    email,
    telefono,
    foto,
    onInputChange
  } = useForm({
    direccion: perfil.direccion,
    email: perfil.email,
    telefono: perfil.telefono,
    foto: perfil.foto
  });

  useEffect(() => {
    const getPerfil = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${user.id}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPerfil(data);
        console.log(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    getPerfil();
  }, [user]);

  const onEditPerfil = async (event) => {
    event.preventDefault();

    const cambios = {
      telefono: telefono || perfil.telefono,
      email: email || perfil.email,
      direccion: direccion || perfil.direccion,
      foto_base64: foto || perfil.foto
    };

    if (
      cambios.telefono === perfil.telefono &&
      cambios.email === perfil.email &&
      cambios.direccion === perfil.direccion &&
      (foto === perfil.foto || foto === "")
    ) {
      toast.info('No hay cambios');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cambios),
      });
      const data = await response.json();
      toast.success('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      toast.error('Error al actualizar el perfil');
    }
    console.log(cambios);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "");
      onInputChange({ target: { name: 'foto', value: base64String } });
      setPreview(reader.result);
      console.log(base64String);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="mt-3 max-w-md mx-auto p-6 bg-white rounded-md">
        <div className='col-span-3'>
          <div className="col-start-2">
            <Card>
              <h1 className="text-2xl font-bold text-text-100 text-center">Editar Perfil</h1>
              <form onSubmit={onEditPerfil}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <Label className="form-label">Nombre</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="nombre"
                        defaultValue={perfil.nombre}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <Label className="form-label">Apellido</Label>
                      <Input
                        type="text"
                        name="apellido"
                        defaultValue={perfil.apellido}
                        disabled
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <Label className="form-label">Email</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={perfil.email}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <Label className="form-label">Teléfono</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="telefono"
                        defaultValue={perfil.telefono}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <Label className="form-label">Dirección</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="direccion"
                        defaultValue={perfil.direccion}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <Label className="form-label">Foto</Label>
                      <Input
                        className="form-control"
                        type="file"
                        name="foto"
                        onChange={onFileChange}
                      />
                      {preview && (
                        <img
                          src={preview}
                          alt="Vista previa"
                          style={{ width: "150px", height: "150px", objectFit: "cover", marginTop: "10px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-4 mb-4">
                    <button
                      type="submit"
                      className="bg-primary-100 rounded-md w-40 h-10 disabled:bg-primary-300 text-text-100 font-bold ml-2"
                    >
                      Editar Perfil
                    </button>
                  </div>
                </div>
              </form>
              <ToastContainer />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
