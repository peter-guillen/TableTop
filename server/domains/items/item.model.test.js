import { describe, it, expect } from "vitest";
import Item from "./item.model.js";

// The pre("validate") rule. validate() runs it without a database.
describe("Item pre('validate') rule", () => {
  it("rejects a weapon without handedness as a 400", async () => {
    const item = new Item({ name: "Sword", category: "weapon" });

    await expect(item.validate()).rejects.toMatchObject({
      status: 400,
      message: "handedness is required for category 'weapon'",
    });
  });
});
