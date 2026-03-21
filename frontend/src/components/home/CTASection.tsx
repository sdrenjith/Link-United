import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import GoldButton from "../ui/GoldButton";

import GeometricLines from "../ui/GeometricLines";

export default function CTASection() {
  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-24">
      <GeometricLines variant="cross" opacity={0.5} />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="gold-sweep-bg relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-24 text-center md:px-16"
          style={{
            background: "linear-gradient(135deg, rgba(154,111,30,0.1) 0%, rgba(201,151,58,0.05) 40%, rgba(8,8,8,0.9) 100%)",
            border: "1px solid rgba(201, 151, 58, 0.15)",
            boxShadow: "0 0 80px rgba(201, 151, 58, 0.06), inset 0 1px 0 rgba(201, 151, 58, 0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-3xl font-semibold text-white md:text-5xl"
          >
            Ready to Trade Globally?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-body mx-auto mt-6 max-w-lg text-[#999999]"
          >
            Partner with Link United International and expand your reach across
            the world's most important markets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10"
          >
            <Link to="/contact">
              <GoldButton variant="filled">
                Start a Conversation &rarr;
              </GoldButton>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
