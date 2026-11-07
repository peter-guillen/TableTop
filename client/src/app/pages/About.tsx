import {
  ink,
  inkAccent,
  inkPrimary,
  inkSubtle,
  line,
  surface,
  surfaceSunken,
} from "../../shared/styles/theme.ts";

const prose = `max-w-[62ch] ${ink}`;
const codeChip = `rounded border px-1.5 py-0.5 font-mono text-[0.92em] ${line} ${surfaceSunken} ${inkAccent}`;

function LevelTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`mb-3 inline-block rounded border px-2 py-0.5 font-mono text-[0.72rem] font-semibold tracking-wide ${line} ${surfaceSunken} ${inkPrimary}`}
    >
      {children}
    </span>
  );
}

function Section({
  tag,
  children,
}: {
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <LevelTag>{tag}</LevelTag>
      {children}
    </section>
  );
}

export function About() {
  return (
    <div className={`min-h-screen font-serif leading-relaxed ${surface} ${ink}`}>
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        <header className="mb-14">
          <svg
            viewBox="0 0 34 34"
            className={`mb-6 h-8 w-8 ${inkPrimary}`}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M17 1.5 31.5 9v16L17 32.5 2.5 25V9Z"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M17 1.5V17M17 17 31.5 9M17 17 2.5 9M17 17V32.5M17 17 2.5 25M17 17 31.5 25"
              className="text-emerald-700 dark:text-emerald-500"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.7"
            />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight mb-2">
            Peter — builder of RPGHub
          </h1>
          <p className={`font-mono text-sm ${inkAccent}`}>
            self-taught developer · RPGHub designer
          </p>
        </header>

        <Section tag="LV 01">
          <p className={`mb-4 ${prose}`}>
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
          <p className={`mb-4 ${prose}`}>
            I began trying to implement features, but I couldn't create what I
            was imagining. I spent so much time reading docs, watching videos,
            banging my head against the keyboard, or going for a run to question
            my life choices. But I persevered, slowly but surely. I'd solve a
            problem, encounter another problem, and so on. Like Sisyphus, I
            would climb and fall, climb and fall. Some might call this
            recursive.
          </p>
          <p className={prose}>
            That's actually not a bad thing. Programming is always evolving and
            changing. It's an opportunity to keep learning. Once you accept
            that, it's like seeing the stars.
          </p>
        </Section>

        <Section tag="LV 03 — BOSS: ASYNC">
          <p className={prose}>
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
          <p className={prose}>
            Others were small but no less painful, like hitting your pinky toe
            on a corner in the dark. A bad variable name, and no matter what I
            did, the data wouldn't load. Correct API logic, correct controllers,
            correct routes, and still nothing. Giving myself chills just
            thinking about it. This is when I learned why TypeScript was
            created. Painful to learn, but worth it, because it will scream at
            you like a teacher with a red marker:{" "}
            <code className={codeChip}>
              this type doesn't exist; did you mean this?
            </code>{" "}
            Which is a good thing, trust me.
          </p>
        </Section>

        <Section tag="LV 05">
          <p className={prose}>
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
          <p className={prose}>
            RPGHub became my capstone project. Why? Because what nerd
            hasn't arrogantly said, "D&D is so flawed, I could do a better job"?{" "}
            <span className={`italic ${inkSubtle}`}>
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

        <div className={`mt-12 border-t pt-8 ${line}`}>
          <p className={`mb-4 text-lg ${prose}`}>
            I didn't set out to make the next D&D, though that would be nice. I
            set out to learn to code and build something I was passionate about.
            Something I'd see through from start to finish.
          </p>
          <p className={`text-lg ${prose}`}>
            From{" "}
            <code className={codeChip}>
              &lt;!DOCTYPE html&gt;
            </code>{" "}
            to Production.
          </p>
        </div>

        <footer className={`mt-16 font-mono text-xs ${inkSubtle}`}>
          rpghub · about
        </footer>
      </div>
    </div>
  );
}
