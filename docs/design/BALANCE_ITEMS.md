# RPGHub Item Balancing

Item design under test, and the balancing passes that check it. The item lists are in [ITEM_CATALOG.md](ITEM_CATALOG.md).

Part of the RPGHub design docs (index at the top of [GAME_RULES.md](GAME_RULES.md)). **§n** means a GAME_RULES section; **B-n** means a section of [BALANCE_ITEMS.md](BALANCE_ITEMS.md).

---

## Item design (beta)

Proposals under test. Even answered beta questions stay in beta: don't write seed content against this file until a design is adopted into GAME_RULES.md. Open questions go in [DECISIONS.md](DECISIONS.md).

### B1. What an item grants

**An item can only do what the model can store.** Every item effect is one of these levers:

| Lever | Model field | Examples |
| ----- | ----------- | -------- |
| Stat bonus or penalty | `statModifiers` | +1 Accuracy, −1 Evasion, +5 hpMax, +1 Stealth |
| Rider damage or healing | `healthEffects` | +1d6 fire on techniques made with this weapon. Riders never apply to spells: techniques come from the weapon, and spells don't. |
| Affinity | `resistances` | Resistance to fire, vulnerability to light |
| Granted power | `grantedPowers`, `selfCharges` | Cast *Blink* once per long rest |
| Techniques offered | `properties` | bladed + heavy unlocks those techniques |
| Rule text | `description` | Improved critical, ignores Resilience, can't be unequipped |

**Four layers, each answering one question:**

1. **Form (properties + handedness): how is it used?** Decides the slot and which techniques it offers. It grants no power on its own.
2. **Material: what is it made of?** A fixed baseline that comes with the material. It costs no budget, but each material has a **minimum rarity**, which is what gates the stronger ones.
3. **Quality: where did its power come from?** Craft, arcane, divine, infernal and so on. Qualities spend the rarity budget.
4. **Rarity: how much power can it hold?** Sets the quality budget and how many quality tags it can carry.

The point of the split: a **steel longsword** and a **mithril longsword** offer the same techniques (same form), but the mithril one is quicker and more accurate (material). A **runed** mithril longsword adds a fire rune (quality), and a **rare** one has room for exactly that much (rarity).

### B2. Rarity budget

| Rarity | Quality points | Max quality tags |
| ------ | :------------: | :--------------: |
| common | 0 | 0 |
| uncommon | 1 | 1 |
| rare | 2 | 1 |
| heroic | 3 | 2 |
| epic | 4 | 2 |
| legendary | 5 | 3 |
| mythical | 6 | 3 |

**Point costs:**

| Effect | Cost |
| ------ | :--: |
| +1 to a combat stat (Might, Accuracy, Dominance, Resilience, Evasion, Resolve) | 1 |
| +2 Initiative, +5 ft movement (+1 movement stat), +5 hpMax, +5 mpMax, or +2 to one skill | 1 |
| Rider 1d4 / 1d6 / 1d8 | 1 / 2 / 3 |
| Make a rider persistent (repeats next turn) | +1 |
| Resistance / immunity / absorption | 2 / 4 / 5 |
| Improved critical (threat margin 10 → 8) | 2 |
| Granted power, 1 use per long rest, or 1 use daily (section 7: recharges at dawn, rest or not) | 1 |
| Granted power, 1 use per short rest (or 2 per long rest) | 2 |
| Granted power that imposes **hard control** (stunned, incapacitated, paralyzed, petrified) | +1 |

**Which quality buys what** (section 10 "Item layers"; option lists in B6):

| Effect | Bought through |
| ------ | -------------- |
| Generic stat bonuses: combat stats, hpMax, mpMax, Initiative, movement, skills, improved critical | **masterwork** |
| Granted magic powers and effects | **enchanted** |
| Damage riders (imbuing runes) and resistances (warding runes) | **runed** |
| A resistance | the **material** first (B4), otherwise **runed** |
| A stat as part of the quality's identity | **blessed** (Resolve), **corrupted** (Might or Dominance at a cost to Resolve), **ancestral** (growth) |

**Granted-power tier cap (GB-29).** A granted power's tier (section 9) can't exceed the tier that matches the item's rarity:

| Item rarity | Highest granted-power tier |
| ----------- | :------------------------: |
| common, uncommon | 1 |
| rare, heroic | 2 |
| epic | 3 |
| legendary, mythical | 4 |

This applies to every quality that grants powers: enchanted, divine, sentient, relic and cursed. The power must also meet the GB-30 minimum tier for its condition, so an uncommon item can hold at most a 1-turn stun with no damage, and a paralyze needs epic or better. **Hard control is never an item rider.** Riders deal damage or heal (B1), and conditions come only from granted powers.

**Drawbacks refund points.** Only cursed, corrupted and forbidden items can take them. Unstable doesn't: its price is the random damage type, and it gets a free dice step instead (B5).

| Drawback | Refund |
| -------- | :----: |
| −1 to a stat | +1 |
| A vulnerability to a **physical** type (slashing, piercing, bludgeoning). Physical damage comes up in nearly every fight, so the drawback always bites. Other vulnerabilities refund nothing, since whether they come up is the GM's call. | +2 |
| A vulnerability to any other type | 0. It rarely comes up, so it isn't a real cost. |
| Can't be unequipped | 0. That's simply what cursed means, not a cost (GB-6). |

**Rider cap (GB-3).** A weapon carries at most **one rider** below legendary, and at most **two** at legendary or mythical. A material rider (silver, dragonscale) counts as that weapon's rider, and so does `force`. So a dragonscale weapon can't also be Flaming or Force. A rider can be at most **one size step** above its base: orichalcum's step-up and unstable's free step don't stack. **Why:** damage comes from the power (section 1), so a rider should never come close to a tier-1 technique (2d6, average 7).

