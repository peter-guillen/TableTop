# RPGHub Power Balancing

Part of the RPGHub design docs (index at the top of [GAME_RULES.md](GAME_RULES.md)). **§n** means a GAME_RULES section; **B-n** means a section of [BALANCE_ITEMS.md](BALANCE_ITEMS.md).

Notes from the power balancer. **These are findings and suggested budgets, not decisions.** Nothing here changes a power above until the designer edits the catalog or the rules lead adopts it. The designer owns [POWER_CATALOG.md](POWER_CATALOG.md). The balancer works only in this file.

- Findings are tagged **`[PB-n]`** so they don't collide with `[GB-n]` in GAME_RULES.md. Numbers never get reused.
- Each finding gives the power ID, the math, and a **suggested lever** (one option, not the only one).
- When the designer changes a power that has a finding, the finding gets a status: **Open**, **Fixed by designer**, **Declined** or **Routed to rules lead**.
- Answers to the designer's `[PQ-n]` questions go here as suggestions. The rules lead makes the call on anything that changes GAME_RULES.

**Target (same as GAME_RULES Game Balancing):** 3–6 hits to down someone at every level. Powers are the main lever.

### Reference numbers used in the math

| Level | Typical Might | Typical Resilience | Fragile HP | Tank HP |
| ----- | ------------- | ------------------ | ---------- | ------- |
| 1 | 3 | 1–3 | 24 | 30 |
| 4 | 4 | 2–3 | 39 | 54 |
| 7 | 5 | 3–4 | 48 | 78 |
| 10 | 5 (9 optimized) | 4 | 60 | 102 |

Damage per hit = dice average + Might − Resilience (min 1). Resource pace: about 3 fights per long rest with one short rest (¼ MP back). Momentum buys actions only (user decision). No power costs it.

| Profession MP | L1 | L4 | L7 | L10 |
| ------------- | -- | -- | -- | --- |
| Knight | 10 | 16 | 22 | 28 |
| Warrior | 12 | 21 | 30 | 39 |
| Paladin | 14 | 23 | 32 | 41 |
| Rogue, Ranger | 16 | 28 | 40 | 52 |
| Wizard, Summoner, Psychic | 16 | 34 | 52 | 70 |

### Status

The designer applies fixes once the user signs off, then sends the IDs back here.

| Finding | Power(s) | Impact | Status |
| ------- | -------- | ------ | ------ |
| PB-1 Multi-attack multiplies Might | TEC-07, TEC-35, TEC-44, TEC-52, CON-11 | High | Open. The rule change goes to the rules lead (§5). |
| PB-2 Free permanent stances | TRT-263, TRT-264, TRT-261 | High | Open |
| PB-3 Technique costs: MP and recharge | All costed techniques | High | **Momentum version superseded** by the user's decision (no Momentum costs). Re-checked against MP and recharge: T1–T2 MP pricing is OK; T3–T4 per-technique recharges are **Open**. |
| PB-4 Summon budget and durations (answers PQ-3) | CON-04, CON-05, CON-08, CON-10, CON-11, CON-13 | High | CON-05 duration **Fixed by designer** (up to 3 turns, Conc). The rest is Open. |
| PB-5 Powers off their tier | MAN-26, VIT-22, MAN-19, MAN-23, MAN-24, NOE-12 | Medium | Open |
| PB-6 Boosts that scale with targets (answers PQ-15) | TRT-33, VIT-68, VIT-70 | Medium | Open |
| PB-7 Buff budget (answers PQ-4) | TRA-06, TRA-13, MNP-08, WAR-03, WAR-07, WAR-10 and others | Medium | Open |
| PB-8 At-will scaling (answers PQ-9) | All T0 damage powers | Medium | Open. Goes to the rules lead (§9). |
| PB-9 Techniques above their tier | TEC-27, TEC-50, TEC-34, TEC-42, TEC-39 | Medium | Open |
| PB-10 Smaller items | VIT-19, TEC-54, TEC-55, flat HP costs | Low | Open |
| PB-11 Minor-action traits | TRT-61, TRT-62 | Medium | Open. TRT-62 is OK; TRT-61 is over. |

---

### Pass 1: draft budget rules (PB-3 and answers to PQ-3, PQ-4 and PQ-9)

