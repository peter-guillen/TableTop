# RPGHub Rules Balancing

Part of the RPGHub design docs (index at the top of [GAME_RULES.md](GAME_RULES.md)). **§n** means a GAME_RULES section; **B-n** means a section of [BALANCE_ITEMS.md](BALANCE_ITEMS.md).

GB numbers are one series across all the balancing files. The status table below indexes every GB finding, including the item findings whose pass lives in BALANCE_ITEMS.md.

Notes from the balancing session. **These are findings, not rule changes:** nothing here overrides sections 1–9 or Beta Designs until the rules lead (or, for B-sections, the items designer) adopts it. Tagged `[GB-n]` and ordered by impact. "Suggested lever" is one option to consider, not a decision.

Target being checked: **3–6 hits to down someone at every level**, with powers as the main lever and items rounding a character out rather than outgrowing them.

### Status (rulings from the rules lead, pass 1)

| Finding | Status | Ruling |
| ------- | ------ | ------ |
| GB-1 Turn-1 double Major | Adopted, then **replaced** (§4) | Every combat starts at 0 Momentum (+1 per turn, max 5, resets to 0 after). The earliest extra Major is round 3. Traits can break this. The round-1 rule is removed. |
| GB-2 Optimized Might | Adopted (§7, §9) | Tier 4 single target 4d10 (22), area 3d10. Might still adds to all damage (user decision). Optimized-build case added to the §7 check. |
| GB-3 Rider stacking | Routed to items (B-sections) | One rider per weapon (two at legendary+); material riders count. |
| GB-4 Accuracy vs. Dominance | Adopted (§5) | Control, debuff and status use Dominance vs. Resolve at any target count; Accuracy only for single-target damage strikes. DC = 11 + Dominance. |
| GB-5 Knight can't protect | Adopted (§11) | Tank professions get a protective trait at L1. |
| GB-6 Uncapped levers | Routed to items (B-sections) | hpMax/mpMax +10 per item; Initiative under the gear cap (+2, +4 at legendary); can't-unequip refunds 0; vulnerability refunds only for relevant types; unstable gets the step or refunds, not both. |
| GB-7 Species / L1 cap | Adopted (§2) | The L1 cap of 5 includes gear. |
| GB-8 Crit swing, nat 20/1 | Adopted (§5) | Attacks: nat 20 always hits and threatens, nat 1 always misses. Saves: nat 20 succeeds, nat 1 fails. |
| GB-9 Min damage, DoT | Adopted (§5) | Minimum 1 damage per hit; persistent ticks take neither Might nor Resilience. |
| GB-10 Rally / downed | Adopted (§7) | Free rally roll at the start of your turn; success = ¼ hpMax and a normal turn. Any hit on an unconscious character kills. Death threshold unchanged. |
| GB-11 Healing guardrails | Adopted, **partly overridden** (§9) | Healing column = half the damage dice, no Might. Never at-will in combat. User override: healing spells *can* be rituals (10 min, no MP, out of combat only). |
| GB-12 Save ends | Adopted (§5, §12) | Control/debuff longer than 1 turn repeats its save. |
| GB-13 Concentration | Adopted (§9) | DC 10 or half the damage taken, whichever is higher. |
| GB-14 Species perk | Adopted (§2) | +1 to two stats OR +10 HP/MP. |
| GB-15 Cover | Deferred | Stays +2 / +5; terrain is the GM's call. |
| GB-16 Glass cannons | Adopted, option (a) (§2, §7) | Every profession starts with ≥24 HP (fragile ones and classless are 24/16). Growth per level unchanged, so L10 HP is 60–102. See pass 3. |
| GB-17 Crit scaling | **Declined** (user) | Threshold crit kept on purpose: high Evasion usually means low Resilience, high Resilience softens crits, and having both costs offense. |
| GB-18 Rally favors Resolve | Adopted (§7) | One successful rally per fight; the next downing that fight means unconscious. |
| GB-19 Downed vs. unconscious | Adopted (§7) | Downed (can't act; hits add to the death-threshold leftover) until your next turn starts, then choose rally or unconscious. An area effect kills an unconscious character only on a failed save. |
| GB-20 Momentum trait ceiling | Adopted (§4) | Round-1 rule in §4. Start/keep 1 safe; 2 fine with the round-1 rule; 3 is a capstone (minLevel 5+). Triggers at most once per round, preferably on a kill. Combined starting Momentum ≤ 2 (3 with a capstone). Items grant none (B2). |
| GB-21 Fragile at 2.2–2.7 hits | Accepted (user) | Glass-cannon identity; rallies and tank traits are the cover. The 5 HP/level option is kept as a playtest lever. |
| GB-22 Fights start fresh | Noted | Playtest lever only. No change. |
| GB-4 correction | Adopted (§5) | DC stays 11 + Dominance; the text now says 50% at parity, with the defender edge deliberate. |
| GB-23 Save-ends cadence | Adopted (§5, §12), pending user sign-off on §12 | Cumulative +2 on each repeat save. |
| GB-24 Paralyzed execution | Adopted (§12), pending sign-off | No automatic crit threat on paralyzed; Evasion still counts as 0. The melee crit threat stays only on sleep-type unconscious above 0 HP. |
| GB-25 Chained control | Adopted (§12), pending sign-off | Recovery window after stunned-or-stronger ends. |
| GB-26 Stacking | Adopted (§12), pending sign-off | Worst penalty only (max −5); bonuses against a target cap at +5; Evasion floors at 0. |
| GB-27 Petrified | Adopted (§12), pending sign-off | Permanent petrification by progression; ladder ordered by lethality. |
| GB-28 Invisible | Adopted (§12), pending sign-off | Beneficial-conditions table: fixed duration, no save, ends after you attack or use a harmful power. |
| GB-30 Tier/duration table | Adopted (§12), pending sign-off | Table is in §12. Hard control is never at-will, a ritual or an item rider. Low notes adopted (stunned keeps concentration; waking a sleeper is counterplay; blinded not affecting Dominance is intended). |
| GB-31 Absorption exploit | Adopted (§5) | Absorption heals only from hostile sources (an ally's damage counts as immunity). With mixed damage, only the absorbed type's share heals; Might belongs to the main type. |
| GB-32 Rituals vs. short rest | No change (user) | Healing rituals are deliberate. MP is the attrition resource and time is the GM's lever. ¼ MP / ¼ HP short rest kept. |
| GB-34 Skill curve | Adopted (§11) | L1 grants a rank (10 per career); a background proficiency in a non-profession skill gives rank 1; nothing stacks past the L1 cap of 2. L1 cap stays 2. |
| GB-35 Resistance stacking | Adopted by items (B2, B4, B6, B7); blight resolved by the user (`[BETA-10]`) | Resistance gear cap: at most 2 resistances from all gear, 3 if a legendary/mythical item provides one (materials, runes, blessed, dragonscale, heartwood; species resistances are outside it). Blight is resistable like the elements: heartwood (Resilience +1, blight resistance; a heartwood weapon also grants it) and the `warding_blight` rune. Blighted stays at cost 2. New harvested materials (nacre, leviathan hide, salamander hide, heartwood) checked: no lane problem. Each is one stat plus a resistance, and it beats mithril or spidersilk only when its element is ~10%+ of incoming damage. |
| GB-36 Keen anywhere / stacking | Adopted by items (B6) | Keen is weapon-only and applies only to techniques with that weapon. Improved critical never stacks (best margin, floor 8). |
| GB-37 Invisibility duration | Adopted (§12, B6, B7) | Invisible: at most 2 turns in combat at tier 2, 3 at tier 3+, about a minute out of combat; using any power reveals your location (§12). The B6 option and the B7 Cloak of Vanishing state 2 turns. |
| GB-38, GB-39 (masterwork, armor lanes) | Noted | No change. |
| GB-33 Item skill stacking | Adopted by items (B2, B6) | One skill bonus per item (+2 to one skill = one rank toward the §11 cap), for every quality including cursed and sentient. Gear tops out at 5 ranks across 5 slots. |
| GB-29 Items grant cheap hard control | Adopted by items (B2) | +1 point for a granted power that imposes hard control. Granted-power tier capped by rarity (common/uncommon → 1, rare/heroic → 2, epic → 3, legendary/mythical → 4) for every power-granting quality. Must also meet the GB-30 minimum tier. Riders only damage or heal. |

**Pass 4** (conditions, GB-23 to GB-30), **pass 5** (skills, rests, absorption, GB-31 to GB-34) are at the end of this file. **Pass 6** (item restructure, GB-35 to GB-39) is in [BALANCE_ITEMS.md](BALANCE_ITEMS.md).

**Pass 2** and **pass 3** are at the end of this section.

### High impact

**`[GB-1]` A double Major Action on turn 1 for everyone (§4).** Start 3 + 1 at the start of the turn = 4 Momentum, so every creature can buy a second Major Action (3) on its first turn. Initiative then decides who gets two attacks before anyone else acts. A L1 Warrior with Might 4–6 deals 11–13 per hit, and a Psychic has 18 HP, so two hits before the Psychic's first turn take it down. At L10 (see GB-2), two tier-4 hits at ~36 each against 54 HP do the same. Initiative also sits outside the gear cap (mithril +2, Quickening +2 per accessory), which makes the first-strike problem worse.
*Suggested lever:* start at 2 Momentum (the first extra Major arrives on turn 2), or no Momentum gain on your first turn, or bring Initiative under the gear cap.

**`[GB-2]` The sanity checks use average builds, but optimized Might breaks the hit count (§2, §7, §9).** The §7 check uses a tier-3 power with Might 5 at L10. The real ceiling is higher:
- L1 max Might = 3 profession + 1 species + 2 gear = **6**. Tier 1 is 2d6 + 6 = 13 against 18 HP (Psychic/Wizard/Summoner): **~1.4 hits**.
- L10 max Might = 3 + 1 + 2 leveling + 3 legendary = **9**. Tier 4 is 5d10 + 9 = 36.5 against 54 HP: **~1.5 hits**. A crit (10d10 + 9 ≈ 64) takes them from full HP to downed.
- Tier 3 → tier 4 is a +53% jump in dice (18 → 27.5), while HP grows only ~10% per level.
- At low tiers, flat Might (up to 6) is about as large as the power's dice (7), so stat-stacking matters as much as which power you pick. That works against "powers are the main lever". It also shrinks the gap between at-will and MP-costed powers: 2d6 + 6 = 13 vs. an at-will 1d8 + 6 = 10.5 is only ~20% less.
*Suggested lever:* re-run the checks at max Might; use a smaller tier-4 step (e.g. 4d10 = 22); or cap Might's contribution to damage. The 18–20 HP professions need the most attention.

**`[GB-3]` Weapon riders have no cap and can outdamage the technique (B2, B3, B6).** The gear cap covers stats only. "One elemental brand per item" covers enchantments, not material baselines. A heroic dragonscale weapon (1d6 baseline) + Flaming (1d6) + Force (1d4) adds **~9.5 per technique**. That's more than a whole tier-1 technique (7) and ~70% of a tier-2 one (13.5), and crits double it. This breaks §1, "damage comes from the power, not the weapon."
*Suggested lever:* a total rider cap per weapon (e.g. one rider die, or at most the size of the tier-1 dice), or count material riders toward the one-brand rule.

**`[GB-4]` Accuracy is worth clearly more than Dominance (§2, §5).**
- **Parity gap:** ties go to the roller. At equal stats an attack hits 55% of the time, but a save-based effect lands only 45% (the defender is the roller).
- **Crits only exist on attack rolls.** Dominance never crits.
- **Contradiction:** §2 says "Dominance drives *all* control", but §5's rule of thumb says "single target means Accuracy vs. Evasion." Under §5, a Witch's single-target hex rolls her Accuracy of **0**. This needs a ruling either way.
*Suggested lever:* DC = 11 + Dominance (restores parity); have single-target *control/debuff* use Dominance vs. Resolve and single-target *damage* use Accuracy; consider a "critical fail" on saves (miss the DC by 10+ → stronger effect).

**`[GB-5]` The Knight has no way to protect anyone (§2, §6).** "The wall" has Might 1, Accuracy 0, and there are **no baseline opportunity attacks** and no taunt. Enemies can walk past the Knight to the 18 HP casters at no cost, and Resilience only protects the Knight. The role exists only if traits (not yet written) provide it.
*Suggested lever:* commit to at least one protective trait per tank profession in the first seed pass (an opportunity attack, a "mark", or an intercept reaction), or a baseline rule for Momentum-bought opportunity attacks.

**`[GB-6]` Uncapped levers and free drawbacks (B2, B5).**
- **hpMax, mpMax, Initiative and movement are outside the gear cap**, and **cursed** may use "anything". A mythical cursed accessory with 6 points + ~4 refund can spend 10 points on +50 hpMax, which nearly doubles a L10 Psychic (54 HP).
- **Drawback refunds are often free.** "Can't be unequipped" costs nothing on an item you'd wear anyway. A **vulnerability** to a type no enemy uses costs nothing either (and with no bestiary, the GM decides which types appear, `[OPEN-26]`).
- **Unstable double-dips.** It gets +1 dice size for free *and* is on the list of drawback-refund qualities. Its own drawback (5% self-hit on a natural 1) is small, and the random type helps get past resistances. It's unclear whether orichalcum's step-up stacks with it (d6 → d10).
*Suggested lever:* cap the non-combat levers per item (e.g. hpMax +10); a refund counts only if the GM confirms the drawback is relevant; unstable gets *either* the free step *or* refunds, not both; say whether the step-ups stack.

### Medium impact

**`[GB-7]` The B4 Knight table leaves out the species bonus, and the L1 cap is ambiguous.** A Knight with species +1 Resilience = 4, plus iron +2 = **6** at L1. A Warrior hit (10) then deals 4 against 30 HP: **~7.5 hits**, over the 3–6 target. Also, does "no combat stat above 5 at level 1" include gear? If it doesn't, the cap allows 7 at L1.
*Suggested lever:* define the L1 cap as including gear, or make iron uncommon (B4 already mentions this).

**`[GB-8]` Crit rates swing from 0% to ~30% (§5).** Threat chance (confirmed): Accuracy 3 vs. Evasion 0 → 20% (14%); vs. Evasion 2 → 10% (6%); vs. **Evasion 5 → 0%, immune to crits**; Accuracy 5 vs. Evasion 0 → 30% (24%), and Keen raises that further. Accuracy gets counted twice (to hit and to crit), and high Evasion grants full crit immunity. There's no natural 20 / natural 1 rule, even though bone and unstable refer to "natural 1".
*Suggested lever:* a natural 20 always threatens; decide whether natural 1/20 auto-fail/succeed.

**`[GB-9]` Resilience, minimum damage and damage over time (§5).**
- Resilience is a flat subtraction, so its value falls with level (~10% of a hit at L1, ~3% at L10), while each point of Evasion stays ~5% at every level.
- **No minimum damage.** Area and at-will powers against a Resilience 6 tank deal ~0 (1d8 + 1 − 6).
- **Damage over time is undefined.** Does Might add, and does Resilience subtract, on *every* tick? If both, Venom (1d4 persistent) does nothing against tanks; if neither, persistent damage gets past Resilience.
*Suggested lever:* minimum 1 damage per hit; rule that persistent ticks take neither Might nor Resilience.

**`[GB-10]` Downed and rally edge cases (§7).**
- A rally brings you up at **1 HP**. With the death threshold at half hpMax, a rallied Psychic (hpMax 18) dies outright to any hit of 10+, which is about one average hit. Rallying is near-suicide for 18–20 HP professions and safe for high-Resolve tanks.
- "Each attempt uses your turn" vs. "a success... and you act normally": can you act on the turn you rally?
- **No rule for attacking a downed or unconscious creature** (auto-hit? auto-crit? does each hit add to the death threshold?).
*Suggested lever:* rally to a % of hpMax (e.g. 25%), or count the death threshold only from hits taken while at 0 HP; add a short rule for attacking downed creatures.

**`[GB-11]` Healing has no guardrails (§9).**
- **Ritual** = no MP out of combat. A healing ritual gives unlimited healing between fights, whatever `[OPEN-13]` decides about rests.
- The rule that every tier has a no-cost at-will option should **exclude healing**, or attrition disappears.
- There's no healing column in the tier table.
*Suggested lever:* healing can't be ritual or at-will; add healing dice per tier (about half the single-target damage dice).

**`[GB-12]` Control has no "save ends" (§5, §9).** A control power with `until_broken` lands on one failed save and never offers another one. Combined with `[OPEN-18]` (no condition effects defined yet), this is the most likely place for an unbeatable combo to appear.
*Suggested lever:* repeat the save at the end of each of the target's turns for any control or debuff longer than 1 turn.

### Low impact

- **`[GB-13]` Concentration (§9):** a flat DC 10 regardless of damage. High-Resolve casters (Summoner 3 + gear 2 = 80%) basically never lose concentration. Consider DC = 10 or half the damage taken, whichever is higher.
- **`[GB-14]` Species perks aren't priced against each other (§2):** "+1 to two stats" (2 points in B2 terms) vs. "a small HP/MP perk". That equals +10 HP/MP to match.
- **`[GB-15]` Cover (§6):** three-quarters cover (+5) is a 25% swing in a system where stats sit around 0–8. Fine if terrain is rare; consider +2 / +4.
- **`[GB-16]` Offense/defense spread (§2):** Wizard and Sorcerer have 6 offense points and 1 defense point on 18–20 HP. That's the intended glass cannon, but it compounds GB-1 and GB-2. Recheck after those are settled. *(Rechecked in pass 2: see GB-16 below.)*

### Pass 2: hits-to-down under the new rules

Uses the rules as of the GB-1/8/10 rulings: tiers 2d6 / 3d8 / 4d10 at L1 / L5 / L10 (tiers 1, 2, 4), the L1 cap of 5 including gear, gear caps +2 (+3 legendary), one rider per weapon (two at legendary), +10 hpMax per item, minimum 1 damage. All values are averages.

**Builds assumed**

| Build | Might (L1 / L5 / L10) | Notes |
| ----- | :-------------------: | ----- |
| Average attacker (Warrior) | 3 / 4 / 5 | Profession base plus leveling (+1 by L5, +2 by L10). No species or gear in Might. No rider. Matches §7. |
| Max attacker, spell | 5 / 7 / 9 | + species 1 + gear (L1 cap 5; +2 at L5; +3 legendary at L10). |
| Max attacker, technique | same + rider | Rider: L1 silver 1d4 (2.5), L5 rare Flaming 1d6 (3.5), L10 legendary orichalcum with two riders, 1d8 + 1d6 (8). |

| Defender | HP (L1 / L5 / L10) | Resilience (L1 / L5 / L10) |
| -------- | :----------------: | :------------------------: |
| Glass cannon, average (Psychic/Wizard/Summoner) | 18 / 34 / 54 | 0 / 0 / 0 |
| Glass cannon, max defense (species +10 HP, gear Resilience, Vigor) | 33 / 54 / 84 | 2 / 2 / 3 |
| Warrior, average | 28 / 56 / 91 | 2 / 2 / 2 |
| Knight, average | 30 / 62 / 102 | 3 / 3 / 4 |
| Knight, max (species + leveling + gear Resilience; Vigor on accessories) | 30 / 72 / 122 | 5 / 7 / 9 |

**Damage per hit before Resilience:** average 10 / 17.5 / 27; max spell 12 / 20.5 / 31; max technique 14.5 / 24 / 39.

**Hits to down** (target 3–6; **bold** = outside it)

| Defender | L1 avg | L1 max | L1 max+rider | L5 avg | L5 max | L5 max+rider | L10 avg | L10 max | L10 max+rider |
| -------- | :----: | :----: | :----------: | :----: | :----: | :----------: | :-----: | :-----: | :-----------: |
| Glass cannon, avg | **1.8** | **1.5** | **1.2** | **1.9** | **1.7** | **1.4** | **2.0** | **1.7** | **1.4** |
| Glass cannon, max def | 4.1 | 3.3 | **2.6** | 3.5 | **2.9** | **2.5** | 3.5 | 3.0 | **2.3** |
| Warrior, avg | 3.5 | **2.8** | **2.2** | 3.6 | 3.0 | **2.5** | 3.6 | 3.1 | **2.5** |
| Knight, avg | 4.3 | 3.3 | **2.6** | 4.3 | 3.5 | 3.0 | 4.4 | 3.8 | **2.9** |
| Knight, max | 6.0 | 4.3 | 3.2 | **6.9** | 5.3 | 4.2 | **6.8** | 5.5 | 4.1 |

**What it shows**

- **The level curve is fixed.** Every row is flat from L1 to L10, so the 4d10 tier 4 did its job (GB-2 is closed).
- **Average vs. average is on target** for Warriors and Knights (3.5–4.4 hits).
- **Glass cannons sit at ~2 hits at every level, even average vs. average.** That's GB-16 below.
- **A max-Accuracy technique user is the top threat.** Riders put technique builds ~25% above spell builds at L10 (39 vs. 31). That's within the rider cap, but it's the reason the "max+rider" column is the one that falls under 3.
- The §7 optimized check (Might 9, ~31) leaves out the technique rider. With it, the number is ~39 and ~1.4 hits on a 54 HP Psychic.

**Momentum after GB-1** (spending on extra Majors whenever possible):

| Round | 1 | 2 | 3 | 4 | 5 | 6 |
| ----- | :-: | :-: | :-: | :-: | :-: | :-: |
| Majors that round | 1 | 2 | 2 | 1 | 1 | 2 |
| Cumulative | 1 | 3 | 5 | 6 | 7 | 9 |

Round 1 is fixed: no single average hit (or max technique hit, 14.5 vs. 18) downs a full-HP character, so everyone gets a turn. Only a crit can (max technique crit ≈ 24 vs. 18 HP, downed but not dead). The burst moved to rounds 2–3 (4 Majors). Against a 2-hit glass cannon, that's down in round 2, after acting once. Acceptable if glass cannons reach 3 hits (GB-16).

### Pass 2 findings

**`[GB-16]` Glass cannons are under the 3-hit floor at every level (§2, §7). High.** An average 18 HP / Resilience 0 profession goes down in **1.8–2.0** average hits at every level, and **1.2–1.4** against a max technique build. It takes the species HP perk plus gear Resilience and Vigor just to reach 3–4 against an average attacker. Wizard (18 HP, Res 0) and Sorcerer (20 HP, Res 1, 2.2 hits at L1) are the worst.
*Suggested levers* (pick one):
- **HP floor 24** for the 18–22 HP professions (MP drops to match, keeping HP + MP = 40; ¼ growth becomes 6/level). Average vs. average becomes ~2.4 at L1 and ~2.9 at L10. MP 16 is still 4–8 tier-1 casts.
- **A flat +10 HP for everyone** outside the 40 budget. Glass cannons get to ~2.8, but Knight max at L1 goes over 6 (8 hits).
- **Accept it as the glass-cannon identity** and lean on GB-5 tank protection traits to keep enemies off them.

**`[GB-17]` The crit rate still scales hard with an Accuracy gap (§5). Medium.** Natural 20 fixed the immunity case: confirmed crits are ≥ 0.5% against any Evasion (Acc 0 vs. Ev 9) and ~2.8% at parity. But the top end grows:

| Acc vs. Ev | Threat | Confirmed |
| ---------- | :----: | :-------: |
| 3 vs. 0 | 20% | 14% |
| 5 vs. 0 | 30% | 24% |
| 5 vs. 0, Keen | 40% | 32% |
| 9 vs. 0 (L10 max Ranger) | 50% | 47.5% |
| 9 vs. 0, Keen | 60% | 57% |

At L10, a max-Accuracy technique user crits on about half its swings against an Evasion 0 target, worth ~51 damage per swing (enough to down a 54 HP Psychic in ~1 swing).
*Suggested lever:* threats only on a natural roll (natural 20; Keen = 19–20), still confirmed by d20 + Accuracy. Confirmed crits then sit at about 3–5% (up to 9.5% with Keen), and Accuracy matters for confirming, not threatening.

**`[GB-18]` Rally HP favors high Resolve strongly (§7). Medium.** A rally success no longer leads to a guaranteed death: rallied glass cannons (4–13 HP) still don't survive one average hit (10 / 17.5 / 27), but the leftover (6 / 9.5 / 14) stays under the death threshold, so they're downed again, not killed. Only a max L1 technique hit (14.5) kills a rallied 18 HP Psychic. So the 1 HP death trap is fixed. The new problem is the repeated rallies: expected extra HP per fight, with DC 10 / 15 / 20 / 25:

| Character | Resolve | Extra HP | % of hpMax |
| --------- | :-----: | :------: | :--------: |
| Paladin L10, max | 9 | +46.5 | 52% |
| Knight L10 | 4 | +30.6 | 30% |
| Psychic L10 | 2 | +12.4 | 23% |
| Psychic L1 | 1 | +3.3 | 18% |

A max Paladin effectively has ~135 HP, which pushes tanks past 6 hits (Knight max vs. average: ~6.8 → ~9).
*Suggested lever:* **one rally per fight**, or the DC steps +10 (10 / 20 / 30). With one rally, a max Paladin gets +21 (23%) and an L10 Psychic +8.5 (16%).

**`[GB-19]` Unclear: what counts as unconscious between dropping to 0 and the rally roll (§7). Medium.** The rally is at the start of your *next* turn, and "any hit on an unconscious character kills them." In between, are you unconscious? If you are, any enemy acting before your turn kills you before you ever roll, which makes "rally" mean nothing against anyone faster. If you aren't, there's no rule for what a hit does to a downed (not unconscious) character. Also unclear: does an area effect that catches an unconscious character (including an ally's) count as a hit and kill them?
*Suggested lever:* while waiting to rally, you're *downed*, not unconscious. A hit on a downed character adds to the leftover damage for the death threshold. Only *unconscious* characters die to any hit, and area effects kill them only on a failed save.

### Pass 3: 24 HP floor, Momentum from 0, Momentum traits

Same builds and attackers as pass 2, with the new HP: every profession starts with at least 24 HP, and growth per level is unchanged (§7). The max-defense fragile build adds species +10 HP and gear Vigor (39 / 60 / 90 HP) plus gear Resilience (2 / 2 / 3).

**Hits to down** (target 3–6; **bold** = outside it; pass 2 value in brackets where it changed)

| Defender | L1 avg | L1 max | L1 max+rider | L5 avg | L5 max | L5 max+rider | L10 avg | L10 max | L10 max+rider |
| -------- | :----: | :----: | :----------: | :----: | :----: | :----------: | :-----: | :-----: | :-----------: |
| Fragile, 4 HP/level (Psychic, Wizard, Summoner) | **2.4** (1.8) | **2.0** | **1.7** | **2.3** (1.9) | **2.0** | **1.7** | **2.2** (2.0) | **1.9** | **1.5** |
| Fragile, 5 HP/level (Witch, Warlock, Magician) | **2.4** | **2.0** | **1.7** | **2.5** | **2.1** | **1.8** | **2.6** | **2.2** | **1.8** |
| Sorcerer (Resilience 1) | **2.7** | **2.2** | **1.8** | **2.7** | **2.3** | **1.9** | **2.7** | **2.3** | **1.8** |
| Fragile, max defense | 4.9 (4.1) | 3.9 | 3.1 | 3.9 | 3.2 | **2.7** | 3.8 | 3.2 | **2.5** |
| Warrior, avg | 3.5 | **2.8** | **2.2** | 3.6 | 3.0 | **2.5** | 3.6 | 3.1 | **2.5** |
| Knight, avg | 4.3 | 3.3 | **2.6** | 4.3 | 3.5 | 3.0 | 4.4 | 3.8 | **2.9** |
| Knight, max | 6.0 | 4.3 | 3.2 | **6.9** | 5.3 | 4.2 | **6.8** | 5.5 | 4.1 |

**What it shows**

- **The floor helps most at L1** (1.8 → 2.4 hits) and least at L10 (2.0 → 2.2). The 4 HP/level growth was kept, so the fragile professions gain only +6 HP by L10.
- **Average vs. average, fragile professions are now 2.2–2.7 hits.** That's up from ~2, still a little under 3. Building for defense (species HP + gear) brings them to 3.8–4.9.
- **One rally per fight** is worth about +15–23% of hpMax in expectation (table below). With it, an average fragile character is effectively at about 2.6–3.1 hits.
- Tanks are unchanged. One rally caps the max Knight's effective hits at about 8 (it was ~9 with unlimited rallies).

**One rally per fight, expected value**

| Character | Back at | Rally chance | Expected HP | % of hpMax |
| --------- | :-----: | :----------: | :---------: | :--------: |
| Paladin L10, max Resolve 9 | 22 | 95% | +20.9 | 23% |
| Knight L10, Resolve 4 | 25 | 75% | +18.8 | 18% |
| Psychic L10, Resolve 2 | 15 | 65% | +9.8 | 16% |
| Psychic L1, Resolve 1 | 6 | 60% | +3.6 | 15% |

The spread between high and low Resolve dropped from 52% vs. 18% (pass 2) to 23% vs. 15%. GB-18 is closed.

**Momentum timeline from 0** (one creature, spending on an extra Major whenever it can)

| Starting Momentum | R1 | R2 | R3 | R4 | R5 | R6 | Majors by R3 | Majors by R6 | First double Major |
| :---------------: | :-: | :-: | :-: | :-: | :-: | :-: | :----------: | :----------: | :----------------: |
| **0 (base rule)** | 1 | 1 | 2 | 1 | 1 | 2 | 4 | 8 | **Round 3** |
| 1 | 1 | 2 | 1 | 1 | 2 | 1 | 4 | 8 | Round 2 |
| 2 | **2** | 1 | 1 | 2 | 1 | 1 | 4 | 8 | **Round 1** |
| 3 | **2** | 1 | 2 | 1 | 1 | 2 | 5 | 9 | **Round 1** |

- The base rule gives an extra Major every 3 rounds, starting in round 3. Momentum never reaches the cap of 5 unless it's saved for Minors and Reactions.
- An average attacker hits ~60% of the time, so focus fire on a 2.4-hit fragile character takes about 4 swings. The round-3 burst lands right when that fight ends. Two attackers on the same target end it in round 2.
- **Starting Momentum doesn't add actions over a fight; it moves them earlier.** By round 6, start 0, 1 and 2 all have 8 Majors. Only start 3 adds one (9). What a start trait really buys is **timing**, and a start of 2 or more brings back the round-1 double Major that GB-1 removed.

### Pass 3 findings

**`[GB-20]` Momentum trait ceiling (§4, for trait seeds). High, needed before writing Momentum traits.**

| Trait | Effect | Verdict |
| ----- | ------ | ------- |
| Start combat with 1 | Double Major in round 2 instead of 3 | **Safe.** A good L1 trait. |
| Keep up to 1 between fights | Same as starting with 1, if the last fight ended with Momentum | **Safe.** |
| Start with 2, or keep up to 2 | **Double Major in round 1** | Safe **only with the clause** "Momentum you start combat with can't buy an extra Major Action in round 1." With the clause it's a round-1 extra Minor or Reaction plus a round-2 burst. |
| Start with 3, or keep up to 3 | Round-1 double Major, plus a 9th Major by round 6 | **Too strong** without the clause. It's the old start-3 rule that caused GB-1. With the clause, treat it as a L5+ capstone. |
| +1 Momentum on a kill | Self-limiting: kills are rare and end a threat | **Safe** at +1, once per round. |
| +1 Momentum on a crit | Scales with the Accuracy gap, since the threshold crit stays (GB-17): Acc 3 vs. Ev 0 → an extra Major every 2.6 turns; Acc 9 vs. Ev 0 → every **2.0** turns (base 3.0) | **Once per round**, and better tied to kills than to crits. |

*Suggested rules for trait seeds:*
1. **Combined cap: starting Momentum from all sources (species, background, profession, items) is at most 2.** Traits stack across origin pieces, so a per-trait limit isn't enough.
2. **The round-1 clause:** Momentum you start combat with can't buy an extra Major Action in round 1. Write it into every start/keep trait of 2 or more, or make it a §4 rule (simpler).
3. **Momentum gains from triggers (kill, crit, hit) are +1, at most once per round.**
If items ever grant starting Momentum (none do yet), they should count toward the cap in rule 1. That would be a B-section note for the items designer.

**`[GB-21]` Fragile professions at average vs. average: 2.2–2.7 hits (§7). Low, informational.** The 24 HP floor fixed L1. Keeping 4 HP/level means L10 fragile characters are still slightly under 3 hits (2.2), or ~2.6 counting the expected rally. That fits the user's view that growth carries the identity, and §11 tank traits are the intended protection. If playtesting shows casters dropping too fast at high levels, the smallest lever is **5 HP/level for the 4 HP/level group** (L10 HP 60 → 69, 2.2 → 2.6 hits; MP 70 → 61).

**`[GB-22]` Healing rituals make every fight start fresh. Low, informational.** With healing rituals out of combat, Momentum back to 0 and one rally per fight, nothing carries between fights except MP, recharges and time. Each fight is self-contained, and per-fight balance is the only balance that matters. The limiter is time: topping up 24 HP with tier-1 healing (1d6) takes ~7 rituals (~70 minutes). Topping up 60 HP with tier-4 healing (3d8) takes ~5 (~50 minutes). That's fine as long as GMs use time pressure. No change needed.

### Pass 4: conditions (§12 draft, `[OPEN-18]`)

Checked against the §12 table as drafted: −2/−5 steps, save-ends past 1 turn, ladder stunned < incapacitated < paralyzed < petrified, and the narrowed "finishing the job" (§7). Save math: the target rolls d20 + Resolve against 11 + Dominance, with natural 20/1. "Gap" means Dominance − Resolve.

**Save-ends cadence:** expected turns lost to one condition that lasts until saved (the first turn is always lost, then a repeat save at the end of each of the target's turns).

| Gap | Repeat save fails | Same DC every time (current) | +2 on each repeat | Hard cap of 2 turns |
| :-: | :---------------: | :--------------------------: | :---------------: | :-----------------: |
| 0 | 50% | 2.0 | 1.6 | 1.5 |
| 3 | 65% | 2.9 | 1.9 | 1.7 |
| 5 | 75% | **4.0** | 2.2 | 1.8 |
| 7 | 85% | **6.7** | 2.7 | 1.9 |
| 9 | 95% | **20** | 3.3 | 2.0 |

Gaps of 5–9 are easy to reach: Witch/Psychic at max Dominance (5 at L1, 9 at L10) against a Resolve 0–2 target.

**Paralyzed, per melee swing** (Evasion counts as 0, and every melee hit is a crit threat):

| Attacker | Hit | Crit | Expected damage per swing | On a crit |
| -------- | :-: | :--: | :-----------------------: | :-------: |
| Average Warrior L1 (Acc 1) | 60% | 36% | 8.5 | 17 |
| Average Warrior L10 (Acc 3) | 70% | 49% | **29.7** (17.5 against the same target unparalyzed) | 49 |
| Max L10 technique (Acc 9) | 95% | 90% | **64.1** | 69 |

**Several controllers on one target** (each tries once per round; chance that at least one lands):

| Gap | 1 controller | 2 controllers | 3 controllers |
| :-: | :----------: | :-----------: | :-----------: |
| 0 | 50% | 75% | 88% |
| 3 | 65% | 88% | 96% |
| 5 | 75% | 94% | 98% |

### Pass 4 findings

**`[GB-23]` Save-ends is near-permanent at large gaps (§5, §12). High.** With the same DC on every repeat, a gap of 7 locks a target for ~6.7 turns on average, and a gap of 9 for ~20. Fights last about 5–6 rounds, so one failed save against a max-Dominance controller ends the target's fight. That's the "unbeatable" case GB-12 warned about, and save-ends alone doesn't fix it.
*Suggested lever:* **+2 on each repeat save** (cumulative), plus the hard caps per rung in GB-30. A gap of 7 then costs ~2.7 turns, and a gap of 9 ~3.3. The first failed save still matters, and nothing lasts all fight.

**`[GB-24]` Paralyzed is an execution (§12). High.** Evasion 0 *and* an automatic crit threat on every melee hit stack with the threshold crit. A max L10 technique user crits 90% of the time and deals ~64 per swing, which downs a 60 HP fragile character in one swing. Even an average Warrior goes from 17.5 to ~30 per swing (+70%). Paralyzed applied before allies act is a kill, which skips the 3–6 hit target.
*Suggested lever:* **keep "Evasion counts as 0" and drop the automatic crit threat.** The threshold crit already rewards the Evasion drop. An average Warrior then deals ~22 per swing (+25%), and a max build ~51 (the same as against any Evasion 0 target). Keep the melee crit threat on sleep-type *unconscious*: it's one hit, and that hit wakes them.

**`[GB-25]` Allies can chain control (§12). High.** Each controller's attempt is a fresh initial save, and 1-turn conditions don't need save-ends. Two controllers at gap 3 land something 88% of rounds; three land 96%. A party with 2–3 controllers can lock a single enemy for the whole fight. That's most dangerous for the GM's lone boss, and for a PC focused by an enemy group.
*Suggested lever:* **a hard-control window:** when a condition of stunned or stronger ends, the target can't be given stunned or stronger again until the end of its next turn. It always gets at least every other turn. Soft (−2) conditions are unaffected, so control builds still have plenty to do.

**`[GB-26]` Condition modifiers stack without limit, and Evasion has no floor (§12). Medium.** Different conditions stack, and some can be applied at-will.
- Worst current stack on attacks *against* a target: blinded +2, prone +2, deafened −2 Ev, restrained −2 Ev, stunned −2 Ev = **+10** (a 50% swing).
- Worst stack on a target's *own* attacks: blinded −5, poisoned −2, frightened −2, restrained −2, prone −2 = **−13**.
- Evasion can go negative (2 − 6 = −4). With the threshold crit, an Acc 9 attacker then threatens a crit on a natural 7+ (70%).
*Suggested lever:* **penalties to the same roll from different conditions don't stack: use the worst, capped at −5** (the "can't act properly" step). The same goes for bonuses granted *against* a target (cap +5, matching three-quarters cover). **Evasion from conditions can't go below 0** (consistent with paralyzed's "counts as 0").

**`[GB-27]` Petrified: permanent conflicts with save-ends, and short petrify is below paralyzed (§12). Medium.**
- §12 gives every condition over 1 turn a repeat save, but a permanent petrification "ends only through a spell." If save-ends applies, permanent means nothing. If it doesn't, one failed save removes a PC for the rest of the session. That's save-or-die.
- A short petrify is *less* lethal than paralyzed: the target resists all damage and is immune to new conditions. As a combat rung, temporary petrify sits between incapacitated and paralyzed. Only the permanent version is the top rung.
*Suggested lever:* reach permanent petrification by **progression**: three failed saves in a row (restrained → temporary petrified → permanent). It should be tier 4 with concentration, so allies can break it by hitting the caster. Order the ladder by lethality: stunned < incapacitated < temporary petrified < paralyzed < permanent petrified.

**`[GB-28]` Invisible is a buff but falls under the save-ends rule (§12). Medium.** "Any condition lasting more than 1 turn allows a repeat save" doesn't make sense for a beneficial condition: who saves? With no end condition, invisible stacks with cover and Evasion. A L10 max Magician (Evasion 8) behind three-quarters cover while invisible has an attack target of 28, so only a natural 20 hits. Area powers still work, so it's not unbeatable, but a single-target build can't touch it for the duration.
*Suggested lever:* list **beneficial conditions (invisible)** separately with a fixed duration and no save. Invisible **ends after you attack or use a harmful power** (or its +2 applies only to the first attack).

**`[GB-29]` Items can grant hard control cheaply (B2). Medium; sent to the items designer.** A granted power costs 1 point (1 per long rest) or 2 (per short rest), whatever its tier. So an uncommon L1 item could hold a once-per-day paralyze. *Suggested lever:* a granted power's tier can't exceed the tier matching the item's rarity (B2 rarity-by-level table), and hard control (stunned or stronger) costs +1.

**`[GB-30]` Duration and tier per rung (§9, §12). Answers question 4.** Use these as seed guidelines. "Max" is the hard cap even if the target keeps failing saves.

| Condition(s) | Single target, min tier | Area, min tier | Max duration | At-will allowed? | Damage alongside |
| ------------ | :---------------------: | :------------: | :----------: | :--------------: | ---------------- |
| −2 conditions: deafened, frightened, poisoned, prone, restrained, grappled, charmed | 1 | 1 | 3 turns (prone: until you stand) | Yes, 1 turn only | Half the tier's dice |
| blinded (−5) | 1 (1 turn) / 2 (save-ends) | 2 | 2 turns | No | Half dice |
| unconscious (sleep, wakes on damage) | 1 (1 turn) / 2 (save-ends) | 2 | 3 turns | No | None |
| stunned | 1 (1 turn, no damage) / 2 (save-ends, half dice) | 3 | 2 turns | No | None at tier 1, half dice from tier 2 |
| incapacitated | 2 (1 turn) | 4 | 2 turns | No | None |
| petrified, temporary | 3 | Never | 2 turns | No | None |
| paralyzed | 3 (1 turn) / 4 (save-ends) | Never (or tier 4, 1 turn) | 2 turns | No | None. Concentration required. |
| petrified, permanent | 4, by progression (GB-27) | Never | Until a spell | No | None. Concentration required. |

General rules: hard control (stunned or stronger) is **never at-will, never a ritual, and never an item rider**. Paralyzed and permanent petrification use **concentration**, so the counterplay is hitting the controller (and GB-13 makes big hits break concentration).

**Low notes:**
- **Blinded doesn't touch Dominance.** A blinded caster still lands area powers at full DC. It's fine if intended; otherwise give blinded −2 Dominance as well.
- **Minimum damage wakes sleepers.** An ally can wake a sleep-type unconscious friend with any at-will hit for 1 HP (GB-9). Good counterplay; worth saying explicitly so GMs don't rule against it.
- **Stunned keeps concentration and incapacitated doesn't.** That's a sensible line. Keep it, and make it explicit in the stunned row.

**Correction, my error in GB-4:** at equal stats, DC 11 + Dominance gives a **50%** save, not 55%. The target needs an 11+ on the d20, which is 10 of 20 faces. True parity with an attack roll (55%) would be DC 12 + Dominance. §5's "Why 11" line repeats my wrong number. *Recommendation:* **keep DC 11** (a slight defender edge is welcome given GB-23 to GB-25) and correct the §5 text to say 50%.

### Pass 5: skills, rests, absorption

Checked against the drafts in §11 (skill checks), §7 (rests) and §5 (absorption). Armor weight was dropped from scope by the user (armor tradeoffs come only from B4 stats), so it isn't covered.

**Skill success at the rank cap vs. untrained** (d20 + 2 × rank, natural 20/1):

| Level (cap) | DC 10 | DC 15 | DC 20 | DC 25 |
| ----------- | :---: | :---: | :---: | :---: |
| Untrained, any level | 55% | 30% | 5% | 5% |
| L1–3 (rank 2, +4) | 75% | 50% | 25% | 5% |
| L4–6 (rank 3, +6) | 85% | 60% | 35% | 10% |
| L7–9 (rank 4, +8) | 95% | 70% | 45% | 20% |
| L10 (rank 5, +10) | 95% | 80% | 55% | 30% |

**Rank budget.** Assumes 3 profession skills at rank 1, 2 background skills (+1 each), and 1 rank per level including L1. Profession and background counts vary by seed.

| Level | Rank points | Skills at the cap | Party of 4 |
| ----- | :---------: | :---------------: | :--------: |
| L1 | ~6 | 3 at rank 2 | ~24 points over 22 skills |
| L4 | ~9 | 3 at rank 3 | ~36 |
| L7 | ~12 | 3 at rank 4 | ~48 |
| L10 | ~15 | 3 at rank 5 | ~60 (average rank ~2.7 across all 22) |

**MP attrition.** Assumes 5 Major Actions per fight (4 rounds plus the round-3 Momentum burst), half of them MP-costed, at mid-band tier cost (3 / 6 / 11 at L1 / L5 / L10).

| Character | MP | MP per fight | Fights, no rests | Fights with 2 short rests | One short rest is worth |
| --------- | :-: | :----------: | :--------------: | :-----------------------: | :---------------------: |
| Psychic L1 | 16 | 7.5 | 2.1 | 3.2 | 0.5 fight |
| Psychic L5 | 40 | 15 | 2.7 | 4.0 | 0.7 fight |
| Psychic L10 | 70 | 27.5 | 2.5 | 3.8 | 0.6 fight |
| Witch L10 | 61 | 27.5 | 2.2 | 3.3 | 0.6 fight |
| Warrior L10 | 39 | 27.5 | 1.4 | 2.1 | 0.4 fight |
| Knight L10 | 28 | 27.5 | 1.0 | 1.5 | 0.3 fight |

Warriors and Knights run on at-will techniques (§9), so running out of MP only costs them their costed powers. Casters drop to at-wills one dice step smaller, so attrition is soft by design.

**HP during a 1-hour short rest:** ¼ hpMax is 6 / 15 / 25 for a Psychic L1 / Psychic L10 / Knight L10. Six 10-minute healing rituals in the same hour heal 21 (tier 1), 42 (tier 2), 54 (tier 3) or 81 (tier 4).

### Pass 5 findings

**`[GB-31]` Absorption lets an ally heal you at-will (§5). High.** Absorption heals the *raw* damage, and nothing stops an ally from hitting you with it on purpose. If a PC has absorption to fire (5 points on a legendary item, or a species affinity), a L10 ally with Might 9 and an at-will fire power (~3d10) heals them **~25.5 HP per Major Action, unlimited.** That beats tier-4 healing (13.5) and gets around GB-11's "healing is never at-will". Area fire from allies becomes free group healing for that PC.
*Suggested lever:* **absorption heals only from hostile sources.** Damage from an ally's power is treated as immunity (0, no healing). Also state: **with mixed-type damage, absorption heals only the absorbed type's portion**, and Might counts toward the power's main type, not a rider's. Otherwise, raw healing (dice + Might + flat) is fine: absorption is the rarest affinity and costs 5 points.

**`[GB-32]` Healing rituals make the short rest's HP irrelevant (§7, §9). Medium.** A short rest and six healing rituals take the same hour. Rituals out-heal the ¼ hpMax from tier 1 up (21 vs. 6–25), and from tier 2 they fully heal most characters. With a ritual healer in the party, every short rest is a long rest for HP, and **MP is the only attrition**. That matches GB-22's "fights start fresh". Whether it's a problem depends on whether the user wants HP attrition between fights at all.
- **¼ MP on a short rest is about right.** Casters get ~2–2.7 fights per long rest with no short rests, and **~3–4 with two short rests**, at every level. Each short rest is worth ~0.5–0.7 of a fight. Keep it.
- **¼ HP on a short rest is fine on its own**, but only matters for parties without a ritual healer.
*Suggested lever (only if HP attrition is wanted):* **a creature can benefit from one healing ritual per rest** (short or long). Or: casting rituals during a short rest means the caster doesn't get the short rest's benefits. Either one keeps rituals free and fun without replacing rests.

**`[GB-33]` Items can stack skill ranks (B2, §11). Medium; sent to the items designer.** "Items that add +2 to a skill count as one rank toward the cap" stops items from going past the cap, but not from replacing level ranks. B2 prices +2 to a skill at 1 point, and cursed can use "anything". So a mythical item (6 points) could give +2 in six skills, which is **six free ranks: 40% of a whole career's rank budget** (~15), from one accessory.
*Suggested lever:* **at most one skill bonus per item** (+2, one skill). Gear then gives at most 5 ranks across 5 slots, and more realistically 1–2.

**`[GB-34]` The skill curve meets the user's goals; three clarifications (§11). Low.**
- **Never trivial, never impossible:** yes. Natural 1/20 keep every check between 5% and 95%.
- **Investing clearly matters:** yes, though less at L1. A capped specialist beats untrained by **+20 points at L1** (DC 15: 50% vs. 30%), growing to **+50 at L10** (80% vs. 30%). If L1 should feel more distinct, the lever is a rank cap of 3 at L1–3, not more ranks.
- **The untrained can get lucky:** yes. 30% at DC 15, and 5% (natural 20) at DC 20+.
- **1 rank per level is the right amount.** A character ends at ~15 rank points: about 3 skills at the cap at every tier, or broad coverage at rank 1–2. A party of 4 covers all 22 skills at an average rank of ~2.7 by L10. More ranks would erase the cap's job; fewer would leave parties with uncovered skills.
- *Clarify in §11:*
  1. Does L1 itself grant a rank ("each level" reads as yes)?
  2. A background "+1 rank" on a skill the profession doesn't give means rank 1.
  3. Ranks over the cap from profession + background overlap can't happen at L1 (1 + 1 = 2 = cap), but say it so seeds don't stack a third source.
