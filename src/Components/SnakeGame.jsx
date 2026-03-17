import { useState, useEffect, useCallback, useRef } from "react"

function SnakeGame({ wrapperRef = null, scrolled = false }) {
    const CELL_SIZE = 25
    const PADDING = 2

    const canvasRef = useRef(null)

    // Use refs for all game state so the rAF loop always sees fresh values
    // without causing re-renders on every tick.
    const snakeRef = useRef(null)
    const applesRef = useRef([])
    const directionRef = useRef("right")
    const gridRef = useRef({ width: 0, height: 0 })
    const scrolledRef = useRef(scrolled)

    // We still need a tiny bit of React state to trigger the initial mount draw
    const [ready, setReady] = useState(false)

    // Mirror scrolled prop into a ref so event listeners always see the latest value
    scrolledRef.current = scrolled

    // ---------- helpers ----------

    const makeGrid = useCallback(() => {
        return {
            width: Math.floor(window.innerWidth / CELL_SIZE),
            height: Math.floor(window.innerHeight / CELL_SIZE)
        }
    }, [])

    const spawnApple = useCallback((currentSnake, currentApples, grid) => {
        const { width, height } = grid
        let pos
        do {
            pos = {
                x: Math.floor(Math.random() * (width - PADDING * 2)) + PADDING,
                y: Math.floor(Math.random() * (height - PADDING * 2)) + PADDING
            }
        } while (
            currentSnake.some(s => s[0] === pos.x && s[1] === pos.y) ||
            currentApples.some(a => a.x === pos.x && a.y === pos.y)
        )
        return pos
    }, [])

    const makeSnake = useCallback((grid) => {
        const cx = Math.floor(grid.width / 2)
        const cy = Math.floor(grid.height / 2)
        return [
            [cx,     cy],
            [cx - 1, cy],
            [cx - 2, cy],
            [cx - 3, cy],
            [cx - 4, cy]
        ]
    }, [])

    const getNextDirection = useCallback((head, apples, snake, currentDir, grid) => {
        const { width, height } = grid
        const moves = [
            { dir: "up",    pos: [head[0],     head[1] - 1] },
            { dir: "down",  pos: [head[0],     head[1] + 1] },
            { dir: "left",  pos: [head[0] - 1, head[1]    ] },
            { dir: "right", pos: [head[0] + 1, head[1]    ] }
        ]

        const inBounds = ([x, y]) =>
            x >= PADDING && x < width - PADDING &&
            y >= PADDING && y < height - PADDING

        const noCollide = (pos) => !snake.some(s => s[0] === pos[0] && s[1] === pos[1])

        // Target the nearest apple by Manhattan distance from the head
        const target = apples.length > 0
            ? apples.reduce((nearest, a) => {
                const d = Math.abs(head[0] - a.x) + Math.abs(head[1] - a.y)
                const nd = Math.abs(head[0] - nearest.x) + Math.abs(head[1] - nearest.y)
                return d < nd ? a : nearest
            })
            : null

        if (target) {
            const valid = moves
                .filter(m => inBounds(m.pos) && noCollide(m.pos))
                .map(m => ({
                    ...m,
                    dist: Math.abs(m.pos[0] - target.x) + Math.abs(m.pos[1] - target.y)
                }))
                .sort((a, b) => a.dist - b.dist)

            if (valid.length > 0) return valid[0].dir
        }

        // fallback: keep going if possible
        const ahead = {
            up:    [head[0],     head[1] - 1],
            down:  [head[0],     head[1] + 1],
            left:  [head[0] - 1, head[1]    ],
            right: [head[0] + 1, head[1]    ]
        }[currentDir]
        if (inBounds(ahead) && noCollide(ahead)) return currentDir

        // last resort: any safe move
        const any = moves.find(m => inBounds(m.pos) && noCollide(m.pos))
        return any ? any.dir : currentDir
    }, [])

    // ---------- draw ----------

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        const snake = snakeRef.current
        const apples = applesRef.current
        const { width, height } = gridRef.current

        const W = width  * CELL_SIZE
        const H = height * CELL_SIZE

        // Clear
        ctx.clearRect(0, 0, W, H)

        // Grid lines
        ctx.strokeStyle = "rgba(120, 180, 130, 0.08)"
        ctx.lineWidth = 1
        for (let x = 0; x <= width; x++) {
            ctx.beginPath()
            ctx.moveTo(x * CELL_SIZE, 0)
            ctx.lineTo(x * CELL_SIZE, H)
            ctx.stroke()
        }
        for (let y = 0; y <= height; y++) {
            ctx.beginPath()
            ctx.moveTo(0, y * CELL_SIZE)
            ctx.lineTo(W, y * CELL_SIZE)
            ctx.stroke()
        }

        // Snake segments
        if (snake) {
            const r = CELL_SIZE * 0.15  // corner radius
            snake.forEach((seg, i) => {
                const px = seg[0] * CELL_SIZE
                const py = seg[1] * CELL_SIZE
                const s  = CELL_SIZE

                // Filled cell with rounded corners
                ctx.beginPath()
                ctx.moveTo(px + r, py)
                ctx.lineTo(px + s - r, py)
                ctx.arcTo(px + s, py,     px + s, py + r,     r)
                ctx.lineTo(px + s, py + s - r)
                ctx.arcTo(px + s, py + s, px + s - r, py + s, r)
                ctx.lineTo(px + r, py + s)
                ctx.arcTo(px,     py + s, px,     py + s - r, r)
                ctx.lineTo(px,     py + r)
                ctx.arcTo(px,     py,     px + r, py,         r)
                ctx.closePath()

                // Head is brighter
                if (i === 0) {
                    ctx.fillStyle = "rgba(60, 130, 80, 0.85)"
                } else {
                    ctx.fillStyle = "rgba(45, 95, 63, 0.7)"
                }
                ctx.fill()

                ctx.strokeStyle = "rgba(60, 120, 80, 0.5)"
                ctx.lineWidth = 1
                ctx.stroke()

                // Glow for head only (cheap single shadow)
                if (i === 0) {
                    ctx.shadowColor  = "rgba(80, 255, 130, 0.45)"
                    ctx.shadowBlur   = 14
                    ctx.fill()
                    ctx.shadowBlur   = 0
                    ctx.shadowColor  = "transparent"
                }
            })
        }

        // Apples
        apples.forEach(apple => {
            const cx = apple.x * CELL_SIZE + CELL_SIZE / 2
            const cy = apple.y * CELL_SIZE + CELL_SIZE / 2
            const rad = CELL_SIZE * 0.42

            ctx.shadowColor = "rgba(255, 71, 87, 0.55)"
            ctx.shadowBlur  = 12
            ctx.beginPath()
            ctx.arc(cx, cy, rad, 0, Math.PI * 2)
            ctx.fillStyle = "#ff4757"
            ctx.fill()
            ctx.shadowBlur  = 0
            ctx.shadowColor = "transparent"
        })
    }, [])

    // ---------- game loop (requestAnimationFrame) ----------

    useEffect(() => {
        if (!ready) return

        const grid = makeGrid()
        gridRef.current = grid

        const initSnake = makeSnake(grid)
        snakeRef.current  = initSnake
        applesRef.current = [spawnApple(initSnake, [], grid)]
        directionRef.current = "right"

        // Resize canvas to match grid pixel size
        const canvas = canvasRef.current
        canvas.width  = grid.width  * CELL_SIZE
        canvas.height = grid.height * CELL_SIZE

        const MS_PER_TICK = 20   // game speed (ms between steps)
        let lastTick = performance.now()
        let rafId

        const loop = (now) => {
            rafId = requestAnimationFrame(loop)

            if (now - lastTick >= MS_PER_TICK) {
                lastTick = now

                const snake  = snakeRef.current
                const apples = applesRef.current
                const head   = snake[0]

                const nextDir = getNextDirection(head, apples, snake, directionRef.current, grid)
                directionRef.current = nextDir

                const delta = { up: [0,-1], down: [0,1], left: [-1,0], right: [1,0] }[nextDir]
                const newHead = [head[0] + delta[0], head[1] + delta[1]]

                const hitWall = newHead[0] < PADDING || newHead[0] >= grid.width  - PADDING ||
                                newHead[1] < PADDING || newHead[1] >= grid.height - PADDING
                const hitSelf = snake.some(s => s[0] === newHead[0] && s[1] === newHead[1])

                if (hitWall || hitSelf) {
                    const fresh = makeSnake(grid)
                    snakeRef.current     = fresh
                    applesRef.current    = [spawnApple(fresh, [], grid)]
                    directionRef.current = "right"
                } else {
                    const eatenIdx = apples.findIndex(a => newHead[0] === a.x && newHead[1] === a.y)
                    if (eatenIdx !== -1) {
                        snakeRef.current = [newHead, ...snake]
                        const remaining = apples.filter((_, i) => i !== eatenIdx)
                        applesRef.current = [...remaining, spawnApple(snakeRef.current, remaining, grid)]
                    } else {
                        snakeRef.current = [newHead, ...snake.slice(0, -1)]
                    }
                }
            }

            draw()
        }

        rafId = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(rafId)
    }, [ready, makeGrid, makeSnake, spawnApple, getNextDirection, draw])

    // Signal ready after mount
    useEffect(() => {
        setReady(true)
    }, [])

    // ---------- click-to-spawn apple ----------

    useEffect(() => {
        const handleClick = (e) => {
            if (scrolledRef.current) return

            const grid = gridRef.current
            if (!grid.width || !grid.height) return

            const gridX = Math.floor(e.clientX / CELL_SIZE)
            const gridY = Math.floor(e.clientY / CELL_SIZE)

            // Must be within padded bounds
            if (
                gridX < PADDING || gridX >= grid.width  - PADDING ||
                gridY < PADDING || gridY >= grid.height - PADDING
            ) return

            const snake  = snakeRef.current  ?? []
            const apples = applesRef.current ?? []

            // Don't place on snake or existing apple
            if (snake.some(s => s[0] === gridX && s[1] === gridY)) return
            if (apples.some(a => a.x === gridX && a.y === gridY)) return

            applesRef.current = [...apples, { x: gridX, y: gridY }]
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [])

    return (
        <div ref={wrapperRef} style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            overflow: "hidden",
            cursor: scrolled ? "default" : "crosshair"
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "block"
                }}
            />
        </div>
    )
}

export default SnakeGame
