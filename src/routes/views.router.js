import { Router } from "express";
import { messagesManager } from "../managers/messagesManager.js";
import { usersManager } from "../managers/usersManager.js";
import { productsManager } from "../managers/productsManager.js";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/home/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const user = await usersManager.findById(idUser);
  const products = await productsManager.findAll();
  const { first_name, last_name, username } = user;
  res.render("home", { first_name, last_name, username, products });
});

router.get("/chat", async (req, res) => {
  const messages = await messagesManager.findAll();
  const {username } = username;
  res.render("chat", { messages, username });
});

router.get("/products", async (req, res) => {
  const products = await productsManager.findAll();
  res.render("products", {products});
});

router.get("/cart/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const products = await cartsManager.findProductsInCart(idCart);
  console.log("\n/////////////\n",products,"\n/////////////\n");
  res.render("cart",{idCart, products});
});

export default router;