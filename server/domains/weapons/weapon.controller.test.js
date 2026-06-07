import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the model before importing the controller
vi.mock("./weapon.model");

const Weapon = (await import("./weapon.model")).default;
const { createWeapon } = await import("./weapon.controller");

// Helper to make fake req/res objects
const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res); // allows res.status(200).json()
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("createWeapon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and the weapon when given valid data", async () => {
    const fakeWeapon = {
      _id: "abc123",
      name: "Longsword",
      damage: "1d8",
      category: "martial",
    };

    Weapon.create.mockResolvedValue(fakeWeapon);

    const req = {
      body: { name: "Longsword", damage: "1d8", category: "martial" },
    };
    const res = mockRes();

    await createWeapon(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeWeapon);
  });

  it("returns 400 when name is missing", async () => {
    Weapon.create.mockRejectedValue(
      new Error("Weapon validation failed: name: Path `name` is required."),
    );

    const req = { body: { damage: "1d8", category: "martial" } };
    const res = mockRes();

    await createWeapon(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) }),
    );
  });

  it("returns 400 when category is an invalid enum value", async () => {
    Weapon.create.mockRejectedValue(
      new Error(
        "Weapon validation failed: category: `invalid` is not a valid enum value for path `category`.",
      ),
    );

    const req = {
      body: { name: "Longsword", damage: "1d8", category: "invalid" },
    };
    const res = mockRes();

    await createWeapon(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) }),
    );
  });

  it("returns 400 when damage is missing", async () => {
    Weapon.create.mockRejectedValue(
      new Error("Weapon validation failed: damage: Path `damage` is required."),
    );

    const req = { body: { name: "Longsword", category: "martial" } };
    const res = mockRes();

    await createWeapon(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
