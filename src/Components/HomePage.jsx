import { useState, useEffect, useRef } from "react"
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "motion/react"
/* eslint-enable no-unused-vars */
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa"
import SnakeGame from "./SnakeGame.jsx"
import TechStack from "./TechStack.jsx"
import VisitorInfo from "./VisitorInfo.jsx"

const TAGLINE = "aspiring software engineer, godlike splatoon player"
const TITLE_LETTERS = "BlackDiamond".split("")

function HomePage() {
    const [scrolled, setScrolled] = useState(false)
    const [typedCount, setTypedCount] = useState(0)
    const snakeWrapperRef = useRef(null)

    // Typewriter: start after header entrance delay (0.3s entrance + 0.8s duration + stagger)
    // Last letter stagger: 0.3 + (11 * 0.06) = ~0.96s, so start typing at ~1.3s
    useEffect(() => {
        if (typedCount >= TAGLINE.length) return
        const delay = typedCount === 0 ? 1400 : 38
        const timer = setTimeout(() => setTypedCount(c => c + 1), delay)
        return () => clearTimeout(timer)
    }, [typedCount])

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const blur = Math.min(15, (scrollY / viewportHeight) * 15)
            if (snakeWrapperRef.current) {
                snakeWrapperRef.current.style.filter = blur > 0 ? `blur(${blur}px)` : "none"
            }
            if (scrollY > 40) setScrolled(true)
            else setScrolled(false)
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
            <SnakeGame wrapperRef={snakeWrapperRef} scrolled={scrolled} />

            {/* Visitor info widget */}
            <VisitorInfo />
            
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
                    padding: "40px 20px",
                    pointerEvents: "none",
                    userSelect: "none"
                }}
            >
                {/* Header */}
                <header
                    style={{
                        textAlign: "center",
                        marginBottom: "60px"
                    }}
                >
                    {/* Staggered letter reveal for title */}
                    <h1 style={{
                        fontSize: "4rem",
                        fontWeight: "bold",
                        margin: "0 0 10px 0",
                        display: "inline-block"
                    }}>
                        {TITLE_LETTERS.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                                style={{
                                    display: "inline-block",
                                    background: "linear-gradient(135deg, #e8e8e8 0%, #a0a0a0 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        style={{
                            fontSize: "1.5rem",
                            color: "#a0a0a0",
                            margin: "0 0 15px 0"
                        }}
                    >
                        Caden
                    </motion.p>
                    {/* Typewriter tagline */}
                    <p style={{
                        fontSize: "1.1rem",
                        fontStyle: "italic",
                        color: "#a0a0a0",
                        minHeight: "1.6em"
                    }}>
                        {TAGLINE.slice(0, typedCount)}
                        {typedCount < TAGLINE.length && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                                style={{ display: "inline-block", marginLeft: "1px" }}
                            >
                                |
                            </motion.span>
                        )}
                    </p>
                </header>
                
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
    color: "#d0d0d0",
    justifyContent: "center"
}}>
    I'm a passionate software engineer in my 1st year of college. I'm fluent in many languages but I specialize in Java and C/C++ specifically.
    My experience ranges everywhere from Minecraft plugins to PCB design to graphics engines, but I specialize in real-world applications of programming. 
    Namely robotics and control systems. Most notably I've worked on autonomous robot control software and flight path control and correction for amateur rocketry.
    Watching software act on a real-world machine is a very rewarding feeling which is why I've continued to pursue it.
    <br/> <br/>
    <b>My goal is to one day develop software for groundbreaking robotics or aerospace applications where I can watch my software interact with the world around it.</b>
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
                        alignItems: "center",
                        pointerEvents: "auto"
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
