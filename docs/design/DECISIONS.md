# RPGHub Decisions

The staging area for open questions. A question lives here until it's answered. Then the answer goes into the file it belongs to (rules, a catalog or a balancing file) and the question is deleted from this list. Nothing is kept here as history.

Part of the RPGHub design docs (index at the top of [GAME_RULES.md](GAME_RULES.md)). **§n** means a GAME_RULES section; **B-n** means a section of [BALANCE_ITEMS.md](BALANCE_ITEMS.md).

- Tags stay with the doc that raised them: `[OPEN-n]` (rules), `[PQ-n]` (powers), `[BETA-n]` (items). Numbers are never reused, so a tag in another file keeps pointing at the right question.
- "Handed to the balancer" means the balancing file has a suggested answer; the call is still open.

---

## Rules

None open.

## Professions

Raised by the rules lead ([PROFESSION_CATALOG.md](PROFESSION_CATALOG.md) §3).

- **`[OPEN-29]` Warlock base line.** The Warlock is now an oathbreaker black knight, and its Fallen Knight path fights on the front line. Its base (24 HP / 16 MP, HP 5 per level) is a fragile caster line. **For the balancer:** should it move toward the Warrior and Paladin lines?

## Classless

Raised by the classless designer ([CLASSLESS.md](CLASSLESS.md)). The recommendation comes first in each.

- **`[CL-1]` What one pick buys.** One trait (recommended: it's granular, which is the point of classless), or a whole class grant such as the Warrior's Core I bundle (Arsenal, Weapon Flow and Hold the Line)?
- **`[CL-2]` Picks at L1.** 3 (recommended: about what a profession gets at L1, a Core I bundle of 2–3 traits plus a path trait), then 1 per level, for 12 total. Or 1 or 2 at L1?
- **`[CL-3]` Combat stats.** Let classless assign the standard budget (3/2/1/1/0/0) freely, or keep the even spread? Recommended: offer both.
- **`[CL-4]` HP and MP frames.** Choose any profession's HP/MP row (recommended: already balanced, and it separates a frontliner from a caster), or keep the fixed 24/16 base with 5/5 growth?
- **`[CL-5]` Several paths of one class.** Allowed, since each path costs picks (recommended), or one path per class?
- **`[CL-6]` Momentum max +1 at L10.** The current classless track grants it (§4) and no profession does. Drop it and give a free stat bump instead (recommended, so the two modes stay comparable if they're ever mixed), or keep it as classless flavor?
- **`[CL-7]` Unique-core table rule.** Add an optional rule that no two players take the same core trait (recommended, off by default), or leave it out?
- **`[CL-8]` Starting items.** Take any one profession's starting items (recommended), or a separate classless kit?

## Items

None open.

## Powers

Raised by the power designer ([POWER_CATALOG.md](POWER_CATALOG.md)).

- **`[PQ-3]` How are summons statted?** *Handed to the balancer.* There's no bestiary. The Vitalism spirits table uses a placeholder: the summon has its own HP, uses the caster's stats, and acts when the caster spends a Minor Action.
- **`[PQ-4]` Buff sizes.** *Handed to the balancer.* §9 sizes damage, healing and control, but not buffs. My working guess: T1 = +1 to one stat for 3 turns, T2 = +2 to one stat, or +1 to an area, and T3+ = +2 with a rider. Swift Hours' extra Minor is worth about 1 Momentum a turn. Can the balancer set a rule?
- **`[PQ-5]` A taunt condition.** Challenge (NOE-70) and Challenger's Mark (TRT-02) want "−2 Accuracy against anyone but me". Should that be a new `taunted` condition, or stay a stat modifier in the description?
- **`[PQ-6]` Forced movement.** Push and pull have no rule. Proposal: a Save, 10 ft at T0–T1, 20 ft at T2+, and not counted as a condition.
- **`[PQ-7]` Unarmed strikes.** There's no property for fists, so unarmed characters can't use techniques. Is Brawler (TRT-32) the right fix, or should "unarmed" be a property?
- **`[PQ-8]` A `shield` property.** Shields offer techniques (decided in PROFESSION_CATALOG, Knight L2). Shield Bash (TEC-57, anyone) and Shield Slam (TEC-58, Knight trait-only) assume a new `shield` weapon property. **For the item designer and constants:** add the property to shields, and decide whether a shield still gives Evasion.
- **`[PQ-9]` At-wills at higher tiers.** *Handed to the balancer.* §9 says at-wills are "one dice step below the tier's costed powers." Do at-wills scale (T2 at-will 2d6, T3 2d8, T4 3d8), or do they stay at 1d8? And is an at-will area power allowed, at 1d6?
- **`[PQ-10]` Seize the Will (NOE-21).** Choosing a target's action is stronger than incapacitated, so I put it at T4 with concentration. Where does it go on the severity ladder?
- **`[PQ-11]` Resistances from spells.** Does a spell-granted resistance (WAR-02) count toward the gear resistance cap? I assumed it doesn't, since it's not gear, but it lasts only 10 minutes with concentration.
- **`[PQ-12]` HP-to-MP loops.** Healing rituals are free out of combat. Life Tap (VIT-10) or any HP-to-MP conversion turns that into unlimited MP, so Life Tap is combat-only. Is that enough, or should HP-to-MP conversion not exist?
- **`[PQ-13]` Stances.** One stance at a time? Do stances need their own rule? (Stances are traits now: TRT-263, TRT-264, TRT-268.)
- **Ability kind removed: plan for the code change** (user decision, 2026-11-27; recorded here at the user's request until the code lands). The catalog side is done (POWER_CATALOG section 2 and the mapping table). For the later code change: **delete all old ability data, don't migrate it.** Remove every power document with `kind: "ability"` and clear every character's `powers.abilities` and `powerSlots.abilities`, then re-seed from the catalog. The server and client changes are listed in GAME_RULES, Pending code changes. Wait for `fix/save-errors-rule-400s` to merge first: it adds `power.model.test.js`, whose tests use `kind: "ability"`.
- **`[PQ-15]` Damage per die.** Elemental Focus (TRT-33) adds +1 per die, which scales with tier (+2 at T1, +4 at T3). Is per-die scaling OK on traits, or should bonuses be flat?
- **`[PQ-17]` Profession tagging.** "Fits" is only a hint. Should the catalog eventually say which profession offers which power (level rewards), or is that left to the profession seeds?
- **`[PQ-18]` Weapon Flow frequency.** *For the balancer.* TRT-64 gives +1 Momentum once per round for switching weapons, with no hit needed. A Warrior who switches every turn earns Momentum twice as fast as anyone else: an extra Major Action every 1.5 rounds instead of every 3. Should it require a hit, or trigger every other round?
- **`[PQ-19]` Built cover.** *For the rules lead.* Fieldcraft (TRT-87) lets a Ranger build half cover before a fight. §6 says traits can't grant cover. I treated it as real terrain the Ranger made (anyone can use it, and it can be destroyed). Is that within §6?
- **`[PQ-20]` Spellbook size.** *For the balancer.* TRT-91 gives the Wizard slotted spells + 2, growing to + 5 by L8 (the Scholar adds 2 more). Too many choices to manage, or too few to feel like a library?
