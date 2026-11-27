# RPGHub Profession Catalog

Each profession's numbers. The rules they follow (the shared budget, HP/MP growth, level-reward grant types, the tank trait at L1) are in GAME_RULES §2, §7 and §11. The math behind the numbers is in [BALANCE_PROFESSIONS.md](BALANCE_PROFESSIONS.md).

Part of the RPGHub design docs (index at the top of [GAME_RULES.md](GAME_RULES.md)). **§n** means a GAME_RULES section; **B-n** means a section of [BALANCE_ITEMS.md](BALANCE_ITEMS.md).

---

## 1. Base stats (draft v1)

Stored as each profession's `statModifiers` (the model already accepts every stat, including hpMax, mpMax and initiative).

**The budget is the same for every profession:**

- **Combat stats:** one 3, one 2, two 1s, two 0s across Might, Accuracy, Dominance, Resilience, Evasion and Resolve (7 points).
- **HP + MP = 40**, split by profession. **HP is never below 24** (GB-16), so even the fragile professions survive about 2.5–3 hits. Their identity shows in growth: they gain less HP and more MP per level (section 7).
- **Initiative 0–2**, a small extra that's outside the budget.

| Profession  | Might | Accuracy | Dominance | Resilience | Evasion | Resolve | HP  | MP  | Init | Identity                                                                                   |
| ----------- | :---: | :------: | :-------: | :--------: | :-----: | :-----: | :-: | :-: | :--: | ------------------------------------------------------------------------------------------ |
| Warrior     | **3** |    1     |     0     |     2      |    0    |    1    | 28  | 12  |  1   | Hits hard, takes hits                                                                      |
| Knight      |   1   |    0     |     1     |   **3**    |    0    |    2    | 30  | 10  |  0   | The wall                                                                                   |
| Rogue       |   1   |  **3**   |     1     |     0      |    2    |    0    | 24  | 16  |  2   | Precise, slippery, hamstrings                                                              |
| Ranger      |   2   |  **3**   |     0     |     0      |    1    |    1    | 24  | 16  |  1   | Lands every shot                                                                           |
| Paladin     |   2   |    0     |     1     |     1      |    0    |  **3**  | 26  | 14  |  0   | Unshakable conviction                                                                      |
| Warlock     | **3** |    0     |     2     |     0      |    1    |    1    | 24  | 16  |  0   | Borrowed raw power                                                                         |
| Witch       |   1   |    0     |   **3**   |     0      |    1    |    2    | 24  | 16  |  0   | Hexes and curses                                                                           |
| Wizard      |   1   |  **3**   |     2     |     0      |    0    |    1    | 24  | 16  |  0   | Studied precision                                                                          |
| Sorcerer    | **3** |    2     |     1     |     1      |    0    |    0    | 24  | 16  |  1   | Innate, volatile force                                                                     |
| Magician    |   0   |    1     |     2     |     0      |  **3**  |    1    | 24  | 16  |  2   | Misdirection, never where you aim                                                          |
| Summoner    |   0   |    1     |     2     |     1      |    0    |  **3**  | 24  | 16  |  0   | Strong will binds allies                                                                   |
| Psychic     |   0   |    2     |   **3**   |     0      |    1    |    1    | 24  | 16  |  1   | Takes over minds                                                                           |
| _Classless_ |   1   |    1     |     1     |     1      |    1    |    1    | 24  | 16  |  0   | Even spread, plus 1 free point. Has no profession, so this base needs a home in constants. |

**Spread check:** each defense has a profession built around it (Knight for Resilience, Magician for Evasion, Paladin and Summoner for Resolve). Might, Accuracy and Dominance each lead for 2–3 professions.

## 2. HP and MP growth (draft)

| Profession  | HP / level | MP / level | HP at L10 | MP at L10 |
| ----------- | :--------: | :--------: | :-------: | :-------: |
| Knight      |     8      |     2      |    102    |    28     |
| Warrior     |     7      |     3      |    91     |    39     |
| Paladin     |     7      |     3      |    89     |    41     |
| Rogue       |     6      |     4      |    78     |    52     |
| Ranger      |     6      |     4      |    78     |    52     |
| Warlock     |     5      |     5      |    69     |    61     |
| Witch       |     5      |     5      |    69     |    61     |
| Sorcerer    |     5      |     5      |    69     |    61     |
| Magician    |     5      |     5      |    69     |    61     |
| Wizard      |     4      |     6      |    60     |    70     |
| Summoner    |     4      |     6      |    60     |    70     |
| Psychic     |     4      |     6      |    60     |    70     |
| _Classless_ |     5      |     5      |    69     |    61     |

