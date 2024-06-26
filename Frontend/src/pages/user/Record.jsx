import { Card } from '../../ui/components/Card'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const Record = () => {
  const [appointments, setAppointments] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/MediCare/historial/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        <div className="col-span-3">
          <Card>
            <h1 className="text-2xl font-bold text-text-100 text-center">Historial de Pedidos</h1>
            <br />
            <table className="bg-bg-300 w-full col-span-5 text-sm text-center rtl:text-right text-text200 ">
              <thead className="bg-bg-200 text-xs text-text100 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Fecha de la Cita</th>
                  <th scope="col" className="px-6 py-3">Nombre del médico</th>
                  <th scope="col" className="px-6 py-3">Motivo</th>
                  <th scope="col" className="px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-bg-300">
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{appointment.fecha}</td>
                    <td className="px-6 py-4">{"Dr.(a) " + appointment.nombre + ' ' + appointment.apellido}</td>
                    <td className="px-6 py-4">{appointment.motivo}</td>
                    <td className="px-6 py-4">{appointment.estado}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  )
}