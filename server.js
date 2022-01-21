import express from "express"
import logger from 'morgan'
import products from "./products/products.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger("dev"));

app.get("/products", (req, res) => {
  res.json(products);
})

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product._id === id);
  res.json(product);
})

app.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.price = `$ ${req.body.price}`;
  products.push(newProduct);
  res.json(products)
})

app.put("/products/:id", (req, res) => {
	const id = req.params.id;
	const productIndex = products.findIndex(product => product._id === id);
	const updatedProduct = {
		...products[productIndex],
		...req.body,
	};

	products.splice(productIndex, 1, updatedProduct);
	res.json(updatedProduct);
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex(product => product._id === id);
  const deletedProduct = products.find(p => p._id === id)
  console.log(deletedProduct)
  products.splice(productIndex, 1,);
	res.json(products);


}
  
  )



app.listen(PORT, () => {
  console.log('Server is running')
  
})