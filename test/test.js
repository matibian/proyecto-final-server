const { json } = require("express");

const request = require("supertest")(`http://localhost:8080`);
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;
let idGen;

const generatePost = () => {
  post = {
    name: faker.commerce.product(),
    // _id: Number(faker.random.numeric() + 50),
    timestamp: new Date().getTime(),
    price: Math.random() * 1000,
    thumbnail: faker.image.fashion(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum fermentum lorem, ac rutrum odio aliquam eu. Donec eu malesuada diam, id vestibulum purus. Sed iaculis ultricies enim. Curabitur sed arcu vel eros porttitor faucibus id sed ligula. Sed efficitur ipsum tortor, in porttitor leo porttitor sed. Maecenas tincidunt lobortis turpis at interdum. Donec feugiat ex nisl, quis convallis tellus mollis sit amet. Proin at tempus neque.",
  };
  return post;
};

const categories = ["Pantalones", "Camisas", "Accesorios"];

describe("Prueba de los endpoints de Productos", () => {
  //GET
  describe("GET ALL", () => {
    it("Status 200. Muestra un array", async () => {
      console.log(`GET: /api/products/`);
      const res = await request.get("/api/products");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  //GET CATEGORY
  describe("GET CATEGORY", () => {
    categories.forEach((cat) => {
      it("Status 200. Muestra un array", async () => {
        console.log(`GET: /api/products/${cat}`);
        const res = await request.get(`/api/products/${cat}`);
        expect(res.status).to.eql(200);
        expect(res.body).to.be.a("array");
      });
    });
  });
  //POST;
  describe("POST ONE", () => {
    it("Status 201. Incorpora un producto nuevo", async () => {
      console.log(`POST: /api/products/`);
      const post = generatePost();
      const res = await request.post(`/api/products`).send(post);
      idGen = await res.body._id;
      console.log("IDDDD: ", idGen);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys(
        "name",
        "price",
        "thumbnail",
        "timestamp"
      );
      expect(post.name).to.eql(res.body.name);
      expect(post.thumbnail).to.eql(res.body.thumbnail);
      expect(post.price).to.eql(res.body.price);
    });
  });
  //DELETE;
  describe("DELETE ONE", () => {
    it(`Status 202. Elimina el producto generado`, async () => {
      console.log(`DELETE: /api/products/${idGen}`);
      const res = await request.delete(`/api/products/${idGen}`);
      expect(res.status).to.eql(202);
    });
  });
});