Stored as an `hpMax` and `mpMax` entry in every level's `levelRewards[].statIncreases` (level 1 is the base, so growth applies at levels 2–10). This needs no schema change.

## 3. Class identity and level tracks (draft v1)

**Status: approved by the user as the design direction (2026-11-26). Not balanced.** This section captures what each class should _feel_ like. The balancer may move, resize or swap any grant. Changing a class's core or a path's identity needs the user.

### 3.1 Design principles (user)

- **Choice, never a pigeonhole.** Each class feels different from every other class, _and_ two players of the same class feel different. A life Witch heals, supports and controls. A death Witch harms, hexes and curses.
- **Core + paths.** Every class has a **core**: the signature mechanic all its members share, which makes it unlike other classes. Each class has **three paths**, which make players of the same class unlike each other. **The path is chosen at level 1.**
- **No lockout.** No class owns a school, element or weapon. A class or path _specializes_: it gets more out of its field, but anyone can use that field.
- **Class-only techniques are traits.** Techniques come from weapons, so a class-specific technique is granted by a trait of that class (`grantedPowers`).
- **Four kinds of creature companion, four jobs.** The Cavalier's mount carries. The Beastmaster's companion fights. The Witch's familiar delivers spells. The Summoner's spirits are temporary and plentiful. Mounts and companions use the summon rule (BALANCE_POWERS PQ-3/PB-4) **with no duration**.

### 3.2 The shared skeleton

Every class follows the same cadence, so the balancer compares _contents_, not timing. HP and MP grow every level (section 2) and aren't repeated below. Tier unlocks (T2 at L4, T3 at L7, T4 at L10) come from `minLevel` and aren't repeated either.

| Level | Grant                                                                                                                     | Stat bump          | Slot |
| :---: | ------------------------------------------------------------------------------------------------------------------------- | ------------------ | :--: |
|   1   | **Core I** (`auto`) + **path choice** (`professionChoice` of three path traits). The path trait is the path's L1 feature. | —                  |  —   |
|   2   | **Core II** (`auto`)                                                                                                      | —                  |  —   |
|   3   | **Path II**                                                                                                               | —                  |  +1  |
|   4   | **Free pick** (`playerChoice`)                                                                                            | +1 primary         |  —   |
|   5   | **Core III** (`auto`)                                                                                                     | —                  |  +1  |
|   6   | **Path III**                                                                                                              | —                  |  —   |
|   7   | **Free pick** (`playerChoice`)                                                                                            | +1 secondary       |  —   |
|   8   | **Free pick** (`playerChoice`)                                                                                            | —                  |  +1  |
|   9   | **Core IV**, mastery (`auto`)                                                                                             | —                  |  —   |
|  10   | **Path capstone**                                                                                                         | +1 any combat stat |  —   |

- **Primary** is the profession's 3 in section 1; **secondary** is its 2. Each class lists where its three slots go.
- Three free picks (L4, L7, L8) keep every build open to powers from outside the class.
- Existing catalog powers are cited by ID. Anything without an ID is **new** and goes to the power designer to build. Core grants are built in POWER_CATALOG §4.6 (TRT-63 to TRT-115), L1 path traits in §4.7 (TRT-116 to TRT-151), and L3, L6 and L10 path grants in §4.8 (TRT-152 to TRT-259). Every path grant is its own trait, so an existing power can be handed over without locking it to the path. Capstones are once per long rest unless they say otherwise.
- **Tying later grants to the path (user decision, OPEN-27 option a).** The L1 path choice is a `professionChoice` of three path traits ("Path of the X", POWER_CATALOG §4.7). Each later path grant (L3, L6, L10) is also a `professionChoice` of three options, one per path, and each option lists `requiredTraits: [its path trait]`. Only the player's own path qualifies, so the choice resolves itself. This needs no schema change, but `requiredTraits` must be enforced first (GAME_RULES Pending Code Changes).

### 3.3 Warrior: master of arms

**Core:** carries an arsenal and switches weapons mid-fight; changing weapons is how they build Momentum.
**Stats:** primary Might, secondary Resilience. **Slots:** traits (L3), abilities (L5), traits (L8).

