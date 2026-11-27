# RPGHub Item Catalog

Quick-reference lists for writing seed content. The **rules** live in [GAME_RULES.md](GAME_RULES.md), and the item design and pricing (B1–B8) in [BALANCE_ITEMS.md](BALANCE_ITEMS.md). This file only lists what exists. **B-n** references point into BALANCE_ITEMS.md.

- **Keys** are the lowercase values to use in seeds. Materials, properties, qualities, damage types and conditions match (or will match) the server constants. Masterwork, enchantment, rune and blessing keys have no model field yet, so they go in the item's name and description, with the effect in the listed lever.
- **Cost** is in quality points, from the item's rarity budget: common 0, uncommon 1, rare 2, heroic 3, epic 4, legendary 5, mythical 6 (BALANCE_ITEMS B2).
- *(new)* marks entries that aren't in the server constants yet (see Pending Code Changes in [GAME_RULES.md](GAME_RULES.md#pending-code-changes)).

**Caps that apply to every list:**

| Cap | Limit |
| --- | --- |
| Gear cap (any one combat stat, all gear) | +2, or +3 with a legendary or mythical source |
| Initiative from gear | +2, or +4 with a legendary or mythical source |
| Per item | +10 hpMax, +10 mpMax, +5 ft movement, one skill bonus |
| Riders per weapon (material riders count) | 1, or 2 at legendary or mythical |
| Resistances from gear | 2, or 3 with a legendary or mythical source |
| Granted power tier by item rarity | common/uncommon 1, rare/heroic 2, epic 3, legendary/mythical 4 |
| Equipped accessories | 2 |

---

## 1. Rarity and value

| Rarity | Quality points | Max quality tags | Available from | Value (gp) |
| ------ | :------------: | :--------------: | -------------- | ---------- |
| common | 0 | 0 | L1 | 1–50 |
| uncommon | 1 | 1 | L1 | 50–250 |
| rare | 2 | 1 | L4 | 250–1,000 |
| heroic | 3 | 2 | L6 | 1,000–5,000 |
| epic | 4 | 2 | L8 | 5,000–20,000 |
| legendary | 5 | 3 | L10 or story | 20,000–100,000 |
| mythical | 6 | 3 | L10 or story | 100,000+, or priceless |

---

## 2. Weapon properties

A weapon offers a technique if it has at least one of the technique's properties. Most weapons carry 2–3. Handedness (one_handed, two_handed, main_hand_only, off_hand_only, versatile) is a separate field and decides the slot.

| Key | Describes | Example weapons |
| --- | --------- | --------------- |
| `light` | Small and quick | dagger, hand axe |
| `heavy` | Big, slow, powerful | greatsword, maul |
| `finesse` | Precision over strength | rapier, stiletto |
| `reach` | Strikes from 10 ft | glaive, whip |
| `thrown` | Can be thrown | javelin, throwing knife |
| `bladed` *(new)* | Cutting edge | sword, axe, scythe |
| `blunt` *(new)* | Crushing head | mace, hammer, club |
| `polearm` *(new)* | Long haft with a head | spear, halberd |
| `hafted` *(new)* | Short handle with a weighted head | axe, mace, warpick |
| `ranged` *(new)* | Fires projectiles | bow, crossbow, sling |
| `chained` *(new)* | Flexible chain or cord | flail, kusarigama, whip |

---

## 3. Materials

The material's baseline is **free** (it costs no quality points) but needs at least its minimum rarity. A weapon or armor listing two materials (`["steel", "silver"]`) uses the rarer one's baseline.

### Weapon materials

| Key | Min rarity | Baseline | Identity |
| --- | ---------- | -------- | -------- |
| `wood` *(new)* | common | None. The only common material that can hold blessed. | Bows, staves, clubs |
| `iron` | common | None. Holds at most 1 quality tag. | Cheap and crude |
| `steel` | common | None | The standard |
| `bone` | uncommon | +1 Dominance. Brittle: cracks on a natural 1. | Primal, frightening |
| `silver` | uncommon | 1d4 light rider (its one rider). Can't be `heavy`. | Strong against foes vulnerable to light |
| `mithril` | rare | +1 Accuracy, +2 Initiative. Can't be `heavy`. | Fast and precise |
| `adamantine` | rare | Ignores 2 of the target's Resilience. −2 Initiative. | Cuts through anything |
| `heartwood` *(new)* | rare | The wielder resists blight (no other stats) | Wood from an ancient tree spirit |
| `dragonscale` | heroic | 1d6 rider of the dragon's type (fire, ice, lightning, water, air, earth, poison or acid) | The dragon's breath |
| `orichalcum` | heroic | +1 quality tag slot. Quality riders step up one size. | The enchanter's metal |

