require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");
const seedRoutes = require("./routes/seedRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api", taskRoutes);
app.use("/api/auth", userRoutes);
app.use("/api", boardRoutes);
app.use("/api", seedRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Ocorreu um erro no servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

sequelize
  .authenticate()  .then(() => {
    console.log("Conexão com o banco de dados SQLite realizada com sucesso!");

    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("Tabelas sincronizadas!");    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao inicializar aplicação:", err);
  });
