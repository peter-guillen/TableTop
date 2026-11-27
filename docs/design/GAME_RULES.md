# RPGHub Game Rules

The decided rules of the RPGHub TTRPG system. Use them to write seed content (powers, items, species, backgrounds, professions, conditions) that is valid against the server models and consistent with the player-facing rules page.

**Sources of truth**

- Data shapes and enums: the Mongoose models in `server/domains/*/` and `server/shared/constants/constants.js`.
- Player-facing rules text: `client/src/features/playerTools/components/Rules.tsx`.
- Undecided questions are tagged (`[PQ-n]` and so on) and live in [DECISIONS.md](DECISIONS.md). Rules decided here that the code doesn't match yet are listed in [Pending Code Changes](#pending-code-changes). Don't write seed content that depends on either until it's settled.

**The design docs** (all in `docs/design/`)

| File | Holds |
| ---- | ----- |
| **GAME_RULES.md** | The decided rules (this file) |
| [PROFESSION_CATALOG.md](PROFESSION_CATALOG.md) | Each profession's base stats, HP/MP growth and level rewards |
| [ITEM_CATALOG.md](ITEM_CATALOG.md) | Item lists: materials, qualities, enchantments, runes, blessings, curse twists, damage types, conditions |
| [POWER_CATALOG.md](POWER_CATALOG.md) | Draft spells, techniques and traits |
| [BALANCE_RULES.md](BALANCE_RULES.md) | Balancing passes on the core rules (`[GB-n]`; its status table indexes every GB finding) |
| [BALANCE_PROFESSIONS.md](BALANCE_PROFESSIONS.md) | Balancing math for professions |
| [BALANCE_ITEMS.md](BALANCE_ITEMS.md) | Item design under test (B1–B7), known limits, and item balancing passes |
| [BALANCE_POWERS.md](BALANCE_POWERS.md) | Power balancing passes (`[PB-n]`) |
| [DECISIONS.md](DECISIONS.md) | The staging area: open questions. Once a question is answered, the answer goes into the right file and the question is deleted. |

**§n** references point into this file; **B-n** references point into BALANCE_ITEMS.md.

---

## 1. Core Mechanic

- **The d20.** When an outcome is uncertain, roll a d20, add the relevant stat, and compare against a target number. This covers attack rolls, saving throws and checks.
- **Ties go to the roller.** Meeting the target number counts as success.
- **Damage comes from the power, not the weapon.** Techniques are the main source of weapon damage. A technique might deal 2d6; the weapon adds nothing unless it carries a bonus rider (for example, a blade carved with a fire rune that adds 1d6 fire). Many weapons have no rider at all.

## 2. Stats

Stats are stored on the character under `stats.passive` (all default 0) and `stats.resources`.

Each offensive stat is opposed by one defensive stat:

| Offense       | vs. | Defense        | How they meet                                                 |
| ------------- | --- | -------------- | ------------------------------------------------------------- |
| **Accuracy**  | vs. | **Evasion**    | Attack roll: does a single-target strike land?                |
| **Dominance** | vs. | **Resolve**    | Saving throw: does an area, control or status effect take hold? |
| **Might**     | vs. | **Resilience** | Damage: Might adds to all damage dealt, Resilience subtracts from damage taken |

**No caster/martial split.** Every stat matters to every character. Might adds to *all* damage: spells and techniques alike. Dominance drives *all* control effects, whether it's a psychic seizing a mind or a fighter hamstringing an enemy. When writing seeds, don't tie a stat to a "type" of character.

| Category  | Stats                                     |
| --------- | ----------------------------------------- |
| Mobility  | Movement, Initiative                      |
| Resources | HP / hpMax, MP / mpMax, Momentum / momMax |

- A power's `offensiveStat` must be Might, Accuracy or Dominance.
- **Dominance replaces "Presence"** everywhere in the old rules text.
- **Starting values (working rule):**
  - The **profession** sets the base (below).
  - The **species** adds +1 to two stats, or +10 HP/MP split as the species chooses (priced as equal, GB-14), plus its affinities and traits.
  - The **background** adds no stats, only skills, starting items and a trait.
  - **No combat stat above 5 at level 1, gear included** (GB-7).
- These base numbers are a reference point and all subject to change. **Power design is the main balancing lever.**

### Profession base stats

Each profession's base line (combat stats, HP/MP split, Initiative) is in [PROFESSION_CATALOG.md](PROFESSION_CATALOG.md). Every profession follows the same budget:

- **Combat stats:** one 3, one 2, two 1s, two 0s across Might, Accuracy, Dominance, Resilience, Evasion and Resolve (7 points).
- **HP + MP = 40**, split by profession. **HP is never below 24** (GB-16), so even the fragile professions survive about 2.5–3 hits. Their identity shows in growth: they gain less HP and more MP per level (section 7).
- **Initiative 0–2**, a small extra that's outside the budget.

## 3. Turn Structure

- Combat runs in **rounds**. Each creature takes one **turn** per round.
- **Initiative:** at the start of combat, everyone rolls d20 + Initiative. Highest goes first.
- Each turn you have:
  - **Major Action:** attacks, spells, significant traits.
  - **Minor Action:** quick tasks such as moving, drawing a weapon, or using a simple item.
  - **Reaction:** one per round, triggered outside your turn. It refreshes at the start of your turn.
- Power `activation.action` is one of `major_action`, `minor_action`, `reaction`.

