

function SnakeBody({x, y, ...props}) {
    
    return (
        <motion.div 
            style={{
                width: "100px",
                height: "100px", 
                backgroundColor: "darkgreen",
                x: x,
                y: y,
                borderRadius: "20%"
            }}
            whileHover={{
                rotate: Math.random() * 720
            }}
            animate={{
                x: x,
                y: y
            }}
            transition={{ duration: 2, ease: "linear" }}
            >
            
        </motion.div>
    )
}
