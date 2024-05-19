const supertest = require("supertest");
const app = require("./app");

describe("GET /api/rate", () => {
  it("should respond with status 200", async () => {
    const response = await supertest(app).get("/api/rate");
    expect(response.status).toBe(200);
  });

  it("should respond with JSON containing the exchange rate", async () => {
    const response = await supertest(app).get("/api/rate");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("rate");
    expect(typeof response.body.rate).toBe("number");
  });
});

describe("POST /api/subscribe", () => {
  it("should respond with status 200 if email is not already used", async () => {
    const randomEmail = `email${Math.floor(Math.random() * 10000)}@gmail.com`;
    const response = await supertest(app)
      .post("/api/subscribe")
      .send({ email: randomEmail });
    console.log(response);
    expect(response.status).toBe(200);
  }, 60000);

  it("should respond with status 500 if the email is already used", async () => {
    const response = await supertest(app)
      .post("/api/subscribe")
      .send({ email: "test@gmail.com" });
    expect(response.status).toBe(500);
  }, 60000);
});