| Level | Core grant                                                                                                                                                                                                                                                      |
| :---: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **Arsenal:** up to 3 weapons ready, one free switch per turn, proficient with every property. **Weapon Flow:** a technique made with a different weapon than your last one gives +1 Momentum (once per round). **Hold the Line** (TRT-01), the tank protection. |
|   2   | **Battle-Hardened:** Second Wind (ABL-04), and unarmed strikes count as a light, blunt weapon (Brawler, TRT-32).                                                                                                                                                |
|   5   | **Rolling Steel:** Weapon Flow also triggers on Reaction techniques.                                                                                                                                                                                            |
|   9   | **Master of Arms:** a technique can count as having one extra property from any weapon you have ready.                                                                                                                                                          |

| Path           | Feel                            | L1                                                                                                                                                                                                      | L3                                                                      | L6                                                                           | L10 capstone                                                                                                                            |
| -------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Armsmaster** | The full arsenal                | **Combination training:** a combo technique (trait-granted) usable only after a technique with a different property this round. First combo: reach or chained pull, then a heavy strike for extra dice. | A second combo (polearm into blunt: sweep, then crush the prone target) | **Weapon Dance:** two free switches per turn                                 | **Grand Combination:** three techniques from three different weapons in one turn                                                        |
| **Juggernaut** | One huge weapon                 | **Unyielding:** can't be disarmed. Being hit by a melee attack also triggers Weapon Flow.                                                                                                               | **Iron Hide:** Brace (ABL-02) as a Reaction                             | **Wrecking Ball:** heavy techniques push the target 10 ft and you can follow | **Unstoppable Force:** for 3 turns you can't be slowed, moved or stopped, and heavy techniques also hit one creature next to the target |
| **Skirmisher** | Thrown and light, always moving | **Returning Throw:** thrown weapons return to your hand at the end of your turn                                                                                                                         | **Hit and Run:** after a technique, move 10 ft                          | **Steel Rain:** a thrown technique can split its attack across two targets   | **Storm of Blades:** throw every ready weapon, one technique per weapon                                                                 |

### 3.4 Knight: the sworn protector

**Core:** holds a zone. Allies inside it are safer, and enemies who cross its edge pay for it.
**Stats:** primary Resilience, secondary Resolve. **Slots:** traits (L3), abilities (L5), traits (L8).

| Level | Core grant                                                                                                                                                                        |
| :---: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **Formation:** a 5 ft zone around you. Allies inside get +1 Evasion. An enemy that enters or leaves it lets you use your Reaction for an at-will technique (the tank protection). |
|   2   | **Shield Training:** shields offer techniques (answers PQ-8). Challenge (ABL-07).                                                                                                 |
|   5   | **Wider Line:** Formation grows to 10 ft, and the first ally hit inside it each round takes 2 less damage.                                                                        |
|   9   | **Unbreakable Line:** allies in your Formation can't be moved or knocked prone against their will. Once per round, a Formation Reaction doesn't spend your Reaction.              |

| Path         | Feel               | L1                                                                                                         | L3                                                               | L6                                                                                       | L10 capstone                                                                           |
| ------------ | ------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Bulwark**  | The shield         | Shield Wall (TRT-03). **Iron Shell:** with a shield, the first hit each round deals 2 less.                                                                                       | Immovable (TRT-06)                                               | **Bastion Step:** Shield Wall reaches allies within 10 ft, and you move to them          | Last Bastion (ABL-18)                                                                  |
| **Cavalier** | The mounted charge | **Bonded Steed:** a lasting mount. You move at its speed, and your Formation moves with you.               | **Lance Charge:** a mounted charge moves for free and deals +1d8 | **Ride Them Down:** move through enemies' spaces; each one you pass saves or falls prone | **Thunder of Hooves:** charge a 60 ft line, and allies in your Formation move with you |
| **Banneret** | The commander      | **Raise the Banner:** plant a banner. Your Formation can center on it instead of you. Battle Cry (ABL-05). | Warlord's Order (ABL-14)                                         | **Tactical Mind+:** give 1 Momentum to an ally, once per round (TRT-18, upgraded)        | **Rally to Me:** every ally gets an extra Major Action on their next turn              |

### 3.5 Paladin: the burden-bearer