These are the rules each finding below is measured against. They're suggestions until adopted.

#### PB-3: technique costs under the user's decision (MP and recharge)

The user decided that Momentum buys actions only. Techniques now cost **T1 2 MP (Cleave and Sunder 3), T2 5 MP, T3 free with a short-rest recharge, and T4 free with a long-rest recharge**. The earlier Momentum table is dropped.

**Designer's question: are 2 MP T1 techniques affordable on 10–12 MP?** **Yes.** Martial characters get about as many T1 uses per long rest as casters do:

| L1, uses per long rest (before the short rest) | MP | Cost | Uses |
| --------------------------------------------- | -- | ---- | ---- |
| Knight, T1 technique | 10 | 2 | 5 |
| Warrior, T1 technique | 12 | 2 | 6 |
| Paladin, T1 technique | 14 | 2 | 7 |
| Rogue / Ranger, T1 technique | 16 | 2 | 8 |
| Wizard, T1 spell (MAN-06, 2d6) | 16 | 3 | 5 |

- Knight and Warrior land at 5–6, level with a caster. That's about 2 costed attacks per fight, with at-wills in between. **OK.**
- **Rogue and Ranger get 8**, 60% more than a caster with the same MP, for the same 2d6 single-target damage. That's acceptable, because spells also buy areas, control and utility, and techniques don't. It's worth watching in playtest. If it's too much, the lever is 3 MP for **finesse- and ranged-only** T1 techniques. No change suggested yet.

**T2 at 5 MP (L4).** Knight 16 → 3, Warrior 21 → 4, Paladin 23 → 4, Rogue 28 → 5, Wizard 34 → 5–6 T2 spells (5–7 MP). Martial characters sit a little under casters here, and the free T3–T4 techniques make up for it later. **OK.**

**Hard control on MP (TEC-32 Skull Crack, TEC-38 Gut Punch at 5 MP).** That's in line with NOE-13 Mind Lock (6 MP). My earlier concern (renewable stuns on Momentum) is **resolved** by MP pricing.

**T3 and T4 recharges are the new problem.** Techniques aren't slotted (§9). A weapon offers *every* technique it shares a property with, and each recharge is tracked per technique. So the number of free T3–T4 uses grows with how many properties a weapon has:

| Weapon (properties) | T3 techniques offered (SR each) | T4 techniques offered (LR each) |
| ------------------- | ------------------------------- | ------------------------------- |
| Greatsword (heavy, bladed) | Execute, Earthshaker, Juggernaut, Reaping Arc, plus Sacred Judgment for a Paladin = **4–5** | Titan Breaker, Thousand Cuts, Worldsplitter = **3** |
| Rapier (finesse, light) | Blade Dance, Heartseeker = 2 | Thousand Cuts = 1 |
| Longbow (ranged) | Storm of Arrows, Heartseeker = 2 | Rain of Ruin = 1 |

**L7 Warrior with a greatsword, per long rest (one short rest):** 4 T3 × 2 = **8 free T3 strikes**, plus 30 MP for 6 T2 techniques. That's 8 × 18 + 6 × 13.5 = 225 dice. A L7 Wizard with 52 MP gets about 6 T3 spells, or about 108 dice. **The Warrior has double the Wizard's daily output.** Swapping weapons (a Minor Action) unlocks even more recharges. A rapier Rogue gets 4 free T3s, which is fine. So the gap comes from property count, not from profession.

*Suggested lever:* **techniques share a recharge by tier.** "You can use **one** T3 technique per short rest and **one** T4 technique per long rest, whichever one you pick." Re-check: the L7 Warrior gets 2 T3 + 6 T2 = 36 + 81 = 117 dice, level with the Wizard's 108. Every weapon gets the same number of uses; more properties only means more choice. If one use feels thin at L9–L10, raise it to two T3 uses per short rest at L9 as a level reward.

- MP-costed techniques (TEC-27, TEC-41) are priced like spells of the same tier. See PB-9.

#### PQ-3 → PB-4: how summons are statted (draft rule)

This builds on the designer's placeholder (its own HP, the caster's stats, acts on the caster's Minor).

