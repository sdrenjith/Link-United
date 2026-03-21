import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import GoldButton from "../components/ui/GoldButton";
import ScrollReveal from "../components/ui/ScrollReveal";
import { enquiriesService } from "../services/enquiries.service";

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  message: z.string().min(20, "Please provide more detail"),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

function FloatingInput({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className="group relative">
      <input
        id={id}
        placeholder=" "
        className="peer w-full border-b border-zinc-700/60 bg-transparent px-0 pb-2 pt-5 text-sm text-white outline-none transition-all duration-300 focus:border-gold-400/60 focus:shadow-[0_4px_12px_-4px_rgba(201,151,58,0.15)]"
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-5 text-sm text-zinc-500 transition-all duration-300 peer-focus:-translate-y-4 peer-focus:text-[11px] peer-focus:text-gold-200 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-zinc-400"
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

const offices = [
  {
    city: "London, UK",
    entity: "LiNK UNITED INTERNATIONAL LIMITED",
    address: "66 Paul Street, London EC2A 4NE",
    email: "info@linkunited.co.uk",
  },
  {
    city: "Houston, USA",
    entity: "LiNK UNITED INTERNATIONAL INC.",
    address: "700 Louisiana Street, Suite 3950, Houston TX 77002",
    email: "info@linkunited.co.uk",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryForm>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (values: EnquiryForm) => {
    await enquiriesService.create(values);
    reset();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Share your sourcing requirements with our leadership team and receive a tailored international trade plan."
      />

      <section className="relative z-10 bg-[#080808] py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left Column */}
            <div>
              <ScrollReveal>
                <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                  Let's Build Something Global
                </h2>
              </ScrollReveal>

              <div className="mt-10 space-y-5">
                {offices.map((office, i) => (
                  <ScrollReveal key={office.city} delay={0.1 + i * 0.1}>
                    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:border-gold-400/20">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400/10">
                          <svg className="h-4 w-4 text-gold-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-white">
                          {office.city}
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-gold-200/70">
                        {office.entity}
                      </p>
                      <p className="mt-1 text-sm text-[#888888]">
                        {office.address}
                      </p>
                      <a
                        href={`mailto:${office.email}`}
                        className="mt-2 inline-block text-sm text-gold-200/80 transition hover:text-gold-200"
                      >
                        {office.email}
                      </a>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <ScrollReveal direction="right">
              <div className="glass rounded-2xl p-8 md:p-10">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/10">
                      <svg className="h-8 w-8 text-gold-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="gold-text text-lg font-bold">
                      Thank you for your enquiry.
                    </p>
                    <p className="mt-2 text-sm text-[#888888]">
                      Our team will respond within 24 business hours.
                    </p>
                    <div className="mt-6">
                      <GoldButton variant="ghost" onClick={() => setSubmitted(false)}>
                        Submit Another Enquiry
                      </GoldButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      {([
                        { label: "Full Name *", field: "name" as const },
                        { label: "Business Email *", field: "email" as const },
                        { label: "Phone Number *", field: "phone" as const },
                        { label: "Company Name *", field: "company" as const },
                      ] as const).map((input, i) => (
                        <motion.div
                          key={input.field}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                        >
                          <FloatingInput
                            label={input.label}
                            error={errors[input.field]?.message}
                            {...register(input.field)}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="group relative"
                    >
                      <textarea
                        placeholder=" "
                        className="peer w-full resize-none border-b border-zinc-700/60 bg-transparent px-0 pb-2 pt-5 text-sm text-white outline-none transition-all duration-300 focus:border-gold-400/60 focus:shadow-[0_4px_12px_-4px_rgba(201,151,58,0.15)]"
                        rows={4}
                        {...register("message")}
                      />
                      <label className="pointer-events-none absolute left-0 top-5 text-sm text-zinc-500 transition-all duration-300 peer-focus:-translate-y-4 peer-focus:text-[11px] peer-focus:text-gold-200 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-zinc-400">
                        Your Requirements *
                      </label>
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <GoldButton
                        disabled={isSubmitting}
                        type="submit"
                        fullWidth
                      >
                        {isSubmitting ? "Submitting..." : "Send Enquiry"}
                      </GoldButton>
                    </motion.div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
