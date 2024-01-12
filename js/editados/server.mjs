import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(
  cors({
    origin: "https://portfolio-juan-ignacio-moreno.000webhostapp.com", // Reemplaza con tu dominio de producción
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "juanimignacio@gmail.com",
    pass: "izzs jcrs lhcn izwc",
  },
});

app.use(express.static(join(__dirname, "..")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/enviar-correo", (req, res) => {
  const { Nombre, Email, Asunto, Descripcion } = req.body;

  const htmlContent = `
    <h2>PortFolio</h2>
    <p><strong>Nombre:</strong> ${Nombre}</p>
    <p><strong>Email:</strong> ${Email}</p>
    <p><strong>Asunto:</strong> ${Asunto}</p>
    <p><strong>Descripción:</strong> ${Descripcion}</p>
  `;

  const mailOptions = {
    from: "tuporfolio@gmail.com",
    to: "juanimignacio@gmail.com",
    subject: "Por-Folio",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al enviar el correo electrónico");
    }
    res.status(200).send("Correo electrónico enviado con éxito");
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