1. **HP by tier:** T1 10, T2 20, T3 25, T4 40, as listed. That's about **one hit** from a same-level enemy (for example, L4: 3d8 + 4 − 1 ≈ 16.5). A summon soaks about one attack, which works like temporary HP that someone has to choose to spend an attack on.
2. **Stats:** a summon uses the caster's **Accuracy, Dominance, Evasion and Resilience**, and **Resolve 0**. TRT-43 Soulbond (summons use your Resolve, +5 HP) already assumes this default, so it stays meaningful.
3. **Damage:** dice + the caster's Might, **once per command** (PB-1). **One command deals at most the at-will dice for the summon's tier** (PB-8: T1 1d8, T2 2d6, T3 2d8, T4 3d8). The command spends the caster's Minor Action, so this damage adds to their Major every turn. That's why it's capped at at-will size.
4. **Actions:** the summon has no turn of its own. **One Minor Action commands one summon spell**: it moves up to 30 ft and takes one action. It takes no Reactions unless its power says so (CON-10).
5. **Duration:** combat summons use **concentration, up to 3 turns**. Utility summons (CON-03 Familiar, CON-09 Pale Horse) keep their listed out-of-combat durations.
6. **Casting** a combat summon is a **Major Action**, so turn 1 pays for it.
7. **Rules it follows:** a summon is a creature. It can be targeted, it's caught by areas, and it takes conditions. It can't rally or be healed, and at 0 HP it vanishes. Damage to a summon **doesn't** force the caster's concentration save.
8. **TRT-44 Twin Bind** (two Conjuration concentrations at once) still gets one command per Minor, so it gives two bodies to soak hits and a choice of which one acts, not double damage. That's fine at L7.

How the catalog's summons fare under this rule is in the PB-4 table below.

#### PQ-9 → PB-8: should at-wills scale?

**Yes, by character level, one dice step below the tier.** Without scaling, a level-10 at-will is a 4× drop from a costed power. Once a character's MP runs out, their turns stop mattering.

| Level | At-will now | Suggested | Costed single target | At-will as % of costed | Hits to down a fragile target, at-will only (scaled) |
| ----- | ----------- | --------- | -------------------- | ---------------------- | ------------------------------------------------- |
| 1 | 1d8 (4.5) | 1d8 (4.5) | 2d6 (7) | 64% | 24 ÷ 5.5 = 4.4 |
| 4 | 1d8 | **2d6 (7)** | 3d8 (13.5) | 52% | 39 ÷ 8 = 4.9 |
| 7 | 1d8 | **2d8 (9)** | 4d8 (18) | 50% | 48 ÷ 11 = 4.4 |
| 10 | 1d8 | **3d8 (13.5)** | 4d10 (22) | 61% | 60 ÷ 14.5 = 4.1 |

Math uses the reference Might and Resilience from the table above. Without scaling, a level-10 at-will deals 1d8 + 5 − 4 = 5.5, which is **11 hits** to down a 60 HP Psychic. That's far outside the 3–6 target.

- **Scale by level, not by separate powers.** One "Ember Bolt" whose dice grow at L4, L7 and L10 avoids four copies of every at-will. The designer's proposed numbers (2d6 / 2d8 / 3d8) are what's used here.
- **Split at-wills** (TEC-07 Twin Cut) scale their total dice the same way, under the PB-1 rule.
- **At-will area damage: not yet.** Might adds per target, so a 1d6 at-will sphere hitting 3 targets at Might 3 and Resilience 2 deals 3 × 4.5 = 13.5 a turn for free. That's more than a T1 single-target spell (8). No at-will area damage exists in the catalog today, so nothing changes. Suggest keeping it that way.
- Goes to the rules lead, since §9 says "one dice step below" without saying whether it scales.

#### PQ-4 → PB-7: buff budget

**What a buff is worth.** +1 on a d20 stat is a 5% swing per roll. +1 Might or Resilience is 1 damage per hit. Over 3 turns, a +1 Accuracy buff on one ally is worth about 3 attacks × 5% × 10 damage = **1.5 damage**, and +1 Resilience on a tank taking about 2 hits a round is about **6 damage prevented**. So defensive buffs are worth more than d20 buffs, and both are small next to a heal.

**Suggested budget** (the default duration is 3 turns):