## 4. Momentum

| Rule               | Value |
| ------------------ | ----- |
| Starting Momentum  | **0** at the start of every combat |
| Maximum            | **5** (`momMax`; the classless track adds +1 at level 10) |
| Gained per turn    | **+1** at the start of each of your turns |
| After combat       | Resets to **0** |

**Momentum builds during a fight.** It should feel like momentum: nobody opens with it. At +1 per turn, the earliest a character can afford an extra Major Action is round 3.

**Traits break these rules, and that's the fun.** A trait might let a character keep 1, 2 or 3 Momentum between fights, start combat with some, or gain extra on a kill or a crit. Momentum traits are strong seed material.

**Round-1 rule:** Momentum you *start* combat with can't buy an extra Major Action in round 1. It can still buy extra Minors and Reactions, or be saved. (Without this, any "start with 3" trait would restore the turn-1 double attack. GB-20)

**Momentum trait guidelines (GB-20).** Starting Momentum doesn't add actions over a fight; it moves them earlier. What a trait really buys is *timing*.

| Trait strength | Examples | Guideline |
| --- | --- | --- |
| Light | Start with 1, or keep up to 1 between fights | Safe at any level. The first burst moves to round 2. |
| Medium | Start with 2, or keep up to 2 | Fine with the round-1 rule. |
| Strong | Start with 3, or keep up to 3 | A capstone: minLevel 5 or higher. |
| Trigger | +1 Momentum on a kill, crit or hit | At most once per round. Prefer kill triggers; crit triggers scale with Accuracy, given the threshold crit. |

- **Combined cap:** starting Momentum from all sources together (species, background, profession and items) is at most **2**, or **3** with a capstone trait.
- **Items** don't grant starting or kept Momentum (B2).

**Buying extra actions on your turn:**

| Extra action | Momentum cost |
| ------------ | ------------- |
| Major Action | 3 |
| Reaction     | 2 |
| Minor Action | 1 |

- **Momentum buys actions only.** No power costs Momentum. The most a trait can do is let a power be used as a Minor Action instead of a Major Action.
- Traits and other powers can generate Momentum. Their description says how much and when.
- The earlier "no extra Major Action in round 1" rule is no longer needed, since starting at 0 already covers it (GB-1).

## 5. Resolving Offense

### Attack rolls: Accuracy vs. Evasion (single-target strikes)

`d20 + Accuracy  vs.  10 + target's Evasion`. On a hit, roll damage.

The d20 is only for deciding *whether* something happens. Damage always uses the power's own dice (2d6, 4d8, and so on).

### Saving throws: Dominance vs. Resolve (areas, control and status effects)

`DC = 11 + attacker's Dominance`. Each target rolls `d20 + Resolve`. **Meeting the DC avoids the effect entirely: no damage and no status.** A specific power can say otherwise in its description (for example, "half damage on a successful save"), but that's the exception.

- **Why 11:** ties go to the roller, and on a save the roller is the defender. At equal stats a DC of 11 + Dominance lands **50%** of the time, against 55% for an attack roll. That small edge for the defender is deliberate, since control can chain (GB-4, corrected in pass 4).
- **Save ends:** any control or debuff lasting more than 1 turn lets the target repeat the save at the end of each of its turns. Each repeat gets a **cumulative +2** (+2, then +4, then +6...), so even a large stat gap can't lock someone down forever (GB-12, GB-23).

**Rule of thumb:**

| Effect | Roll |
| --- | --- |
| Single-target damage strike | Accuracy vs. Evasion |
| Control, debuff or status, single target or many | Dominance vs. Resolve |
| Area damage | Dominance vs. Resolve |

A Witch's single-target hex and a Rogue's hamstring both use Dominance (GB-4).

### Damage: Might vs. Resilience

1. Roll the power's dice, then add **Might** and any flat modifier. Might applies to every damaging power: spells, techniques and traits alike. **Weapon rider dice are added only to techniques made with that weapon**, never to spells or traits.
2. **Vulnerability:** double it.
3. Subtract the target's **Resilience**.
4. **Resistance:** halve it.
5. **Immunity:** 0.

**Absorption skips all of this.** The target heals **half the raw damage** (dice + Might + flat modifiers, halved, rounded down) instead of taking it. Absorption isn't mitigation, so Resilience and the other steps never apply.

- **Any source counts, allies included.** Catching a fire-absorbing teammate in your own Fireball heals them for half while it burns the enemies. That's deliberate: it makes positioning tactical. (This replaces the old "hostile sources only" rule, GB-31.)
- **Mixed damage:** only the absorbed type's share heals. Might belongs to the power's main damage type, not a rider.
- **Balance note:** this is the one way healing can come from an at-will power. It's acceptable because absorption is extremely rare: **no playable species has it**, and on gear it's the most expensive effect (5 points). The ally spends their action; the absorber's turn is unaffected.
6. **Minimum damage:** a hit that isn't negated by an affinity always deals at least 1 (GB-9).

**Damage over time:** each tick of a `persistent` effect deals its dice only. Might doesn't add and Resilience doesn't subtract (GB-9). Affinities still apply.

> Example: a technique deals 2d6 (rolls 9), the blade's fire rune adds 1d6 (rolls 3), and the attacker has Might 3. That's 15 damage. The defender has Resilience 5, so they take 10.

### Critical hits

