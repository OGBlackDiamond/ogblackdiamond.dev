import { useState } from "react"
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "motion/react"
/* eslint-enable no-unused-vars */
import {
    SiFedora,
    SiNeovim,
    SiHyprland,
    SiPython,
    SiCplusplus,
    SiSharp,
    SiLua,
    SiJavascript,
    SiTypescript,
    SiAssemblyscript,
    SiZsh
} from "react-icons/si"
import { FaDesktop, FaCode, FaTerminal, FaLayerGroup, FaJava, FaCat, FaGithub, FaTimes, FaExternalLinkAlt } from "react-icons/fa"

// ─── Project data ──────────────────────────────────────────────────────────────

const languageProjects = {
    Java: [
        {
            name: "FYRE2025",
            repo: "https://github.com/FYRE5480/FYRE2025",
            description: "Competition robot control software for FRC Team 5480 (FYRE) — 2025 Reefscape season. Runs on a RoboRIO controlling a swerve-drive robot with elevator, arm, claw, intake, and deep-cage climber.",
            highlights: [
                "Swerve drive with SwerveDrivePoseEstimator — fuses NavX gyro + encoder data for continuous field-relative Pose2d, fed to a Choreo autonomous trajectory follower with 3 parallel PID controllers",
                "Custom vision system over WebSocket — connects to a co-processor, supports multi-camera AprilTag alignment, piece detection with distance-adaptive correction, and a tag lock-on mode blending controller + vision ChassisSpeeds",
                "Dual-controller operator model — Xbox for driver (swerve, NOS boost, speed tiers) and a flight joystick for manipulator operator, abstracted through a ControllerInput wrapper",
                "Full autonomous suite using Choreo named routines selected via SmartDashboard, with closed-loop PID correction layered on top of feedforward trajectory velocities"
            ]
        },
        {
            name: "Proxy-Messages",
            repo: "https://github.com/OGBlackDiamond/Proxy-Messages",
            images: [
                "https://github.com/user-attachments/assets/fe5e1ed0-9c39-49ef-b246-d282ac1a4d0f"
            ],
            description: "A dual-plugin Minecraft network system (Velocity proxy + Paper backend) that intercepts and replaces all vanilla join/leave/chat messages and synchronizes player chat across every backend server simultaneously.",
            highlights: [
                "Dual-plugin architecture — Velocity handles proxy-level events while a coordinated Paper plugin suppresses vanilla server-side messages that Velocity's API cannot reach directly",
                "Cross-server message routing — chat intercepted at the proxy is fanned out to all connected backends, making Velocity act as a message broker between Paper instances",
                "Discord bridge with per-server channel mapping — bidirectional relay applying Discord role colors, embed-formatted events, and proxy boot/shutdown announcements",
                "Hot config reload at runtime via pmReload — no restart needed; per-player state (global/local chat toggle, name color) managed live using Kyori Adventure rich text"
            ]
        }
    ],
    Python: [
        {
            name: "turtle-overhaul",
            repo: "https://github.com/OGBlackDiamond/turtle-overhaul",
            description: "An asyncio WebSocket server that autonomously orchestrates a self-replicating swarm of ComputerCraft turtle robots in Minecraft — coordinating mining, resource deposit, and turtle spawning from a central Master Control Program.",
            highlights: [
                "3D Bresenham line algorithm implemented from scratch for shortest discrete-coordinate pathfinding between any two world positions",
                "Persistent world state with crash recovery — full map and turtle state serialized to JSON every tick; turtles fully restore position, heading, inventory, and task state on reconnect",
                "Remote code execution protocol — server sends raw Lua strings over WebSocket evaluated via loadstring(), giving a dynamic RPC interface without a fixed command set",
                "Self-replication — a turtle can place a disk drive, wget the latest startup.lua from GitHub, place and boot a new turtle, and recover its disk drive entirely autonomously"
            ]
        }
    ],
    "C++": [
        {
            name: "Photon",
            repo: "https://github.com/OGBlackDiamond/photon",
            images: [
                "https://github.com/user-attachments/assets/c2d579b5-6d53-42d5-9414-97ab389b4bd8",
                "https://github.com/user-attachments/assets/18dc8ca8-6ecd-4590-ba38-c4a36100de1d"
            ],
            description: "A GPU-accelerated path tracer built from scratch on OpenGL (GLFW + GLAD). Casts rays from a virtual camera into scenes of spheres and triangle meshes, simulating up to 10 light bounces per ray with progressive sample accumulation.",
            highlights: [
                "Entire path tracing pipeline runs in a GLSL fragment shader — Möller–Trumbore ray-triangle intersection, analytic ray-sphere intersection, multi-bounce BRDF with cosine-weighted hemisphere sampling via Box-Muller transform",
                "Ping-pong FBO accumulation — two GL_RGBA32F framebuffers double-buffer an incremental running mean (prevColor × (n−1) + current) / n, converging to a noise-free result without extra storage",
                "Scene data uploaded as SSBOs (std430) — arbitrary sphere and triangle arrays accessible in the shader without recompiling, with .obj mesh import for arbitrary 3D models",
                "GPU/CPU sync via glFenceSync rather than glFinish, and a Wang hash xor-shift PRNG seeded per-pixel per-frame for independent ray samples"
            ]
        },
        {
            name: "T.A.C.O.S",
            repo: "https://github.com/UNR-Aerospace-Club/T.A.C.O.S",
            description: "Total Avionics Control and Operations System — custom modular rocket avionics hardware and firmware for the UNR Aerospace Club, built around a central MainBoard with swappable PCB 'hat' modules.",
            highlights: [
                "3D greedy snake AI spanning multiple stacked LED hat boards simultaneously, treating each hat as a Z-axis slice of a unified 3D grid — used as a hardware validation tool",
                "Hardware multiplexing via 3-bit binary GPIO select lines — 15 data pins + 5 select pins address all hats on a shared bus, avoiding per-hat wiring redundancy",
                "Dynamic 4D pointer array (Node****) with manual new/delete lifecycle on an embedded Arduino target — unusual heap management for constrained firmware",
                "ESP32 Bluetooth Serial + SD_MMC (4-bit MMC bus) for real-time telemetry downlink and onboard flight data recording on a custom PCB layout"
            ]
        }
    ],
    Lua: [
        {
            name: "turtle-overhaul (Lua client)",
            repo: "https://github.com/OGBlackDiamond/turtle-overhaul",
            description: "The in-game ComputerCraft Lua client half of turtle-overhaul. Runs on each turtle, maintains a WebSocket connection to the Python server, executes dynamically sent Lua code, and reports full sensor payloads every tick.",
            highlights: [
                "Remote code execution via loadstring() — evaluates raw Lua strings sent from the server, enabling a fully dynamic command interface without a fixed protocol",
                "Dead reckoning odometry — tracks exact 3D world position and heading purely from command outcomes (no GPS), updating coordinates on every move success/failure report",
                "Per-tick structured JSON payload — reports fuel level, block names in all 3 directions, full 16-slot inventory, and last command return value back to the server",
                "Self-replication routine — places disk drive, wgets latest startup.lua from GitHub, places and boots a child turtle, hands it coal, then recovers its own disk drive"
            ]
        }
    ],
    JavaScript: [
        {
            name: "ogblackdiamond.dev",
            repo: "https://github.com/OGBlackDiamond/ogblackdiamond.dev",
            description: "This website. A React 19 single-page personal homepage with an animated autonomous snake game as a live background, built with Vite and Motion.",
            highlights: [
                "Snake AI runs entirely on a <canvas> via requestAnimationFrame — no DOM elements per segment, no CSS transitions, single composited layer for smooth cross-browser performance",
                "Greedy pathfinding AI with full-body collision avoidance — Manhattan distance sorting with safe fallback chains, checking against the entire snake body to prevent routing into occupied cells",
                "Scroll-linked background blur — progressive CSS filter blur on the fixed canvas (0→15px over one viewport height) driven by a passive scroll listener",
                "Motion (Framer Motion successor) for all UI animations — whileInView entrance animations, hover-expand tech cards, and AnimatePresence for mount/unmount transitions"
            ]
        }
    ],
    TypeScript: [
        {
            name: "ogblackdiamond.dev",
            repo: "https://github.com/OGBlackDiamond/ogblackdiamond.dev",
            description: "This site is currently JavaScript, but TypeScript is next on the list as the codebase grows.",
            highlights: [],
            placeholder: true
        }
    ],
    "C#": [
        {
            name: "No project yet",
            repo: null,
            description: "C# experience comes from game modding and Unity projects, but nothing public yet.",
            highlights: [],
            placeholder: true
        }
    ],
    Assembly: [
        {
            name: "No project yet",
            repo: null,
            description: "Currently learning x86-64 Assembly. Projects coming soon.",
            highlights: [],
            placeholder: true
        }
    ]
}

