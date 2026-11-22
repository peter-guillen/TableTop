import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import Condition from "./condition.model.js";

// Real routes and middleware. Only the model calls are replaced, so none of
// these need a database.
afterEach(() => {
  vi.restoreAllMocks();
});

describe("Condition routes: read errors", () => {
  it("GET /api/conditions returns 500 when the database fails", async () => {
    vi.spyOn(Condition, "find").mockReturnValue({
      lean: () => Promise.reject(new Error("connection lost")),
    });

    const res = await request(app).get("/api/conditions");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to load conditions" });
  });

  it("GET /api/conditions/:id returns 400 when the query rejects bad input", async () => {
    vi.spyOn(Condition, "findById").mockReturnValue({
      lean: () =>
        Promise.reject(
          Object.assign(new Error("Cast to ObjectId failed"), {
            name: "CastError",
          }),
        ),
    });

    const res = await request(app).get(
      "/api/conditions/6a580c1ec136c681a00e62c5",
    );

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Cast to ObjectId failed" });
  });
});
