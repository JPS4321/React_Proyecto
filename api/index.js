import express from 'express'
import cors from 'cors'
import { captureAndLogRequests } from "./logging.js";
import { getAllProductos, createProducto, deleteProducto, getProductoById, updateProducto } from './db.js' 

const app = express()
const port = 3000
app.use(express.json())

app.use(captureAndLogRequests);
app.use(cors())

function validacionProducto(req, res, next) {
  const { nombre, descripcion, picture, existencias } = req.body;
  if (!nombre || !descripcion || !existencias) { 
      return res.status(400).json({ error: "Faltan o son inválidos el nombre, la descripción o las existencias." });
  }
  next();
}

app.get('/', (req, res) => {
  res.send('API de Productos Bikini')
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${port}`)
})


app.get('/productos', async (req, res) => {
  const productos = await getAllProductos()
  res.status(200).json(productos)
})


app.get('/productos/:id', async (req, res) => {
  const { id } = req.params
  const producto = await getProductoById(id)
  res.status(200).json(producto)
})


app.post('/productos', validacionProducto, async (req, res) => {
  const { nombre, descripcion, picture, existencias } = req.body;
  
  try {
    const { success, result, error } = await createProducto(nombre, descripcion, picture, existencias);
    if (success && result.affectedRows && result.affectedRows > 0) {
      return res.status(201).json({ success: true, message: "Producto creado con éxito", productId: result.insertId });
    } else {
      console.error("Error al crear el producto", error);
      return res.status(500).json({ success: false, message: "Error al crear el producto", error: error });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error Interno del Servidor", error: error.message });
  }
});


app.put('/productos/:id', validacionProducto, async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, picture, existencias } = req.body;
  
  try {
    const result = await updateProducto(id, nombre, descripcion, picture, existencias);
    if (result.affectedRows && result.affectedRows > 0) {
      return res.status(200).json({ success: true, message: "Producto actualizado con éxito", productId: id });
    } else {
      throw new Error(`Error al actualizar el producto con ID: ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Interno del Servidor" });
  }
});


app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params
  await deleteProducto(id)
  res.status(204).send()
})


app.use((req, res, next) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(req.method)) {
      return res.status(501).json({ message: "No implementado" });
    }
    next();
})
  
app.use((req, res) => {
    res.status(404).json({ message: "No encontrado: El endpoint no existe" });
})
