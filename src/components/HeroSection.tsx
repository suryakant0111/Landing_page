import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MetallicText } from './MetallicText';

// Environment Component
function EnvironmentEXR() {
  const { scene, gl } = useThree();

  useEffect(() => {
    const loader = new EXRLoader();
    loader.load("/textures/metallic.exr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });
  }, [scene, gl]);

  return null;
}

// Motor Model Component
function MotorModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/motor.glb") as any; // Type assertion for GLTF
  const { actions } = useAnimations(animations, scene);
  const [active, setActive] = useState(false);

  // Smoother and slower spring animation
  const { scale, position, opacity } = useSpring({
    scale: active ? 4.0 : 0.8,
    position: active ? [0, 0, 0] : [0, -2, 0],
    opacity: active ? 1 : 0,
    config: { 
      mass: 2, 
      tension: 120,
      friction: 20
    }
  });

  useEffect(() => {
    // Set initial state
    setActive(true);
    
    // Trigger the animation after a short delay
    if (actions && Object.keys(actions).length > 0) {
      const firstAnim = Object.keys(actions)[0];
      if (actions[firstAnim]) {
        actions[firstAnim]!.play();
      }
    }
  }, [actions]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <a.group ref={groupRef} scale={scale as any} position={position as any}>
      <primitive 
        object={scene} 
        opacity={opacity as any}
      />
    </a.group>
  );
}

// Main Component
export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

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

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.stl,.step,.stp,.obj,.3ds,.fbx';
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        handleFileChange(target.files);
      }
    };
    input.click();
  };

  const handleFileChange = async (files: FileList) => {
    console.log('Selected files:', files);
    
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }

    try {
      const uploadedFiles = Array.from(files);
      
      // Filter for valid file types
      const validExtensions = ['.stl', '.step', '.stp', '.obj', '.3ds', '.fbx'];
      const validFiles = uploadedFiles.filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext ? validExtensions.includes(`.${ext}`) : false;
      });

      if (validFiles.length === 0) {
        console.log('No valid files selected');
        return;
      }

      // Process each valid file
      for (const file of validFiles) {
        const arrayBuffer = await file.arrayBuffer();
        // Process the file (e.g., upload to server)
        console.log('Processing file:', file.name);
        // Example: await uploadToServer(file, arrayBuffer);
      }

      // Show success message
      const fileNames = validFiles.map(file => file.name).join(', ');
      console.log(`Successfully processed ${validFiles.length} file(s): ${fileNames}`);
      
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section className="relative w-full h-screen bg-gray-50 overflow-hidden pt-16 md:pt-0">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-8 sm:pt-16 md:pt-24"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6 md:mb-3">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900 tracking-tight">
            Precision{" "}
            <MetallicText>
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
              >CNC</span>
            </MetallicText>{" "}
            Parts
          </h1>
          <motion.h2 
            className="text-lg sm:text-xl md:text-3xl font-light text-gray-900 mt-2 sm:mt-1 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Shipped as Fast as{" "}
            <br />
            <span className="text-black-600 font-medium">Tomorrow</span>
          </motion.h2>
        </motion.div>

        {/* 3D Model */}
        <motion.div 
          className={`relative w-full max-w-2xl mx-auto h-[150px] sm:h-[200px] md:h-[300px] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          variants={itemVariants}
        >
          <Canvas camera={{ position: [0, 0, 20], fov: 40 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <directionalLight position={[-10, -10, -5]} intensity={0.4} />
            <EnvironmentEXR />
            <MotorModel />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.8}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.1}
              minPolarAngle={Math.PI / 12}
              target={[0, 0, 0]}
            />
          </Canvas>
        </motion.div>

        {/* Description - Desktop only */}
        <motion.div 
          className="hidden sm:block text-center mt-3 sm:mt-4 md:mt-5 max-w-sm sm:max-w-md mx-auto px-2"
          variants={itemVariants}
        >
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Upload your CAD file, and we'll take care of machining, finishing, and shipping—accurate parts delivered fast.
          </p>
        </motion.div>

      </motion.div>

      {/* Bottom Stats - Mobile friendly layout */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Mobile: Stack vertically */}
        <div className="sm:hidden flex flex-col items-center space-y-4 pb-4 px-4">
          <motion.p 
            className="text-xs text-gray-600 text-center mb-2 px-4 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Upload your CAD file, and we'll take care of machining, finishing, and shipping—accurate parts delivered fast.
          </motion.p>
          <motion.button 
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-xs transition-all duration-300 flex items-center gap-2 shadow-md relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Mobile upload button clicked');
              handleUploadClick();
            }}
            style={{
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 9V5h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
            </svg>
            UPLOAD YOUR DESIGN
          </motion.button>
          
          <div className="flex justify-between w-full text-xs text-gray-500">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="font-medium text-gray-700">12+ YEARS</div>
              <div>DELIVERING</div>
            </motion.div>
            
            <motion.div 
              className="text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className="font-medium text-gray-700">100,000+ PARTS</div>
              <div>ANNUALLY</div>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Original horizontal layout */}
        <div className="hidden sm:flex absolute bottom-4 left-4 right-4 md:bottom-6 md:left-8 md:right-8 items-center justify-between">
          {/* Left Stats */}
          <motion.div 
            className="text-xs sm:text-sm text-gray-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="font-medium text-gray-700">12+ YEARS OF DELIVERING</div>
            <div>PERFECT DETAILS</div>
          </motion.div>

          {/* Center Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <motion.button 
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Desktop upload button clicked');
                handleUploadClick();
              }}
              style={{
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 9V5h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
              </svg>
              UPLOAD YOUR DESIGN
            </motion.button>
          </motion.div>

          {/* Right Stats */}
          <motion.div 
            className="text-xs sm:text-sm text-gray-500 text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="font-medium text-gray-700">OVER 100,000 PARTS</div>
            <div>MANUFACTURED ANNUALLY</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}