**Core:** takes other people's suffering onto themselves and turns it into Conviction. Swears a new vow each fight. The Knight protects a _space_; the Paladin protects _people_.
**Stats:** primary Resolve, secondary Might. **Slots:** abilities (L3), spells (L5), traits (L8).

| Level | Core grant                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1   | **Bear the Burden:** as a Reaction, take a hit, condition or debuff meant for an ally within 10 ft. A hit uses your Resilience; a condition makes you roll the save with your Resolve. Each burden gives 1 **Conviction** (the tank protection). **Vows:** at the start of each fight, declare one vow ("None fall while I stand", "That one dies today", "I will not retreat"). Keeping it pays out; breaking it costs you for the rest of the fight. |
|   2   | **Unbowed:** spend Conviction to end a condition on yourself at the start of your turn.                                                                                                                                                                                                                                                                                                                                                                |
|   5   | **Heavier Burdens:** Bear the Burden reaches 30 ft, and you learn more vows.                                                                                                                                                                                                                                                                                                                                                                           |
|   9   | **Saint's Endurance:** a kept vow restores Conviction. Once per fight, if you're downed while carrying a burden, you rally automatically.                                                                                                                                                                                                                                                                                                              |

| Path           | Feel               | L1                                                                                                            | L3                                                                                      | L6                                                                                            | L10 capstone                                                                                      |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Martyr**     | Carries everything | **Lay Down Burdens:** spend Conviction to heal an ally (1d6 per point) or end a condition on them             | **Shared Relief:** healing from Lay Down Burdens can be split among allies              | Rally the Line (ABL-12)                                                                       | **Martyrdom:** for 1 round, take every condition and half the damage aimed at allies within 30 ft |
| **Inquisitor** | Passes judgment    | **Verdict:** spend Conviction to give a condition you carry to the creature that caused it, which saves at −2 | **Accusation:** mark a foe. Its harmful powers against your allies give you Conviction. | **Sentence:** Verdict can hit two creatures                                                   | **Final Judgment:** give back every burden at once, each to its source                            |
| **Pilgrim**    | Endures            | **Aura of Endurance:** allies within 10 ft get +1 Resolve, +1 more while you carry a burden                   | Oathbound Guard (TRT-04)                                                                | **The Long Road:** the aura grows to 20 ft, and allies in it take less from persistent damage | **Sanctuary:** for 3 turns the aura is 30 ft, and allies in it can't be frightened or charmed     |

### 3.6 Warlock: the oathbreaker

**Core:** broke an oath and now draws power that has to be paid back. A black knight who rules through fear. The Paladin's mirror: the Paladin keeps vows; the Warlock broke one.
**Stats:** primary Might, secondary Dominance. **Slots:** abilities (L3), spells (L5), traits (L8). Its fragile base line doesn't fit a black knight; see `[OPEN-29]`.

| Level | Core grant                                                                                                                                                                                                           |
| :---: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **Debt:** draw power (+1d6 damage, +2 on a roll, or shrug off 1d6 damage). Each draw adds 1 Debt. At the end of the fight, lose 1d6 HP per Debt. **Dread:** frightened enemies take −1 on saves against your powers. |
|   2   | **Borrowed Time:** pay Debt early during a fight with HP. Blood Price (ABL-35).                                                                                                                                      |
|   5   | **Deeper Debt:** a new draw, an extra Minor Action (once per fight), and a higher Debt limit                                                                                                                         |
|   9   | **Debt Collector:** when an enemy you've frightened is downed, cancel 2 Debt                                                                                                                                         |

| Path              | Feel                           | L1                                                                                  | L3                                                                                   | L6                                                                                                  | L10 capstone                                                                                    |
| ----------------- | ------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Usurper**       | Turned on their lord (Mordred) | **Steal the Crown:** when you hit a creature, take one of its active buffs (1 Debt) | **Siphon:** once per fight, take 1 Momentum from an enemy within 30 ft               | **Wear Their Strength:** after downing a foe, gain +1 to its highest stat for the rest of the fight | **Throne of Ash:** steal every buff from every enemy within 30 ft                               |
| **Fallen Knight** | The black knight               | **Black Steel:** your techniques can deal dark instead of their physical type       | **Aura of Dread:** enemies within 10 ft save or are frightened when the fight starts | **Cursed Blade:** once per turn, a Debt draw on a technique costs no Debt                           | **Ruin Knight:** for 3 turns you build no Debt, and frightened enemies can't move away from you |
| **Pactbound**     | Sold their soul                | Patron's Gift (TRT-41). **Soul Collateral:** max Debt +2, and Debt costs 1d4 HP each instead of 1d6.                                                              | Blood Magic (TRT-36)                                                                 | Infernal Bargain (ABL-40)                                                                           | **Patron Made Manifest:** your patron's avatar fights beside you for 3 turns                    |