- If the attack total beats the target (10 + Evasion) by **10 or more**, it's a **critical threat**. Example: Evasion 5 means a target of 15, so a total of 25 or more threatens.
- Roll to confirm (d20 + Accuracy). If that meets 10 + Evasion, the crit is **confirmed**.
- On a crit, roll all damage dice twice and add flat modifiers (including Might) once.
- **Natural 20:** on an attack roll, it always hits and is always a critical threat, whatever the target's Evasion. On a save, it always succeeds (GB-8).
- **Natural 1:** on an attack roll, it always misses. On a save, it always fails.
- **Improved Critical:** some items or traits lower the threat margin (for example, to 8). This has no model field yet, so it's description-only for now.
- **The threshold crit is deliberate (GB-17).** Crits scale with the gap between Accuracy and Evasion, and that's a tradeoff, not a flaw:
  - A character who builds high Evasion probably has low Resilience, so the rare hit that lands hurts more.
  - A high-Resilience character gets crit more often, and Resilience softens it.
  - A character with both gives up damage or Accuracy.

  **Every build trades something.**

## 6. Movement, Cover, Positioning

- Base speed is **30 ft (6 squares on a 5 ft grid)**. Each point of the `movement` stat adds **+5 ft** (one square). Movement 2 means 40 ft.
- **Moving uses your Minor Action**, and you can split it around your Major Action. Example: move 15 ft, attack, then move the remaining 15 ft.
- Difficult terrain costs 2 ft per 1 ft moved. Standing up from prone costs half your speed.
- Melee reach is 5 ft unless a weapon (`reach` property) or power says otherwise. Ranges are in feet.
- **No baseline opportunity attacks.** Only traits grant them, which makes those traits good seed material.
- **Cover** comes from terrain only. Traits can't grant it. It adds to the attack target (10 + Evasion) and to Resolve saves against effects from the far side.
  - Half cover: +2
  - Three-quarters cover: +5

## 7. HP, MP and Costs

- **HP:** physical health. At 0 HP you're **downed** (see below).
- **MP:** fuels spells and other magical powers. Running out doesn't hurt you.
- Maximums start from the profession base (section 2) plus any species perk, then **grow every level** (below).
- A power's cost is `activation.resource` (`hp` or `mp`) plus `activation.cost`. Paying HP (blood magic, reckless strikes) is a design option.

### HP and MP growth

HP and MP scale with level so that fights last about the same number of hits at level 10 as at level 1, even as powers hit harder. **Growth comes every level.** Stat and slot bumps stay spread out across levels.

**Every level gives both HP and MP, for every profession** (at least 4 HP and 2 MP per level). **Rule of thumb:** about 10 HP + MP combined per level. The split follows the profession's role: frontliners gain mostly HP, casters mostly MP. Since every profession starts with at least 24 HP, growth is where the fragile professions show their identity.

The per-profession numbers are in [PROFESSION_CATALOG.md](PROFESSION_CATALOG.md).

### Rests and recharge

| Recharge | What it means | What it restores |
| -------- | ------------- | ---------------- |
| **Short rest** | A break: about an hour to catch your breath and recover | Recharges `short_rest` powers and items. Regain **¼ of your hpMax and ¼ of your mpMax**. |
| **Long rest** | Enough time for wounds to heal: a night's sleep and real rest, about 8 hours | Recharges `short_rest` and `long_rest` powers and items. Regain **all HP and MP**. You can take one long rest per 24 hours. |
| **Daily** | A time frame, not a rest: once every 24 hours | Recharges at a fixed point in the day (dawn, unless the GM says otherwise), whether or not you rested |
| **Unlimited** | No limit | — |
| **None** (items only) | Doesn't recharge | Used up when its charges run out |

When a party can rest is the GM's call. Healing rituals (section 9) can also restore HP between fights; they're free but slow.

### Downed (beta)

At 0 HP the character is **downed** and chooses one of these:

| Choice | What happens | Risk |
| ------ | ------------ | ---- |
| **Fall unconscious** | Gains the *unconscious* condition and drops out of combat until revived | Safest, unless an enemy finishes the job |
| **Rally** | Makes one roll to get back into the fight, once per fight. Failure means they fall unconscious. | Risky; a second downing in the same fight takes you out |

- **Rally:**
  - The rally roll is **free, at the start of your turn**: roll d20 + Resolve against **DC 10**.
  - A success brings you up with **¼ of your hpMax** (rounded down), and you take your turn normally.
  - **One successful rally per fight** (GB-18). The next time you're downed in that fight, you fall unconscious.
  - A failed rally means you fall unconscious.
- **Death:** if the damage left over past 0 HP is **at least half your hpMax**, you die outright instead of being downed.
- **Downed is not unconscious (GB-19).** From hitting 0 HP until the start of your next turn, you're **downed**: you can't act, and you make your choice (fall unconscious or rally) when your turn starts. Hits taken while downed add to the leftover damage for the death threshold. They don't kill you outright, so enemies who act before you can't take away your rally.
- **Finishing the job:** any hit on a character who is **unconscious at 0 HP** kills them. An area effect kills them only if they fail its save. A character knocked unconscious by a power while above 0 HP (a sleep spell, for example) isn't at risk of this. See *unconscious* in section 12.
- **Resurrection:** possible through spells.

## 8. Affinities and Damage Types

Used on species and items (`resistances[]`). They're rare: most creatures have none.

