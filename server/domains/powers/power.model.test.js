import { describe, it, expect } from "vitest";
import Power from "./power.model.js";

// The pre("validate") rules. validate() runs them without a database.
// Each rule error carries status 400, so app.js answers 400 with its message.
const base = { name: "Test", description: "D" };

describe("Power pre('validate') rules", () => {
  it("rejects a non-spell with a school as a 400", async () => {
    const power = new Power({ ...base, kind: "ability", school: "evocation" });

    await expect(power.validate()).rejects.toMatchObject({
      status: 400,
      message: "ability documents cannot declare a school",
    });
  });

  it("rejects a spell without a school as a 400", async () => {
    const power = new Power({ ...base, kind: "spell" });

    await expect(power.validate()).rejects.toMatchObject({
      status: 400,
      message: "Spell documents require a school",
    });
  });

  it("rejects a technique without weapon properties as a 400", async () => {
    const power = new Power({ ...base, kind: "technique" });

    await expect(power.validate()).rejects.toMatchObject({
      status: 400,
      message: "Technique documents require at least one weapon tag",
    });
  });

  it("accepts an ability, technique and trait sent without a school", async () => {
    await expect(
      new Power({ ...base, kind: "ability" }).validate(),
    ).resolves.toBeUndefined();
    await expect(
      new Power({
        ...base,
        kind: "technique",
        requirements: { properties: ["heavy"] },
      }).validate(),
    ).resolves.toBeUndefined();
    await expect(
      new Power({ ...base, kind: "trait" }).validate(),
    ).resolves.toBeUndefined();
  });
});
