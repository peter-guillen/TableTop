# RPGHub Classless Play

How a character without a profession is built and leveled. Owned by the classless designer.

Part of the RPGHub design docs (index at the top of [GAME_RULES.md](GAME_RULES.md)). **§n** means a GAME_RULES section; **B-n** means a section of [BALANCE_ITEMS.md](BALANCE_ITEMS.md). Open questions are tagged `[CL-n]` and live in [DECISIONS.md](DECISIONS.md).

**Status:** the rules under "Decided" were set by the user on 2026-11-26. Everything under "Proposed" is a first draft that hasn't been approved or balanced.

---

## 1. Decided (user, 2026-11-26)

- **A table mode, not a character option.** A group plays either classed or classless, never both. It's like a GM ruling out multiclassing. Classless characters are balanced against each other, not against professions. If the group later wants to mix the two, the balancer handles any differences.
- **Access to everything.** A classless character can take any spell or trait in the catalog, including every profession's core and path traits. Techniques still come from weapons (§9), so a trait-only technique is available to anyone who has the trait that grants it.
- **Free picks.** Classless has no signature mechanic of its own. Its identity is whatever its picks add up to.
- **Power target:** a classless character should be about as strong overall as a classed character of the same level, but no stronger than a profession at that profession's own specialty. This is what the balancer measures against if the modes are ever mixed.

## 2. Proposed: the level track

This mirrors the profession skeleton (PROFESSION_CATALOG §3.2) so the totals match: 3 slots, 3 stat bumps and the same number of grants. The difference is that the player chooses every one of them.

| Level | Grant | Stat bump | Slot |
| :---: | ----- | --------- | :--: |
| 1 | **3 picks** `[CL-2]`, a **frame** (section 3) and a **starting kit** (section 5) | — | — |
| 2 | 1 pick | — | — |
| 3 | 1 pick | — | +1, any group |
| 4 | 1 pick | +1, any combat stat | — |
| 5 | 1 pick | — | +1, any group |
| 6 | 1 pick | — | — |
| 7 | 1 pick | +1, any combat stat | — |
| 8 | 1 pick | — | +1, any group |
| 9 | 1 pick | — | — |
| 10 | 1 pick | +1, any combat stat | — |

- **A pick is one trait** `[CL-1]`. That keeps the flexibility at the heart of classless: a character can take Hold the Line (TRT-01) without the rest of the Warrior's core.
- **12 picks in total.** A classed character ends with about the same number of traits: its Core I bundle, the path trait, three more core grants, three more path grants and three free picks.
- HP and MP grow every level according to the frame (section 3).
- Picks follow `minLevel` like everyone else, so tiers still unlock at L4, L7 and L10.
- This replaces the current `CLASSLESS_LEVEL_REWARDS`, whose stat bumps are fixed (Evasion at L4, Initiative at L7, Momentum max at L10) and whose slots each go to one set group `[CL-6]`.

## 3. Proposed: frames (base stats, HP and MP)

Under the current base line, every combat stat is 1 plus one free point. With no stat at 3, a classless character is worse at everything than a classed one, and every classless character starts out looking the same. Two proposals `[CL-3]` `[CL-4]`:

**Combat stats.** Assign the standard budget (one 3, one 2, two 1s, two 0s) however you like, or take the even spread (all 1s plus one free point). Both total 7 points, and the GB-7 cap of 5 at L1 still applies.

**HP and MP frame.** Pick one existing profession row. These numbers have already been through balancing, so this adds no new math.

| Frame | Same as | Base HP / MP | Per level HP / MP | L10 HP / MP |
| ----- | ------- | :----------: | :---------------: | :---------: |
| Bulwark | Knight | 30 / 10 | 8 / 2 | 102 / 28 |
| Vanguard | Warrior | 28 / 12 | 7 / 3 | 91 / 39 |
| Stalwart | Paladin | 26 / 14 | 7 / 3 | 89 / 41 |
| Skirmisher | Rogue, Ranger | 24 / 16 | 6 / 4 | 78 / 52 |
| Balanced | Warlock, Witch, Sorcerer, Magician | 24 / 16 | 5 / 5 | 69 / 61 |
| Scholar | Wizard, Summoner, Psychic | 24 / 16 | 4 / 6 | 60 / 70 |

