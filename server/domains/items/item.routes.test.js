import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import Item from "./item.model.js";

// Real routes and middleware. Only the model calls are replaced, so none of
// these need a database.
afterEach(() => {
  vi.restoreAllMocks();
});

describe("Item routes: read errors", () => {
  it("GET /api/items returns 500 when the database fails", async () => {
    vi.spyOn(Item, "find").mockReturnValue({
      lean: () => Promise.reject(new Error("connection lost")),
    });

    const res = await request(app).get("/api/items");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to load items" });
  });

  it("GET /api/items/:id returns 400 when the query rejects bad input", async () => {
    vi.spyOn(Item, "findById").mockReturnValue({
      lean: () =>
        Promise.reject(
          Object.assign(new Error("Cast to ObjectId failed"), {
            name: "CastError",
          }),
        ),
    });

    const res = await request(app).get("/api/items/6a580c1ec136c681a00e62c5");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Cast to ObjectId failed" });
  });
});
