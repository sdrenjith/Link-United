import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/ui/Container";
import GoldButton from "../components/ui/GoldButton";
import { enquiriesService } from "../services/enquiries.service";
import heroBg from "../assets/images/ship-home03.jpg";

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  message: z.string().min(20, "Please provide more detail"),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

// Beautiful native inline icons
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const EnvelopeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);


function FloatingInput({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
  rows?: number;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  const id = useId();
  const isTextarea = props.type === "textarea";
  const InputComponent = isTextarea ? "textarea" : "input";
  
  return (
    <div className="group relative">
      <InputComponent
        id={id}
        placeholder=" "
        className={`peer w-full bg-transparent border-b border-zinc-800 px-0 pb-3 pt-6 text-sm md:text-base text-white outline-none transition-all duration-300 focus:border-gold-400 focus:shadow-[0_4px_12px_-4px_rgba(201,151,58,0.1)] ${isTextarea ? 'resize-none' : ''}`}
        {...(props as any)}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 text-sm text-zinc-500 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-[11px] peer-focus:text-gold-400 peer-focus:tracking-widest peer-focus:uppercase peer-focus:font-bold peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-bold"
      >
        {label}
      </label>
      {error && (
        <span className="absolute -bottom-5 left-0 text-[10px] uppercase tracking-wider text-red-400 font-bold">{error}</span>
      )}
    </div>
  );
}

const offices = [
  {
    city: "London",
    country: "United Kingdom",
    entity: "LiNK UNITED INTERNATIONAL LIMITED",
    address: "66, Paul Street\nLondon, UK\nEC2A 4NE",
    email: "info@linkunited.co.uk",
    // Coordinates for London embed
    embedMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5204781449336!2d-0.0863920230554238!3d51.521998509635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cafcc16ffef%3A0xe5a3c9df9f52e3c!2s66%20Paul%20St%2C%20London%20EC2A%204NE%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  },
  {
    city: "Houston",
    country: "United States",
    entity: "LiNK UNITED INTERNATIONAL INC.",
    address: "700, Louisiana Street, Suite 3950\nHouston, Texas, USA\n77002",
    email: "info@linkunited.co.uk",
    // Coordinates for Houston embed
    embedMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.7431289197607!2d-95.36972742368945!3d29.756111075069418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640bf38f8045d4d%3A0xc6cb1c4918f4a3de!2s700%20Louisiana%20St%20Suite%203950%2C%20Houston%2C%20TX%2077002!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);
  
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
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden">
      
      {/* 1. Cinematic Corporate Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0 bg-[#020202]">
          <img 
            src={heroBg} 
            alt="Link United Global Port Operations" 
            className="w-full h-full object-cover object-bottom opacity-30 mix-blend-luminosity grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] h-32 bottom-0 pointer-events-none" />
        </div>
        
        {/* Crisp, authoritative Typography */}
        <div className="relative z-10 text-center px-6 mt-24 md:mt-32 max-w-5xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 1 }}
            className="text-gold-400 font-sans tracking-[0.3em] text-xs md:text-sm uppercase mb-8 font-bold"
          >
            Global Network
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-8"
          >
            Contact <span className="text-white font-medium">Us</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.2, duration: 1 }}
            className="mx-auto max-w-3xl text-pretty font-body text-base leading-relaxed text-zinc-400 sm:text-[17px] md:text-lg"
          >
            Share your strategic sourcing requirements with our executive leadership team and receive a clear international trade plan.
          </motion.p>
        </div>
      </section>

      {/* 2. Unified Contact Center */}
      <section className="relative z-10 bg-[#050505] py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 xl:gap-16">
              
              {/* Left Column - Offices & Map */}
              <div className="lg:col-span-6 xl:col-span-5 flex flex-col h-full space-y-12">
                
                {/* Office Selector */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-light text-white mb-8">Our Headquarters</h2>
                  
                  <div className="flex gap-4 border-b border-white/10 pb-4">
                    {offices.map((office, idx) => (
                      <button 
                        key={office.city}
                        onClick={() => setActiveOffice(idx)}
                        className={`text-sm font-bold uppercase tracking-widest pb-2 transition-colors relative ${activeOffice === idx ? 'text-gold-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        {office.city}
                        {activeOffice === idx && (
                          <motion.div 
                            layoutId="activeLocation" 
                            className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-gold-400" 
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Active Office Details */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeOffice}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 pt-4"
                    >
                      <div>
                        <p className="text-gold-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{offices[activeOffice].country}</p>
                        <h3 className="text-xl font-medium text-white tracking-tight">{offices[activeOffice].entity}</h3>
                      </div>
                      
                      <div className="flex items-start gap-4 group">
                        <MapPinIcon className="w-5 h-5 text-zinc-600 mt-1 shrink-0 group-hover:text-gold-400 transition-colors" />
                        <p className="whitespace-pre-line text-sm font-body text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                          {offices[activeOffice].address}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 group">
                        <EnvelopeIcon className="w-5 h-5 text-zinc-600 shrink-0 group-hover:text-gold-400 transition-colors" />
                        <a href={`mailto:${offices[activeOffice].email}`} className="text-sm font-body text-zinc-400 hover:text-white transition-colors">
                          {offices[activeOffice].email}
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Highly Stylized Minimal Map Embed */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-full aspect-square sm:aspect-video lg:aspect-square flex-1 min-h-[300px] border border-white/5 bg-[#080808] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gold-400/5 mix-blend-color z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-1000" />
                  
                  <AnimatePresence mode="wait">
                    <motion.iframe
                      key={activeOffice}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={offices[activeOffice].embedMap}
                      className="w-full h-full object-cover border-0"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </AnimatePresence>
                </motion.div>
                
              </div>

              {/* Right Column - Premium Form */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-6 xl:col-span-7 border border-white/5 bg-[#080808] p-8 md:p-16 relative"
              >
                {submitted ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                      className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400"
                    >
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </motion.div>
                    <h3 className="text-3xl font-light text-white mb-4 tracking-tight">Thank you</h3>
                    <p className="text-lg text-zinc-500 mb-12 font-body max-w-md mx-auto">
                      We've received your message. Our team will get back to you within 24 business hours.
                    </p>
                    <GoldButton onClick={() => setSubmitted(false)}>
                      Send another message
                    </GoldButton>
                  </div>
                ) : (
                  <>
                    <div className="mb-12">
                      <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">Contact us</h2>
                      <p className="text-sm font-body text-zinc-500 leading-relaxed">
                        Send us your enquiry using the form below ..
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                        <FloatingInput
                          label="Full Name *"
                          error={errors.name?.message}
                          {...register("name")}
                        />
                        <FloatingInput
                          label="Corporate / Company *"
                          error={errors.company?.message}
                          {...register("company")}
                        />
                        <FloatingInput
                          label="Email Address *"
                          error={errors.email?.message}
                          {...register("email")}
                        />
                        <FloatingInput
                          label="Phone *"
                          error={errors.phone?.message}
                          {...register("phone")}
                        />
                      </div>
                      
                      <div className="pt-4">
                        <FloatingInput
                          type="textarea"
                          label="Requirements & Trade Details *"
                          rows={4}
                          error={errors.message?.message}
                          {...register("message")}
                        />
                      </div>

                      <div className="pt-8">
                        <GoldButton disabled={isSubmitting} type="submit" fullWidth className="py-5 text-sm">
                          {isSubmitting ? "SUBMITTING DATA..." : "SUBMIT"}
                        </GoldButton>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