### 3.7 Rogue: the opportunist

**Core:** exploits the moment. Any condition on an enemy, from anyone, is an opening for the Rogue. Moves by footwork, not magic (the Magician teleports).
**Stats:** primary Accuracy, secondary Evasion. **Slots:** abilities (L3), traits (L5), abilities (L8).

| Level | Core grant                                                                                                                                                                                                                     |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1   | **Openings:** when you hit a target that has any condition, pick one effect instead of extra damage: threat margin 8, knock its weapon away, steal a small item, −10 ft movement, or a 1d4 bleed (persistent). Feint (ABL-19). |
|   2   | **Tumble:** move through enemies' spaces, and climbing costs no extra movement                                                                                                                                                 |
|   5   | **Double Opening:** once per turn, pick two Opening effects on one hit                                                                                                                                                         |
|   9   | **Every Weakness:** a target an ally hit this round counts as having an opening                                                                                                                                                |

| Path         | Feel               | L1                                                                                                        | L3                                                                     | L6                                                                    | L10 capstone                                                                                        |
| ------------ | ------------------ | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Duelist**  | One on one         | Riposte (TEC-23, granted). **En Garde:** +1 Evasion while only one enemy is in your reach.                | **Feint Mastery:** a successful Feint creates an opening               | **Bind the Blade:** a riposte that hits also disarms                  | **Untouchable:** for 3 turns, every melee miss against you triggers a riposte without your Reaction |
| **Assassin** | One perfect strike | **Venom Kit:** coat your weapon (Minor). Your next hit poisons, which creates an opening.                 | **From the Shadows:** attacking from hiding counts as an opening       | Death Mark (ABL-30)                                                   | **Killing Stroke:** a hit on a target with an opening that leaves it below ¼ HP downs it            |
| **Saboteur** | Dirty tricks       | Smoke Bomb (ABL-22). **Bag of Tricks:** caltrops, flash powder and a tripwire, each usable once per rest. | **Cut the Straps:** the target's armor gives −1 Resilience (save-ends) | **Dirty Fighting:** allies' hits on a target you've tricked deal +1d4 | **Grand Heist:** steal a held item, or one use of a granted power, from an enemy                    |

### 3.8 Ranger: the hunter

**Core:** reads prey and ground over the whole fight and outside it. The Rogue reads _moments_; the Ranger reads _the hunt_.
**Stats:** primary Accuracy, secondary Might. **Slots:** abilities (L3), traits (L5), abilities (L8).

| Level | Core grant                                                                                                                                                                                                                                                                        |
| :---: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **The Hunt:** Quarry (ABL-24). Each round you track it, learn one more thing about it: its defenses, then its affinities, then its weak point (+1d6 against it). **Fieldcraft:** at the start of a fight, claim or prepare one feature: half cover, a snare, or a perch (+range). |
|   2   | **Tracker:** Relentless Pursuit (TRT-35), plus tracking outside combat                                                                                                                                                                                                            |
|   5   | **Seasoned Hunter:** two Fieldcraft features, and what you learn about a Quarry carries into later fights against the same creature                                                                                                                                               |
|   9   | **Apex Hunter:** when your Quarry is downed, mark a new one for free and keep one level of knowledge                                                                                                                                                                              |

