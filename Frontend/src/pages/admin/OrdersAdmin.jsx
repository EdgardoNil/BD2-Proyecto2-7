import React, { useState, useEffect } from 'react';

export const OrdersAdmin = () => {
  const [salesData, setSalesData] = useState([]);
  const [expandedSale, setExpandedSale] = useState(null);

  const fetchSalesData = () => {
    fetch('http://localhost:5000/historial_pedidos_clientes')
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error('Error al obtener historial:', error));
  };

  useEffect(() => {
    fetchSalesData();
  }, []);
  const handlleexpandRow = (saleId) => {
    if (expandedSale === saleId) {
      setExpandedSale(null); 
    } else {
      setExpandedSale(saleId);
    }
  };

  const handleChangeStatus = (data, id) => {
   
    fetch(`http://localhost:5000/actualizar_estado_pedido/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: data }) 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Estado actualizado:', data);
      fetchSalesData();
    
    })
    .catch(error => {
      console.error('Error al actualizar el estado:', error);
      
    });
  };

  return (
    <div>
    <h2>Historial de Ventas</h2>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <th></th>
          <th>Nombre del Cliente</th>
          <th>Cambiar estado de la compra</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map((sale, index) => (
          <React.Fragment key={index}>
            <tr onClick={() => handlleexpandRow(index)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{`compra ${index + 1}`}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{sale.nombre_cliente}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {sale.estado_pedido.toLowerCase() == 'en proceso' && (
                    <button
                      style={{ marginBottom: '5px', backgroundColor: '#3498db', color: '#fff', border: '1px solid #2980b9', borderRadius: '12px', padding: '8px 16px' }}
                      className="status-button"
                      onClick={() => handleChangeStatus("enviado", sale.id_pedido)}
                    >
                      Enviado
                    </button>
                  )}
                </td>
            </tr>
            {expandedSale === index && (
              <tr>
                <td colSpan="2" style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <ul>
                    {sale.libros_pedido.map((libro, libroIndex) => (
                      <li key={libroIndex}>{libro.titulo} - Cantidad: {libro.cantidad}</li>
                      
                    ))}
                  </ul>
                  <ul>{sale.estado_pedido}</ul>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>

                 
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
  );
};
