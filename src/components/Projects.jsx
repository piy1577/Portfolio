import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
    {
        title: "Annadaan",
        url: "#",
        image: "projects/wawatmos.jpg",
        description: "In this website we donate food to the the needy ones",
    },
    {
        title: "Animal Donation",
        url: "#",
        image: "projects/baking.jpg",
        description: "this website helps to care for street animals",
    },
    {
        title: "ConnectED",
        url: "#",
        image: "projects/avatar.jpg",
        description:
            "we created this website during a hackathon in nit agartala. With the help of this website, college students can sell, buy and rent their products",
    },
    {
        title: "Flipr",
        url: "#",
        image: "projects/kanagame.jpg",
        description:
            "we created this website, during a hackathon. with the help of this website, we get the info of the hotels",
    },
    {
        title: "portfolio",
        url: "#",
        image: "projects/loader.jpg",
        description: "This is my portfolio which you are currently watching",
    },
];

const Project = (props) => {
    const { project, highlighted } = props;

    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 0.7 : 0.4);
    }, [highlighted]);

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
    });

    return (
        <group {...props}>
            <mesh
                position-z={-0.001}
                onClick={() => window.open(project.url, "_blank")}
                ref={background}
            >
                <planeGeometry args={[2.2, 2]} />
                <meshBasicMaterial color="black" transparent opacity={0.4} />
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
                {project.title}
            </Text>
            <Text
                maxWidth={2}
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
                    <Project
                        project={project}
                        highlighted={index === currentProject}
                    />
                </motion.group>
            ))}
        </group>
    );
};