| Path            | Feel                 | L1                                                                                | L3                                                                                                             | L6                                                                                     | L10 capstone                                                                                  |
| --------------- | -------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Marksman**    | The impossible shot  | Deadeye (TRT-22). **Steady Aim:** give up moving for +2 Accuracy on a ranged attack.                                                                  | **Called Shot:** on the Quarry's weak point, also cripple its leg, arm or eye (−movement, −Accuracy or disarm) | **Far Shot:** double range                                                             | **One Shot:** a ranged attack against your Quarry hits automatically and is a critical threat |
| **Beastmaster** | Hunts with a partner | **Animal Companion:** a lasting beast (wolf, hawk or bear) that fights beside you | **Pack Hunt:** you and your companion get +1 Accuracy against a target the other hit this round                | **Wild Bond:** once per round, the companion acts without a command                    | **Alpha:** your companion grows huge and savage for 3 turns                                   |
| **Trapper**     | The ground itself    | **Snares:** set up to 2 traps per fight (restrained or grappled, save)            | **Lay of the Land:** difficult terrain doesn't slow you, and you get one more Fieldcraft feature               | **Killing Ground:** enemies on ground you prepared take −2 on saves against your traps | **The Pit:** the ground collapses: area prone and restrained                                  |

### 3.9 Wizard: the grammar of magic

**Core:** knows more spells than any other class, and writes **glyphs**, words that reshape a spell. A spell is a sentence; a glyph is a word written into it. Glyphs are never cast on their own, and each one adds MP to the spell's cost.
**Stats:** primary Accuracy, secondary Dominance. **Slots:** spells (L3), spells (L5), spells (L8).

| Level | Core grant                                                                                                                                                                                                    |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **Spellbook:** you know more spells than you have slots, and you swap which are slotted after a long rest. **Glyphs:** learn two: **Extend** (double range) and **Widen** (area +10 ft). One glyph per spell. |
|   2   | **Scribe:** copy spells from scrolls and other casters into your book. Ritualist (TRT-38).                                                                                                                    |
|   5   | **Fluent:** two glyphs per spell. Learn **Split** (a second target) and **Shift** (change the damage type).                                                                                                   |
|   9   | **Grammar of Magic:** three glyphs per spell, and swap one slotted spell on a short rest. Learn **Delay** (waits for a trigger) and **Seal** (inscribed on a surface, so it lasts).                           |

| Path            | Feel        | L1                                                                                                | L3                                                                                            | L6                                                                            | L10 capstone                                                       |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Scholar**     | Breadth     | **Vast Library:** +1 spell slot, and 2 more spells known                                          | **Quick Study:** once per long rest, cast a spell from your book that isn't slotted           | **Arcane Analysis:** as a Minor Action, learn a target's affinities           | **Archmage's Recall:** cast any spell in your book for half its MP |
| **Glyphwright** | Composition | **Glyph Fluency:** learn one extra glyph, and the first glyph you write each turn costs 1 less MP | **Compose:** invent a new glyph (for example, Echo: the spell repeats next turn at half dice) | **Stacked Script:** +1 glyph per spell                                        | **Masterwork Spell:** write every glyph you know into one spell    |
| **Warden**      | Preparation | **Sealed Words:** learn Delay and Seal at L1. Up to 2 sealed glyphs active.                       | Sentinel Thread (WAR-04). You sense glyphs and traps.                                                   | **Warding Circle:** a sealed glyph can be a protective zone (allies +Resolve) | **Fortress of Script:** inscribe up to 5 sealed glyphs at once     |

### 3.10 Sorcerer: the ominous

**Core:** _sorcery_ comes from _sors_, Latin for "lot" or "fate": casting lots, reading omens, pronouncing doom. The Sorcerer sees how rolls will fall, marks a target's fate and makes it come true. It keeps raw force, but its power feels like a prophecy coming true.
**Stats:** primary Might, secondary Accuracy. **Slots:** spells (L3), abilities (L5), spells (L8).

| Level | Core grant                                                                                                                                                                                                                                                                     |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1   | **Foresight:** at the start of each of your turns, roll a d20 and set it aside. As a Reaction, use it in place of any d20 roll you can see. **Omens:** mark a target (Minor). Each roll it fails adds an omen (max 3), and your powers against it grow stronger with each one. |
|   2   | **Fate Surge:** a natural 1 or 20 on your spells rolls on the fate table (in TRT-98; replaces Wild Magic, TRT-40). Nudge Fate (MNP-02).                                                                                                                                        |
|   5   | **Two Fates:** roll two Foresight dice each round and keep either                                                                                                                                                                                                              |
|   9   | **Fate Sealed:** once per round, Foresight doesn't need your Reaction                                                                                                                                                                                                          |