| Rule          | Effect                                   | Rarity guide   |
| ------------- | ---------------------------------------- | -------------- |
| vulnerability | ×2, applied before Resilience            | Uncommon drawback |
| resistance    | ×½, applied after Resilience             | Most common    |
| immunity      | 0, and ignores secondary effects         | Rare           |
| absorption    | Converts half the raw damage to healing  | Rarest. Gear only (5 points); no playable species absorbs. |

**Damage types, as decided:**

| Group      | Types                                    |
| ---------- | ---------------------------------------- |
| Physical   | slashing, piercing, bludgeoning          |
| Energy (Manifestation) | fire, ice, lightning, light, dark |
| Matter (Transmutation) | earth, water, air, acid |
| Life and death (Vitalism) | necrotic, blight, poison |
| Mind (Noetics) | psychic |
| Space and reality (Manipulation) | force |

- **Radiant is removed** and folded into light. **Gloom is dropped**; the name is dark.
- **17 types, grouped by spell school.** Ice and lightning are their own types (this replaces the earlier "water covers ice" rule). *Pending code change.*
- **Blight is new.** Necrotic is death; blight is nature's raw, wild force.
- **No damage type has an "opposite".** Every type is simply a type; none is paired against another.
- *Pending code change.*

## 9. Powers

`kind` is one of the following:

| Kind      | Lives in                 | Notes |
| --------- | ------------------------ | ----- |
| spell     | `powers.spells` slot     | Has a `school` and follows the spell rules (below). Typically costs MP. |
| trait     | `powers.traits` slot     | Passives, origin features, class grants and feat-like picks. A trait can also be used as an action (grit, stances, many class grants). Only traits may have `grantedPowers`. |
| technique | Not slotted              | The main source of weapon damage. A weapon offers a technique if it has **at least one** of the technique's `requirements.properties`. Techniques must list ≥1 property. |

- **Slots:** each group starts at 3 (`BASE_POWER_SLOTS`). Level rewards add more.
- **Spell schools.** Every spell belongs to one of five schools:

| School | Domain | Example spells |
| ------ | ------ | -------------- |
| **Manifestation** | Raw energy: fire, ice, lightning, light, dark | Fireball, a lance of lightning, a blinding flare |
| **Transmutation** | Matter: earth, water, air, acid, metal, flesh | Stone skin, turning water to ice, a crushing wave |
| **Manipulation** | Time, space, order, chaos, probability, reality, force and protection | Blink, slowing time, bending luck, a shield of force |
| **Noetics** | Mind, perception, knowledge, telepathy, telekinesis | Charm, mind-reading, hurling objects with thought |
| **Vitalism** | Life, death, spirit, poison, blight, plus summoning and binding | Healing, draining life, calling a spirit wolf |

Conjuration and Warding are not schools. Summoning and binding live in Vitalism, and protective spells go where their effect fits, mostly Manipulation.
- **effectType:** damage, healing, buff, debuff, control, utility, summon.
- **Targeting:** `targetCategory` (creature, object, point), `targetCount`, `range` (ft), `shape` (sphere, cone, line, cube, wall, cylinder), `size` (ft).
- **Durations:** `turns` (with `duration`), `until_broken`, `permanent`. `persistent: true` on a health effect means it repeats each turn (damage over time, regeneration).
- **Recharge:** unlimited, short_rest, long_rest or daily. See "Rests and recharge" in section 7.

### Spell rules (spell-only)