Initiative stays at 0, as in the current classless line.

## 4. Proposed: prerequisites

With every trait open, the traits that build on each other need explicit links. Otherwise someone could take Rolling Steel without Weapon Flow.

- **A trait that uses another trait's mechanic requires that trait.** Examples: a Core II, III or IV grant requires the core trait it builds on, and Black Sky (Sorcerer, omens) requires Omens.
- **A path's L1 trait requires the part of that class's Core I it depends on.** The path's L3, L6 and L10 grants already require the path trait (POWER_CATALOG §4.7).
- **Several paths of the same class** are allowed `[CL-5]`, since each one costs picks.
- **Depth costs picks, and that's the main tradeoff.** A capstone sits at the end of a chain of four or five traits. A character who goes all-in on one class rebuilds roughly that profession, and that's fine at a classless table. A character who spreads out gets combinations no profession has, but none of their capstones.
- The power designer writes the `requiredTraits` for each core and path trait. This depends on enforcing `requiredTraits`, which is already in GAME_RULES Pending Code Changes.

## 5. Viability floor

These guarantee that every classless character can act meaningfully from L1 (§9: "no character should feel useless").

- **Starting kit:** your slotted powers at L1 must include at least **one at-will damage power** (any spell, or a technique your starting weapon offers) and **one at-will utility power**.
- **Skills:** 2 skill proficiencies of your choice at rank 1, the same count as a profession (§11).
- **Starting items:** take the starting items of any one profession `[CL-8]`.
- **No required tank.** §11 gives tank professions a protective trait (GB-5). A classless party isn't required to have one; leaving one out is the group's choice.

## 6. Distinctness

How two classless characters end up different from each other:

1. **The frame and the stat spread** set how they fight before any pick is made.
2. **Picks have to be spent on depth or breadth** (section 4), so two players with different priorities can't end up with the same build.
3. **Optional table rule** `[CL-7]`: no two players at the table may take the same core trait. It works like a GM's "one of each" ruling. It's off by default.

## 7. Watchlist for the balancer

These combos can't happen with professions but can at a classless table. They aren't decisions, just places to look.

| Risk | Example traits | Why |
| ---- | -------------- | --- |
| Momentum engines stacking | Weapon Flow (TRT-64), Bloodrush (TRT-13), Counterflow (TRT-16), Killer's Precision (TRT-14) | Each trigger is capped at once per round, but different triggers add together. Four of them could give +5 Momentum a round. Needs a cap on Momentum gained per round from all triggers combined? |
| Extra Reactions | Knight Core IV (Unbreakable Line), Sorcerer Core IV (Fate Sealed), Duelist capstone (Untouchable) | Each one gives a Reaction that doesn't use up your Reaction. Together they could add several per round. |
| Riders on one hit | Openings (Rogue), omens (Sorcerer), Quarry weak point (Ranger), Debt draws (Warlock) | Each core adds something to a hit. Together they all land on the same attack. |
| Save penalties | Dread −1, Iron Grip −1, Pronounce Doom −1 per omen, Curse Craft −1 | GB-26 caps penalties from conditions, but these come from traits, so nothing caps them yet. |
| Companions | Bonded Steed, Animal Companion, Witch's Familiar, Bound Spirit | Each costs a Minor Action to command, which limits it somewhat. Several at once still stretch action economy and table time. |
| Bookkeeping | Debt, Conviction, omens, moon phase, links, doubles | Each class tracks one fight-long resource. A classless character could be tracking four. This is a playability problem more than a balance one. |

## 8. Code changes (once the proposals are approved)

Not yet in GAME_RULES Pending Code Changes. They go to the rules lead once the `[CL-n]` questions are answered.

| Change | Server | Client |
| ------ | ------ | ------ |
| Classless track | `constants.js` `CLASSLESS_LEVEL_REWARDS`: 3 picks at L1, +1 pick per level, HP and MP growth from the frame, player-chosen stat bumps and slot groups | Level-up UI lets the player choose the stat and the slot group |
| Classless base line | A home for the even spread, the free-assigned budget and the frames (the constants note in PROFESSION_CATALOG §1) | Character creation offers the stat assignment and the frame choice |
| Class traits are pickable | `playerChoice` for classless offers every trait, including profession core and path traits | The reward picker shows them, filtered by `requiredTraits` |
