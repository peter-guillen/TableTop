import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./spell.service.js");

import * as spellService from "./spell.service.js";
import {
  getAllSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell,
} from "./spell.controller.js";

beforeEach(() => vi.clearAllMocks());

describe("spellController", () => {
  it("should return all spells with a 200 status", async () => {
    const fakeSpells = [{ name: "Fireball" }, { name: "Ice Lance" }];
    spellService.getAllSpells.mockResolvedValue(fakeSpells);

    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await getAllSpells(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeSpells);
  });

  it("should return a single spell with a status 200", async () => {
    const fakeSpell = { spell: { name: "Firebolt" } };
    spellService.getSpellById.mockResolvedValue(fakeSpell);

    const req = { params: { id: "507f1f77bcf86cd799439011" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    await getSpellById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeSpell);
  });

  it("should return a 404 when spell in not found", async () => {
    spellService.getSpellById.mockResolvedValue(null);

    const req = { params: { id: "507f1f77bcf86cd799439011" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    await getSpellById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Spell Not Found!" });
  });

  it("should return a created spell with status 201", async () => {
    const createFakeSpell = { name: "Icebolt" };
    spellService.createSpell.mockResolvedValue(createFakeSpell);

    const req = {
      body: { name: "Icebolt" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    await createSpell(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createFakeSpell);
  });

  it("should return an updated spell with status 200", async () => {
    const updateFakeSpell = { name: "Icebolt" };
    spellService.updateSpell.mockResolvedValue(updateFakeSpell);

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

    await updateSpell(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updateFakeSpell);
  });

  it("should delete a spell with the status 200", async () => {
    const deleteFakeSpell = { name: "Icebolt" };
    spellService.deleteSpell.mockResolvedValue(deleteFakeSpell);

    const req = {
      params: { id: "507f1f77bcf86cd799439011" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    await deleteSpell(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleteFakeSpell);
  });
});
