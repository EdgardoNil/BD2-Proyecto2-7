import { Card } from '../../ui/components/Card'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const Record = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/ver_historial_pedidos/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log de la respuesta
        if (Array.isArray(data)) {
          setAppointments(data); // Establecer appointments si data es un array válido
        } else {
          console.error('Datos no válidos recibidos:', data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el historial de pedidos:', error);
      });
  }, [user]);

  const handleEntregarPedido = async (pedidoId) => {
    try {
      console.log('Pedido ID:', pedidoId); // Log del ID del pedido antes de enviarlo
  
      const response = await fetch(`http://localhost:5000/actualizar_estado_pedido/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Asegúrate de especificar el tipo de contenido como JSON
        },
        body: JSON.stringify({ estado: 'entregado' }) // Envía el objeto con el nuevo estado del pedido
      });
  
      if (!response.ok) {
        throw new Error('Error al entregar el pedido');
      }
  
      // Actualizar el estado del pedido localmente
      const updatedAppointments = appointments.map(appointment => {
        if (appointment._id === pedidoId) {
          return { ...appointment, estado: 'entregado' };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error al entregar el pedido:', error);
    }
  };
  

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
                  <th scope="col" className="px-6 py-3">Estado del Pedido</th>
                  <th scope="col" className="px-6 py-3">Cantidad de Items</th>
                  <th scope="col" className="px-6 py-3">Total</th>
                  <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-bg-300">
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{appointment.estado}</td>
                    <td className="px-6 py-4">{appointment.libros_pedido.length}</td>
                    <td className="px-6 py-4">{appointment.total}</td>
                    <td className="px-6 py-4">
                      {appointment.estado === 'en proceso' && (
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed"
                          disabled
                        >
                          Entregado
                        </button>
                      )}
                      {appointment.estado === 'enviado' && (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleEntregarPedido(appointment._id)}
                        >
                          Entregado
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  )
}