// ─── Language tab config ───────────────────────────────────────────────────────

const languageTabs = [
    { name: "Java",       icon: FaJava,          color: "#f89820" },
    { name: "Python",     icon: SiPython,        color: "#3572A5" },
    { name: "C++",        icon: SiCplusplus,     color: "#659ad2" },
    { name: "Lua",        icon: SiLua,           color: "#000080" },
    { name: "JavaScript", icon: SiJavascript,    color: "#F0DB4F" },
    { name: "TypeScript", icon: SiTypescript,    color: "#3178c6" },
    { name: "C#",         icon: SiSharp,         color: "#9b4f96" },
    { name: "Assembly",   icon: SiAssemblyscript, color: "#a8a8a8" }
]

// ─── Other tech categories (non-languages) ─────────────────────────────────────

const otherCategories = [
    {
        id: "os",
        title: "Operating System",
        icon: FaDesktop,
        color: "#51A2DA",
        items: [{ name: "Fedora Linux", icon: SiFedora }]
    },
    {
        id: "editor",
        title: "Editor",
        icon: FaCode,
        color: "#57A143",
        items: [{ name: "Neovim", icon: SiNeovim }]
    },
    {
        id: "wm",
        title: "Window Manager",
        icon: FaLayerGroup,
        color: "#00D4FF",
        items: [{ name: "Hyprland", icon: SiHyprland }]
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: FaTerminal,
        color: "#F28D1A",
        items: [
            { name: "Kitty", icon: FaCat },
            { name: "Zsh",   icon: SiZsh  }
        ]
    }
]