**Per-item caps on other levers (GB-6, GB-33):** each item gives at most **+10 hpMax**, **+10 mpMax**, **+5 ft movement** and **one skill bonus** (+2 to one skill, which counts as one rank toward the section 11 level cap). Gear can't replace leveling ranks: at most 5 skill ranks across the 5 equipped slots, and realistically 1–2.

**Gear cap.** The total bonus to any one combat stat (Might, Accuracy, Dominance, Resilience, Evasion, Resolve) from **all equipped gear together**, material and quality combined, is:

- **+2** normally.
- **+3** if at least one equipped **legendary or mythical** item contributes to that stat.

Bonuses past the cap are wasted, so a build gains nothing by stacking one stat across weapon, armor and accessories. A fully equipped character carries at most a main hand, an off hand, one armor and **2 accessories** (section 10), so at most five items' budgets ever stack. Penalties (such as iron's −1 Evasion) still apply in full. The cap doesn't cover movement, hpMax, mpMax or skills; those have the per-item caps above.

**Initiative gear cap (GB-6).** Total Initiative from all gear is **+2**, or **+4** if at least one equipped legendary or mythical item contributes to it. Mithril's +2 and Quickening's +2 both count toward it, so one of them already fills the normal cap. This limits first-strike stacking (GB-1).

**Resistance gear cap (GB-35).** All equipped gear together grants at most **2 resistances**, or **3** if a legendary or mythical item provides one of them. This counts every source: materials (armor or a harvested accessory), runed wards, blessed and dragonscale. Resistances past the cap are wasted. Without the cap, an all-rare L4 character could resist all four elements plus dark and necrotic, and every elemental power or rider would do half damage. Species resistances (section 8) don't count toward the cap.

**Every cap applies to every quality**, including cursed's "anything" and the refunds it earns.

**Momentum isn't in the budget.** Every combat now starts at 0 Momentum (section 4), so any Momentum from an item is worth far more than before. No beta item grants Momentum, and nothing in B2 prices it. An item that grants Momentum needs its own pricing pass with the rules session first. The same goes for "start combat with Momentum" or "keep Momentum after combat", which are reserved for traits.

**Why it's this tight:** the level-1 origin cap is 5, and leveling adds only about 2 stat points over 10 levels. Powers are the main balance lever (section 9), and items should round a character out rather than outgrow them.

**Rarity by level.** Rarity follows the section 9 power tiers, so a rare adamantine suit isn't a level-1 item. This also gates materials through their minimum rarity (mithril and adamantine are L4+).

| Rarity | Available from | Matches power tier |
| ------ | -------------- | ------------------ |
| common, uncommon | L1+ | 1 |
| rare | L4+ | 2 |
| heroic | L6+ | 2 (late) |
| epic | L8+ | 3 |
| legendary, mythical | L10, or story rewards only | 4 |

The level can be recorded in the item's `requirements.minLevel` field, which already exists. The app doesn't enforce it for items yet *(limit L6)*, so this table is a GM and loot guide for now.

**Scale check:** a level-1 profession has 7 combat-stat points in total. Under the gear cap, gear adds at most +2 to any one stat (+3 at legendary). Spare quality points go into riders, resistances, powers and non-combat stats instead. If that's still too much, shrink the budget, not the costs.

### B3. Weapon materials

Techniques deal a weapon's damage, so a material never adds base damage dice. Instead it changes **how often you hit, how hard you crit, what you get through, and how fast you act.**

**Silver and silvered are one material** (`[BETA-2]`): `silver` covers both solid silver and a silver coating. `materials` is an array, so a weapon can list two: a **silvered steel** sword is `["steel", "silver"]`. When a weapon lists two materials, the **rarer** material's baseline applies, and the other is flavor (and value).