| Path             | Feel          | L1                                                                                     | L3                                                         | L6                                                                                                             | L10 capstone                                                                |
| ---------------- | ------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Doomsayer**    | Fate          | **Pronounce Doom:** a target with omens takes −1 on every d20 roll per omen            | Bend Luck (MNP-05)                                         | **Prophecy:** declare what will happen ("you will fall"). If it comes true by the end of the fight, regain MP. | **Doom Fulfilled:** a target with 3 omens automatically fails its next save |
| **Chronomancer** | Time          | **Borrowed Seconds:** +2 Initiative, and you win ties                                  | **Echo:** once per short rest, undo your own last movement | **Stutter Time:** once per fight, Heavy Hours (MNP-09) as a Reaction                                                  | Stolen Moment (MNP-17)                                                      |
| **Stormcaller**  | Ominous force | **Black Sky:** omens on a target add +1 damage each to your lightning and force spells | Elemental Focus (TRT-33)                                   | Overwhelm (TRT-34)                                                                                             | Living Storm (ABL-42)                                                       |

### 3.11 Witch: moon, cauldron and familiar

**Core:** draws power from the moon's phases, brews in a cauldron, and keeps a familiar. Witch powers carry a phase bonus that works only in the right phase.
**Stats:** primary Dominance, secondary Resolve. **Slots:** spells (L3), abilities (L5), spells (L8).

| Level | Core grant                                                                                                                                                                              |
| :---: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **Moon Phase:** in combat the phase advances one step each turn (new, waxing, full, waning). **Call the Moon** (Minor Action) jumps to the phase you choose. Witch's Familiar (TRT-42). |
|   2   | **Cauldron:** on a long rest, brew draughts, salves and poisons. The number grows with level.                                                                                           |
|   5   | **Phase Echo:** the previous phase's bonus lasts one more turn. The cauldron brews more.                                                                                                |
|   9   | **Eclipse:** once per fight, two phases are active at once for a turn                                                                                                                   |

| Path      | Phases       | Feel                      | L1                                                                                                 | L3                                                                         | L6                                                                                  | L10 capstone                                                                   |
| --------- | ------------ | ------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Life**  | Waxing, full | Healing, support, control | **Bloom:** your healing heals +1 per die in waxing and full. Hare or owl familiar.                 | **Rooting:** your entangle and restrain effects get harder saves in waxing | **Green Sanctuary:** allies near your familiar regain a little HP each turn in full | **Spring Eternal:** the full moon holds for 3 turns, and your healing persists |
| **Death** | New, waning  | Harm, hexes, curses       | Hex (ABL-34). **Curse Craft:** your hexes save at −1 more in the new moon. Raven or toad familiar. | Lingering Hex (TRT-30)                                                     | **Rot Spreads:** when a hexed target is downed, the hex jumps to another creature   | **Black Moon:** hex every enemy within 30 ft                                   |
| **Wild**  | Full         | Beast form, raw nature    | **Beast Shape:** take a beast's form, stronger under the full moon. Wolf or cat familiar.          | **Feral Familiar:** your familiar can fight                                | **Second Skin:** learn a second beast form                                          | **Moonbeast:** become a great beast of the moon for 3 turns                    |

### 3.12 Magician: trickery and illusion

**Core:** never where you aim. Doubles, misdirection and wasted enemy actions. The Magician _fools_ minds; the Psychic _takes_ them.
**Stats:** primary Evasion, secondary Dominance. **Slots:** spells (L3), abilities (L5), spells (L8).

| Level | Core grant                                                                                                                                                        |
| :---: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **Doubles:** create one illusory copy of yourself (Minor). When you're targeted, use your Reaction to swap places with a double, so the attack hits the illusion. |
|   2   | **Sleight of Hand:** Sleight (ABL-20). Your spells can start from a double.                                                                                       |
|   5   | **Second Double:** two doubles at once                                                                                                                            |
|   9   | **Which One Is Real:** once per round, a double can use one of your at-will powers                                                                                |

| Path            | Feel                  | L1                                                                           | L3                                                              | L6                        | L10 capstone                                                        |
| --------------- | --------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------- |
| **Illusionist** | Doubles and phantasms | **Phantasm:** create a still illusion: a wall, an object or a figure (Minor) | **Convincing:** enemies must save to see through your illusions | Many Selves (NOE-15)    | **Grand Illusion:** an illusory scene for 3 turns                   |
| **Escapist**    | Blinks and vanishing  | Fold Step (MNP-03). **Escape Artist:** +2 against grapples and restraints; Fold Step ends them.                                                             | **Through the Mirror:** teleport to any double                  | Disappearing Act (ABL-27) | Vanishing Trick (ABL-29), with your double acting while you're gone |
| **Misdirector** | Distraction           | Misdirection (ABL-25). **Wrong Target:** redirected attacks can't crit and leave the attacker open.                                                        | **Look Over There:** an enemy wastes its Minor Action (save)    | Swap (MNP-11)             | **The Prestige:** for 1 round, every enemy attack is redirected     |