### Armor materials

| Key | Min rarity | Baseline | Lane |
| --- | ---------- | -------- | ---- |
| `leather` *(new)* | common | Evasion +1 | Nimble |
| `iron` | common | Resilience +2, Evasion −1 | Cheap and heavy-handed |
| `steel` | common | Resilience +1 | The standard |
| `silver` | uncommon | Resolve +2 | Wards the mind and spirit |
| `bone` | uncommon | Resilience +1, Might +1 | Primal |
| `mithril` | rare | Resilience +1, Evasion +1 | Balanced |
| `adamantine` | rare | Resilience +2, Evasion −1. Critical hits against the wearer become normal hits. | Crit-proof |
| `spidersilk` *(new)* | rare | Resilience +2, no penalty | Pure protection |
| `nacre` *(new)* | rare | Resilience +1, water resistance | Hard ocean material (tank) |
| `leviathan_hide` *(new)* | rare | Evasion +1, water resistance | Leather ocean material (dodge) |
| `salamander_hide` *(new)* | rare | Evasion +1, fire resistance | Leather from creatures of flame |
| `heartwood` *(new)* | rare | Resilience +1, blight resistance | Bark from an ancient tree spirit |
| `dragonscale` | heroic | Resilience +1, Evasion +1, resistance to the dragon's type | Harvested from a dragon |
| `orichalcum` | heroic | Resilience +1, Evasion +1, Resolve +1, +1 quality tag slot | Ancient and rare |

**On accessories and trinkets,** material is flavor, except that orichalcum keeps its extra tag slot and a harvested material (nacre, leviathan hide, salamander hide, heartwood, dragonscale) keeps its resistance.

---

## 4. Qualities overview

| Key | Source | What it gives | Catch | Removed by |
| --- | ------ | ------------- | ----- | ---------- |
| `masterwork` | Craft | Generic stat bonuses (list 5) | None | Can't be dispelled |
| `enchanted` | Arcane magic | Imbued spells and effects: invisibility, stored spells, flight, Returning (list 6) | None | Dispel or anti-magic |
| `runed` | Carved runes | The elemental layer: imbuing runes (damage riders) and warding runes (resistances), one of each per damage type (list 7) | None | Erasing the runes |
| `blessed` | Divine favor | Real protective power, plus a **boon** (list 8). The opposite of cursed. | A tenet; breaking it makes the blessing dormant | The god withdrawing it |
| `divine` | A god | As blessed, plus one granted power tied to the god. Min epic. | Inert without the faith's trait | Can't be removed |
| `cursed` | Wild, willful or infernal magic | Anything, within every cap | A twist that changes how you play (list 9) | Remove-curse spell |
| `corrupted` | A twisted holy item | Might, Dominance, necrotic and dark riders | −1 Resolve or more | Purification (back to blessed) |
| `forbidden` | Taboo magic | Necrotic riders, powers that cost HP | A crime to carry in most places | Destroying it |
| `unstable` | Wild magic | Riders at +1 dice size | Random damage type each hit; hits the wielder on a natural 1 | Stabilizing (becomes runed) |
| `sentient` | A bound mind | +2 to one skill, plus one granted power. Min uncommon. | It has a goal and may refuse (DC 11 + rarity tier) | Can't be removed; appease it |
| `ancestral` | Bloodline | A stat bonus that grows: +1 at L1, +2 at L5, +3 at L10 | Only works for its lineage | Can't be removed |
| `relic` | History | One unique, trait-like granted power. Min legendary, never crafted. | Depends on the relic | Can't be removed |

---

## 5. Masterwork options (stat bonuses)

Any item, except Keen, which is weapon-only.