| Material | Min rarity | Baseline (free) | Identity |
| -------- | ---------- | --------------- | -------- |
| wood *(new)* | common | None | Bows, staves, clubs. The only common material that can hold **blessed** (living wood takes a blessing well). |
| iron | common | None. Holds at most **1 quality tag**, whatever its rarity. | Cheap and crude. The low-value option. |
| steel | common | None | The reference point. Holds any quality. Most weapons are steel. |
| bone | uncommon | +1 Dominance. **Brittle:** on a natural 1 the weapon cracks and loses its baseline until repaired *(description-only, limit L2)*. | Primal and frightening; good for control builds. |
| silver | uncommon | 1d4 **light** rider (this is the weapon's one rider, B2) | Strong against foes vulnerable to light, whether from their species or their gear. Soft, so it can't carry the `heavy` property. |
| mithril | rare | +1 Accuracy, +2 Initiative (fills the Initiative gear cap). Can never carry `heavy`. | Fast and precise. The first-strike metal. |
| adamantine | rare | Ignores 2 of the target's Resilience *(description-only, limit L2)*. −2 Initiative. | Cuts through anything; slow to swing. The anti-Knight metal. |
| dragonscale | heroic | 1d6 rider of the dragon's type (fire, ice, lightning, water, air, earth, poison or acid). This is the weapon's one rider, so it can't take another brand or Force below legendary. | Carries the dragon's breath. Its element is fixed at creation. |
| orichalcum | heroic | **+1 quality tag slot.** A rider granted by quality steps up one size (d4 → d6, or d6 → d8). It doesn't stack with unstable's step. | The enchanter's metal. Weak by itself, the best base for magic. |

**Why each one exists:**

- **Silver vs. light type.** There are no creature types (limit L4), so silver never says "extra damage to undead". It deals light damage, and its value depends on who the foe is: anyone whose species or gear carries a light vulnerability takes double, and anyone with light resistance shrugs it off. Enemies are the GM's job, outside the app.
- **Adamantine vs. Resilience.** Resilience is a flat subtraction, so ignoring 2 of it is the strongest thing a material can do against Knights, and it's worthless against Rogues. That's the tradeoff.
- **Mithril vs. Accuracy.** +1 Accuracy is +5% to hit on every attack. That's why it's gated at rare, and why it gives up `heavy` (and the heavy techniques).

### B4. Armor materials (numbers for the section 10 draft)

This puts numbers on the existing draft table. Same rules: the baseline is free and gated by minimum rarity.

There's no armor weight or encumbrance. Armor tradeoffs come from stats only (section 10).

**Materials are the main source of resistance** (section 10). Materials harvested from creatures or places carry that source's resistance: dragonscale resists its dragon's element, and a material harvested from the ocean resists water. Runed wards (B6) only fill the gaps.

| Material | Min rarity | Baseline (free) |
| -------- | ---------- | --------------- |
| leather *(new)* | common | Evasion +1 |
| iron | common | Resilience +2, Evasion −1 |
| steel | common | Resilience +1 |
| silver | uncommon | Resolve +2 |
| bone | uncommon | Resilience +1, Might +1 |
| mithril | rare | Resilience +1, Evasion +1 |
| adamantine | rare | Resilience +2, Evasion −1. Critical hits against the wearer become normal hits *(description-only, limit L2)*. |
| spidersilk *(new)* | rare | Resilience +2, no Evasion penalty. Woven from giant spider silk: flexible but superstrong, so it protects like metal without metal's cost. |
| nacre *(new)* | rare | Resilience +1, resistance to **water**. A hard, pearlescent, metal-like substance from the deep sea. The armored ocean material. |
| leviathan hide *(new)* | rare | Evasion +1, resistance to **water**. A leather-type material from great sea beasts. The nimble ocean material. |
| salamander hide *(new)* | rare | Evasion +1, resistance to **fire**. A leather-type material from creatures that live in flame. |
| heartwood *(new)* | rare | Resilience +1, resistance to **blight**. Bark and wood from an ancient tree spirit. |
| dragonscale | heroic | Resilience +1, Evasion +1, resistance to the dragon's type |
| orichalcum | heroic | Resilience +1, Evasion +1, Resolve +1, plus **+1 quality tag slot** |

**Changed for the gear cap:** steel drops to Resilience +1 and adamantine to +2 (it was +3, over the cap). Adamantine keeps −1 Evasion as its tradeoff. It differs from iron by being crit-proof and holding any quality. This gives each common armor a lane: leather is Evasion +1, steel is Resilience +1, and iron is Resilience +2 at the cost of −1 Evasion.

**The rare armor lanes:**

| Material | Lane |
| -------- | ---- |
| mithril | Balanced: Resilience +1, Evasion +1 |
| adamantine | Crit-proof, at the cost of Evasion |
| spidersilk | The full Resilience +2 with no penalty, but nothing extra |
| Harvested materials | Half the protection, plus a resistance. Hard ones (nacre, heartwood) give Resilience +1; leather-type ones (leviathan hide, salamander hide) give Evasion +1, like leather. |

**Spidersilk is rare, not heroic.** It's the same 2 points as mithril, just concentrated, and alone it fills the gear cap for Resilience. Heroic would put it out of reach until L6 for no balance reason.

**Knight sanity math under the gear cap.** The attacker is a Warrior using the section 9 single-target dice (tier 4 is now 4d10). Assumptions: Might 3 at L1 and L5, and Might 5 at L10, matching section 7. The Knight has Resilience 3 at L1 and L5, and 4 at L10 after one leveling point. HP comes from section 7. The section 2 L1 cap of 5 includes gear, so the L1 iron row sits exactly at the cap.

| Level | Hit | Knight's gear | Knight Resilience | Damage per hit | Knight HP | Hits to down |
| ----- | --- | ------------- | :---------------: | :------------: | :-------: | :----------: |
| 1 | 2d6 + 3 = 10 | None (section 2) | 3 | 7 | 30 | ~4 |
| 1 | 10 | Steel | 4 | 6 | 30 | 5 |
| 1 | 10 | Iron (gear cap and L1 cap of 5 both reached; Evasion −1) | 5 | 5 | 30 | 6, but easier to hit |
| 5 | 3d8 + 3 = 16.5 | Spidersilk; adamantine (Evasion −1, crit-proof); or rare steel + masterwork Fortified (cap) | 5 | 11.5 | 62 | ~5–6 (adamantine is easier to hit, but crits can't spike it) |
| 5 | 16.5 + adamantine weapon | Same | 5 − 2 = 3 | 13.5 | 62 | ~4–5 |
| 10 | 4d10 + 5 = 27 | Legendary armor (cap +3) | 7 | 20 | 102 | ~5 |

**Result:** a fully capped Knight survives **4–6 hits** at every level. That's at most two hits more than the no-gear baseline in section 2. With the smaller tier-4 dice, L10 moves from 4 hits to about 5. The worst case is still level 1 in iron, the one place gear stretches a fight by about 50%, and it costs the Knight Evasion. The rules session accepted that for now.

**Accessories and trinkets:** material is flavor, with two exceptions. Orichalcum still grants the extra quality tag slot. A harvested material (nacre, leviathan hide, salamander hide, heartwood, dragonscale) still grants its **resistance**, but none of its armor stats. That resistance counts toward the resistance gear cap (B2).

**Heartwood weapons.** Heartwood is wood, so it also makes staves, bows and clubs. A heartwood weapon gives its wielder blight resistance (and no armor stats), following the same rule as accessories, and it counts toward the resistance gear cap. It's the one harvested material that works as a weapon material. Dragonscale weapons keep their rider (B3) and don't also grant a resistance.

**Why the leather-type hides get Evasion:** this matches leather's lane and gives each pair a choice. Against water, nacre is the tank pick and leviathan hide is the dodge pick.

### B5. Qualities: where the power came from

Each quality is defined by its **source**, the **levers it's allowed to use**, and **how you get rid of it** (section 10 "Item layers"). That's what keeps a masterwork +1 Resolve and a blessed +1 Resolve from being the same thing. Masterwork is craft: it asks nothing and can't be dispelled. The blessing comes with a tenet, and it goes dormant if you break it.

| Quality | Source | Allowed levers | Drawback | Known? | Removed by |
| ------- | ------ | -------------- | -------- | ------ | ---------- |
| **masterwork** | Craft. Not magic. | **The stat-bonus quality.** Every generic bonus: combat stats, hpMax, mpMax, Initiative, movement, skills, improved critical. See B6. | None | Yes | Can't be dispelled or suppressed |
| **enchanted** | Arcane. A mage's work. | **Imbued spells and effects only:** granted powers (invisibility, a stored spell, flight) and magical effects like Returning. No plain stat bonuses and no damage riders. See B6. | None | Yes | Dispel or anti-magic suppresses it |
| **runed** | Carved runes | **The elemental layer.** Imbuing runes add damage of a type to a weapon's techniques; warding runes add one resistance. One of each for all 17 damage types. See B6. | None | Yes | Erasing the runes |
| **blessed** | Divine favor from a priest or shrine | **The opposite of cursed.** Real power within every cap, but protective and light-aligned (Resolve, Resilience, resistances, light riders, and healing riders that heal the **wielder** only on techniques that cost a resource, GB-11), plus a **boon** that works in your favor (see below; catalog list 8). | Goes **dormant** if the wielder breaks the faith's tenet (written in the description), until they atone | Yes | The god withdrawing it |
| **divine** | Made by a god, or carried by one | As blessed, plus one granted power tied to the god. Min epic. | **Chooses its wielder.** It's inert for anyone without the faith's trait (`requiredTraits`, *limit L3*). | Yes | Can't be removed |
| **cursed** | Wild, willful or infernal magic | Anything, within every cap (B2) | **Required:** at least one **twist** that changes how you play (see below). Usually it also can't be unequipped. | Yes (visible in the app; a GM may keep it secret at the table) | A remove-curse spell, then it can be unequipped |
| **corrupted** | A blessed or holy item that was twisted | Might and Dominance; necrotic and dark riders | **Required:** −1 Resolve or more | Yes. You know what you're carrying. | Purification ritual (turns it back into blessed) |
| **forbidden** | Taboo or outlawed magic | Necrotic riders; powers that cost **HP** | Social: carrying it is a crime to most factions | Yes | Destroying it |
| **unstable** | Wild magic | Riders only, at +1 dice size for free. Takes **no drawback refunds**. Its step doesn't stack with orichalcum's. | **Required:** the rider's damage type is rolled on each technique hit (d8: fire, ice, lightning, water, air, earth, force, psychic). On a natural 1, the wielder takes the rider instead. | Yes | Stabilizing it (turns it into runed) |
| **sentient** | A bound mind | +2 to one skill, plus one granted power | It has a goal. When you act against it, you roll d20 + Resolve against **DC 11 + its rarity tier** (this matches the section 5 save DC; ties go to you) (uncommon 1, rare 2, heroic 3, epic 4, legendary 5, mythical 6). On a failure, it refuses to work that turn. Items have no stats of their own, which is why the DC is fixed. Min uncommon. | Yes, once it speaks | Can't be removed; it can be appeased |
| **ancestral** | Bloodline | Its stat bonus **grows with the wielder's level**: +1 at level 1, +2 at level 5, +3 at level 10. The growth still counts toward the gear cap, so the +3 step only matters on a legendary or mythical item. *(Description-only, limit L2.)* | Only works for its lineage (`requiredTraits`, *limit L3*) | Yes | Can't be removed |
| **relic** | History. A named object with a story. | One unique trait-like granted power. Min legendary; never crafted. | Depends on the relic | Yes | Can't be removed |

**Telling them apart:**

- **Masterwork is craft.** Plain, reliable numbers: a better edge, a better fit, a better balance. It's the only quality that gives generic stat bonuses, and no dispel can touch it.
- **Enchantment is an imbued spell.** A cloak that turns you invisible, a ring holding a Fireball, boots that let you fly. It gives effects and powers, never plain numbers or damage riders, and a dispel switches it off.
- **Runes are the elements.** An imbuing rune wreathes a blade in fire; a warding rune turns fire aside. One imbues, the other resists. They're carved, so a dispel can't touch them.
- **A blessing is the opposite of a curse.** A curse holds on to you; a blessing you have to hold on to. Its power is protective and light-aligned (never Might, Dominance or offensive elements), and its defining feature is a **boon**, the mirror of a curse's twist. It asks something of you (the tenet), and it goes dormant if you break faith.
- **A curse is power with a twist.** A cursed item is often the coolest thing a character owns. Its power is real, and it can use any lever within the caps. What makes it cursed is a **twist that changes how you play**. The twist can hurt, but it should be fun to live with, not just a penalty.
- **Corrupted vs. cursed:** corruption is a straight bargain: power for Resolve, and you can walk away by unequipping it. A curse has a personality: it wants something, and usually it won't let go until the curse is broken.

**Cursed twists.** Examples of the kind of twist to write:

| Twist | Example | How it plays |
| ----- | ------- | ------------ |
| **Compulsion** | *Thirsting blade:* it must strike every turn. On any turn you don't make a technique attack with it, its bonuses go dormant until you do. | Pushes you into the fight |
| **Bond** | *Whispering armor:* once per session the GM tells you a true secret about someone nearby. It won't come off. | A gift you can't refuse |
| **Jealousy** | *Possessive ring:* while you wear it, you can't wear another accessory. | Narrows your build around it |
| **Price** | *Hungering staff:* its granted power costs HP instead of MP. | A resource trade |
| **Omen** | *Stormcaller's spear:* the weather turns foul wherever you carry it. | Pure story, no mechanical cost |

**Refunds are only for real drawbacks.** A twist refunds points only if it's one of the drawbacks in the B2 table (a stat penalty, or a vulnerability that comes up). Most twists, like compulsions, bonds, omens and "won't come off", refund nothing. They're the flavor that makes the item cursed, not a cost to pay down.

**Blessing boons** (the mirror of curse twists; canonical list in ITEM_CATALOG.md list 8, draft):

| Boon | Example | How it plays |
| ---- | ------- | ------------ |
| **Grace** | *Shepherd's mantle:* once per day, when an ally within 10 ft would be downed, they stay at 1 HP instead | A save when it matters most |
| **Guidance** | *Pilgrim's lantern:* once per session, the GM tells you which path, door or choice leads toward your goal | Divine direction |
| **Sanctuary** | *Abbey shield:* while you spend your turn defending an ally, attacks against them take −2 | A protector's gift |
| **Purpose** | *Oathblade:* while you act for the faith's cause, your techniques with it can't miss on a natural 1 | Rewards living the tenet |
| **Favor** | *Saint's coin:* once per session, reroll one d20 and keep the better result | Luck from above |

Story-only boons cost nothing. Mechanical boons cost like the closest B2 effect; pricing is pending a balancing check.

### B6. Quality option lists: masterwork, enchanted, runed

The canonical option lists for the three crafted qualities (`[BETA-4]`, section 10 "Item layers"). They live **only in this doc** for now. There's no field for them in the model or the constants, so until there is, an item records each option through its name and description ("Flaming Longsword", "Masterwork Breastplate of Vigor") plus the matching lever. The `key` column is the value an enum would use if these lists ever move into code.

**Shared rules**

- Each quality counts as **one** quality tag, however many of its options the item carries.
- Each option costs quality points (B2). All of an item's options, across every quality, must fit its rarity budget.
- No option can appear twice on the same item.
- Every cap in B2 applies: the gear cap, the Initiative gear cap, the per-item caps (including one skill bonus per item), the rider cap and the granted-power tier cap.

#### Masterwork: the stat-bonus quality

Craftsmanship, not magic. Every **generic** stat bonus comes from here: combat stats, hpMax, mpMax, Initiative, movement and skills. It can't be dispelled. Masterwork options can go on any item, except `keen`, which is weapon-only. The "Usual fit" column is otherwise a guide, not a rule.

| Key | Name | Effect | Lever | Usual fit | Cost |
| --- | ---- | ------ | ----- | --------- | :--: |
| `brutal` | Brutal | +1 Might | `statModifiers` | weapon | 1 |
| `seeking` | Seeking | +1 Accuracy | `statModifiers` | weapon | 1 |
| `commanding` | Commanding | +1 Dominance (your control DCs go up) | `statModifiers` | weapon, accessory | 1 |
| `keen` | Keen | Improved critical (threat margin 10 → 8). A finer edge, not magic. **Weapons only**, and it applies only to techniques made with that weapon. Improved critical never stacks: use the best margin, and it never goes below 8 (GB-36). | description | weapon only | 2 |
| `fortified` | Fortified | +1 Resilience | `statModifiers` | armor | 1 |
| `fleet` | Fleet | +1 Evasion | `statModifiers` | armor | 1 |
| `steadfast` | Steadfast | +1 Resolve | `statModifiers` | armor, accessory | 1 |
| `striding` | Striding | +5 ft movement (+1 movement stat) | `statModifiers` | armor, accessory | 1 |
| `vigor` | Vigor | +5 hpMax | `statModifiers` | armor | 1 |
| `wellspring` | Wellspring | +5 mpMax | `statModifiers` | armor, accessory | 1 |
| `quickening` | Quickening | +2 Initiative (counts toward the Initiative gear cap) | `statModifiers` | accessory | 1 |
| `skilled` | Skilled | +2 to one skill, named in the item. This is the item's one skill bonus (B2). | `statModifiers` | accessory | 1 |

#### Enchanted: imbued spells and effects

Arcane work. Enchantment **imbues an item with a spell or a magical effect**: invisibility, a stored Fireball, flight. No plain stat bonuses (those are masterwork's) and no damage riders (those are runes now). A dispel or anti-magic suppresses it.

- **Granted powers** use the B2 recharge pricing (1 per long rest or daily = 1, 1 per short rest = 2, +1 for hard control). The power's tier can't exceed the tier the item's rarity allows (GB-29).

**Granted powers (any item)**

| Key | Name | Effect | Lever | Tier | Cost |
| --- | ---- | ------ | ----- | :--: | :--: |
| `invisibility` | Invisibility | Grants invisibility (section 12): **2 turns in combat at tier 2**, 3 at tier 3 or higher, and about a minute out of combat. Using any power reveals your location (GB-37). | `grantedPowers` | 2, so rare or better | By recharge |
| `stored_spell` | Stored spell | Grants one named spell, for example Fireball. The spell has to fit the item's tier cap, so a Fireball stored in a rare item is a tier-2 Fireball. | `grantedPowers` | The spell's own tier | By recharge, +1 if it imposes hard control |
| `flight` | Flight | Grants a power that lets the bearer fly for a few turns. Flying itself is description-only *(limit L7)*. | `grantedPowers` | Suggested 2, so rare or better | By recharge |

**Other effects**

| Key | Name | Effect | Lever | Cost |
| --- | ---- | ------ | ----- | :--: |
| `returning` | Returning | A thrown weapon flies back to your hand. Requires `thrown`. | description | 1 |

**Healing riders** are blessed-only (B5), not enchanted. They trigger only on techniques that cost a resource (HP, MP or Momentum), never on at-will (cost 0) techniques (GB-11).

#### Runed: imbue and ward

Runes carved into the item. **Runes are the elemental layer:** an **imbuing rune** gives a weapon's techniques extra damage of a type, and a **warding rune** resists a type. One imbues the element; the other resists it. There's one of each for all 17 damage types. Erasing the runes removes them, and a dispel doesn't touch them, since they're carved, not cast.

- `runed` counts as **one** quality tag, however many runes the item carries, within its quality points.

**Imbuing runes (weapons)**

- **Rider cap (B2):** one imbued rider per weapon below legendary, and two at legendary or mythical. A material rider (silver, dragonscale) counts toward it.
- On orichalcum, the rider dice step up one size (B3), but the cost stays the same.
- Imbued damage applies only to techniques made with the weapon, never to spells.

| Key | Name | Effect | Lever | Cost |
| --- | ---- | ------ | ----- | :--: |
| `flaming` | Flaming | 1d6 fire rider | `healthEffects` | 2 |
| `tidal` | Tidal | 1d6 water rider | `healthEffects` | 2 |
| `frost` | Frost | 1d6 ice rider | `healthEffects` | 2 |
| `shock` | Shock | 1d6 lightning rider | `healthEffects` | 2 |
| `storm` | Storm | 1d6 air rider | `healthEffects` | 2 |
| `quake` | Quake | 1d6 earth rider | `healthEffects` | 2 |
| `blighted` | Blighted | 1d6 blight rider | `healthEffects` | 2 |
| `serrated` | Serrated | 1d6 slashing rider | `healthEffects` | 2 |
| `barbed` | Barbed | 1d6 piercing rider | `healthEffects` | 2 |
| `crushing` | Crushing | 1d6 bludgeoning rider | `healthEffects` | 2 |
| `dawnlit` | Dawnlit | 1d6 light rider | `healthEffects` | 2 |
| `umbral` | Umbral | 1d6 dark rider | `healthEffects` | 2 |
| `withering` | Withering | 1d6 necrotic rider | `healthEffects` | 2 |
| `mindrending` | Mindrending | 1d6 psychic rider | `healthEffects` | 2 |
| `corrosive` | Corrosive | 1d6 acid rider | `healthEffects` | 2 |
| `force` | Force | 1d6 force rider (it was 1d4 for 1 point while nothing resisted force; a Ward of Force now exists) | `healthEffects` | 2 |
| `venom` | Venom | 1d4 poison rider, persistent. The repeat tick adds no Might and ignores Resilience (section 5). | `healthEffects` | 2 |

**Warding runes (any item)**

- **One ward per item.** Wards count toward the resistance gear cap: at most 2 resistances from all gear, or 3 with a legendary or mythical source (B2).
- Wards give resistance only, never immunity or absorption.
- **Every damage type has a ward**, physical included, all at cost 2 (the user's decision). Materials still give some resistances for free: water (nacre, leviathan hide), fire (salamander hide), blight (heartwood), and the dragon's type (dragonscale).
- A ward that repeats the material's own resistance is wasted, because resistances don't stack.
- The resistance protects whoever wears or wields the item.

| Key | Name | Effect | Lever | Cost |
| --- | ---- | ------ | ----- | :--: |
| `warding_fire` | Ward of Fire | Resistance to fire | `resistances` | 2 |
| `warding_water` | Ward of Water | Resistance to water | `resistances` | 2 |
| `warding_air` | Ward of Air | Resistance to air | `resistances` | 2 |
| `warding_earth` | Ward of Earth | Resistance to earth | `resistances` | 2 |
| `warding_blight` | Ward of Blight | Resistance to blight | `resistances` | 2 |
| `warding_slashing` | Ward of Slashing | Resistance to slashing | `resistances` | 2 |
| `warding_piercing` | Ward of Piercing | Resistance to piercing | `resistances` | 2 |
| `warding_bludgeoning` | Ward of Bludgeoning | Resistance to bludgeoning | `resistances` | 2 |
| `warding_light` | Ward of Light | Resistance to light | `resistances` | 2 |
| `warding_dark` | Ward of Dark | Resistance to dark | `resistances` | 2 |
| `warding_necrotic` | Ward of Necrotic | Resistance to necrotic | `resistances` | 2 |
| `warding_force` | Ward of Force | Resistance to force | `resistances` | 2 |
| `warding_psychic` | Ward of Psychic | Resistance to psychic | `resistances` | 2 |
| `warding_poison` | Ward of Poison | Resistance to poison | `resistances` | 2 |
| `warding_acid` | Ward of Acid | Resistance to acid | `resistances` | 2 |
| `warding_ice` | Ward of Ice | Resistance to ice | `resistances` | 2 |
| `warding_lightning` | Ward of Lightning | Resistance to lightning | `resistances` | 2 |

**What moved in the restructure:**
- To masterwork: Brutal, Seeking, Commanding, Fortified, Fleet, Steadfast, Striding, Vigor, Wellspring, Quickening, Skilled and Keen.
- To runed: the `warding_*` entries, and later every damage rider (as imbuing runes).
- Enchanted now means imbued spells and effects only: granted powers and Returning.

### B7. Worked examples

| Item | Rarity, value | Material baseline | Quality spend | Total |
| ---- | ------ | ----------------- | ------------- | ----- |
| **Longsword** (steel; versatile; bladed) | common (L1+), 15 gp | None | None (0/0) | Offers bladed techniques. Nothing else. |
| **Silvered Dagger** (steel + silver; light, finesse, bladed, thrown) | uncommon (L1+), 120 gp | 1d4 light | Masterwork: +1 Accuracy (1/1) | +1 Accuracy, 1d4 light rider |
| **Flaming Mithril Rapier** (finesse, bladed) | rare (L4+), 800 gp | +1 Accuracy, +2 Initiative | Runed, Flaming 1d6 fire (2/2) | +1 Accuracy, +2 Init, 1d6 fire |
| **Dawnhammer** (orichalcum; two_handed; heavy, blunt, hafted) | heroic (L6+), 4,000 gp | +1 tag slot; quality dice step up | Runed, Storm 1d6 → **1d8** air (2) + blessed +1 Resolve (1) = 3/3 | 1d8 air, +1 Resolve. The blessing goes dormant if the wielder breaks the tenet. |
| **Widowmaker** (adamantine; two_handed; heavy, bladed, hafted) | rare (L4+), cursed, 400 gp (the curse halves its price) | Ignores 2 Resilience, −2 Init | 2 points + refunds: bludgeoning vulnerability (+2), can't unequip (0) = 4. Spent: +2 Might (2, fills the gear cap), 1d6 necrotic (2, its one rider). **Twist (compulsion, no refund):** it thirsts. On any turn you don't make a technique attack with it, its bonuses go dormant until you do. | Stronger than a rare should be, and it plays differently: its wielder charges in every round. A light vulnerability would refund nothing here, since light isn't the opposite of necrotic. |
| **Sanctified Breastplate** (silver armor) | rare (L4+), 700 gp | Resolve +2 | Blessed: resistance to dark (2/2), boon: Guidance (story-only, 0) | Resolve +2, dark resistance, and once per session the GM points the way |
| **Tidewarden's Coat** (leviathan hide armor) | rare (L4+), 900 gp | Evasion +1, water resistance | Runed: Ward of Fire (2/2) | Evasion +1, resistance to water and fire. The material gives one resistance and the rune adds a second, which fills the resistance gear cap (B2). |
| **Cloak of Vanishing** (accessory, no material) | rare (L4+), 800 gp | None | Enchanted: `invisibility`, tier 2, 1 per short rest (2/2) | Invisible for **2 turns in combat** (tier 2), or about a minute out of combat, once per short rest. No stat bonuses: those would need masterwork, and rare allows only 1 tag. |
| **Spidersilk Vest** (spidersilk armor) | rare (L4+), 750 gp | Resilience +2, no Evasion penalty | Masterwork: Vigor +5 hpMax, Striding +5 ft (2/2) | Resilience +2 (Resilience gear cap reached), +5 hpMax, +5 ft. The crafted, no-magic option. |

### B8. Known limits

Raised with the user by the rules session. Marked in the text above as *limit Ln*.

- **L2. Description-only rules.** Bone's brittle rule, adamantine's ignore-Resilience and crit-proofing, and ancestral growth live only in the description. The character sheet won't apply them.
- **L3. `requiredTraits` isn't enforced.** Divine and ancestral rely on it, and nothing in the code checks it yet.
- **L4. No bestiary, ever.** This is permanent, not a gap. There are no creature types, so no item design may depend on them. Silver is written around light vulnerability from species or gear (B3). Enemies are the GM's job, outside the app.
- **L6. Item level isn't enforced.** An item's `requirements.minLevel` is stored, but nothing checks it. The only `minLevel` checks are on powers. The rarity-by-level table (B2) is advisory until that changes.
- **L7. Flight is description-only.** There's no movement-mode field (fly, swim, climb), so an enchanted `flight` power (B6) can say the bearer flies, but the character sheet can't show or apply it.

---

## Balancing passes

GB numbers continue the series in [BALANCE_RULES.md](BALANCE_RULES.md); its status table records the rulings on GB-35 to GB-39.

### Pass 6: item restructure (§10 "Item layers", B2–B7)

Checked against the rebuilt layers: masterwork = generic stats + Keen, enchanted = riders + granted powers, runed = one resistance, materials as the main resistance source (new spidersilk and hides), and cursed twists that mostly refund 0.

**Rare armor lanes: expected damage taken per swing** (single-target attacks only; the hide's resistance is not counted here):

| Wearer and attacker | Spidersilk (Res +2) | Adamantine (Res +2, Ev −1, crit-proof) | Mithril (Res +1, Ev +1) | Hide (Res +1) |
| ------------------- | :-----------------: | :------------------------------------: | :---------------------: | :-----------: |
| L5 Knight (Res 3, Ev 0) vs. average (Acc 2, 3d8 + 4) | 9.4 | **8.8** | 8.9 | 10.1 |
| L10 Knight (Res 4, Ev 0) vs. average (Acc 3, 4d10 + 5) | 17.8 | **15.8** | 16.4 | 18.5 |
| L10 Knight vs. max technique (Acc 9, ~39 per hit) | 45.6 | **31.3** | 45.1 | 46.5 |
| L10 Magician (Res 0, Ev 5) vs. average | 11.7 | 12.5 | **10.8** | 12.2 |

**What a resistance is worth** (L10, 20 per hit after Resilience): if 10% of incoming damage is that type, it's like +1 Resilience; at 25%, +2.5; at 50%, +5.

**Resistances one character can reach at L4** (all rare items, all within today's caps):

| Slot | Item | Resistances |
| ---- | ---- | ----------- |
| Accessory 1 | Leviathan-hide accessory + runed Ward of Air (2/2) | water, air |
| Accessory 2 | Salamander-hide accessory + runed Ward of Earth (2/2) | fire, earth |
| Main hand | Blessed weapon (2/2) | dark |
| Off hand | Blessed off-hand item (2/2) | necrotic |
| Armor | Spidersilk (Res +2), quality free for masterwork | — |

That's **6 resistances: all four elements plus dark and necrotic**, with the armor still at the Resilience cap. From heroic (L6+), dragonscale armor adds poison or acid as a 7th.

**Invisible attack target** (10 + Evasion + cover + 5):

| Wearer | No cover | Three-quarters cover |
| ------ | :------: | :------------------: |
| L5 Magician (Ev 5) | 20: Acc 5 hits 30% | 25: Acc 5 hits 5% |
| L10 Magician (Ev 8) | 23: Acc 5 hits 15%, Acc 9 35% | 28: Acc 5 hits 5%, Acc 9 10% |

### Pass 6 findings

**`[GB-35]` Resistances stack across gear, and elemental damage stops working against a geared target (B2, B4, B6). High; sent to the items designer.** Harvested materials give their resistance even on **accessories**, for free. Runes add one more per item, and blessed covers dark and necrotic. One character reaches **6 resistances at L4** (the table above) and 7 at L6, without giving up any armor Resilience. Gear can never resist physical, force, psychic or blight, so:
- Against a geared foe (enemies are built as characters, `[OPEN-26]`), every elemental spell, rider and area power does half damage, while physical/force/psychic don't. Elemental damage becomes the weakest choice in the game at L4+.
- **The Blighted rider is now strictly better than Flaming/Tidal/Storm/Quake:** same cost (2), same dice (1d6), and nothing in gear resists it.
*Suggested lever:* **a resistance gear cap: at most 2 resistances from all equipped gear (3 if a legendary or mythical item provides one)**, like the stat gear cap. Optionally, a harvested accessory's resistance counts as its one quality option (or costs its 2 points), so armor stays the main resistance slot. Add a blight resistance source (or note that blight is unresistable by design and price Blighted at 3).

**`[GB-36]` Keen now goes on any item and can stack (B6). Medium; sent to the items designer.** Keen moved to masterwork, and "masterwork options can go on any item." A Keen ring or cloak would lower the threat margin for **every** attack (spells that roll Accuracy too), not just one weapon's techniques. "No option twice on the same item" doesn't stop a Keen weapon plus a Keen ring from taking the margin to 6. With the threshold crit, Keen is the most dangerous single option: Acc 9 vs. Ev 0 already confirms 57% with margin 8.
*Suggested lever:* **Keen goes only on weapons and applies only to techniques made with that weapon. Improved critical never stacks:** use the best margin, and 8 is the floor.

**`[GB-37]` Invisibility has no duration guideline, and non-harmful actions keep it (§12, B6, B7). Medium.** The beneficial *invisible* condition ends only when you attack or use a harmful power, and the Cloak of Vanishing's power "sets its own duration." A healer or buffer can stay invisible while healing and buffing, out of reach of single-target attacks for the whole duration. With Evasion and cover, a L10 Magician's attack target reaches 28 (5–10% to hit). Area powers still work, so it isn't unbeatable. The Cloak's price (rare, 2 points, 1 per short rest) is right **if** the duration is short.
*Suggested lever (§12, rules lead):* invisible lasts **at most 2 turns in combat at tier 2, 3 at tier 3+** (out of combat, up to a minute). **Using any power reveals your location:** you stay invisible (−5 to attacks against you), but single-target powers can target you again. *(Items designer:)* the Cloak and `invisibility` option should state a 2-turn duration at tier 2.

**`[GB-38]` Masterwork concentration: no cap slipped (B6). Low, informational.** Before the restructure, masterwork was +1 Accuracy only, and stat enchantments were split by category (weapon enchantments on weapons, armor ones on armor). Now one masterwork tag holds every stat option on any item. So:
- One item can touch 5–6 different stats (a mythical masterwork item: +1 to each of 6 combat stats).
- Accessories can now carry offense (Brutal, Seeking, Commanding).
- The **ceiling doesn't change:** the gear cap still holds every combat stat at +2 (+3 legendary), and the per-item caps hold the rest. What changed is the path: "+3 in every combat stat" at L10 now needs 1–2 legendary items instead of 2–3.
- Stat bonuses are now immune to dispel (craft, not magic), so anti-magic only switches off riders and granted powers. That fits the layer design.
No change needed.

**`[GB-39]` Rare armor lanes: none is strictly dominant (B4). Low, informational.**
- **Adamantine** is best for low-Evasion frontliners, and by far the best against high-Accuracy crit builds (31 vs. ~45 per swing at L10). It's the worst choice for Evasion builds (Magician: 12.5 vs. 10.8 for mithril). That's a real lane.
- **Mithril edges spidersilk slightly against single-target attacks** (Evasion cuts both hits and crits). **Spidersilk is better against area and save damage**, where Evasion doesn't apply. Spidersilk + Fleet equals mithril + Fortified (Res +2, Ev +1, both 2/2), so capped builds end up the same. Balanced.
- **Hides** are the weakest on stats, but a resistance is worth +1 Resilience at a 10% share of incoming damage and +2.5 at 25%. They're best-in-slot when their element is common. That depends on the GM varying elements, which is fine. GB-35's cap keeps them from stacking.
- **Iron** is now strictly worse than spidersilk past L4. That's fine: it's the cheap L1 option.
- **Cursed:** with most twists refunding 0, cursed items now sit inside the normal budget plus flavor. Only physical or opposed-type vulnerabilities refund (+2), and those are real costs. Nothing slipped there.