These four activation flags are only for spells. (There's no separate "ability" kind any more: it was removed on 2026-11-27. A shout or a hex is a spell; grit and stances are traits.)

| Flag | Meaning |
| ---- | ------- |
| `castTime` | The number of turns before the spell goes off. 0 means it happens now. While casting, being downed or incapacitated wastes the spell (and its MP). |
| `concentration` | The effect lasts while you focus, up to its `duration`. You can hold only one at a time. Taking damage forces a d20 + Resolve save against DC 10 or half the damage taken, whichever is higher, or the spell ends (GB-13). |
| `channel` | A sustained spell. Each turn you spend your Major Action (and the cost again) to keep it going, and the effect repeats. Stopping ends it. |
| `ritual` | Can be cast out of combat over 10 minutes for **no MP**. In combat it costs MP as normal. **Healing spells can be rituals.** That makes healing between fights free but slow; the 10 minutes is the cost, and the GM controls whether there's time. Healing is still never at-will in combat. |

### Power scaling by level (draft)

Powers are the main balancing lever. A power's tier comes from its `requirements.minLevel`. Higher tiers hit harder, but leveling also adds **more slots and options**, not just bigger numbers.

| Tier | minLevel | Single-target dice (avg) | Area dice (avg) | Healing dice (avg) | MP cost |
| ---- | -------- | ------------------------ | --------------- | ------------------ | ------- |
| 1 | 1–3  | 2d6 (7)      | 1d8 (4.5)   | 1d6 (3.5)  | 2–4   |
| 2 | 4–6  | 3d8 (13.5)   | 2d8 (9)     | 2d6 (7)    | 5–7   |
| 3 | 7–9  | 4d8 (18)     | 3d8 (13.5)  | 2d8 (9)    | 8–10  |
| 4 | 10   | 4d10 (22)    | 3d10 (16.5) | 3d8 (13.5) | 12–15 |

Tier 4 was 5d10. It's now 4d10 so the step up from tier 3 is +22% instead of +53% (GB-2). Healing dice are about half the single-target damage dice, and Might doesn't add to healing.

- **At-will powers: no character should feel useless.** Every character has free (no-cost, unlimited) options from level 1: casters get **at-will spells**, martial characters get **at-will techniques**, and everyone can always do something meaningful on their turn without spending MP.
  - Each profession starts with at least **one at-will damage power and one at-will utility power**.
  - At-will damage is one dice step below the tier's costed powers (tier 1: 1d8 single target instead of 2d6).
  - **Healing is never at-will** (the one exception is absorption, section 5).
- **Area powers** deal less because they hit several targets and are resolved by saves (a successful save takes nothing).
- **Control and debuff powers** trade damage for a condition or stat penalty. Use about half the tier's damage dice, or none.
- The existing Fireball seed (8d6 area) is far above tier 4 and needs re-tiering.
- **Recharge:** unlimited, short_rest, long_rest, daily. See "Rests and recharge" in section 7.
- **Requirements:** `minLevel` (enforced in the client), `requiredTraits` (not enforced yet).

### Lasting companions (draft)

Some traits grant a creature that stays with you between fights: the Cavalier's mount and the Beastmaster's animal companion. It's the summon rule (BALANCE_POWERS PB-4) with **no duration**. Summoner spirits stay temporary; this rule is only for traits that say "lasting companion".

- **HP:** half your hpMax (rounded down), so it grows as you level. It can be healed. It doesn't rally.
- **Stats:** it uses your Accuracy, Dominance, Evasion and Resilience, and has Resolve 0 (as PB-4). It doesn't use items.
- **Speed:** 30 ft, or as its trait says.
- **Actions:** it has no turn of its own. **Spend a Minor Action to command it:** it moves up to its speed and takes one action: its attack, Dodge (TRT-260), or whatever its trait lists. Its attack is the **at-will dice for your level** (PB-8: 1d8, 2d6 at L4, 2d8 at L7, 3d8 at L10) plus your Might, rolled as an Atk. It takes no Reactions unless a trait says so.
- **Mounts:** getting on or off costs half your movement. While mounted, your Minor Action moves you both at the mount's speed. A mount doesn't attack unless its trait says so.
- **In the fight:** it's a creature. It can be targeted, it's caught by areas, and it takes conditions. Damage to it doesn't force your concentration save.
- **At 0 HP** it's out of the fight. After the fight it recovers to 1 HP, and it heals on rests like you do. It dies only if the GM makes that a story moment. A lost companion is replaced after a long rest.
- **Out of combat** it follows simple commands and acts on its own; the GM plays it, and taming checks cover the rest.

### Shapeshifting (draft)

Some traits let you take a **form** (the Wild Witch's beast shapes).

- **Taking or leaving a form** is the action the trait lists. You also leave it when you drop to 0 HP or choose to (no action). Out of combat, a form lasts up to 1 hour.
- **You stay yourself.** You keep your stats, HP, MP, traits and conditions. The form adds its own modifiers and natural weapons on top. There's no separate HP pool.
- **Natural weapons** count as weapons with the properties the form lists, so they offer techniques like any weapon. They have no riders.
- **In a form you can't cast spells or use held items.** Traits and techniques still work. Worn items merge into the form, and their passive bonuses still apply.

## 10. Items

- **category:** weapon, armor, accessory (equippable, not a weapon or armor), trinket (consumable-like but recharges), consumable.
- **Handedness decides the slot.** Weapons require it: one_handed, two_handed, main_hand_only, off_hand_only, versatile.
- **Properties decide the techniques.** They describe the weapon's form, and a technique becomes available when the weapon shares a property with it. Handedness values don't belong in properties. *Pending code change.*

| Property | Describes | Example weapons |
| -------- | --------- | --------------- |
| light    | Small and quick | dagger, hand axe |
| heavy    | Big, slow, powerful | greatsword, maul |
| finesse  | Precision over strength | rapier, stiletto |
| reach    | Strikes from 10 ft | glaive, whip |
| thrown   | Can be thrown | javelin, throwing knife |
| bladed   | Cutting edge | sword, axe, scythe |
| blunt    | Crushing head | mace, hammer, club |
| polearm  | Long haft with a head | spear, halberd |
| hafted   | Short handle with a weighted head | axe, mace, warpick |
| ranged   | Fires projectiles | bow, crossbow, sling |
| chained  | Flexible chain or cord | flail, kusarigama, whip |

A weapon usually carries 2–3 properties (a halberd is heavy, reach, polearm, bladed), which lets it offer more techniques. Write technique requirements against these tags. Note that "light" the property and "light" the damage type share a name but are unrelated.
- **Weapon riders** (`healthEffects` on a weapon) are optional bonus damage, usually from quality (runed, blessed, cursed). They apply only to techniques made with that weapon; spells are not weapon-based. Most common weapons have none.
- **rarity:** common, uncommon, rare, heroic, epic, legendary, mythical.
- **Value is in gold (gp)**, the standard currency. Value rises with rarity (draft bands):

| Rarity | Value (gp) |
| ------ | ---------- |
| common | 1–50 |
| uncommon | 50–250 |
| rare | 250–1,000 |
| heroic | 1,000–5,000 |
| epic | 5,000–20,000 |
| legendary | 20,000–100,000 |
| mythical | 100,000+, or priceless (rarely for sale) |

Consumables sit at the low end of their band; weapons and armor at the high end. Iron is the cheapest in any band.
- **quality** (tags): enchanted, blessed, cursed, divine, masterwork, runed, corrupted, sentient, unstable, ancestral, forbidden, relic.
- **materials:** silvered, adamantine, steel, iron, mithril, orichalcum, dragonscale, bone, silver.
- **Equipment slots:** main hand, off hand, one armor, and **up to 2 accessories**. That leaves room for choice without letting items crowd out everything else. *Pending code change.*
- **Everything on an item is visible.** The app doesn't hide curses or drawbacks; keeping something secret is up to the GM at the table.
- **No bestiary.** Enemies are the GM's job, outside the app. There is no creature or monster model, and none is planned. Affinities exist only on species and items.
- Items can modify stats **and skills** (`statModifiers`), grant powers with their own uses and recharge, and carry `selfCharges`.

### No armor weight

**Armor weight isn't tracked.** Keeping track of how heavy armor is is bookkeeping most tables skip. There's no weight field, no movement or Initiative cost for heavy armor, and no encumbrance. An armor's tradeoffs come from its **stats** instead: iron and adamantine cost Evasion (B4), and leather gives up Resilience for Evasion.

### Item layers (decided direction)

Each layer of an item answers one question and uses its own levers. The detailed numbers live in [BALANCE_ITEMS.md](BALANCE_ITEMS.md) (B2–B6).

| Layer | Question | What it gives |
| ----- | -------- | ------------- |
| **Form** (properties, handedness) | How is it used? | The slot and the techniques it offers |
| **Material** | What is it made of? | A built-in trait. **Resistances come mainly from materials**, especially ones harvested from creatures or places: dragonscale resists its dragon's element, nacre and leviathan hide (from the ocean) resist water, salamander hide resists fire, and heartwood resists blight. **Every damage type that gear can resist is handled the same way:** a harvested material, or a runed ward. |
| **Masterwork** (quality) | How well was it made? | **The stat-bonus quality.** Plain bonuses to stats, HP/MP, Initiative or skills come from craftsmanship, not magic. |
| **Enchanted** (quality) | What magic does it hold? | **Imbued spells and effects:** invisibility, a stored spell (Fireball), flight, a returning throw. No plain stat bonuses and no damage riders. |
| **Runed** (quality) | What element does it carry? | **The elemental layer.** An imbuing rune adds damage of a type to the weapon's techniques; a warding rune resists a type. One imbues, the other resists. |
| **Cursed** (quality) | What's the catch? | **Not inherently bad.** A cursed item is often the coolest thing a character owns: real power with a twist that changes how you play. The twist can hurt, but it should be fun, not just a penalty. |
| **Blessed** (quality) | What favor does it carry? | **The opposite of cursed.** Real protective power plus a **boon** that works in your favor, held by a tenet. Break the tenet and the blessing goes dormant. |
| **Every damage type** | — | Has one imbuing rune and one warding rune, all at the same price, physical types included (list in [ITEM_CATALOG.md](ITEM_CATALOG.md)). |

Qualities that *are* a stat by identity keep it: blessed (Resolve), corrupted (Might or Dominance at a cost to Resolve), and ancestral (a bonus that grows with level). Only *generic* stat bonuses are masterwork's job.

**New armor material: spidersilk.** Woven from giant spider silk. Flexible, but superstrong: it protects like metal without metal's Evasion cost.

## 11. Character Building

- **Origin:**
  - A **species** gives stat modifiers (section 2), affinities and traits.
  - A **background** gives skill proficiencies, starting items and a trait.
- **Mode:**
  - `classed`: has a profession.
  - `classless`: no profession. It uses the classless base line (section 2) and follows `CLASSLESS_LEVEL_REWARDS`, with a free pick every level.
- **Profession:** stat modifiers (the section 2 base), armor proficiencies, weapon proficiencies (by property), skill proficiencies, starting items, and a `levelRewards` track to level 10.
  - Grant types: `auto` (one trait), `professionChoice` (pick from ≥2 options), `playerChoice` (any).
  - HP/MP grow every level (section 7). Stat bumps and slot increases are spread across levels, not given at every level.
  - **Core and paths.** Every profession has a **core** (the signature mechanic its members share) and **three paths**, chosen at **level 1**, so two characters of the same profession play differently. No profession owns a school, element or weapon. The cores, paths and level tracks are in PROFESSION_CATALOG §3.
  - **Tank professions (Knight, Paladin, Warrior) get a protective trait at level 1:** an opportunity attack, a mark or an intercept reaction. Without one, enemies just walk past them (GB-5).
- **Max level:** 10. Leveling is milestone-based.
- **Skills (22):** acrobatics, arcana, athletics, crafting, deception, endurance, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, larceny, stealth, survival, tactics, taming, warfare.

### Skill checks

**Investment, not identity.** Skills come from what a character puts into them, not from their stats or profession. A Warrior who studies history knows as much as a Wizard who does. A Magician who never bothered knows very little.

- **The check:** `d20 + skill bonus` against a DC. No combat stat is added. That's what keeps a skill from being locked to one kind of character.
- **Skill ranks 0–5.** Each rank is worth **+2**:

| Rank | Bonus | Meaning |
| :--: | :---: | ------- |
| 0 | +0 | Untrained. You might get lucky. |
| 1 | +2 | Familiar |
| 2 | +4 | Trained |
| 3 | +6 | Skilled |
| 4 | +8 | Expert |
| 5 | +10 | Master |

| DC | Difficulty | Untrained (rank 0) | Rank 3 | Rank 5 |
| :--: | ---------- | :----------------: | :----: | :----: |
| 10 | Easy | 55% | 85% | 95% |
| 15 | Moderate | 30% | 60% | 80% |
| 20 | Hard | 5% (natural 20) | 35% | 55% |
| 25 | Heroic | 5% (natural 20) | 10% | 30% |

- **A natural 20 on a check always succeeds.** That's the untrained character's lucky break. **A natural 1 always fails.** Neither "trivial" nor "impossible" exists.
- **Where ranks come from:**
  - Profession skill proficiencies start at rank 1.
  - Background skill proficiencies add +1 rank.
  - Each level, **including level 1**, grants **1 rank** to spend on any skill (10 over a career).
  - A background proficiency in a skill your profession doesn't cover gives rank 1.
  - At level 1, no combination of sources can push a skill past the level-1 cap of 2 (GB-34).
- **Rank caps by level:** 2 at L1–3, 3 at L4–6, 4 at L7–9, 5 at L10. Items that add +2 to a skill (B2) count as one rank toward the cap.
- **Professions (12):** warrior, knight, rogue, ranger, paladin, warlock, witch, wizard, sorcerer, magician, summoner, psychic.

## 12. Conditions

**Approved by the user** (revised after balancing pass 4).

**How conditions work:**

- **Applying:** harmful conditions land through a failed Dominance vs. Resolve save (section 5).
- **Ending:** any condition lasting more than 1 turn lets the target repeat the save at the end of each of its turns, with a cumulative +2 on each repeat.
- **Penalty sizes:** **−2** for a hindrance, or **−5** when you can't see or can't act properly, matching the cover bonuses.
- **No stacking across conditions (GB-26):**
  - On the same roll, penalties from different conditions don't add up. Only the worst one applies, to a maximum of −5.
  - Bonuses others get against you from your conditions are capped at +5.
  - Conditions can't push Evasion below 0.
  - A condition never stacks with itself.
- **Recovery window (GB-25):** when stunned or anything stronger ends, the target can't receive stunned or anything stronger again until the end of its next turn. Several controllers can't chain-lock one target. Soft (−2) conditions aren't affected.
- **Can't act:** incapacitated, paralyzed, petrified and unconscious. Stunned is partial: you lose your Major Action but keep your Minor Action.

**Harmful conditions:**

| Condition | Effect |
| --------- | ------ |
| **blinded** | Your attack rolls take −5. Attacks against you get +2. You can't target anything beyond 5 ft that you can't otherwise sense. |
| **charmed** | You can't use harmful powers on the charmer. The charmer gets +2 Dominance against you. Ends at once if the charmer or their allies harm you. |
| **deafened** | −2 Evasion (you don't hear attacks coming) and −2 Initiative. You fail anything that depends on hearing. |
| **frightened** | While the source is in sight, you take −2 Accuracy and −2 Dominance, and you can't willingly move closer to it. |
| **grappled** | Your movement is 0. You can spend a Minor Action to repeat the save early. Ends if the grappler is moved away or becomes incapacitated. |
| **incapacitated** | You can't take Major Actions, Minor Actions or Reactions. Concentration ends. |
| **paralyzed** | You're incapacitated and your movement is 0. Your Evasion counts as 0. (There's no automatic crit; the threshold crit already rewards hitting Evasion 0. GB-24) |
| **petrified** | Turned to stone. You're incapacitated, your movement is 0, you resist all damage, and you're immune to new conditions. **Permanent petrification works by progression (GB-27):** the first failed save means restrained, the second means temporary petrified, and the third means permanent. Once permanent, it ends only through a spell. |
| **poisoned** | −2 Accuracy and −2 on checks. This is separate from poison *damage*. |
| **prone** | Your attack rolls take −2. Melee attacks against you get +2; ranged attacks against you take −2. Standing costs half your speed. |
| **restrained** | Your movement is 0, and you take −2 Accuracy and −2 Evasion. |
| **stunned** | You lose your Major Action and can't take Reactions, and you take −2 Evasion. You can still take a Minor Action, and you keep concentration. |
| **unconscious** | You're incapacitated and prone, drop what you're holding, and are unaware of your surroundings. **Above 0 HP** (from a sleep power, for example), a melee hit against you is a critical threat, but any damage wakes you and ends the condition. An ally can wake you with any hit, since minimum damage is 1. **At 0 HP**, see "finishing the job" in section 7. |

**Beneficial conditions (GB-28):**

| Condition | Effect |
| --------- | ------ |
| **invisible** | Attacks against you take −5. Your attack rolls get +2. Single-target powers can't target you unless your location is known. It has a **fixed duration with no save**, and it **ends after you attack or use a harmful power**. **In combat it lasts at most 2 turns** (tier 2 powers) or **3 turns** (tier 3+). Out of combat it can last about a minute. **Using any power reveals your location**: attacks still take −5 against you, but you can now be targeted (GB-37). |

**Severity ladder for control powers (GB-27):** stunned < incapacitated < temporary petrified < paralyzed < permanent petrified. Temporary petrification is gentler than paralysis because the target resists all damage and can't be hit with anything else.

**Tier and duration by rung (GB-30):**

| Condition | Minimum tier | Max duration | Notes |
| --------- | ------------ | ------------ | ----- |
| −2 conditions (charmed, deafened, frightened, grappled, poisoned, prone, restrained) | 1 | 3 turns | At-will is allowed at 1 turn with half the damage dice |
| blinded, sleep (unconscious above 0 HP) | 1 for 1 turn; 2 for save-ends or area | — | |
| stunned | 1 for 1 turn with no damage; 2 for save-ends; 3 for area | 2 turns | |
| incapacitated | 2; area is 4 | 2 turns | |
| petrified (temporary) | 3 | 2 turns | Single target only |
| paralyzed | 3 for 1 turn; 4 for save-ends | 2 turns | Never area (except tier 4 for 1 turn); requires concentration |
| petrified (permanent) | 4 | Progression | Requires concentration |

**Hard control** (stunned or stronger) is never at-will, never a ritual, and never an item rider.

---

## Pending Code Changes

Rules decided in this doc that the code doesn't match yet. Each one is a contract change, so it touches both the server and the client.

| Change | Server | Client | Existing seeds affected |
| ------ | ------ | ------ | ----------------------- |
| Momentum starts at 0 | `character.model.js`: `mom` default 5 → 0 | character defaults | None |
| Damage types: remove radiant; add blight, ice, lightning (17 total) | `constants.js` `DAMAGE_TYPES` (light and dark already exist) | `constantTypes.ts` | 1 item resistance (`item.seed.js:412`) |
| Properties exclude handedness | `constants.js` `PROPERTIES`: drop one-handed, two-handed, versatile; add bladed, blunt, polearm, hafted, ranged, chained | `constantTypes.ts`, `PowerList.tsx` | 6 professions, 3 items, 4 techniques |
| HP/MP grow every level | `constants.js` `CLASSLESS_LEVEL_REWARDS`: +5 hpMax / +5 mpMax at levels 2–10 (replacing +3 at 2, 5, 8); add a classless base stat line | classless reward display | Profession seeds' `levelRewards` |
| Max 2 accessories | `character.model.js`: validate `equipment.accessories` length ≤ 2 | `CharacterDetails.tsx` equip UI blocks a third | None |
| Remove armor weight and proficiencies (schema redesign) | `profession.model.js`: drop `armorProficiencies`; `constants.js` and `constants.controller.js`: drop `ARMOR` | `professionTypes.ts`, `professionDefaults.ts`, `ProfessionForm.tsx`, `ProfessionProficienciesSection.tsx`, `ProfessionPreview.tsx`, `ProfessionDetails.tsx`, `constantTypes.ts`, and a reference in `AdminRoutes.tsx` | 6 profession seeds list armor proficiencies |
| New materials | `constants.js` `MATERIALS`: add spidersilk, nacre, leviathan hide, salamander hide, heartwood, leather, wood; merge silvered into silver | `itemTypes.ts` | 1 item uses silvered |
| Rename rarity mythic → mythical | `constants.js` `RARITY.MYTHIC` value | `itemTypes.ts`, rarity color maps in `ItemPreview.tsx`, `ItemDetails.tsx`, `ArmorsTab.tsx`, `WeaponsTab.tsx` | 1 item (`item.seed.js:496`) |
| New spell schools | `power.model.js` `school` enum: manifestation, transmutation, manipulation, noetics, vitalism | `powerTypes.ts`, `powerDefaults.ts`, `PowerBasicInfoSection.tsx`, `PowerPreview.tsx`, `PowerList.tsx` | Every spell seed's `school` |
| Skill ranks | `character.model.js`: `skills` changes from a string array to ranks per skill (0–5) | `charactersTypes.ts`, `characterDefaults.ts`, skills UI | Existing characters' skills migrate to rank 1 |
| Enforce `requiredTraits` (path grants, OPEN-27) | When a level reward or power choice is applied, reject an option whose `requirements.requiredTraits` the character doesn't have (the field exists on `power.model.js`; nothing checks it today) | Level-up choice UI offers only options whose `requiredTraits` the character has, and auto-picks when only one qualifies | None (path grants aren't seeded yet) |
| Remove the `ability` kind (2026-11-27; plan in DECISIONS, Powers) | `power.model.js`: drop `ability` from the `kind` enum (and its tests); `character.model.js`: drop `powerSlots.abilities` and `powers.abilities` | `powerTypes.ts`, `PowerBasicInfoSection.tsx`, `PowerList.tsx`, `AdminDashboard.tsx`, `charactersTypes.ts`, `characterDefaults.ts`, `CharacterArchetype.tsx`, `CharacterDetails.tsx`, `CharacterProgression.tsx`, `ProfessionLevelsSection.tsx` | Delete every power with `kind: "ability"` and every character's `powers.abilities` (user decision: delete, don't migrate). Profession slot grants for abilities become spells. |
| Spell flags are spell-only | `power.model.js` pre-validate: reject `ritual`, `concentration`, `channel`, `castTime > 0` on non-spells | power form hides them for non-spells | Check existing seeds |
| Player rules page matches this doc | — | `Rules.tsx`: "Defense" → 10 + Evasion, "Presence" → Dominance, Might adds to damage, Momentum starts at 0 and resets after combat, Momentum action costs, crit examples, affinity damage types, successful save = no damage, save DC 11 + Dominance, natural 20/1, downed and rally rules (one rally per fight), movement +5 ft per point, damage types light/dark and blight/necrotic, minimum damage 1 | None |
