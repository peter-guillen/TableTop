import { describe, it, expect, vi, beforeEach } from "vitest";
import { STATS, OFFENSIVE_STATS } from "../../shared/constants/constants.js";

vi.mock("./power.service.js");

import * as powerService from "./power.service.js";
import {
  getAllPowers,
  getPowerById,
  createPower,
  updatePower,
  deletePower,
} from "./power.controller.js";

beforeEach(() => vi.clearAllMocks());

describe("powerController", () => {
  it("should return all powers with a 200 status", async () => {
    const fakePowers = [{ name: "Fireball" }, { name: "Ice Lance" }];
    powerService.getAllPowers.mockResolvedValue(fakePowers);

    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await getAllPowers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakePowers);
  });

  it("should return a single power with a status 200", async () => {
    const fakePower = { power: { name: "Firebolt" } };
    powerService.getPowerById.mockResolvedValue(fakePower);

    const req = { params: { id: "507f1f77bcf86cd799439011" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    await getPowerById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakePower);
  });

  it("should return a 404 when power in not found", async () => {
    powerService.getPowerById.mockResolvedValue(null);

    const req = { params: { id: "507f1f77bcf86cd799439011" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    await getPowerById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Power Not Found!" });
  });

  it("should return a created power with status 201", async () => {
    const createFakePower = { name: "Icebolt" };
    powerService.createPower.mockResolvedValue(createFakePower);

    const req = {
      body: { name: "Icebolt" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    await createPower(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createFakePower);
  });

  it("should return an updated power with status 200", async () => {
    const updateFakePower = { name: "Icebolt" };
    powerService.updatePower.mockResolvedValue(updateFakePower);

    const req = {
      params: { id: "507f1f77bcf86cd799439011" },
      body: { name: "Icebolt" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    await updatePower(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updateFakePower);
  });

  it("should delete a power with the status 200", async () => {
    const deleteFakePower = { name: "Icebolt" };
    powerService.deletePower.mockResolvedValue(deleteFakePower);

    const req = {
      params: { id: "507f1f77bcf86cd799439011" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    await deletePower(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleteFakePower);
  });
});
