const Producto = require('../models/producto')


/*const productos = [
    { 
        id: "gegafdg",
        nombre:"arroz",
        categoria:"viveres",
        cantidad:200,
        precio:2000
    },
    { 
        id: "dgfvdfgf",
        nombre:"jabón",
        categoria:"aseo",
        cantidad:100,
        precio:5500
    }
]
*/

/*exports.getProduct = (req,res) => {
    res.status(200).json(productos);
}
*/

exports.getProductos = (req, res) => {
    Producto.find({author:req.userData.userId}).then((productoResult) => {
      res.status(200).json(productoResult);
    });
  };

exports.addProducto = (req, res) => {
    console.log(req.body);
       
    const productAdd = new Producto({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        cantidad: req.body.cantidad,
        precio:req.body.precio,
        author: req.userData.userId,
    });
  
    productAdd.save().then((createdProduct) => {
      console.log(createdProduct);
      res.status(201).json({ message: "Producto creado" });
    });
  };

exports.updateProducto = (req,res) => {
    const id = req.params.id;
  const producto = new Producto({
    _id:id,
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    cantidad: req.body.cantidad,
    precio:req.body.precion,
    uthor: req.userData.userId,
  });

  Producto.updateOne({_id: req.params.id, author:req.userData.userId }, producto).then((result) => {
    if(result.modifiedCount >0){
      res.status(200).json({ message: "Actualización exitosa" });
    }else{
      res.status(401).json({ message: "Actualización fallida" });
    }
    
  });
   
}

exports.deleteProducto = (req, res) => {
    Producto.deleteOne({_id: req.params.id,author:req.userData.userId}).then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Producto eliminado" });
      } else {
        res.status(200).json({ message: "Producto no encontrado" });
      }
    });
  };

exports.getProducto = (req, res) => {
  const id = req.params.id;

  Producto.findById(id).then((result) =>{
  console.log(result);
  res.status(200).json(result);
  })
}



