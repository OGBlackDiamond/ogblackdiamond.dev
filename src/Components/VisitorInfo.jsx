import { useState, useEffect } from "react"
/* eslint-disable no-unused-vars */
import { motion } from "motion/react"
/* eslint-enable no-unused-vars */

function parseUserAgent(ua) {
    let browser = "Unknown"
    let os = "Unknown"

    // Browser detection (order matters — more specific first)
    if (/Edg\//.test(ua)) {
        const v = ua.match(/Edg\/([\d.]+)/)?.[1]?.split(".")[0]
        browser = `Edge ${v ?? ""}`.trim()
    } else if (/OPR\/|Opera\//.test(ua)) {
        const v = ua.match(/OPR\/([\d.]+)/)?.[1]?.split(".")[0]
        browser = `Opera ${v ?? ""}`.trim()
    } else if (/Chrome\//.test(ua) && !/Chromium\//.test(ua)) {
        const v = ua.match(/Chrome\/([\d.]+)/)?.[1]?.split(".")[0]
        browser = `Chrome ${v ?? ""}`.trim()
    } else if (/Firefox\//.test(ua)) {
        const v = ua.match(/Firefox\/([\d.]+)/)?.[1]?.split(".")[0]
        browser = `Firefox ${v ?? ""}`.trim()
    } else if (/Safari\//.test(ua)) {
        const v = ua.match(/Version\/([\d.]+)/)?.[1]?.split(".")[0]
        browser = `Safari ${v ?? ""}`.trim()
    } else if (/Chromium\//.test(ua)) {
        const v = ua.match(/Chromium\/([\d.]+)/)?.[1]?.split(".")[0]
        browser = `Chromium ${v ?? ""}`.trim()
    }

    // OS detection
    if (/Windows NT/.test(ua)) {
        const ntMap = {
            "10.0": "Windows 11/10",
            "6.3": "Windows 8.1",
            "6.2": "Windows 8",
            "6.1": "Windows 7",
        }
        const nt = ua.match(/Windows NT ([\d.]+)/)?.[1]
        os = ntMap[nt] ?? `Windows NT ${nt ?? ""}`
    } else if (/Android/.test(ua)) {
        const v = ua.match(/Android ([\d.]+)/)?.[1]
        os = `Android ${v ?? ""}`.trim()
    } else if (/iPhone|iPad|iPod/.test(ua)) {
        const v = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, ".")
        os = `iOS ${v ?? ""}`.trim()
    } else if (/Mac OS X/.test(ua)) {
        const v = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, ".")
        os = `macOS ${v ?? ""}`.trim()
    } else if (/Linux/.test(ua)) {
        os = "Linux"
    } else if (/CrOS/.test(ua)) {
        os = "ChromeOS"
    }

    return { browser, os }
}

function Row({ label, value }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "baseline" }}>
            <span style={{
                fontSize: "0.68rem",
                color: "#555",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                flexShrink: 0
            }}>
                {label}
            </span>
            <span style={{
                fontSize: "0.78rem",
                color: "#9a9a9a",
                fontFamily: "monospace",
                textAlign: "right"
            }}>
                {value}
            </span>
        </div>
    )
}

function VisitorInfo() {
    const [ip, setIp] = useState(null)
    const [location, setLocation] = useState(null)
    const [time, setTime] = useState(() => new Date().toLocaleTimeString())
    const [tz] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [resolution] = useState(() => `${window.screen.width} × ${window.screen.height}`)
    const [{ browser, os }] = useState(() => parseUserAgent(navigator.userAgent))

    // IP + location fetch
    useEffect(() => {
        const controller = new AbortController()
        fetch("https://ipapi.co/json/", { signal: controller.signal })
            .then(r => r.json())
            .then(data => {
                setIp(data.ip ?? "N/A")
                const city = data.city ?? ""
                const country = data.country_name ?? ""
                setLocation([city, country].filter(Boolean).join(", ") || "N/A")
            })
            .catch(() => {
                setIp("N/A")
                setLocation("N/A")
            })
        return () => controller.abort()
    }, [])

    // Clock tick
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            style={{
                position: "fixed",
                top: "16px",
                left: "16px",
                zIndex: 20,
                backgroundColor: "rgba(12, 12, 12, 0.82)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                backdropFilter: "blur(12px)",
                padding: "12px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "7px",
                minWidth: "210px",
                pointerEvents: "none"
            }}
        >
            <Row label="ip" value={ip ?? "···"} />
            <Row label="location" value={location ?? "···"} />
            <Row label="browser" value={browser} />
            <Row label="os" value={os} />
            <Row label="resolution" value={resolution} />
            <div style={{
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.06)",
                margin: "2px 0"
            }} />
            <Row label="local time" value={time} />
            <Row label="timezone" value={tz} />
        </motion.div>
    )
}

export default VisitorInfo
