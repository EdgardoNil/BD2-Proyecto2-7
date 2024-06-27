// import { useContext, useEffect, useId, useState } from "react";
// import { useForm } from "../../hooks/useForm";
// import { Input } from '../../ui/components/Input';
// import { Label } from '../../ui/components/Label';
// import { AuthContext } from "../../auth";
// import { Card } from '../../ui/components/Card'

// export const Profile = () => {
//   const [perfil, setPerfil] = useState({
//     nombre: '',
//     apellido: '',
//     email : '',
//     genero: '',
//     pass: '',
//     telefono: '',
//     direccion: '',
//     fecha_nacimiento: '',
//     foto: ''
//   });

//   const { user } = useContext(AuthContext);
//   const userId = "667c88a7501cfbeff33debe7"; // ID quemado para ejemplo


//   const {
//     nombre,
//     apellido,
//     genero,
//     pass,
//     direccion,
//     fecha_nacimiento,
//     foto,
//     onInputChange
//   } = useForm({
//     nombre: '',
//     apellido: '',
//     genero: '',
//     pass: '',
//     direccion: '',
//     fecha_nacimiento: '',
//     foto: ''
//   });

//   // useEffect(() => {
//   //   const getPerfil = async () => {
//   //     //const response = await fetch(`http://localhost:5000/users/${user.id}`);
//   //     //http://127.0.0.1:5000/users/667c88a7501cfbeff33debe7
//   //     //const response = await fetch(`http://localhost:5000/users/${userId}`);
//   //     const response = await fetch(`http://localhost:5000/users/667c88a7501cfbeff33debe7`);
//   //     const data = await response.json();
//   //     setPerfil(data);
//   //     console.log(data);
//   //   };
//   //   getPerfil();
//   // }, [user.id]);

//   useEffect(() => {
//     const getPerfil = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/users/${userId}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setPerfil(data);
//         console.log(data);
//       } catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//       }
//     };

//     getPerfil();

//     // if (user && userId) {
//     //   getPerfil();
//     // }
//   }, [user]);

//   const onEditPerfil = async (event) => {

//     const datos_actualizados = {
//       nombre: nombre || perfil.nombre,
//       apellido: apellido || perfil.apellido,
//       genero: genero || perfil.genero,
//       pass: pass || perfil.pass,
//       direccion: direccion || perfil.direccion,
//       fecha_nacimiento: fecha_nacimiento || perfil.fecha_nacimiento,
//       foto: foto || perfil.foto
//     };

//     try {
//       const response = await fetch(`http://localhost:3000/MediCare/update/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(datos_actualizados),
//       });
//       const data = await response.json();
//       alert('Perfil actualizado con éxito');
//     } catch (error) {
//       console.error('Error al actualizar el perfil:', error);
//       alert('Error al actualizar el perfil');
//     }
//     console.log(datos_actualizados);
//   };

//   return (
//     <>
//       <div className="mt-3 max-w-md mx-auto p-6 bg-white rounded-md">
//         <div className='col-span-3'>
//           <div className="col-start-2">
//             <Card>
//               <h1 className="text-2xl font-bold text-text-100 text-center">Editar Perfil</h1>
//               <form onSubmit={onEditPerfil}>
//                 <div className="row">
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Nombre</Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         name="nombre"
//                         defaultValue={perfil.nombre}
//                         onChange={onInputChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Apellido</Label>
//                       <Input
//                         type="text"
//                         name="apellido"
//                         defaultValue={perfil.apellido}
//                         onChange={onInputChange}
//                         className="form-control"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Email</Label>
//                       <Input
//                         className="form-control"
//                         type="text"
//                         name="email"
//                         onChange={onInputChange}
//                         defaultValue={perfil.email}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Teléfono</Label>
//                       <Input
//                         className="form-control"
//                         type="text"
//                         name="telefono"
//                         onChange={onInputChange}
//                         defaultValue={perfil.telefono}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Dirección</Label>
//                       <Input
//                         className="form-control"
//                         type="text"
//                         name="direccion"
//                         onChange={onInputChange}
//                         defaultValue={perfil.direccion}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="col-md-6 mb-4">
//                   <div data-mdb-input-init className="form-outline">
//                     <Label className="form-label">Género</Label>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       name="genero"
//                       onChange={onInputChange}
//                       defaultValue={perfil.genero}
//                     />

//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Contraseña</Label>
//                       <Input
//                         className="form-control"
//                         type="password"
//                         name="password"
//                         onChange={onInputChange}
//                         defaultValue={perfil.pass}
//                       />
//                     </div>
//                   </div>
//                 </div> */}
                
//                 {/* <div className="row">
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Fecha de cumpleaños</Label>
//                       <Input
//                         className="form-control"
//                         type="date"
//                         name="fecha_nacimiento"
//                         onChange={onInputChange}
//                         defaultValue={perfil.fecha_nacimiento.split('T')[0]}
//                       />

//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <Label className="form-label">Imagen de Perfil</Label>
//                       <Input
//                         className="form-control"
//                         type="text"
//                         name="imagen"
//                         onChange={onInputChange}
//                         defaultValue={perfil.foto}
//                       />
//                     </div>
//                   </div>
//                 </div> */}
//                 <div className="row">
//                   <div className="col-md-6 mt-4 mb-4">
//                     <button
//                       type="submit"
//                       className="bg-primary-100 rounded-md w-40 h-10 disabled:bg-primary-300 text-text-100 font-bold ml-2"
//                     >
//                       Editar Perfil
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </Card>
//           </div>
//         </div>
//       </div >
//     </>
//   );
// }
  

import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Input } from '../../ui/components/Input';
import { Label } from '../../ui/components/Label';
import { AuthContext } from "../../auth";
import { Card } from '../../ui/components/Card';

export const Profile = () => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    email : '',
    genero: '',
    pass: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    foto: ''
  });

  const { user } = useContext(AuthContext);
  const userId = "667c88a7501cfbeff33debe7"; // ID quemado para ejemplo

  const {
    nombre,
    apellido,
    genero,
    pass,
    direccion,
    fecha_nacimiento,
    foto,
    onInputChange
  } = useForm({
    nombre: perfil.nombre,
    apellido: perfil.apellido,
    genero: perfil.genero,
    pass: perfil.pass,
    direccion: perfil.direccion,
    fecha_nacimiento: perfil.fecha_nacimiento,
    foto: perfil.foto
  });

  useEffect(() => {
    const getPerfil = async () => {
      try {
        //const response = await fetch(`http://localhost:5000/users/${userId}`);
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

    // if (user && user.id) {
    //   getPerfil();
    // }
    getPerfil();
  }, [user]);

  const onEditPerfil = async (event) => {
    event.preventDefault();

    const datos_actualizados = {
      nombre: nombre || perfil.nombre,
      apellido: apellido || perfil.apellido,
      genero: genero || perfil.genero,
      pass: pass || perfil.pass,
      direccion: direccion || perfil.direccion,
      fecha_nacimiento: fecha_nacimiento || perfil.fecha_nacimiento,
      foto: foto || perfil.foto
    };

    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos_actualizados),
      });
      const data = await response.json();
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil');
    }
    console.log(datos_actualizados);
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
                        value={nombre}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <Label className="form-label">Apellido</Label>
                      <Input
                        type="text"
                        name="apellido"
                        value={apellido}
                        onChange={onInputChange}
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
                        value={perfil.email}  // no editable por ahora
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
                        value={perfil.telefono}  // no editable por ahora
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
                        value={direccion}
                        onChange={onInputChange}
                      />
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
            </Card>
          </div>
        </div>
      </div >
    </>
  );
}
