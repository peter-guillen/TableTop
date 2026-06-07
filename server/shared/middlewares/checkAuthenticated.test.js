import { describe, it, expect, vi, beforeEach } from "vitest";
import jwt from "./jwtoken";
import checkAuthenticated from "./checkAuthenticated";

vi.mock("jsonwebtoken");

beforeEach(() => {
  vi.clearAllMocks();
});

describe(() => {
  it("calls next and sets the req.user if the token is valid", async () => {
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    await checkAuthenticated;
    expect();
  });
});
