import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./item.model.js");

import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "./item.service.js";

vi.mock("./item.model.js", () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

vi.mock("../../shared/utils/logger.js", () => ({
  logAction: vi.fn(),
}));

import Item from "./item.model.js";
import { logAction } from "../../shared/utils/logger.js";

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockItem = {
  _id: "item123",
  name: "Fireball",
  school: "Evocation",
  level: 3,
};

const mockUserId = "user456";

// ─── Tests ───────────────────────────────────────────────────────────────────

beforeEach(() => vi.clearAllMocks());

describe("getAllItems", () => {
  it("returns all items", async () => {
    Item.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockItem]),
    });

    const result = await getAllItems();

    expect(result).toEqual([mockItem]);
    expect(Item.find).toHaveBeenCalledWith({});
  });

  it("returns an empty array when no items exist", async () => {
    Item.find.mockReturnValue({ lean: vi.fn().mockResolvedValue([]) });

    const result = await getAllItems();

    expect(result).toEqual([]);
  });
});

describe("getItemById", () => {
  it("returns a item when found", async () => {
    Item.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockItem),
    });

    const result = await getItemById("item123");

    expect(result).toEqual(mockItem);
    expect(Item.findById).toHaveBeenCalledWith("item123");
  });

  it("returns null when item does not exist", async () => {
    Item.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await getItemById("nonexistent");

    expect(result).toBeNull();
  });
});

describe("createItem", () => {
  it("creates a item, logs the action, and returns the new item", async () => {
    const itemWithToObject = {
      ...mockItem,
      toObject: vi.fn().mockReturnValue(mockItem),
    };
    Item.create.mockResolvedValue(itemWithToObject);

    const result = await createItem(mockItem, mockUserId);

    expect(Item.create).toHaveBeenCalledWith(mockItem);
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Item",
      target: "Item",
      targetId: mockItem._id,
      metadata: { before: null, after: mockItem },
    });
    expect(result).toEqual(itemWithToObject);
  });
});

describe("updateItem", () => {
  it("updates a item, logs the action, and returns the updated item", async () => {
    const updatedItem = { ...mockItem, name: "Frostball" };
    Item.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockItem),
    });
    Item.findByIdAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updatedItem),
    });

    const result = await updateItem(
      "item123",
      { name: "Frostball" },
      mockUserId,
    );

    expect(Item.findByIdAndUpdate).toHaveBeenCalledWith(
      "item123",
      { $set: { name: "Frostball" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Item",
      target: "Item",
      targetId: updatedItem._id,
      metadata: { before: mockItem, after: updatedItem },
    });
    expect(result).toEqual(updatedItem);
  });

  it("returns null without updating when item does not exist", async () => {
    Item.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await updateItem(
      "nonexistent",
      { name: "Frostball" },
      mockUserId,
    );

    expect(result).toBeNull();
    expect(Item.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteItem", () => {
  it("deletes a item, logs the action, and returns the deleted item", async () => {
    Item.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockItem),
    });
    Item.findByIdAndDelete.mockResolvedValue();

    const result = await deleteItem("item123", mockUserId);

    expect(Item.findByIdAndDelete).toHaveBeenCalledWith("item123");
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Item",
      target: "Item",
      targetId: mockItem._id,
      metadata: { before: mockItem, after: null },
    });
    expect(result).toEqual(mockItem);
  });

  it("returns null without deleting when item does not exist", async () => {
    Item.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await deleteItem("nonexistent", mockUserId);

    expect(result).toBeNull();
    expect(Item.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});
