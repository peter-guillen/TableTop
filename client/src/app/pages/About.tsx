// AboutPage.jsx
// Assumes Tailwind is configured project-wide (per RPGHub's existing setup).
// Palette below (amber/moss/charcoal) mirrors the earlier HTML draft — swap
// the color classes if you want this to match RPGHub's existing theme tokens.

function LevelTag({ children }) {
  return (
    <span className="inline-block font-mono text-[0.72rem] tracking-wide text-amber-500 bg-stone-800/60 border border-stone-700 rounded px-2 py-0.5 mb-3">
      {children}
    </span>
  );
}

function Section({ tag, children }) {
  return (
    <section className="mb-10">
      <LevelTag>{tag}</LevelTag>
      {children}
    </section>
  );
}

export function About() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-serif leading-relaxed">
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        <header className="mb-14">
          <svg
            viewBox="0 0 34 34"
            className="w-8 h-8 mb-6"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M17 1.5 31.5 9v16L17 32.5 2.5 25V9Z"
              stroke="#c9873f"
              strokeWidth="1.3"
            />
            <path
              d="M17 1.5V17M17 17 31.5 9M17 17 2.5 9M17 17V32.5M17 17 2.5 25M17 17 31.5 25"
              stroke="#5c7a63"
              strokeWidth="0.8"
              opacity="0.7"
            />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight mb-2">
            Peter — builder of RPGHub
          </h1>
          <p className="font-mono text-sm text-emerald-700">
            self-taught developer · tabletop designer
          </p>
        </header>

        <Section tag="LV 01">
          <p className="text-stone-100 mb-4 max-w-[62ch]">
            I began this journey to teach myself to code. HTML, CSS, JavaScript.
            It was fun and cool changing colors! I thought, wow, this is easy. I
            can totally do this. Then I got to JavaScript and learned
            Primitives, Booleans, Objects, Arrays, and Functions. Okay, a bit
            more challenging, but I was still confident. Until I reached
            Object-Oriented Programming, Data Structures, and Algorithms. Then
            my confidence took a hit. A Mike Tyson hit. That's the great thing
            about programming though. It can be incredibly humbling but also
            incredibly rewarding. I hope this tirade illustrates that.
          </p>
        </Section>

        <Section tag="LV 02">
          <p className="text-stone-100 mb-4 max-w-[62ch]">
            I began trying to implement features, but I couldn't create what I
            was imagining. I spent so much time reading docs, watching videos,
            banging my head against the keyboard, or going for a run to question
            my life choices. But I persevered, slowly but surely. I'd solve a
            problem, encounter another problem, and so on. Like Sisyphus, I
            would climb and fall, climb and fall. Some might call this
            recursive.
          </p>
          <p className="text-stone-100 max-w-[62ch]">
            That's actually not a bad thing. Programming is always evolving and
            changing. It's an opportunity to keep learning. Once you accept
            that, it's like seeing the stars.
          </p>
        </Section>

        <Section tag="LV 03 — BOSS: ASYNC">
          <p className="text-stone-100 max-w-[62ch]">
            Some problems were large. Async/await, I'm looking at you. My data
            would be old or stale, and I couldn't for the life of me figure out
            why. The API was fine, FormData was fine, but maybe I forgot the
            async or await keyword, maybe something was happening in an order I
            didn't expect, maybe the moon was on the wrong side of the Earth. It
            happens a lot. Watch out for them. Something like RTK Query can
            mitigate some of it, but in the end, sometimes the problem is just
            code I wrote poorly.
          </p>
        </Section>

        <Section tag="LV 04">
          <p className="text-stone-100 max-w-[62ch]">
            Others were small but no less painful, like hitting your pinky toe
            on a corner in the dark. A bad variable name, and no matter what I
            did, the data wouldn't load. Correct API logic, correct controllers,
            correct routes, and still nothing. Giving myself chills just
            thinking about it. This is when I learned why TypeScript was
            created. Painful to learn, but worth it, because it will scream at
            you like a teacher with a red marker:{" "}
            <code className="font-mono bg-stone-800/60 border border-stone-700 rounded px-1.5 py-0.5 text-emerald-600 text-[0.92em]">
              this type doesn't exist; did you mean this?
            </code>{" "}
            Which is a good thing, trust me.
          </p>
        </Section>

        <Section tag="LV 05">
          <p className="text-stone-100 max-w-[62ch]">
            After many days of drinking the tears that fell into my black tea,
            and many nights curled into the fetal position listening to
            Dashboard Confessional, I'd climb back into my chair and let the
            masochism begin again. Solving one problem after the next. The scars
            I bear aren't visible, nor the callouses on my hands. But the
            lessons are. Like a child who wants to run, I first had to learn to
            walk. I wouldn't trade the painful journey to get where I am now,
            because the cost of what I learned is far more valuable. I learned
            more than code and syntax. I learned patience, resilience,
            confidence; a lot of "ences."
          </p>
        </Section>

        <Section tag="LV 06 — CAPSTONE">
          <p className="text-stone-100 max-w-[62ch]">
            This tabletop became my capstone project. Why? Because what nerd
            hasn't arrogantly said, "D&D is so flawed, I could do a better job"?{" "}
            <span className="italic text-stone-400">
              [Insert a nasal sound and the pushing up of glasses. I do wear
              glasses, by the way. And yes, I'm dating myself.]
            </span>{" "}
            Turns out, not as easy as one thinks. Game design, balancing, magic
            systems, and all the interconnected decisions that make it work.
            It's easy to complain about something without knowing what went into
            it, and why those choices were made. D&D did a hell of a job as a
            TTRPG and D&D Beyond is a great tool that I couldn't have
            appreciated before.
          </p>
        </Section>

        <div className="mt-12 pt-8 border-t border-stone-800">
          <p className="text-lg text-stone-100 mb-4 max-w-[62ch]">
            I didn't set out to make the next D&D, though that would be nice. I
            set out to learn to code and build something I was passionate about.
            Something I'd see through from start to finish.
          </p>
          <p className="text-lg text-stone-100 max-w-[62ch]">
            From{" "}
            <code className="font-mono bg-stone-800/60 border border-stone-700 rounded px-1.5 py-0.5 text-emerald-600 text-[0.92em]">
              &lt;!DOCTYPE html&gt;
            </code>{" "}
            to Production.
          </p>
        </div>

        <footer className="mt-16 font-mono text-xs text-stone-500">
          rpghub · about
        </footer>
      </div>
    </div>
  );
}
