import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth";
import { Input } from "../../ui/components/Input";
import { Label } from "../../ui/components/Label";
import { Card } from "../../ui/components/Card";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Cart = () => {
  const [cart, setCart] = useState({ compras: [], total_a_pagar: 0 });
  const { user } = useContext(AuthContext);
  const userId = "667c5d33008e8d2c11e5d497"; // ID quemado para ejemplo

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cart/${userId}`);
        const data = await response.json();
        setCart(data);
      } catch (error) {
        toast.error("Error al obtener el carrito");
        console.error("Error al obtener el carrito:", error);
      }
    };
    fetchCart();
  }, [userId]);

  const handleQuantityChange = async (libroId, newQuantity) => {
    try {
      const currentQuantity = cart.compras.find(item => item.libro_id === libroId).cantidad;
      const quantityDifference = newQuantity - currentQuantity;

      const response = await fetch(`http://localhost:5000/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, libro_id: libroId, cantidad: quantityDifference }),
      });
      const data = await response.json();
      if (data.message) {
        // Actualizar las cantidades de los libros en el carrito
        const updatedCompras = cart.compras.map((item) =>
          item.libro_id === libroId ? { ...item, cantidad: newQuantity } : item
        );

        // Recalcular el total a pagar
        const updatedTotalAPagar = updatedCompras.reduce((total, item) => {
          return total + item.cantidad * item.precio;
        }, 0);

        // Actualizar el estado del carrito con las nuevas cantidades y el nuevo total a pagar
        setCart({
          ...cart,
          compras: updatedCompras,
          total_a_pagar: updatedTotalAPagar,
        });
      } else {
        console.error("Error al actualizar la cantidad:", data.error);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveBook = async (libroId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, libro_id: libroId }),
      });
      const data = await response.json();
      if (data.message) {
        // Eliminar el libro del estado del carrito
        const updatedCompras = cart.compras.filter((item) => item.libro_id !== libroId);

        // Recalcular el total a pagar
        const updatedTotalAPagar = updatedCompras.reduce((total, item) => {
          return total + item.cantidad * item.precio;
        }, 0);

        // Actualizar el estado del carrito
        setCart({
          ...cart,
          compras: updatedCompras,
          total_a_pagar: updatedTotalAPagar,
        });
        toast.success(data.message);
      } else {
        toast.error(data.error);
        console.error("Error al eliminar el libro del carrito:", data.error);
      }
    } catch (error) {
      toast.error("Error al eliminar el libro del carrito");
      console.error("Error al eliminar el libro del carrito:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`http://localhost:5000/checkout/${userId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.message) {
        // Vaciar el carrito
        setCart({ compras: [], total_a_pagar: 0 });
        toast.success(data.message);
      } else {
        toast.error(data.error);
        console.error("Error al procesar el pago:", data.error);
      }
    } catch (error) {
      toast.error("Error al procesar el pago");
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md mt-3">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-4">Carrito de Compras</h1>
      <div className="grid grid-cols-4 gap-4 font-bold">
        <Label className="col-span-1">Nombre</Label>
        <Label className="col-span-1">Cantidad</Label>
        <Label className="col-span-1">Precio Unitario</Label>
        <Label className="col-span-1">Total</Label>
      </div>
      <Card className="mt-2">
        <div className="grid grid-cols-5 gap-4 items-center">
          {cart.compras.map((item) => (
            <React.Fragment key={item.libro_id}>
              <div>{item.nombre_libro}</div>
              <Input
                type="number"
                value={item.cantidad}
                onChange={(e) => handleQuantityChange(item.libro_id, parseInt(e.target.value))}
                className="form-control"
              />
              <div>${item.precio.toFixed(2)}</div>
              <div>${(item.cantidad * item.precio).toFixed(2)}</div>
              <button
                onClick={() => handleRemoveBook(item.libro_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
            </React.Fragment>
          ))}
        </div>
      </Card>
      <div className="mt-4 text-right font-bold">
        <Label>Total a Pagar:</Label> ${cart.total_a_pagar.toFixed(2)}
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Procesar Pago
        </button>
      </div>
    </div>
  );
};
