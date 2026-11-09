import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "./app.js";
import User from "./domains/users/user.model.js";

// The error handler at the end of app.js
afterEach(() => {
  vi.restoreAllMocks();
});

describe("error handler", () => {
  it("returns 400 JSON for a malformed JSON body", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send('{"email": ');

    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body.error).toBeTruthy();
  });

  it("returns 500 JSON without the internal message for a server failure", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(User, "findOne").mockRejectedValue(
      new Error("secret connection string in this message"),
    );

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "demo@rpg.com", password: "demo" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Something went wrong" });
    expect(JSON.stringify(res.body)).not.toContain("secret");
    expect(console.error).toHaveBeenCalled();
  });
});
