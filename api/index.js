import express from "express";
import cors from "cors";
import { captureAndLogRequests } from "./logging.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoute.js";
import colorRouter from "./routes/colorRoute.js";
import productColorRouter from "./routes/productColorRoute.js";
import collectionRouter from "./routes/collectionRoute.js";
import clientRouter from "./routes/clientRoute.js";
import productCollectionRouter from "./routes/productCollectionRoute.js";
import inventoryRouter from "./routes/inventoryRoute.js";
import promotionRouter from "./routes/promotionRoute.js";
import shippingRouter from "./routes/shippingRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import orderRouter from "./routes/orderRoute.js"; 
import orderDetailRouter from "./routes/orderDetailRoute.js"

const app = express();

// Usa el puerto de la variable de entorno PORT si está definido, de lo contrario usa el puerto 3000
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(captureAndLogRequests);
app.use(cors());

app.use("/productos", productRouter);
app.use("/categorias", categoryRouter);
app.use("/colores", colorRouter);
app.use("/productos", productColorRouter);
app.use("/colecciones", collectionRouter);
app.use("/clientes", clientRouter);
app.use("/producto-colecciones", productCollectionRouter);
app.use("/inventarios", inventoryRouter);
app.use("/promociones", promotionRouter);
app.use("/envios", shippingRouter);
app.use("/pagos", paymentRouter);
app.use("/ordenes", orderRouter)
app.use("/ordenes-detalles", orderDetailRouter)

app.get("/", (req, res) => {
  res.send("API de Productos Bikini");
});

if (process.env.NODE_ENV !== 'test') {
  // Solo iniciar el servidor si no se está ejecutando en modo de pruebas
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${port}`);
  });
}

app.use((req, res, next) => {
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
  if (!allowedMethods.includes(req.method)) {
    return res.status(501).json({ message: "No implementado" });
  }
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: "No encontrado: El endpoint no existe" });
});

export default app;
