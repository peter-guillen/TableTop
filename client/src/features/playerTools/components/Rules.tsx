import {
  LuDice6,
  LuSword,
  LuShield,
  LuMove,
  LuTarget,
  LuZap,
  LuFlame,
  LuHeart,
  LuSparkles,
} from "react-icons/lu";
import { useState, useEffect, useRef } from "react";

export function Rules() {
  const [activeSection, setActiveSection] = useState("dice-rolling");
  const isScrollingTo = useRef(false);

  const sections = [
    { id: "dice-rolling", label: "Dice Rolling", icon: LuDice6 },
    { id: "combat-basics", label: "Combat Basics", icon: LuSword },
    { id: "momentum", label: "Momentum", icon: LuZap },
    { id: "attacks-saves", label: "Attacks & Saves", icon: LuTarget },
    { id: "movement", label: "Movement & Positioning", icon: LuMove },
    { id: "cover", label: "Cover", icon: LuShield },
    { id: "critical-hits", label: "Critical Hits", icon: LuFlame },
    { id: "hp-mp", label: "HP & MP", icon: LuHeart },
    { id: "affinities", label: "Affinities", icon: LuSparkles },
  ];

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
        rootMargin: "-20% 0px -60% 0px",
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
                    The d20 is the foundation of all checks and actions in the
                    game. When the outcome of an action is uncertain, roll a
                    d20, apply any relevant modifiers, and compare the result
                    against a target number.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      The d20 — Checks, Attacks & Saves
                    </h4>
                    <p>
                      Roll a twenty-sided die whenever you attempt an action
                      with an uncertain outcome. This includes attack rolls,
                      ability checks, and saving throws. Add the relevant stat
                      modifier to the roll and compare the total against the
                      target's Defense, a Spell DC, or another threshold.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">
                      Damage Dice — Techniques, Spells & Skills
                    </h4>
                    <p>
                      Weapons do not have a fixed damage value. Damage is
                      determined entirely by the technique, spell, or skill
                      being used. When you hit or a save is failed, the ability
                      you used dictates which dice you roll and how many —
                      consult the ability's description for its damage formula.
                    </p>
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
                    Combat flows in rounds and turns. Each round represents a
                    brief moment of intense action. On your turn you have access
                    to three types of actions: a Major Action, a Minor Action,
                    and a Reaction.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Action Types
                    </h4>
                    <ul className="space-y-3 ml-2">
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full bg-cyan-500 flex-shrink-0" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">
                            Major Action:
                          </strong>{" "}
                          Your primary action each turn. Used for attacks,
                          casting spells, activating powerful abilities, or
                          other significant actions.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">
                            Minor Action:
                          </strong>{" "}
                          A secondary action used for quicker activities —
                          moving, drawing a weapon, using a simple item, or
                          other short tasks.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">
                            Reaction:
                          </strong>{" "}
                          A special action triggered by a specific condition,
                          taken outside of your normal turn. You have one
                          Reaction per round; it refreshes at the start of your
                          turn.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Initiative
                    </h4>
                    <p>
                      At the start of combat, all participants roll initiative
                      (d20 + relevant modifier) to determine turn order. Highest
                      result goes first.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Momentum */}
            <section id="momentum" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuZap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Momentum
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Momentum represents the flow and intensity of combat — the
                    pressure you build as a fight continues. It is a shared
                    resource that fuels additional actions and powers certain
                    abilities.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 text-center border border-cyan-500/20">
                      <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                        3
                      </div>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Starting Momentum
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 text-center border border-orange-500/20">
                      <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-1">
                        5
                      </div>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Maximum Momentum
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 text-center border border-cyan-500/20">
                      <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                        +1
                      </div>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Gained Per Turn
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                      Spending Momentum
                    </h4>
                    <p>
                      Momentum can be spent to purchase additional Major or
                      Minor Actions on your turn, letting you act more than
                      once. Abilities and class features may also have their own
                      Momentum costs or interactions — check each ability's
                      description.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">
                      Gaining Momentum
                    </h4>
                    <p>
                      You naturally gain 1 Momentum at the start of each of your
                      turns. Additional Momentum can be gained through specific
                      abilities, traits, or features — these will note the
                      amount and condition in their descriptions.
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
                    Attacks & Saves
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Offensive actions resolve through one of two tracks: attack
                    rolls for targeted strikes, and saving throws for area
                    effects and status abilities. Each track uses different
                    stats on both sides of the exchange.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Attack Rolls — Accuracy vs. Defense
                    </h4>
                    <p className="mb-2">
                      Used for targeted attacks against a specific creature. The
                      attacker rolls using their <strong>Accuracy</strong>{" "}
                      modifier against the target's <strong>Defense</strong>.
                    </p>
                    <div className="bg-slate-200/70 dark:bg-slate-800/70 rounded p-3 font-mono text-sm text-cyan-700 dark:text-cyan-200 mt-2">
                      d20 + Accuracy vs. Target's Defense
                    </div>
                    <p className="mt-3 text-sm text-slate-500 dark:text-gray-400">
                      If the total meets or exceeds the target's Defense, the
                      attack lands and damage is resolved.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-3">
                      Saving Throws — Presence DC vs. Resolve
                    </h4>
                    <p className="mb-2">
                      Used for area-of-effect abilities, spells, and effects
                      that creatures can attempt to resist. The ability's DC is
                      set by the user's <strong>Presence</strong> stat (Presence
                      + 10). All affected creatures roll their{" "}
                      <strong>Resolve</strong> to resist.
                    </p>
                    <div className="bg-slate-200/70 dark:bg-slate-800/70 rounded p-3 font-mono text-sm text-orange-600 dark:text-orange-200 mt-2">
                      DC = Presence + 10 &nbsp;|&nbsp; Target rolls d20 +
                      Resolve
                    </div>
                    <p className="mt-3 text-sm text-slate-500 dark:text-gray-400">
                      Creatures that meet or exceed the DC resist the effect,
                      typically taking reduced damage or avoiding the status
                      entirely. Those who fail suffer the full effect.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-slate-400 dark:border-slate-500">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Damage Mitigation — Resilience
                    </h4>
                    <p>
                      After an attack hits or a save is failed and damage is
                      rolled, the target applies their{" "}
                      <strong>Resilience</strong> as a flat reduction to the
                      incoming damage. Resilience is subtracted after all damage
                      dice and modifiers from the attacker have been resolved.
                    </p>
                    <div className="bg-slate-200/70 dark:bg-slate-800/70 rounded p-3 font-mono text-sm text-slate-600 dark:text-slate-300 mt-3">
                      Final Damage = Attack Damage − Resilience
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-400/40 dark:border-cyan-500/30 mt-4">
                    <p className="text-cyan-800 dark:text-cyan-200 font-semibold">
                      ⚔️ Rule of Thumb: Single target = Accuracy vs. Defense.
                      Multiple targets = Presence DC vs. Resolve.
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
                    Tactical positioning matters. Where you stand relative to
                    enemies and terrain can meaningfully affect what you and
                    your allies are capable of each turn.
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
                      , equal to approximately{" "}
                      <strong className="text-slate-900 dark:text-white">
                        6 tiles
                      </strong>{" "}
                      on a standard 5-foot grid. Movement is typically taken as
                      a Minor Action.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>
                        You can split your movement before and after your Major
                        Action
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
                      Positioning & Reach
                    </h4>
                    <p>
                      Most melee attacks have a reach of 5 feet. Some weapons or
                      abilities extend this. Ranged attacks and spells have
                      their own listed ranges — check each ability's
                      description.
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-400/40 dark:border-orange-500/30">
                    <p className="text-orange-800 dark:text-orange-200 text-sm">
                      <strong>Note:</strong> Opportunity attacks are not a
                      baseline rule. Some traits and class features may grant
                      the ability to make attacks of opportunity — check your
                      character's traits for details.
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
                    Environmental obstacles between you and an attacker provide
                    cover, making you harder to hit. Cover is a property of the
                    terrain itself — it cannot be granted by traits or features,
                    and applies to anyone in the relevant position regardless of
                    class or build.
                  </p>
                  <p>
                    Cover grants a bonus to your <strong>Defense</strong> and to{" "}
                    <strong>Resolve</strong> checks against effects originating
                    from the opposite side of the obstacle.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                        Half Cover
                      </h4>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        +2 Defense
                      </div>
                      <p className="text-sm">
                        An obstacle covers at least half of your body — low
                        walls, large furniture, narrow tree trunks, or a
                        crouching creature.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">
                        Three-Quarters Cover
                      </h4>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        +5 Defense
                      </div>
                      <p className="text-sm">
                        An obstacle blocks at least three-quarters of your body
                        — portcullises, arrow slits, thick tree trunks, or
                        similar substantial barriers.
                      </p>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-400/40 dark:border-cyan-500/30 mt-4">
                    <p className="text-cyan-800 dark:text-cyan-200">
                      <strong>Note:</strong> Cover bonuses also apply to Resolve
                      saves against attacks and effects that originate from
                      beyond the covering obstacle.
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
                    <LuFlame className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Critical Hits
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Critical hits represent moments of exceptional precision in
                    combat, dealing dramatically increased damage when your
                    attack lands far beyond what was needed to hit.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Critical Threat Range
                    </h4>
                    <p className="mb-3">
                      This system uses a{" "}
                      <strong>threshold-based approach</strong> — a critical is
                      triggered not by rolling a specific number, but by how
                      much your attack exceeds your target's Defense.
                    </p>
                    <div className="bg-slate-200/70 dark:bg-slate-800/70 rounded p-4 mt-3">
                      <p className="font-semibold text-slate-900 dark:text-white mb-2">
                        How It Works:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li>Roll your attack normally (d20 + Accuracy)</li>
                        <li>
                          If your <strong>total</strong> exceeds the target's
                          Defense by <strong>10 or more</strong>, it's a
                          critical threat
                        </li>
                        <li>
                          Roll a confirmation roll (another d20 + Accuracy)
                        </li>
                        <li>
                          If the confirmation roll meets the target's Defense,
                          the critical hit is confirmed
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
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                      Critical Hit Examples
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-slate-100 dark:bg-slate-800/50 rounded p-3">
                        <p className="text-slate-500 dark:text-gray-400 mb-1">
                          Target Defense: 15 | Attack Roll: 26 total
                        </p>
                        <p className="text-slate-900 dark:text-white">
                          26 − 15 = 11 (exceeds by 10+) →{" "}
                          <span className="text-cyan-600 dark:text-cyan-300">
                            Critical Threat!
                          </span>
                        </p>
                        <p className="text-slate-500 dark:text-gray-400 mt-1">
                          Confirmation Roll: 18 (meets Defense 15) →{" "}
                          <span className="text-orange-500 dark:text-orange-300 font-semibold">
                            Confirmed Critical!
                          </span>
                        </p>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800/50 rounded p-3">
                        <p className="text-slate-500 dark:text-gray-400 mb-1">
                          Target Defense: 18 | Attack Roll: 27 total
                        </p>
                        <p className="text-slate-900 dark:text-white">
                          27 − 18 = 9 (doesn't exceed by 10) →{" "}
                          <span className="text-slate-500 dark:text-gray-300">
                            Normal Hit
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-400/40 dark:border-cyan-500/30 mt-4">
                    <p className="text-cyan-800 dark:text-cyan-200 text-sm">
                      <strong>Improved Critical:</strong> Some weapons, traits,
                      or abilities may lower the threshold for triggering a
                      critical threat — for example, threatening on an excess of
                      8 rather than 10. Check the relevant ability or weapon
                      description for details.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* HP & MP */}
            <section id="hp-mp" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuHeart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    HP & MP
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Two core pools track your character's vitality and magical
                    capacity throughout play.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-5 border-l-4 border-cyan-500">
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2 text-lg">
                        HP — Hit Points
                      </h4>
                      <p className="text-sm">
                        HP represents your character's physical health and
                        capacity to absorb punishment. When you take damage, it
                        comes off your HP. Reaching 0 HP removes you from the
                        fight — the exact consequences depend on the situation
                        and any relevant rules in play.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-5 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2 text-lg">
                        MP — Mana Points
                      </h4>
                      <p className="text-sm">
                        MP fuels spells, techniques, and other resource-driven
                        abilities. Each ability that costs MP will list how much
                        in its description. Running out of MP limits which
                        abilities you can use, but does not directly harm you.
                      </p>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-400/40 dark:border-cyan-500/30 mt-2">
                    <p className="text-cyan-800 dark:text-cyan-200 text-sm">
                      Both pools are visible on your character sheet. Your
                      maximum values are determined by your class and relevant
                      stats, and may increase as you level up.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Affinities */}
            <section id="affinities" className="scroll-mt-24">
              <div className="bg-white/80 dark:bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                    <LuSparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Affinities
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Affinities describe a creature's relationship to specific
                    damage types. They are rare — most creatures have none — but
                    when present they can dramatically change how combat plays
                    out. Affinities are typically granted by traits, class
                    features, or creature statblocks.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                        Resistance
                      </h4>
                      <p className="text-sm">
                        Damage of the relevant type is <strong>halved</strong>{" "}
                        after Resilience is applied. Resistance is one of the
                        more common affinities and appears on both player traits
                        and certain enemies.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">
                        Vulnerability
                      </h4>
                      <p className="text-sm">
                        Damage of the relevant type is <strong>doubled</strong>{" "}
                        before Resilience is applied. Vulnerability can turn
                        even modest hits into serious threats.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-slate-400 dark:border-slate-500">
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Immunity
                      </h4>
                      <p className="text-sm">
                        The creature takes <strong>no damage</strong> from the
                        relevant type. Immunity also typically negates any
                        secondary effects of that damage type. It is rare and
                        noteworthy when encountered.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-orange-50 dark:from-cyan-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-cyan-400/30 dark:border-orange-500/30">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Absorption
                      </h4>
                      <p className="text-sm">
                        Damage of the relevant type is converted to{" "}
                        <strong>healing</strong> instead. The creature recovers
                        HP equal to the damage that would have been dealt.
                        Absorption is the rarest affinity.
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-400/40 dark:border-orange-500/30 mt-2">
                    <p className="text-orange-800 dark:text-orange-200 text-sm">
                      <strong>Note:</strong> Affinities are listed on a
                      creature's statblock or in the relevant trait or feature
                      description. Unless a specific source grants an affinity,
                      assume a creature has none.
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
