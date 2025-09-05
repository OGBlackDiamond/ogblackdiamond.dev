import { motion } from "motion/react"
import { useState } from "react"

function App({xi, yi, ...props}) {

    const [x, setX] = useState(xi)
    const [y, setY] = useState(yi)

    return (
        <>
            <motion.div 
                style={{
                    width: "100px",
                    height: "100px", 
                    backgroundColor: "darkgreen",
                    x: xi,
                    y: yi,
                    borderRadius: "20%"
                }}
                whileHover={{
                    rotate: Math.random() * 720
                }}
                animate={{
                    x: x,
                    y:y
                }}
                transition={{ duration: 2, ease: "linear" }}
                >
                
            </motion.div>
            <motion.button
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setX(Math.random() * 800);
                    setY(Math.random() * 800);
                }}>
            randomize!!
            </motion.button>
        </>
    )
}

export default App

