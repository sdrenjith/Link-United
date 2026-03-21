import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import SectionLabel from "../components/ui/SectionLabel";
import ScrollReveal from "../components/ui/ScrollReveal";
import AnimatedCounter from "../components/ui/AnimatedCounter";

const milestones = [
  {
    year: "Foundation",
    title: "Established with a Vision",
    body: "Founded with truth and fairness at the heart of the firm's purpose — serving clients in a rapidly changing industrial landscape.",
  },
  {
    year: "Expansion",
    title: "Global Office Network",
    body: "Expanded operations from London to Houston, Texas — building direct trade routes across 50+ countries.",
  },
  {
    year: "Today",
    title: "Industry-Leading Enterprise",
    body: "Thousands of clients, dozens of strategic mergers, and a respected voice in international commerce, climate impact, and global business.",
  },
];

const stats = [
  { label: "Countries Served", value: 50, suffix: "+" },
  { label: "Global Offices", value: 2, suffix: "" },
  { label: "Product Categories", value: 5, suffix: "+" },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About the Firm"
        title="Our Story"
        description="Constantly innovating and transforming — always with trust and quality at our core."
      />

      <section className="relative z-10 bg-[#080808] py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8">
            {[
              "Constantly innovating and transforming — always with trust and quality at our core — our story is one that delivers sustained outcomes while redefining the international import and export industry.",
              "We are celebrating our history and how it has shaped the organisation we are today. For years, we have been committed to working with clients to answer their most important questions: from building trust, to addressing their climate impact, to proving the progress they are making.",
              "Our purpose — to build trust in these industries and solve important problems — reflects why we do what we do. Our strategy defines what we do. But how we deliver our purpose and strategy is what differentiates us. That is driven by our culture, values, trust, and behaviours.",
              "From our head office in London, United Kingdom, and regional office in Houston, Texas, USA, the firm has evolved to span the globe. We have become a respected voice — not only in professional services but also in areas ranging from climate change to global business.",
              "As the decades passed, the importance of technology in shipping — and in our ability to provide quality client service — continued to grow. Today, we don't merely draw on technology; we shape and create it to achieve the best results for the firm, our clients, and our communities.",
            ].map((text, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className={`text-base leading-relaxed ${i === 0 ? "text-lg text-zinc-300" : "text-[#888888]"}`}>
                  {text}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="relative z-10 bg-[#080808] py-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="gold-text text-4xl font-bold md:text-5xl">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative z-10 bg-[#080808] py-24">
        <Container>
          <SectionLabel
            eyebrow="Milestones"
            title="A Journey of Growth & Impact"
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {milestones.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="glass group rounded-2xl p-8 transition-all duration-300 hover:border-gold-400/30"
              >
                <span className="gold-text text-sm font-bold">{item.year}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#888888]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
