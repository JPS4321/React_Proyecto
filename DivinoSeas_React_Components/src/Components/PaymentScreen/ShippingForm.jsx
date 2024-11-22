import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useOrder from '../../Hooks/useOrder'; // Ajusta la ruta según corresponda
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos predeterminados de Toastify

const ShippingForm = ({ email, price, discount, cartData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    avenida: '',
    numero: '',
    colonia: '',
    zona: '',
  });

  const [token, setToken] = useState(null); // Estado para el token
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const { addClient, createOrder, addOrderDetails, addShipping, createPayment, loading, error } = useOrder(token);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/generate-token');
        setToken(response.data.token); // Almacenar el token
      } catch (err) {
        console.error('Error al obtener el token:', err.response?.data || err.message);
      }
    };

    fetchToken();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formSubmitted) {
      validateForm();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} es requerido.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      const clientData = {
        nombre: `${formData.firstName} ${formData.lastName}`,
        email: email,
        direccion: `${formData.zona}, ${formData.avenida}, ${formData.colonia}, ${formData.numero}`,
        contra: '',
      };

      try {
        const client = await addClient(clientData);
        if (client) {
          console.log('Cliente creado:', client);

          const orderData = {
            fechaCreacion: new Date().toISOString(),
            estado: 'Preparacion en curso',
            id_cliente: client.id_cliente,
          };

          const order = await createOrder(orderData);
          if (order) {
            console.log('Orden creada:', order);

            for (const item of cartData) {
              const orderDetailData = {
                id_orden: order.id_orden,
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_unitario: item.precio,
              };
              await addOrderDetails(orderDetailData);
            }
            console.log('Detalles de orden agregados');

            const fechaActual = new Date();
            const fechaEnvio = new Date(fechaActual.setDate(fechaActual.getDate() + 20))
              .toISOString()
              .split('T')[0];

            const shippingData = {
              fechaEnvio: fechaEnvio,
              estado: 'pendiente',
              id_orden: order.id_orden,
            };

            const shipping = await addShipping(shippingData);
            if (shipping) {
              console.log('Envío registrado:', shipping);

              const paymentData = {
                fechaPago: new Date().toISOString(),
                monto: price,
                id_orden: order.id_orden,
              };

              const payment = await createPayment(paymentData);
              if (payment) {
                console.log('Pago registrado:', payment);

                // Mostrar notificación con Toastify
                toast.success(
                  'Su orden se ha realizado con éxito. Por favor, contactar con nuestra página de Instagram para verificar su pago.'
                );

                // Redirigir después de 5 segundos
                setTimeout(() => {
                  navigate('/');
                }, 5000);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error al procesar el formulario:', err);
      }
    }
  };

  return (
    <div>
      <form className="shipping-form" onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'avenida', 'numero', 'colonia'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleInputChange}
            className={errors[field] ? 'error' : ''}
            required
          />
        ))}
        <select
          name="zona"
          value={formData.zona}
          onChange={handleInputChange}
          className={errors.zona ? 'error' : ''}
          required
        >
          <option value="">Seleccionar Zona</option>
          {[...Array(22)].map((_, i) => (
            <option key={i} value={`zona ${i + 1}`}>{`Zona ${i + 1}`}</option>
          ))}
        </select>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Procesando...' : 'Continuar'}
        </button>
        {Object.keys(errors).length > 0 && (
          <div className="error-message">Todos los campos son obligatorios.</div>
        )}
        {error && <div className="error-message">Error: {error}</div>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default ShippingForm;