### 3.13 Summoner: will that binds

**Core:** calls spirits by their true names and holds them with Resolve. Summons are temporary and plentiful.
**Stats:** primary Resolve, secondary Dominance. **Slots:** spells (L3), traits (L5), spells (L8).

| Level | Core grant                                                                                                                                                                                                                                                             |
| :---: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **True Names:** know two spirits' names (for example, Spirit Wolf CON-04 and Spirit Spark CON-02). Each name is a spirit you can call. **Bond:** see through a summon, swap places with it, or release it on purpose for a final effect (a burst, a heal or a shield). |
|   2   | **Another Name:** a third name. Spirit Hand (CON-01).                                                                                                                                                                                                                  |
|   5   | Soulbond (TRT-43)                                                                                                                                                                                                                                                      |
|   9   | Twin Bind (TRT-44)                                                                                                                                                                                                                                                     |

| Path       | Feel               | L1                                                                            | L3                                                          | L6                                                                                                                                                      | L10 capstone                                                                         |
| ---------- | ------------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Legion** | Many small spirits | **Swarm Call:** call three tiny spirits (1 HP each)                           | **Many Hands:** one Minor Action commands two small spirits | **Pack Call:** when you summon a T1 spirit, two of it appear (one Minor still commands one). Spirit Pack (CON-11, T3) stays open to free picks from L7. | **Endless Host:** for 3 turns, every downed spirit returns at the start of your turn |
| **Binder** | One great spirit   | **Bound Spirit:** one great spirit that grows with your level                 | **Evolve:** your spirit gains a trait of your choice        | **Shared Senses:** your spirit uses your Resolve and your senses at any distance                                                                        | Call the Host (CON-13), as your spirit's true form                                   |
| **Medium** | The spirit within  | **Possession:** channel a spirit into yourself and gain its trait for 3 turns | **Lend a Spirit:** channel one into an ally                 | **Two Within:** hold two spirits at once                                                                                                                | **Ascension:** become a spirit for 3 turns                                           |

### 3.14 Psychic: raw mental force

**Core:** links minds. Allies share thoughts; enemies are read and used.
**Stats:** primary Dominance, secondary Accuracy. **Slots:** spells (L3), abilities (L5), spells (L8).

| Level | Core grant                                                                                                                               |
| :---: | ---------------------------------------------------------------------------------------------------------------------------------------- |
|   1   | **The Web:** link up to 2 minds (Minor). Linked allies talk telepathically. Your powers can start from a linked enemy. Whisper (NOE-03). |
|   2   | **Read Intent:** Sense Thoughts (NOE-04). A linked enemy reveals its target before it acts.                                              |
|   5   | **Wider Web:** 4 links, and linked allies can share Momentum                                                                             |
|   9   | **Hive:** 6 links. Once per round, a power that hits one linked enemy also hits another.                                                 |

| Path            | Feel             | L1                                               | L3                                                   | L6                                                             | L10 capstone                                                           |
| --------------- | ---------------- | ------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Dominator**   | Takes control    | Beguile (NOE-05). **Hold Fast:** allies harming your charmed target don't break the charm outright.                                   | **Iron Grip:** linked enemies save at −1 against you | Mind Lock (NOE-13)                                             | Seize the Will (NOE-21)                                                      |
| **Telekinetic** | Mind over matter | Hurl (NOE-10). **Lift:** move objects with your mind; Hurl needs no held object.                                    | **Grip:** lift and move a creature 10 ft             | **Kinetic Shield:** as a Reaction, stop a projectile           | **Mountain Mover:** lift and throw anything in a 20 ft sphere          |
| **Empath**      | The shared mind  | **Share Pain:** split damage among linked allies | Mental Fortress (NOE-09)                             | **Common Mind:** linked allies use the best Resolve among them | **One Mind:** for 3 turns, linked allies can act on each other's turns |