| Key | Name | Effect | Lever | Cost |
| --- | ---- | ------ | ----- | :--: |
| `brutal` | Brutal | +1 Might | `statModifiers` | 1 |
| `seeking` | Seeking | +1 Accuracy | `statModifiers` | 1 |
| `commanding` | Commanding | +1 Dominance | `statModifiers` | 1 |
| `fortified` | Fortified | +1 Resilience | `statModifiers` | 1 |
| `fleet` | Fleet | +1 Evasion | `statModifiers` | 1 |
| `steadfast` | Steadfast | +1 Resolve | `statModifiers` | 1 |
| `striding` | Striding | +5 ft movement | `statModifiers` | 1 |
| `vigor` | Vigor | +5 hpMax | `statModifiers` | 1 |
| `wellspring` | Wellspring | +5 mpMax | `statModifiers` | 1 |
| `quickening` | Quickening | +2 Initiative | `statModifiers` | 1 |
| `skilled` | Skilled | +2 to one named skill (the item's one skill bonus) | `statModifiers` | 1 |
| `keen` | Keen | Improved critical (threat margin 10 → 8) on techniques made with this weapon. Never stacks. | description | 2 |

---

## 6. Enchantments (imbued spells and effects)

Enchantment imbues an item with a spell or a magical effect. No plain stat bonuses (masterwork) and no damage riders (runes). A dispel suppresses it.

### Granted powers (any item)

Priced by recharge: 1 per long rest or daily = 1, 1 per short rest = 2, +1 if it imposes hard control. The power's tier can't exceed the item's rarity cap.

| Key | Name | Effect | Min tier |
| --- | ---- | ------ | :------: |
| `invisibility` | Invisibility | Invisible for 2 turns in combat (3 at tier 3+), about a minute out of combat | 2 |
| `stored_spell` | Stored spell | One named spell (for example, Fireball) at the item's tier cap | The spell's tier |
| `flight` | Flight | Fly for a few turns (description-only) | 2 |

**Draft additions (not yet reviewed; trim freely):**

| Key | Name | Effect | Min tier |
| --- | ---- | ------ | :------: |
| `blink` | Blink | As a Minor Action, teleport up to 30 ft to a spot you can see | 2 |
| `aegis` | Aegis | As a Reaction when an attack would hit you, +2 Evasion against that attack | 1 |
| `stored_heal` | Stored heal | One named healing spell at the item's tier cap. By recharge, never at-will (healing is never at-will). | The spell's tier |
| `guise` | Guise | Change your appearance (face, voice, clothing) for about an hour | 1 |
| `dispel` | Dispel | End one enchantment or magical effect on a creature or item you touch | 2 |
| `beacon` | Beacon | Mark one creature; for an hour you always know which direction it is | 1 |

### Other effects

Always-on effects, bought with quality points like masterwork options.

| Key | Name | Effect | Cost |
| --- | ---- | ------ | :--: |
| `returning` | Returning | A thrown weapon flies back to your hand (requires `thrown`) | 1 |

**Draft additions (not yet reviewed; trim freely):**

| Key | Name | Effect | Cost |
| --- | ---- | ------ | :--: |
| `called` | Called | As a Minor Action, the weapon flies to your hand from up to 30 ft away | 1 |
| `darksight` | Darksight | See in darkness out to 60 ft | 1 |
| `featherfall` | Featherfall | You take no damage from falling and drift down gently | 1 |
| `tideborn` | Tideborn | Breathe underwater and swim at your normal speed (swimming is description-only, like flight) | 1 |
| `climbing` | Climbing | Climb walls and ceilings at your normal speed (description-only) | 1 |
| `tongues` | Tongues | Understand any spoken language | 1 |
| `bonded` | Bonded | Speak mind-to-mind with whoever carries the paired item, at any distance | 1 |
| `vigilant` | Vigilant | You can't be caught by surprise; the item stirs when danger is near | 1 |
| `tireless` | Tireless | You don't need sleep; a long rest is 4 hours of quiet instead of 8 | 1 |
| `glimmer` | Glimmer | Glows on command, lighting 30 ft | 0 |
| `everlasting` | Everlasting | Can't be broken, rusted or dulled | 0 |

Story-only effects (Glimmer, Everlasting) cost nothing but still need the `enchanted` tag. The movement effects (Tideborn, Climbing) join Flight under known limit L7: the character sheet can't show them.

---

## 7. Runes (imbue and ward)

Runes are the elemental layer. An **imbuing rune** gives a weapon's techniques extra damage of a type; a **warding rune** resists a type. One imbues the element, the other resists it. Carved, so a dispel can't touch them; erasing them removes them. `runed` is one quality tag however many runes the item carries.

### Imbuing runes (weapons)

One imbuing rune for **every damage type** (17); it adds that damage to the weapon's techniques. Riders apply only to techniques made with the weapon, never to spells. One per weapon (two at legendary or mythical), and a material rider counts.

| Key | Name | Effect | Cost |
| --- | ---- | ------ | :--: |
| `serrated` | Serrated | 1d6 slashing | 2 |
| `barbed` | Barbed | 1d6 piercing | 2 |
| `crushing` | Crushing | 1d6 bludgeoning | 2 |
| `flaming` | Flaming | 1d6 fire | 2 |
| `tidal` | Tidal | 1d6 water | 2 |
| `frost` | Frost | 1d6 ice | 2 |
| `shock` | Shock | 1d6 lightning | 2 |
| `storm` | Storm | 1d6 air | 2 |
| `quake` | Quake | 1d6 earth | 2 |
| `dawnlit` | Dawnlit | 1d6 light | 2 |
| `umbral` | Umbral | 1d6 dark | 2 |
| `blighted` | Blighted | 1d6 blight | 2 |
| `withering` | Withering | 1d6 necrotic | 2 |
| `force` | Force | 1d6 force | 2 |
| `mindrending` | Mindrending | 1d6 psychic | 2 |
| `venom` | Venom | 1d4 poison, persistent (the repeat tick ignores Might and Resilience) | 2 |
| `corrosive` | Corrosive | 1d6 acid | 2 |

Force used to be 1d4 for 1 point because almost nothing resisted it. Now that a Ward of Force exists, it's 1d6 for 2 like the rest.

### Warding runes (any item)

One ward for **every damage type**. One ward per item. Resistance only, never immunity. A ward that repeats the material's resistance is wasted. All wards count toward the resistance gear cap (2, or 3 with a legendary or mythical source).

| Key | Name | Effect | Cost |
| --- | ---- | ------ | :--: |
| `warding_slashing` | Ward of Slashing | Slashing resistance | 2 |
| `warding_piercing` | Ward of Piercing | Piercing resistance | 2 |
| `warding_bludgeoning` | Ward of Bludgeoning | Bludgeoning resistance | 2 |
| `warding_fire` | Ward of Fire | Fire resistance | 2 |
| `warding_water` | Ward of Water | Water resistance | 2 |
| `warding_ice` | Ward of Ice | Ice resistance | 2 |
| `warding_lightning` | Ward of Lightning | Lightning resistance | 2 |
| `warding_air` | Ward of Air | Air resistance | 2 |
| `warding_earth` | Ward of Earth | Earth resistance | 2 |
| `warding_light` | Ward of Light | Light resistance | 2 |
| `warding_dark` | Ward of Dark | Dark resistance | 2 |
| `warding_blight` | Ward of Blight | Blight resistance | 2 |
| `warding_necrotic` | Ward of Necrotic | Necrotic resistance | 2 |
| `warding_force` | Ward of Force | Force resistance | 2 |
| `warding_psychic` | Ward of Psychic | Psychic resistance | 2 |
| `warding_poison` | Ward of Poison | Poison resistance | 2 |
| `warding_acid` | Ward of Acid | Acid resistance | 2 |

Physical wards cost the same as the rest, by the user's decision. The balancing session is checking how they affect frontliners.

## 8. Blessings *(draft: not yet reviewed)*

**Blessed is the opposite of cursed.** It isn't a menu of options like masterwork, enchantments and runes. A blessed item has real power, within every cap, plus a **boon**: a gift that changes how you play, the mirror of a curse's twist.

| | Cursed | Blessed |
| --- | --- | --- |
| Its power | Real, within every cap | Real, within every cap, but protective and light-aligned (no Might, Dominance or offensive elements) |
| What defines it | A **twist** that pulls against you, in a fun way | A **boon** that works in your favor |
| What it asks | Usually it won't come off until the curse is broken | A **tenet** written in the description. Break it, and the blessing goes dormant until you atone. |
| How it ends | Remove-curse spell | The god withdraws it, or you abandon the faith |
| The feeling | It holds on to you | You have to hold on to it |

**Boons.** Examples of the kind of boon to write:

| Boon | Example | How it plays |
| ---- | ------- | ------------ |
| **Grace** | *Shepherd's mantle:* once per day, when an ally within 10 ft would be downed, they stay at 1 HP instead | A save when it matters most |
| **Guidance** | *Pilgrim's lantern:* once per session, the GM tells you which path, door or choice leads toward your goal | Divine direction |
| **Sanctuary** | *Abbey shield:* while you spend your turn defending an ally, attacks against them take −2 | A protector's gift |
| **Purpose** | *Oathblade:* while you act for the faith's cause, your techniques with it can't miss on a natural 1 | Rewards living the tenet |
| **Favor** | *Saint's coin:* once per session, reroll one d20 and keep the better result | Luck from above |

Story-only boons cost nothing. Boons with a mechanical effect cost points like the closest B2 effect. The balancing session should price them.

## 9. Curse twists

A twist is what makes an item cursed. It should be fun to live with, not just a penalty. Most twists refund no points; only real drawbacks from the B2 table do (−1 to a stat refunds 1; a vulnerability to a physical type refunds 2).

| Twist | Example | How it plays |
| ----- | ------- | ------------ |
| **Compulsion** | *Thirsting blade:* must strike every turn, or its bonuses go dormant until it does | Pushes you into the fight |
| **Bond** | *Whispering armor:* once per session the GM tells you a true secret about someone nearby. It won't come off. | A gift you can't refuse |
| **Jealousy** | *Possessive ring:* while you wear it, you can't wear another accessory | Narrows your build |
| **Price** | *Hungering staff:* its granted power costs HP instead of MP | A resource trade |
| **Omen** | *Stormcaller's spear:* the weather turns foul wherever you carry it | Pure story |

---

## 10. Damage types

17 types, grouped by spell school. **Every type has an imbuing rune and a warding rune (list 7).** No type is "opposed" to another.

| Key | Group | Imbuing rune | Warding rune | Also resisted by |
| --- | ----- | ------------ | ------------ | ---------------- |
| `slashing` | Physical | Serrated | Ward of Slashing | — |
| `piercing` | Physical | Barbed | Ward of Piercing | — |
| `bludgeoning` | Physical | Crushing | Ward of Bludgeoning | — |
| `fire` | Energy (Manifestation) | Flaming | Ward of Fire | Salamander hide, dragonscale |
| `ice` *(new)* | Energy (Manifestation) | Frost | Ward of Ice | Dragonscale |
| `lightning` *(new)* | Energy (Manifestation) | Shock | Ward of Lightning | Dragonscale |
| `light` | Energy (Manifestation) | Dawnlit (also silver) | Ward of Light | — |
| `dark` | Energy (Manifestation) | Umbral | Ward of Dark | — |
| `earth` | Matter (Transmutation) | Quake | Ward of Earth | Dragonscale |
| `water` | Matter (Transmutation) | Tidal | Ward of Water | Nacre, leviathan hide, dragonscale |
| `air` | Matter (Transmutation) | Storm | Ward of Air | Dragonscale |
| `acid` | Matter (Transmutation) | Corrosive | Ward of Acid | Dragonscale |
| `necrotic` | Life and death (Vitalism) | Withering | Ward of Necrotic | — |
| `blight` *(new)* | Life and death (Vitalism) | Blighted | Ward of Blight | Heartwood |
| `poison` | Life and death (Vitalism) | Venom | Ward of Poison | Dragonscale |
| `psychic` | Mind (Noetics) | Mindrending | Ward of Psychic | — |
| `force` | Space and reality (Manipulation) | Force | Ward of Force | — |

Radiant and gloom are removed.

## 11. Conditions

Applied through a failed Dominance vs. Resolve save. Anything lasting more than 1 turn allows a repeat save at the end of each of the target's turns, at a cumulative +2. Only the worst penalty from different conditions applies to a roll (max −5).

| Key | Kind | Effect in short |
| --- | ---- | --------------- |
| `blinded` | Harmful | −5 to your attacks; +2 to attacks against you |
| `charmed` | Harmful | Can't harm the charmer; the charmer gets +2 Dominance against you; ends if they harm you |
| `deafened` | Harmful | −2 Evasion, −2 Initiative; fail anything that needs hearing |
| `frightened` | Harmful | −2 Accuracy and Dominance while the source is in sight; can't move closer |
| `grappled` | Harmful | Movement 0; spend a Minor Action to repeat the save early |
| `incapacitated` | Harmful, can't act | No actions or reactions; concentration ends |
| `invisible` | Beneficial | −5 to attacks against you, +2 to yours; 2–3 turns in combat; ends when you attack; any power reveals you |
| `paralyzed` | Harmful, can't act | Incapacitated, movement 0, Evasion counts as 0 |
| `petrified` | Harmful, can't act | Stone: resists all damage, immune to new conditions; permanent only by progression |
| `poisoned` | Harmful | −2 Accuracy, −2 on checks |
| `prone` | Harmful | −2 to your attacks; melee +2 and ranged −2 against you; standing costs half your speed |
| `restrained` | Harmful | Movement 0, −2 Accuracy, −2 Evasion |
| `stunned` | Harmful, partial | Lose your Major Action and Reactions, −2 Evasion; keep your Minor Action and concentration |
| `unconscious` | Harmful, can't act | Incapacitated and prone; above 0 HP, damage wakes you; at 0 HP, any hit kills |

**Severity ladder:** stunned < incapacitated < temporary petrified < paralyzed < permanent petrified. Minimum tiers and max durations are in GAME_RULES section 12.
