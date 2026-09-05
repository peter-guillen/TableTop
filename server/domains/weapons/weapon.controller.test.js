import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./weapon.service.js");

import * as weaponService from "./weapon.service.js";
import { createWeapon } from "./weapon.controller.js";

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("createWeapon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 201 and the weapon when given valid data", async () => {
    const fakeWeapon = {
      _id: "abc123",
      name: "Longsword",
      damage: "1d8",
      category: "martial",
    };

    weaponService.createWeapon.mockResolvedValue(fakeWeapon);

    const req = {
      body: { name: "Longsword", damage: "1d8", category: "martial" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = mockRes();
    const next = vi.fn();

    await createWeapon(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeWeapon);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with the error when name is missing", async () => {
    const error = new Error(
      "Weapon validation failed: name: Path `name` is required.",
    );
    weaponService.createWeapon.mockRejectedValue(error);

    const req = {
      body: { damage: "1d8", category: "martial" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = mockRes();
    const next = vi.fn();

    await createWeapon(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("calls next with the error when category is an invalid enum value", async () => {
    const error = new Error(
      "Weapon validation failed: category: `invalid` is not a valid enum value for path `category`.",
    );
    weaponService.createWeapon.mockRejectedValue(error);

    const req = {
      body: { name: "Longsword", damage: "1d8", category: "invalid" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = mockRes();
    const next = vi.fn();

    await createWeapon(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("calls next with the error when damage is missing", async () => {
    const error = new Error(
      "Weapon validation failed: damage: Path `damage` is required.",
    );
    weaponService.createWeapon.mockRejectedValue(error);

    const req = {
      body: { name: "Longsword", category: "martial" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = mockRes();
    const next = vi.fn();

    await createWeapon(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