// ─── TechCard (flip card) ─────────────────────────────────────────────────────

const CARD_SIZE = "160px"

function TechCard({ category, index }) {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = category.icon

    const faceStyle = {
        position: "absolute",
        inset: 0,
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        // No backdropFilter here — it breaks preserve-3d in most browsers
    }

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            style={{
                width: CARD_SIZE,
                height: CARD_SIZE,
                perspective: "800px",
                cursor: "default",
                flexShrink: 0
            }}
        >
            {/* Inner — rotates on hover */}
            <motion.div
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Front face */}
                <div style={{
                    ...faceStyle,
                    backgroundColor: "rgba(20, 20, 20, 0.92)",
                    border: `1px solid ${isHovered ? category.color : "rgba(255,255,255,0.1)"}`,
                    opacity: isHovered ? 0 : 1,
                    transition: "border-color 0.4s ease, opacity 0.15s ease"
                }}>
                    {/* Glow */}
                    <div style={{
                        position: "absolute", inset: 0, borderRadius: "16px",
                        background: `radial-gradient(circle at center, ${category.color} 0%, transparent 70%)`,
                        opacity: isHovered ? 0.15 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none"
                    }} />
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: isHovered ? category.color : "#e8e8e8", transition: "color 0.3s ease", marginBottom: "12px" }}
                    >
                        <IconComponent size={36} />
                    </motion.div>
                    <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#e8e8e8", textAlign: "center", padding: "0 8px" }}>
                        {category.title}
                    </span>
                </div>

                {/* Back face */}
                <div style={{
                    ...faceStyle,
                    transform: "rotateY(180deg)",
                    gap: "16px",
                    padding: "12px",
                    border: `1px solid ${category.color}`,
                    backgroundColor: "rgba(14, 14, 14, 0.97)",
                    background: `radial-gradient(circle at center, ${category.color}20 0%, rgba(14,14,14,0.97) 70%)`,
                    flexDirection: category.items.length > 1 ? "row" : "column",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {category.items.map((item) => {
                        const ItemIcon = item.icon
                        const iconSize = category.items.length > 1 ? 36 : 64
                        return (
                            <div
                                key={item.name}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "8px"
                                }}
                            >
                                <ItemIcon size={iconSize} color={category.color} />
                                <span style={{ fontSize: "0.8rem", color: "#d0d0d0", textAlign: "center" }}>
                                    {item.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </motion.div>
        </motion.div>
    )
}

// ─── Languages card (clickable, opens drawer) ─────────────────────────────────

function LanguagesCard({ onOpen }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onOpen}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            style={{
                position: "relative",
                width: "340px",
                padding: "24px",
                backgroundColor: "rgba(20, 20, 20, 0.85)",
                borderRadius: "16px",
                border: `1px solid ${isHovered ? "#F0DB4F" : "rgba(255, 255, 255, 0.1)"}`,
                cursor: "pointer",
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.3s ease"
            }}
        >
            {/* Glow */}
            <motion.div
                animate={{ opacity: isHovered ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    background: "radial-gradient(circle at center, #F0DB4F 0%, transparent 70%)",
                    pointerEvents: "none"
                }}
            />

            {/* Header — always visible */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: isHovered ? "20px" : "0",
                transition: "margin-bottom 0.3s ease"
            }}>
                <motion.div
                    animate={{ scale: isHovered ? 1.1 : 1, color: isHovered ? "#F0DB4F" : "#e8e8e8" }}
                    transition={{ duration: 0.3 }}
                >
                    <FaCode size={28} />
                </motion.div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#e8e8e8" }}>
                    Languages
                </h3>
            </div>

            {/* Expandable content — only on hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {languageTabs.map((lang, index) => {
                                const Icon = lang.icon
                                return (
                                    <motion.div
                                        key={lang.name}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03, duration: 0.18 }}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            padding: "5px 10px",
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            borderRadius: "6px",
                                            fontSize: "0.85rem",
                                            color: "#d0d0d0"
                                        }}
                                    >
                                        <Icon size={14} color={lang.color} />
                                        {lang.name}
                                    </motion.div>
                                )
                            })}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.2 }}
                            style={{
                                marginTop: "16px",
                                fontSize: "0.8rem",
                                color: "#F0DB4F",
                                textAlign: "center",
                                letterSpacing: "0.05em"
                            }}
                        >
                            click to explore projects ↓
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ─── Project drawer ────────────────────────────────────────────────────────────

function ProjectDrawer({ onClose }) {
    const [activeTab, setActiveTab] = useState("Java")
    const [activeProject, setActiveProject] = useState(0)

    const projects = languageProjects[activeTab] || []
    const project = projects[activeProject] || projects[0]

    const handleTabChange = (tabName) => {
        setActiveTab(tabName)
        setActiveProject(0)
    }

    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "75vh",
                backgroundColor: "rgba(12, 12, 12, 0.97)",
                borderTop: "1px solid rgba(255,255,255,0.12)",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                backdropFilter: "blur(20px)"
            }}
        >
            {/* Drawer header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0
            }}>
                <span style={{ color: "#a0a0a0", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Projects by Language
                </span>
                <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#a0a0a0",
                        display: "flex",
                        alignItems: "center",
                        padding: "4px"
                    }}
                >
                    <FaTimes size={18} />
                </motion.button>
            </div>

            {/* Language tabs */}
            <div style={{
                display: "flex",
                gap: "4px",
                padding: "10px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                overflowX: "auto",
                flexShrink: 0
            }}>
                {languageTabs.map((lang) => {
                    const Icon = lang.icon
                    const isActive = activeTab === lang.name
                    const hasProjects = !languageProjects[lang.name]?.[0]?.placeholder
                    return (
                        <motion.button
                            key={lang.name}
                            onClick={() => handleTabChange(lang.name)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "7px",
                                padding: "7px 14px",
                                borderRadius: "8px",
                                border: isActive
                                    ? `1px solid ${lang.color}`
                                    : "1px solid rgba(255,255,255,0.08)",
                                backgroundColor: isActive
                                    ? `${lang.color}18`
                                    : "rgba(255,255,255,0.03)",
                                cursor: "pointer",
                                color: isActive ? lang.color : "#808080",
                                fontSize: "0.85rem",
                                fontWeight: isActive ? "600" : "400",
                                whiteSpace: "nowrap",
                                transition: "color 0.2s, background-color 0.2s, border-color 0.2s",
                                opacity: hasProjects ? 1 : 0.5
                            }}
                        >
                            <Icon size={14} />
                            {lang.name}
                        </motion.button>
                    )
                })}
            </div>

            {/* Content area */}
                <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", gap: "20px" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: "flex", gap: "20px", width: "100%" }}
                    >
                        {/* Project selector (only if multiple projects) */}
                        {projects.length > 1 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0, width: "180px" }}>
                                {projects.map((p, i) => (
                                    <motion.button
                                        key={p.name}
                                        onClick={() => setActiveProject(i)}
                                        whileHover={{ x: 3 }}
                                        style={{
                                            textAlign: "left",
                                            padding: "10px 14px",
                                            borderRadius: "8px",
                                            border: activeProject === i
                                                ? `1px solid ${languageTabs.find(l => l.name === activeTab)?.color}`
                                                : "1px solid rgba(255,255,255,0.07)",
                                            backgroundColor: activeProject === i
                                                ? `${languageTabs.find(l => l.name === activeTab)?.color}15`
                                                : "transparent",
                                            cursor: "pointer",
                                            color: activeProject === i ? "#e8e8e8" : "#707070",
                                            fontSize: "0.85rem",
                                            fontWeight: activeProject === i ? "600" : "400",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        {p.name}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Project detail */}
                        {project && !project.placeholder && (
                            <motion.div
                                key={`${activeTab}-${activeProject}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                style={{ flex: 1, minWidth: 0 }}
                            >
                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px", gap: "12px" }}>
                                    <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#e8e8e8", fontWeight: "700" }}>
                                        {project.name}
                                    </h3>
                                    {project.repo && (
                                        <motion.a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05, y: -1 }}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                padding: "6px 12px",
                                                borderRadius: "7px",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                backgroundColor: "rgba(255,255,255,0.05)",
                                                color: "#a0a0a0",
                                                textDecoration: "none",
                                                fontSize: "0.8rem",
                                                flexShrink: 0,
                                                transition: "color 0.2s"
                                            }}
                                        >
                                            <FaGithub size={14} />
                                            View on GitHub
                                            <FaExternalLinkAlt size={10} />
                                        </motion.a>
                                    )}
                                </div>

                                <p style={{
                                    margin: "0 0 20px 0",
                                    fontSize: "1rem",
                                    color: "#d0d0d0",
                                    lineHeight: "1.7",
                                    paddingBottom: "20px",
                                    borderBottom: "1px solid rgba(255,255,255,0.07)"
                                }}>
                                    {project.description}
                                </p>

                                {project.highlights.length > 0 && (
                                    <>
                                        <div style={{ fontSize: "0.75rem", color: "#606060", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
                                            Technical highlights
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            {project.highlights.map((h, i) => {
                                                const accentColor = languageTabs.find(l => l.name === activeTab)?.color || "#4a9eff"
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -6 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.04, duration: 0.18 }}
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                            padding: "10px 14px",
                                                            backgroundColor: "rgba(255,255,255,0.03)",
                                                            borderRadius: "8px",
                                                            borderLeft: `3px solid ${accentColor}`,
                                                            fontSize: "0.85rem",
                                                            color: "#c0c0c0",
                                                            lineHeight: "1.5"
                                                        }}
                                                    >
                                                        {h}
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}

                                {project.images && project.images.length > 0 && (
                                    <>
                                        <div style={{ fontSize: "0.75rem", color: "#606060", textTransform: "uppercase", letterSpacing: "0.08em", margin: "20px 0 10px" }}>
                                            Screenshots
                                        </div>
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: `repeat(${project.images.length}, 1fr)`,
                                            gap: "12px"
                                        }}>
                                            {project.images.map((src, i) => (
                                                <a
                                                    key={i}
                                                    href={src}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`${project.name} screenshot ${i + 1}`}
                                                        style={{
                                                            width: "100%",
                                                            height: "auto",
                                                            borderRadius: "8px",
                                                            border: "1px solid rgba(255,255,255,0.1)",
                                                            display: "block"
                                                        }}
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {/* Placeholder state */}
                        {project && project.placeholder && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                    color: "#505050"
                                }}
                            >
                                <FaCode size={32} />
                                <p style={{ margin: 0, fontSize: "1rem", color: "#606060", textAlign: "center" }}>
                                    {project.description}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

// ─── TechStack section ─────────────────────────────────────────────────────────

function TechStack() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <>
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 20px",
                    position: "relative",
                    zIndex: 10
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "16px",
                        background: "linear-gradient(135deg, #e8e8e8 0%, #a0a0a0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textAlign: "center"
                    }}
                >
                    Tech Stack
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        fontSize: "1.1rem",
                        color: "#a0a0a0",
                        marginBottom: "60px",
                        textAlign: "center"
                    }}
                >
                    Tools and technologies I work with daily
                </motion.p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 160px)",
                    gap: "24px",
                    justifyContent: "center",
                    marginBottom: "24px"
                }}>
                    {otherCategories.map((category, index) => (
                        <TechCard key={category.id} category={category} index={index} />
                    ))}

                    {/* Languages card — full row at bottom */}
                    <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <LanguagesCard onOpen={() => setDrawerOpen(true)} />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Overlay */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                zIndex: 99
                            }}
                        />
                        <ProjectDrawer key="drawer" onClose={() => setDrawerOpen(false)} />
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default TechStack
