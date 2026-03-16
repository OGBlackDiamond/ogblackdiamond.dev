/* eslint-disable no-unused-vars */
import { motion } from "motion/react"
/* eslint-enable no-unused-vars */
import { FaGithub, FaLinkedin } from "react-icons/fa"
import SnakeGame from "./SnakeGame.jsx"

function HomePage() {
    return (
        <div style={{
            position: "relative",
            minHeight: "100vh",
            backgroundColor: "#0a0a0a",
            color: "#e8e8e8",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
        }}>
            {/* Snake game background */}
            <SnakeGame />
            
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
                        I'm a passionate developer who loves tinkering with systems and building cool projects. 
                        My daily drivers include Fedora Linux, tiling window managers, and Neovim—yes, I'm becoming a wizard. 
                        Java is my favorite language, but I'm most fluent in Python. I also work with C++, C#, and Lua, 
                        and I'm currently diving into JavaScript, TypeScript, and Assembly. 
                        I believe in using AI as a tool to enhance my workflow and create better code.
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
        </div>
    )
}

export default HomePage
