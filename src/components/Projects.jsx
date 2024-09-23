import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Trading Smarter",
    url: " https://simple-trader.binaryedges.com/",
    image: "projects/tradesmarter3.png",
    description: "Trading View Platform",
  },
  {
    title: "Lazy Lion",
    url: "https://www.lazylionsnft.com/",
    image: "projects/lazy-lion.png",
    description: "NFT Marketplace Platform",
    
  },
  {
    title: "BBC Kings",
    url: "https://bbbkings.vercel.app/ ",
    image: "projects/bbc.png",
    description: "Betting Game Platform",
  },
  {
    title: "Total Booking",
    url: "https://www.totalbookings.com ",
    image: "projects/totalBooking.png",
    description: "Booking Platform",
  },
  {
    title: "Dating App",
    url: "https://",
    image: "projects/dating2.png",
    description: "Social Media Platform",
  },
  {
    title: "Air Bag",
    url: "https://yourairbag.com",
    image: "projects/AirBag.png",
    description: "Shopping Platform",
  },
  {
    title: "Super Bright Leds",
    url: "https://www.superbrightleds.com/",
    image: "projects/brightled.png",
    description: "Shopping Platform",
  },
  {
    title: "Health Care",
    url: "https://",
    image: "projects/ehms.png",
    description: "Enterprise Platform",
  },
  {
    title: "Sports Betting",
    url: "https://",
    image: "projects/sportsbet.png",
    description: "Betting Platform",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 1 : 0.5);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });


  return (
    <group {...props} >
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={1} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
        
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={3}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
