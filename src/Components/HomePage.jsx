import { useState, useEffect } from "react"
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "motion/react"
/* eslint-enable no-unused-vars */
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa"
import SnakeGame from "./SnakeGame.jsx"
import TechStack from "./TechStack.jsx"

function HomePage() {
    const [blurAmount, setBlurAmount] = useState(0)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const blur = Math.min(15, (scrollY / viewportHeight) * 15)
            setBlurAmount(blur)
            if (scrollY > 40) setScrolled(true)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div style={{
            position: "relative",
            minHeight: "100vh",
            backgroundColor: "#0a0a0a",
            color: "#e8e8e8",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
        }}>
            {/* Snake game background */}
            <SnakeGame blurAmount={blurAmount} />
            
            {/* Content overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    padding: "40px 20px"
                }}
            >
                {/* Header */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        textAlign: "center",
                        marginBottom: "60px"
                    }}
                >
                    <h1 style={{
                        fontSize: "4rem",
                        fontWeight: "bold",
                        margin: "0 0 10px 0",
                        background: "linear-gradient(135deg, #e8e8e8 0%, #a0a0a0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "0 0 40px rgba(232, 232, 232, 0.1)"
                    }}>
                        BlackDiamond
                    </h1>
                    <p style={{
                        fontSize: "1.5rem",
                        color: "#a0a0a0",
                        margin: "0 0 15px 0"
                    }}>
                        Caden
                    </p>
                    <p style={{
                        fontSize: "1.1rem",
                        fontStyle: "italic",
                        color: "#a0a0a0"
                    }}>
                        aspiring software engineer, godlike splatoon player
                    </p>
                </motion.header>
                
                {/* Introduction */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{
                        maxWidth: "700px",
                        textAlign: "center",
                        marginBottom: "60px",
                        padding: "30px",
                        backgroundColor: "rgba(20, 20, 20, 0.8)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)"
                    }}
                >
<p style={{
    fontSize: "1.1rem",
    lineHeight: "1.8",
    margin: "0",
    color: "#d0d0d0"
}}>
    I'm a passionate software developer who enjoys working with systems and building innovative projects.
    My daily workflow includes Fedora Linux, tiling window managers, and Neovim.
    Java is my favorite language, and I'm highly proficient in Python. I also have experience with C++, C#, and Lua,
    and am currently expanding my knowledge in JavaScript, TypeScript, and Assembly.
</p>
                </motion.section>
                
                {/* Social Links */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    style={{
                        display: "flex",
                        gap: "40px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {/* GitHub Link */}
                    <motion.a
                        href="https://github.com/ogblackdiamond"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                            padding: "20px 30px",
                            backgroundColor: "rgba(30, 30, 30, 0.9)",
                            borderRadius: "12px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            textDecoration: "none",
                            color: "#e8e8e8",
                            transition: "all 0.3s ease"
                        }}
                    >
                        <FaGithub size={48} color="#4a9eff" />
                        <span style={{
                            fontSize: "1rem",
                            fontWeight: "500"
                        }}>
                            GitHub
                        </span>
                    </motion.a>
                    
                    {/* LinkedIn Link */}
                    <motion.a
                        href="https://www.linkedin.com/in/caden-feller-3393b7297/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                            padding: "20px 30px",
                            backgroundColor: "rgba(30, 30, 30, 0.9)",
                            borderRadius: "12px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            textDecoration: "none",
                            color: "#e8e8e8",
                            transition: "all 0.3s ease"
                        }}
                    >
                        <FaLinkedin size={48} color="#4a9eff" />
                        <span style={{
                            fontSize: "1rem",
                            fontWeight: "500"
                        }}>
                            LinkedIn
                        </span>
                    </motion.a>
                </motion.section>
            </motion.div>
            
            {/* Tech Stack Section */}
            <TechStack />

            {/* Scroll hint */}
            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        style={{
                            position: "fixed",
                            bottom: "32px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 20,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                            pointerEvents: "none"
                        }}
                    >
                        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                            scroll
                        </span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                            <FaChevronDown size={14} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default HomePage
