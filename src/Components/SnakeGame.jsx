import { useState, useEffect, useCallback } from "react"
/* eslint-disable no-unused-vars */
import { motion } from "motion/react"
/* eslint-enable no-unused-vars */
import SnakeBody from "./SnakeBody.jsx"

function SnakeGame() {
    const CELL_SIZE = 25
    const PADDING = 2 // Grid cells of padding from edges
    const GRID_WIDTH = Math.floor(window.innerWidth / CELL_SIZE)
    const GRID_HEIGHT = Math.floor(window.innerHeight / CELL_SIZE)
    
    // Initialize snake at center of screen
    const centerX = Math.floor(GRID_WIDTH / 2)
    const centerY = Math.floor(GRID_HEIGHT / 2)
    
    const [snake, setSnake] = useState([
        [centerX, centerY],
        [centerX - 1, centerY],
        [centerX - 2, centerY],
        [centerX - 3, centerY],
        [centerX - 4, centerY]
    ])
    
    const [apple, setApple] = useState(null)
    const [direction, setDirection] = useState("right")
    const [justGrew, setJustGrew] = useState(false)
    
    // Spawn apple at random position (not in snake)
    const spawnApple = useCallback((currentSnake) => {
        let newApple
        let validPosition = false
        
        while (!validPosition) {
            newApple = {
                x: Math.floor(Math.random() * (GRID_WIDTH - PADDING * 2)) + PADDING,
                y: Math.floor(Math.random() * (GRID_HEIGHT - PADDING * 2)) + PADDING
            }
            
            // Check if apple is not inside snake
            validPosition = !currentSnake.some(segment => 
                segment[0] === newApple.x && segment[1] === newApple.y
            )
        }
        
        return newApple
    }, [GRID_WIDTH, GRID_HEIGHT])
    
    // Initialize apple
    useEffect(() => {
        setApple(spawnApple(snake))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    // Check collision with snake body
    const isCollision = useCallback((pos, snakeBody) => {
        return snakeBody.some(segment => segment[0] === pos[0] && segment[1] === pos[1])
    }, [])
    
    // Get next direction using greedy pathfinding
    const getNextDirection = useCallback((head, applePos, snakeBody) => {
        if (!applePos) return direction
        
        const moves = [
            { dir: "up", pos: [head[0], head[1] - 1] },
            { dir: "down", pos: [head[0], head[1] + 1] },
            { dir: "left", pos: [head[0] - 1, head[1]] },
            { dir: "right", pos: [head[0] + 1, head[1]] }
        ]
        
        // Filter out moves that go out of bounds or into padding
        const validMoves = moves.filter(move => {
            const x = move.pos[0]
            const y = move.pos[1]
            return x >= PADDING && x < GRID_WIDTH - PADDING && 
                   y >= PADDING && y < GRID_HEIGHT - PADDING
        })
        
        // Calculate Manhattan distance for each valid move
        validMoves.forEach(move => {
            move.distance = Math.abs(move.pos[0] - applePos.x) + Math.abs(move.pos[1] - applePos.y)
        })
        
        // Sort by distance (closest first)
        validMoves.sort((a, b) => a.distance - b.distance)
        
        // Pick first move that doesn't collide with snake body (excluding tail)
        const bodyWithoutTail = snakeBody.slice(0, -1)
        for (let move of validMoves) {
            if (!isCollision(move.pos, bodyWithoutTail)) {
                return move.dir
            }
        }
        
        // Fallback: continue current direction if it's still valid
        const currentMoveMap = {
            "up": [head[0], head[1] - 1],
            "down": [head[0], head[1] + 1],
            "left": [head[0] - 1, head[1]],
            "right": [head[0] + 1, head[1]]
        }
        const currentNextPos = currentMoveMap[direction]
        if (currentNextPos && 
            currentNextPos[0] >= PADDING && currentNextPos[0] < GRID_WIDTH - PADDING &&
            currentNextPos[1] >= PADDING && currentNextPos[1] < GRID_HEIGHT - PADDING &&
            !isCollision(currentNextPos, bodyWithoutTail)) {
            return direction
        }
        
        // Last resort: pick any valid move that doesn't collide
        for (let move of validMoves) {
            if (!isCollision(move.pos, bodyWithoutTail)) {
                return move.dir
            }
        }
        
        return direction
    }, [direction, GRID_WIDTH, GRID_HEIGHT, PADDING, isCollision])
    
    // Game loop
    useEffect(() => {
        if (!apple) return
        
        const gameLoop = setInterval(() => {
            setSnake(prevSnake => {
                const head = prevSnake[0]
                
                // Get next direction
                const nextDir = getNextDirection(head, apple, prevSnake)
                setDirection(nextDir)
                
                // Calculate new head position
                let newHead = [...head]
                switch (nextDir) {
                    case "up":
                        newHead = [head[0], head[1] - 1]
                        break
                    case "down":
                        newHead = [head[0], head[1] + 1]
                        break
                    case "left":
                        newHead = [head[0] - 1, head[1]]
                        break
                    case "right":
                        newHead = [head[0] + 1, head[1]]
                        break
                }
                
                // Check for death conditions
                const hitWall = newHead[0] < PADDING || newHead[0] >= GRID_WIDTH - PADDING ||
                               newHead[1] < PADDING || newHead[1] >= GRID_HEIGHT - PADDING
                const hitSelf = prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
                
                if (hitWall || hitSelf) {
                    // Reset snake to center
                    const newCenterX = Math.floor(GRID_WIDTH / 2)
                    const newCenterY = Math.floor(GRID_HEIGHT / 2)
                    const resetSnake = [
                        [newCenterX, newCenterY],
                        [newCenterX - 1, newCenterY],
                        [newCenterX - 2, newCenterY],
                        [newCenterX - 3, newCenterY],
                        [newCenterX - 4, newCenterY]
                    ]
                    setDirection("right")
                    setApple(spawnApple(resetSnake))
                    return resetSnake
                }
                
                // Check if apple is eaten
                const ateApple = newHead[0] === apple.x && newHead[1] === apple.y
                
                let newSnake
                if (ateApple) {
                    // Grow snake (don't remove tail)
                    newSnake = [newHead, ...prevSnake]
                    // Spawn new apple
                    setApple(spawnApple(newSnake))
                    setJustGrew(true)
                    setTimeout(() => setJustGrew(false), 150)
                } else {
                    // Move snake (remove tail)
                    newSnake = [newHead, ...prevSnake.slice(0, -1)]
                }
                
                return newSnake
            })
        }, 25)
        
        return () => clearInterval(gameLoop)
    }, [apple, direction, GRID_WIDTH, GRID_HEIGHT, PADDING, getNextDirection, spawnApple])
    
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            overflow: "hidden"
        }}>
            {/* Grid pattern background */}
            <div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 0,
                    backgroundImage: `repeating-linear-gradient(
                        to right,
                        rgba(120, 180, 130, 0.08) 0,
                        rgba(120, 180, 130, 0.08) 1px,
                        transparent 1px,
                        transparent ${CELL_SIZE}px
                    ),
                    repeating-linear-gradient(
                        to bottom,
                        rgba(120, 180, 130, 0.08) 0,
                        rgba(120, 180, 130, 0.08) 1px,
                        transparent 1px,
                        transparent ${CELL_SIZE}px
                    )`,
                    backgroundColor: "transparent"
                }}
            />
            {/* Render snake segments */}
            {snake.map((segment, index) => (
                <SnakeBody 
                    key={index}
                    x={segment[0] * CELL_SIZE}
                    y={segment[1] * CELL_SIZE}
                    size={CELL_SIZE}
                    isNew={justGrew && index === snake.length - 1}
                />
            ))}
            
            {/* Render apple */}
            {apple && (
                <motion.div
                    style={{
                        position: "absolute",
                        width: `${CELL_SIZE}px`,
                        height: `${CELL_SIZE}px`,
                        backgroundColor: "#ff4757",
                        borderRadius: "50%",
                        boxShadow: "0 0 10px rgba(255, 71, 87, 0.5)"
                    }}
                    animate={{
                        x: apple.x * CELL_SIZE,
                        y: apple.y * CELL_SIZE
                    }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </div>
    )
}

export default SnakeGame
