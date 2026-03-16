/* eslint-disable no-unused-vars */
import { motion } from "motion/react"
/* eslint-enable no-unused-vars */

function SnakeBody({x, y, size = 25, isNew = false}) {
    
    return (
        <motion.div 
            initial={isNew ? { x: x, y: y, scale: 0.5, opacity: 0 } : false}
            animate={{ 
                x: x,
                y: y,
                scale: 1,
                opacity: 1
            }}
            transition={{ 
                x: { duration: 0.025, ease: "linear" },
                y: { duration: 0.025, ease: "linear" },
                scale: { duration: 0.15, ease: "easeOut" },
                opacity: { duration: 0.15, ease: "easeOut" }
            }}
            style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`, 
                backgroundColor: "rgba(45, 95, 63, 0.7)",
                borderRadius: "15%",
                border: "1px solid rgba(60, 120, 80, 0.5)",
                boxShadow: `0 0 16px 5px rgba(80, 255, 130, 0.25),
                             0 0 35px 0px rgba(80,255,130,0.07)`,
                filter: "blur(0.4px)",
                backdropFilter: "blur(0.7px)"
            }}
            >
            
        </motion.div>
    )
}

export default SnakeBody