| Tier | Single target | Area (allies in the shape) | Notes |
| ---- | ------------- | -------------------------- | ----- |
| T1 | +1 to one stat | +1 to one stat for 1 turn | |
| T2 | +2 to one stat | +1 to one stat | |
| T3 | +2 to one stat plus a rider, or +2 to two stats | +2 to one stat | |
| T4 | +3 to one stat, or immunity to one damage type | +2 plus a rider | |

- **Action and concentration.** Single-target 3-turn buffs at T1–T2 need **concentration**, which keeps it to one per caster. A **Minor** or **Reaction** buff either lasts 1 turn (or one roll) or carries a drawback (TRA-13's −1 Evasion).
- **"Attacks against X take −n"** counts as +n Evasion. **"Take n less damage from each hit"** counts as +n Resilience.
- **Action-economy buffs** are priced against the §4 Momentum costs: an extra Minor each turn ≈ 1 Mom a turn, and an extra Major ≈ 3 Mom.
- **No stacking (mirrors GB-26).** Bonuses from powers to the same stat don't add up. Only the highest applies. This also covers stances (PB-2) and Brace.
- **The L1 stat cap.** The "no combat stat above 5 at level 1" cap (§2) says "gear included". Suggest the rules lead add "and permanent or always-on powers (stances)". Temporary buffs stay outside the cap.

Checking the catalog against this budget:

| Power | Budget says | Verdict |
| ----- | ----------- | ------- |
| TRA-06 Granite Hide (T1, +1 Res, Minor, Conc) | T1 single, Conc | OK |
| TRA-13 Iron Body (T2, +2 Res / −1 Eva, Minor, Conc) | T2 single, Minor offset by the drawback | OK |
| MNP-08 Swift Hours (T2, an extra Minor each turn for 3 turns, +2 Init) | About 3 Mom of value for 7 MP | OK |
| MNP-10 Offset, NOE-15 Many Selves | +2 Evasion at T2, ends early | OK |
| NOE-68 Battle Cry (T1 area, +1 Acc for about 1 turn) | T1 area | OK |
| WAR-01 A Moment Sooner, NOE-09 Mental Fortress | Reaction, one roll | OK |
| WAR-03 Shelter (T1 Minor, −2 against one ally for up to 3 turns) | +2 is the T2 single size | **One step high.** It ends when the ally attacks, so it's borderline. Lever: −1, or 1 turn. |
| WAR-07 Protective Circle (T2 area, +2 Resolve) | T2 area is +1 | **One step high.** Lever: +1 Resolve, or move to T3. |
| WAR-10 Aegis Dome (T3 area, 3 less damage per hit) | +3 Res to an area is past T4 | **Over.** Against about 4 enemy attacks a round for 3 rounds, it prevents about 36 damage, which matches Mass Heal (T4, LR). Lever: 2 less per hit, or move it to T4. |
| WAR-02 Elemental Ward (T1, resistance for 10 minutes, Conc, Ritual) | Resistance is T4 at combat length | OK only because it's a pre-fight buff that holds concentration. On PQ-11, suggest it **counts toward the resistance cap** (GB-35) while active, or it's a free way past the cap. |

---

### Pass 1 findings

#### High impact

**`[PB-1]` Multi-attack techniques multiply Might (TEC-07, TEC-35, TEC-44, TEC-52, CON-11).** Might adds to every hit, so splitting the same dice into more attacks deals more damage. The gap grows with Might and shrinks with Resilience, which makes these the best powers against low-Resilience targets.

| Power | Damage if every hit lands (Might / Res) | Single-target power of the same tier | Gap |
| ----- | ---------------------------------------- | ------------------------------------ | --- |
| TEC-07 Twin Cut (T0, 2 × 1d4) | 2 × (2.5 + 3 − 0) = 11 (M3 / R0) | 1d8 + 3 = 7.5 | +47% |
| TEC-35 Flurry (T2, 3 × 1d8) | 3 × (4.5 + 4 − 0) = 25.5 (M4 / R0) | 3d8 + 4 = 17.5 | +46% |
| TEC-44 Blade Dance (T3, 4 × 1d8) | 4 × (4.5 + 5 − 0) = 38 (M5 / R0) | 4d8 + 5 = 23 | +65% |
| TEC-52 Thousand Cuts (T4, 5 × 1d8) | 5 × (4.5 + 9 − 4) = 47.5 (M9 / R4) | 4d10 + 9 − 4 = 27 | +76% |
| CON-11 Spirit Pack (T3, 3 × 1d8 per **Minor**) | 3 × (4.5 + 5 − 3) = 19.5, on top of your Major | — | About double a turn's damage |

Thousand Cuts with optimized Might downs a 60 HP Psychic in about 1.3 hits. If weapon riders also apply per hit, each 1d6 rider adds 5d6 more.

*Suggested lever (rules lead, §5):* **"A power with several strikes rolls an attack for each strike, then totals the dice of the strikes that hit and resolves damage once: Might, Resilience and weapon riders apply once."** Re-checking with this rule: Thousand Cuts is 5d8 (22.5) + 9 − 4 = 27.5 when all five hit, the same as a 4d10 strike. Its expected damage with a 60% hit chance is 13.5 dice, against 13.2 for 4d10, so it matches the tier and just varies less. Each strike still gets its own crit chance, which is fine since a crit only doubles that strike's dice.
- The designer's alternative, "Might once per power" with Resilience still per hit, makes multi-attacks useless against armor: five 1d8 strikes against Resilience 4 deal about 0.5 each before the minimum. Resolving damage once fixes both directions.
- *Fallback if the rules lead declines:* cut the dice. Flurry to 3 × 1d4, Blade Dance to 4 × 1d4, Thousand Cuts to 5 × 1d6, Twin Cut to 2 × 1d3 (or cut it).

**`[PB-2]` Free permanent stances break the L1 cap and the Knight's hit count (TRT-263, TRT-264, TRT-261).**
- **TRT-264 Reckless Stance (+2 Might, −2 Evasion):** a Warrior with Might 3 and a species +1 reaches **Might 6 at L1**, past the cap of 5. +2 Might on every hit raises a 2d6 technique against Resilience 2 from 8 to 10 (+25%). The cost: an attacker's hit chance against Evasion 0 goes from 55% to 65%, about +18% damage taken. It's free and never ends, so it's always worth taking. It's not a tradeoff, it's a tax everyone pays.
- **TRT-263 Defensive Stance (+2 Resilience, −2 Accuracy):** a Knight with Resilience 3 and a species +1 reaches **Resilience 6 at L1**. A L1 Warrior's 2d6 + 3 then deals 4 per hit, so the Knight's 30 HP lasts **7.5 hits**. That's past the 3–6 target. −2 Accuracy costs a Knight almost nothing, since dealing damage isn't their job.
- **TRT-261 Brace (T0, +1 Res until your next turn, Minor):** at-will, so it's a permanent +1 for a Knight who doesn't move. With Defensive Stance that's Resilience 7.

*Suggested lever:*
1. Stances are **+1 / −1 at T1**, or **+2 / −2 at T2** (minLevel 4). Entering a stance costs a Minor Action.
2. **The drawback hits a stat the user cares about.** Defensive Stance: −2 Evasion or half movement instead of Accuracy (Bulwark Stance TRT-268 already does this well).
3. **Only one stance at a time** (yes to PQ-13), and stance bonuses don't stack with other power bonuses to the same stat (the PB-7 no-stacking rule). That covers Brace.
4. Stances count toward the L1 stat cap (see PB-7).

Check: with a +1 Defensive Stance, the Knight is at Resilience 5, takes 5 per hit, and lasts 6 hits. That's right at the top of the target, where the wall should sit.

**`[PB-3]` Technique costs: per-technique T3–T4 recharges scale with weapon properties.** The full math is in the PB-3 subsection above. T1–T2 MP pricing is **OK**, including the 10–12 MP martial characters. Hard control on MP is OK.
- *Suggested lever:* **one shared T3 use per short rest and one shared T4 use per long rest**, instead of one use per technique. Without this, a L7 greatsword Warrior gets about double a Wizard's daily output, and swapping weapons gets more.

**`[PB-4]` Summons need a budget and a duration (PQ-3).** Commanding a summon costs a Minor Action, so its damage adds to the caster's Major every turn. Five summons still list concentration with **no duration**: CON-04, CON-08, CON-10, CON-11 and CON-13. CON-05 is fixed (up to 3 turns). The full draft rule is in the PQ-3 subsection above. The parts that matter for this table are the 3-turn duration, the at-will dice cap per command, and casting as a Major.

| Power | Command now | Cap | Verdict |
| ----- | ----------- | --- | ------- |
| CON-04 Spirit Wolf (T1) | 1d8 | 1d8 | OK; needs a duration |
| CON-05 Hovering Edge (T1, cast as a **Minor**) | 1d6, no HP | 1d8 | Duration **fixed**. It's under the dice cap, but casting it on a Minor means it costs no Major at all. Over 3 turns that's about 3 × 4.5 × 55% = 7.4 extra damage for 3 MP, against 4.4 for a T1 spell. Lever: cast as a Major. |
| CON-08 Bound Elemental (T2) | 2d6 single / 1d8 area | 2d6 | OK under PB-8; needs a duration |
| CON-10 Guardian Spirit (T3) | No damage | — | OK; needs a duration |
| CON-11 Spirit Pack (T3) | 3 × 1d8 = 13.5 | 2d8 = 9 | **Over.** Lever: two wolves, or one Minor commands one wolf. |
| CON-13 Call the Host (T4) | 4d10 single / 3d10 area | 3d8 = 13.5 | **Over.** That's a full T4 Major power every turn on a Minor. Lever: 3d8 single / 2d8 area. |

#### Medium impact

**`[PB-5]` Powers off their tier.**
- **MAN-26 Absolute Zero (T4, 15 MP):** 2d8 area plus restrained, a T1-rung condition. MAN-10 Chill Grip does the same thing single-target for 3 MP, and area −2 conditions already exist at T1–T2 (TRA-07, MAN-16). *Lever:* move it to **T2, 7 MP, 1d8 area plus restrained** (the T2 control column), and make a new T4 if one is wanted. The designer's "3d10 area, no condition" works too, but it duplicates MAN-23, MAN-24 and MNP-19.
- **VIT-22 Wildgrowth (T4):** the same problem (2d8 area plus restrained). The same lever applies, or add a rung: restrained that becomes grappled-and-persistent 1d8 while it lasts.
- **MAN-19 Forked Sky (T3, 10 MP):** 4d8 single plus two 2d8 saves is 18 + 9 + 9 = 36 dice across three targets. That's about double MNP-12 (3d8 area for 9 MP). *Lever:* secondary targets take 1d8, or move it to T4.
- **MAN-23 Zenith (T4):** full area dice (3d10) **plus** area blinded. The rest of the catalog follows the control column when a condition comes with area damage (NOE-23, NOE-17). *Suggested rule:* a 1-turn soft rider (prone, push or pull up to 20 ft, deafened, −5 ft movement) keeps full area dice. Blinded, any save-ends condition, or anything harder uses the control column. Lever for Sunburst: 2d8 area plus blinded, or 3d10 with no blind. TRA-20, TRA-22 and MNP-12 pass this rule.
- **MAN-24 Falling Star (T4, 15 MP, Cast 1):** the same 3d10 area as TRA-20 Sundered Earth (14 MP), plus a 1-turn delay and a wasted spell if you're downed. *Under.* Lever: 13 MP, or a lingering 1d10 burning area for 1 turn.
- **NOE-12 Deep Lull (T2):** area **and** save-ends for 3 turns. §12 allows T2 for "save-ends **or** area". An ambush with this takes a group out of the fight, and only damage wakes them. *Lever:* area sleep for 1 turn at T2, and save-ends area at T3.

**`[PB-6]` Boosts that scale with the number of targets (TRT-33, VIT-68, VIT-70; PQ-15).**
- **TRT-33 Elemental Focus (+1 per die):** +2 on a T1 single (+29%), but +3 to *each* target of a T4 area. Against 4 targets that's +12 a cast. It also stacks with multi-attacks (+5 on Thousand Cuts). *Lever:* the bonus applies to **one target per power**. The designer has agreed to this.
- **VIT-68 Blood Price (+1d6 to the next damaging power):** it adds to every target of an area. *Lever:* one target only.
- **VIT-70 Infernal Bargain (roll twice, keep the higher):** an area rolls damage once, so this is about +20% of the dice against every target. It's long-rest, so it's acceptable as is. Suggest no change.
- PQ-15 in general: **per-die bonuses on traits are fine if they apply to one target.** Flat bonuses are easier to reason about. Either works.

**`[PB-7]` Buff budget.** See PQ-4 above. Three powers are flagged: WAR-03 Shelter (borderline), WAR-07 Protective Circle (one step high) and WAR-10 Aegis Dome (over).

**`[PB-8]` At-wills should scale by level.** See PQ-9 above. Goes to the rules lead.

**`[PB-9]` Techniques above their tier.**
- **TEC-27 Radiant Smite (T1, 3 MP):** 2d6 + 1d6 = 10.5, against 7 for a 3 MP spell (+50%). *Lever:* 1d8 + 1d6 light (8), or 2d6 with the damage type changed to light.
- **TEC-50 Sacred Judgment (T3, now a short-rest recharge):** 4d8 + 2d6 = 25, against 18 (+39%). *Lever:* 3d8 + 1d8 light (18). It shares the T3 recharge in PB-3.
- **TEC-34 Ricochet (T2, 5 MP):** 3d8 + 1d8 = 18, against Crushing Blow's 13.5 for the same cost. *Lever:* 2d8 + 1d8, or 6–7 MP. (TEC-15 Cleave pays 1 more MP for its second target, which is fine.)
- **TEC-42 Execute (T3):** +2d8 below half HP gives 27 dice against 18. That's live for about half of a fight, so it averages T4 damage. *Lever:* +1d8.
- **TEC-39 Bloodletting (T2):** 3d8 plus 2 × 1d4 persistent is about 18.5 against 13.5. *Lever:* 2d8 plus the bleed, or drop the bleed.

#### Low impact

**`[PB-10]` Smaller items.**
- **Flat HP costs get cheaper with level.** 4 HP (VIT-10, VIT-68) is 17% of a L1 Warlock's HP and 6% at L10. A 10 HP cost (VIT-70) goes from 42% to 14%. *Lever:* scale HP costs with level (for example, "level + 2"), or accept it since HP-cost powers are mostly T1.
- **VIT-19 Soul Siphon (T3):** 4d8 plus an ally heal of 1d8 is slightly over. Acceptable as the Warlock's signature. No change suggested.
- **TEC-54 Dragon Coil (T4):** the control column (2d10) plus up to 3 turns of 1d10 persistent is slightly over. Lever: persistent 1d6.
- **TEC-55 Unbroken Line (T4 Reaction, long-rest recharge):** 2d10 against *each* enemy that enters reach. Against 3 enemies it's about 3 × 16 damage on one Reaction. It depends on position, so it's low impact. Lever: up to 2 attacks.

**`[PB-11]` Minor-action traits (TRT-61, TRT-62).** The user's decision allows a trait to turn a Major Action power into a Minor.
- **TRT-62 Quickened Casting (L7, one T1–T2 spell as a Minor, once per short rest):** about 2 extra T2 casts per long rest (≈ 27 dice), and they still cost MP. That's in line with one level reward. **OK.**
- **TRT-61 Swift Technique (L5, one T0 or T1 technique as a Minor, once per round):** a **T0 technique is free**, so this is an extra at-will attack every turn, every fight. At L5 with PB-8 scaling, that's 2d6 + 4 − 3 = 8 more per turn, about **+60–75% of a martial character's sustained damage** at no cost. The only price is giving up movement, and buying a Minor with 1 Momentum takes that price away. TRT-62's extra cast is limited to once per short rest. **Over.**
  - *Suggested lever* (any one):
    - (a) **T1 only**, so each use costs 2 MP and draws down the same pool.
    - (b) **Once per fight**.
    - (c) **Once per short rest**, to match TRT-62.
  - I'd pick (a). It keeps the "every round" feel while MP lasts, and a L5 Warrior's 24 MP becomes the limit.
  - Under PB-1, Twin Cut through Swift Technique is still one power, so there's no extra multiplication.

### Next pass

- Re-check every power the designer changes against these rules.
- Pass 2: traits (section 4), against the GB-20 Momentum table and the item caps in GAME_RULES B2. Also re-check the powers that moved from Momentum to MP or recharge (TRT-265, TRT-266, TRT-267, NOE-72, MNP-60, MNP-61, TRT-271, MAN-58).
- Hits-to-down by profession at L1, L4, L7 and L10, using the budget each profession could actually build from this catalog.
