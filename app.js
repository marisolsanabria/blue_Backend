const express = require("express");
const cors = new require("cors");
const app=express();
const mongoose=require("mongoose");

const productoRoutes= require("./routes/producto");
const userRoutes= require("./routes/user");
require('dotenv').config()

//import de las routes 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Configuración de la conexión a la bd
mongoose.connect(
    process.env.DB_CONNECT
    ).then(()=>{
        console.log('Base de datos conectada');
    }).catch(()=>{
        console.log('Base de datos NO conectada');
    });


app.use("/api/productos",productoRoutes);
app.use("/api/user",userRoutes);

module.exports = app;

