import {
  LuDice6,
  LuSword,
  LuShield,
  LuMove,
  LuTarget,
  LuEye,
  LuMountain,
  LuZap,
} from "react-icons/lu";
import { useState, useEffect, useRef } from "react";

export function Rules() {
  const [activeSection, setActiveSection] = useState("dice-rolling");
  const isScrollingTo = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // triggers when section is in the top 40% of the viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    isScrollingTo.current = true;

    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      setTimeout(() => {
        isScrollingTo.current = false;
      }, 800);
    }
  };

  const sections = [
    { id: "dice-rolling", label: "Dice Rolling", icon: LuDice6 },
    { id: "combat-basics", label: "Combat Basics", icon: LuSword },
    { id: "attacks-saves", label: "Attacks & Saves", icon: LuTarget },
    { id: "movement", label: "Movement & Positioning", icon: LuMove },
    { id: "cover", label: "Cover", icon: LuShield },
    { id: "flanking", label: "Flanking", icon: LuEye },
    { id: "height", label: "Height Advantage", icon: LuMountain },
    { id: "critical-hits", label: "Critical Hits", icon: LuZap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
            Basic Rules
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-300">
            Essential mechanics and rules for gameplay
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0 sticky top-24 self-start hidden lg:block">
            <nav className="bg-white/70 dark:bg-transparent rounded-xl p-4 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
              <h3 className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 mb-4 uppercase tracking-wider">
                Quick Navigation
              </h3>
              <ul className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                          activeSection === section.id
                            ? "bg-cyan-100 dark:bg-cyan-600/20 text-cyan-700 dark:text-cyan-300 border-l-2 border-cyan-500 dark:border-cyan-400"
                            : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{section.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            {/* Dice Rolling */}
            <section id="dice-rolling" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuDice6 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Dice Rolling
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-200 leading-relaxed">
                  <p>
                    Dice are the foundation of all randomness in the game.
                    Understanding when and how to roll each type of die is
                    essential.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      The d20 - Ability Checks & Attack Rolls
                    </h4>
                    <p>
                      Roll a twenty-sided die (d20) whenever you attempt an
                      action with an uncertain outcome. This includes attack
                      rolls, ability checks (Strength, Dexterity, Intelligence,
                      etc.), and saving throws. Add relevant modifiers to the
                      roll and compare against a target number.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">
                      Damage Dice - d4 through d12
                    </h4>
                    <p>
                      When you hit with an attack or a creature fails a saving
                      throw against your spell, you roll damage dice:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>
                        <strong>d4:</strong> Light weapons, weak cantrips
                      </li>
                      <li>
                        <strong>d6:</strong> Standard weapons, common spells
                      </li>
                      <li>
                        <strong>d8:</strong> Versatile or martial weapons,
                        moderate spells
                      </li>
                      <li>
                        <strong>d10:</strong> Heavy weapons, powerful spells
                      </li>
                      <li>
                        <strong>d12:</strong> Massive weapons, devastating magic
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Combat Basics */}
            <section id="combat-basics" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuSword className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Combat Basics
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Combat flows in rounds and turns. Each round represents
                    approximately 6 seconds of in-game time. On your turn, you
                    can typically move and take one action.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Turn Structure
                    </h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <strong>Move:</strong> Move up to your speed (typically
                        30 feet)
                      </li>
                      <li>
                        <strong>Action:</strong> Attack, cast a spell, dash,
                        dodge, help, or use an object
                      </li>
                      <li>
                        <strong>Bonus Action:</strong> Special abilities or
                        spells (if available)
                      </li>
                      <li>
                        <strong>Reaction:</strong> Opportunity attacks or
                        special abilities triggered by events
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Initiative
                    </h4>
                    <p>
                      At the start of combat, all participants roll initiative
                      (d20 + Dexterity modifier). This determines the turn
                      order, with highest rolls going first.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Attacks & Saving Throws */}
            <section id="attacks-saves" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuTarget className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Attacks & Saving Throws
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    There are two primary ways to resolve offensive actions:
                    attack rolls and saving throws. Understanding which to use
                    depends on the nature of your action.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Attack Rolls - Single Target
                    </h4>
                    <p className="mb-2">
                      Used for precise, targeted attacks against a specific
                      creature. This includes weapon attacks and single-target
                      spells.
                    </p>
                    <div className="bg-slate-200/70 dark:bg-slate-800/70 rounded p-3 font-mono text-sm text-cyan-700 dark:text-cyan-200 mt-2">
                      Roll: d20 + Attack Modifier vs. Target's AC
                    </div>
                    <p className="mt-3">
                      <strong>Examples:</strong> Sword swing, arrow shot,
                      Firebolt cantrip, Magic Missile, Ray of Frost
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
                      If your total equals or exceeds the target's Armor Class
                      (AC), the attack hits and you roll damage.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-3">
                      Saving Throws - Area of Effect
                    </h4>
                    <p className="mb-2">
                      Used for area-of-effect attacks or abilities that multiple
                      creatures can attempt to resist. All creatures in the area
                      must make a saving throw.
                    </p>
                    <div className="bg-slate-200/70 dark:bg-slate-800/70 rounded p-3 font-mono text-sm text-orange-600 dark:text-orange-200 mt-2">
                      Target Rolls: d20 + Save Modifier vs. Your Spell DC
                    </div>
                    <p className="mt-3">
                      <strong>Examples:</strong> Fireball, Lightning Bolt,
                      Dragon's breath weapon, Cloud of Daggers
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
                      Creatures that meet or exceed your Spell Save DC succeed
                      and typically take half damage. Those who fail take full
                      damage.
                    </p>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-400/40 dark:border-cyan-500/30 mt-4">
                    <p className="text-cyan-800 dark:text-cyan-200 font-semibold">
                      ⚔️ Rule of Thumb: Single target = Roll to hit. Multiple
                      targets = Saving throw.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Movement & Positioning */}
            <section id="movement" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuMove className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Movement & Positioning
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Tactical positioning is crucial in combat. Your location
                    relative to enemies and the terrain can dramatically affect
                    your chances of success.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Standard Movement
                    </h4>
                    <p className="mb-2">
                      Most creatures have a base movement speed of{" "}
                      <strong className="text-slate-900 dark:text-white">
                        30 feet per turn
                      </strong>
                      , which equals approximately{" "}
                      <strong className="text-slate-900 dark:text-white">
                        6 tiles
                      </strong>{" "}
                      on a standard 5-foot grid.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>
                        You can split your movement before and after your action
                      </li>
                      <li>
                        Difficult terrain costs 2 feet for every 1 foot moved
                      </li>
                      <li>
                        Standing up from prone costs half your movement speed
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Opportunity Attacks
                    </h4>
                    <p>
                      When you move out of an enemy's reach (typically 5 feet
                      for most creatures), they can use their reaction to make
                      an opportunity attack against you. Use the Disengage
                      action to move safely without provoking opportunity
                      attacks.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cover */}
            <section id="cover" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuShield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Cover
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Obstacles between you and an attacker provide cover, making
                    you harder to hit. Cover grants a bonus to your Armor Class
                    (AC) and Dexterity saving throws.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                        Half Cover
                      </h4>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        +2 AC
                      </div>
                      <p className="text-sm">
                        A creature or object covers at least half of your body.
                        Examples include low walls, large furniture, or narrow
                        tree trunks.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">
                        Three-Quarters Cover
                      </h4>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        +5 AC
                      </div>
                      <p className="text-sm">
                        An obstacle blocks at least three-quarters of your body.
                        Examples include portcullises, arrow slits, or thick
                        tree trunks.
                      </p>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-400/40 dark:border-cyan-500/30 mt-4">
                    <p className="text-cyan-800 dark:text-cyan-200">
                      <strong>Note:</strong> Cover also grants the same bonus to
                      Dexterity saving throws against attacks or effects that
                      originate from the opposite side of the cover.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Flanking */}
            <section id="flanking" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuEye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Flanking
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    When you and an ally are positioned on opposite sides of an
                    enemy, you've flanked that enemy, creating a tactical
                    advantage.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Flanking Requirements
                    </h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        You and an ally must be on{" "}
                        <strong>opposite sides</strong> of the enemy
                      </li>
                      <li>
                        Both you and your ally must be within{" "}
                        <strong>5 feet</strong> of the enemy
                      </li>
                      <li>
                        Both you and your ally must be able to see and reach the
                        enemy
                      </li>
                      <li>Neither you nor your ally can be incapacitated</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-orange-50 dark:from-cyan-900/30 dark:to-orange-900/30 rounded-lg p-6 border border-cyan-400/30 dark:border-cyan-500/30 mt-4">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-xl">
                      Advantage on Attack Rolls
                    </h4>
                    <p className="text-cyan-800 dark:text-cyan-200">
                      When you flank an enemy, you gain{" "}
                      <strong>advantage</strong> on melee attack rolls against
                      that creature. Roll two d20s and use the higher result.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      <strong>Tactical Tip:</strong> Coordinate with your allies
                      to surround enemies. Flanking can turn the tide of battle
                      by significantly increasing your chance to hit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Height Advantage */}
            <section id="height" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuMountain className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Height Advantage
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Attacking from higher ground gives you a tactical edge,
                    making your attacks more accurate and effective.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Higher Ground Bonus
                    </h4>
                    <p className="mb-3">
                      When you attack a creature that is at least{" "}
                      <strong>5 feet below you</strong> (on lower terrain,
                      stairs, or a different elevation), you gain a bonus to
                      your attack roll.
                    </p>
                    <div className="bg-gradient-to-r from-cyan-50 to-orange-50 dark:from-cyan-900/30 dark:to-orange-900/30 rounded-lg p-4 border border-cyan-400/30 dark:border-cyan-500/30">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        +2 to Hit
                      </div>
                      <p className="text-cyan-800 dark:text-cyan-200 text-sm">
                        Add +2 to your attack roll when attacking from higher
                        ground
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Examples of Height Advantage
                    </h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        Standing on a cliff or ledge attacking enemies below
                      </li>
                      <li>
                        Fighting from horseback against grounded opponents
                      </li>
                      <li>Shooting arrows from castle walls or towers</li>
                      <li>
                        Attacking from the top of stairs or elevated platforms
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-400/40 dark:border-orange-500/30 mt-4">
                    <p className="text-orange-800 dark:text-orange-200 text-sm">
                      <strong>Note:</strong> Height advantage does not stack
                      with other bonuses like flanking. The +2 bonus is applied
                      only when there is a clear elevation difference of at
                      least 5 feet.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Critical Hits */}
            <section id="critical-hits" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuZap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Critical Hits
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Critical hits represent moments of exceptional accuracy or
                    fortune in combat, dealing devastating damage to your
                    enemies.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Critical Threat Range
                    </h4>
                    <p className="mb-3">
                      Unlike traditional systems where only a natural 20 is
                      critical, this system uses a{" "}
                      <strong>threshold-based approach</strong> similar to
                      Pathfinder.
                    </p>
                    <div className="bg-slate-200/70 dark:bg-slate-800/70 rounded p-4 mt-3">
                      <p className="font-semibold text-slate-900 dark:text-white mb-2">
                        How It Works:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li>Roll your attack normally (d20 + modifiers)</li>
                        <li>
                          If your <strong>total</strong> exceeds the target's AC
                          by <strong>10 or more</strong>, it's a critical threat
                        </li>
                        <li>
                          Roll a confirmation roll (another d20 + attack
                          modifiers)
                        </li>
                        <li>
                          If the confirmation roll hits the target's AC, it's a
                          confirmed critical hit
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-orange-50 dark:from-cyan-900/30 dark:to-orange-900/30 rounded-lg p-6 border border-cyan-400/30 dark:border-cyan-500/30">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-xl">
                      Critical Damage
                    </h4>
                    <p className="text-cyan-800 dark:text-cyan-200 mb-2">
                      On a confirmed critical hit, roll all damage dice{" "}
                      <strong>twice</strong> and add your normal modifiers only
                      once.
                    </p>
                    <div className="bg-slate-200/50 dark:bg-slate-800/50 rounded p-3 mt-3 font-mono text-sm">
                      <p className="text-slate-600 dark:text-gray-300">
                        Normal Hit: 1d8 + 3 = 7 damage
                      </p>
                      <p className="text-orange-600 dark:text-orange-300">
                        Critical Hit: 2d8 + 3 = 15 damage
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Critical Hit Examples
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-slate-100 dark:bg-slate-800/50 rounded p-3">
                        <p className="text-slate-500 dark:text-gray-400 mb-1">
                          Target AC: 15 | Attack Roll: 26 total
                        </p>
                        <p className="text-slate-900 dark:text-white">
                          26 - 15 = 11 (exceeds by 10+) →{" "}
                          <span className="text-cyan-600 dark:text-cyan-300">
                            Critical Threat!
                          </span>
                        </p>
                        <p className="text-slate-500 dark:text-gray-400 mt-1">
                          Confirmation Roll: 18 (hits AC 15) →{" "}
                          <span className="text-orange-500 dark:text-orange-300 font-semibold">
                            Confirmed Critical!
                          </span>
                        </p>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800/50 rounded p-3">
                        <p className="text-slate-500 dark:text-gray-400 mb-1">
                          Target AC: 18 | Attack Roll: 27 total
                        </p>
                        <p className="text-slate-900 dark:text-white">
                          27 - 18 = 9 (doesn't exceed by 10) →{" "}
                          <span className="text-slate-500 dark:text-gray-300">
                            Normal Hit
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-400/40 dark:border-cyan-500/30 mt-4">
                    <p className="text-cyan-800 dark:text-cyan-200 text-sm">
                      <strong>Weapons with Improved Critical:</strong> Some
                      weapons or abilities may have an improved critical range
                      (threatening on exceeding AC by 8 or less). Check your
                      weapon or ability description for details.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
