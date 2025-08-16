import React, { useEffect, useState, type JSX } from "react";
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Ready-to-paste AboutSection component (TailwindCSS required)
// Drop this file into your project (e.g. src/components/AboutSectionReadyToPaste.tsx)
// and import it where you need it.

const images = [
  "https://th.bing.com/th/id/R.75608b4a1fb093504a67af244f5d9202?rik=7MBr6TdpzNqOkg&riu=http%3a%2f%2fkirextechno.com%2fen%2fwp-content%2fuploads%2f2014%2f05%2fcold_forging_parts_auto.jpg&ehk=91ngcihyXRJvHFkKEWynikLk02z6PJoZETa4STry7%2b8%3d&risl=&pid=ImgRaw&r=0",
  "https://thumbs.dreamstime.com/b/cnc-lathe-machine-thread-cutting-end-metal-stud-parts-cnc-lathe-machine-thread-cutting-end-metal-stud-266035105.jpg",
  "https://tse4.mm.bing.net/th/id/OIP.B-tVnEBTZGmuAHNqmGYlCAHaFj?r=0&w=1440&h=1080&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://www.customproc.com/wp-content/uploads/2023/05/cnc_machined_parts_3328458.png",
];

interface Item {
  number: string;
  name: string;
  icon: JSX.Element;
}

const items: Item[] = [
  { number: "01", name: "Custom Brackets", icon: ArrowCircle() },
  { number: "02", name: "Steel Adapters", icon: LinkIcon() },
  { number: "03", name: "Motor Mounts", icon: BoltIcon() },
  { number: "04", name: "Enclosures", icon: BoxIcon() },
];

const fadeInUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function AboutSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const id = setInterval(() => setCurrentImage((p) => (p + 1) % images.length), 3000);
    if (isInView) {
      controls.start('visible');
    }
    return () => clearInterval(id);
  }, [controls, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="about" className="relative w-full bg-white py-16 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto relative px-0 lg:-ml-5">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="left-0 top-3 pl-6 lg:pl-11"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block bg-blue-600 text-white text-[15px] font-mono font-medium px-2 py-0.5 rounded-sm tracking-wider"
          >
            About
          </motion.span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 pl-6 lg:pl-11">
          <div className="w-full lg:w-7/12">
            <motion.h1 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[48px] sm:text-6xl md:text-7xl leading-tight font-normal text-gray-900 mb-8"
            >
              <span className="font-medium">Revolutionizing Manufacturing with Speed and</span>{' '}
              <span
                className="font-serif italic bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(110deg, #909090 0%, #b0b0b0 15%, #909090 30%, #707070 45%, #909090 60%, #b0b0b0 75%, #909090 90%)',
                  WebkitBackgroundClip: 'text',
                  backgroundSize: '300% auto',
                  backgroundPosition: '0% center',
                  animation: 'metallicShine 10s linear infinite',
                  display: 'inline-block',
                  textShadow: '0 0 4px rgba(140,140,140,0.2)',
                }}
              >
                Precision
              </span>
            </motion.h1>

            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              className="space-y-0.5 mt-2"
            >
              {items.map((it, idx) => (
                <motion.li
                  key={it.number}
                  variants={itemVariants}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="text-xs text-gray-500 w-4 mr-2">{it.number}</div>
                    <button
                      className={`text-gray-800 text-sm text-left font-medium hover:text-blue-600 transition-all`}
                    >
                      {it.name}
                    </button>
                  </div>
                  <div className="w-5 h-5 text-gray-500 opacity-80">{it.icon}</div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className="mt-4"
            >
              <div className="overflow-hidden rounded-lg shadow-sm">
                <img
                  src={images[currentImage]}
                  alt="part"
                  className="w-full h-40 object-cover"
                />
              </div>
            </motion.div>

            <div className="h-6 lg:h-12" />
          </div>
        </div>

        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="w-full lg:absolute lg:right-[-80px] lg:top-8 lg:w-[calc(100%-24px)] lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[550px]"
        >             
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-lg ml-auto">
            <div className="flex items-center gap-4 mb-4">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                src="https://i.pravatar.cc/80?img=12"
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900">Ayrton Senna</h3>
                <p className="text-sm text-gray-500">CEO & Senior Partner at Forge</p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-700 leading-relaxed space-y-3"
            >
              <p>
                At Forge, we believe that getting custom CNC parts should be fast, reliable, and effortless. That's
                why we built a fully streamlined platform that turns your CAD files into production-ready parts—
                delivered in as fast as one day.
              </p>
              <p>
                We operate high-performance CNC machines backed by in-house automation and a trusted network of
                suppliers. From one-off prototypes to small production runs, our system is built to deliver precise,
                high-quality parts with speed.
              </p>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 bottom-0 text-xs text-gray-400 uppercase tracking-wider"
              >
                EVERY DETAIL MATTERS — WE CRAFT EACH PART WITH CARE, ACCURACY, AND A FINISH THAT FEELS JUST RIGHT.
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- small inline SVG icons ---------- */

function ArrowCircle(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      <path d="M9 12h6" strokeWidth="1.5" />
      <path d="M12 9v6" strokeWidth="1.5" />
    </svg>
  );
}

function LinkIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path d="M10 14a3 3 0 104-4l-1-1" strokeWidth="1.5" />
      <path d="M14 10a3 3 0 10-4 4l1 1" strokeWidth="1.5" />
    </svg>
  );
}

function BoltIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeWidth="1.5" />
    </svg>
  );
}

function BoxIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path d="M21 16V8a2 2 0 00-1-1.73L13 2 4 6.27A2 2 0 003 8v8a2 2 0 001 1.73L11 22l9-4.27A2 2 0 0021 16z" strokeWidth="1.2" />
    </svg> 
  );
}
