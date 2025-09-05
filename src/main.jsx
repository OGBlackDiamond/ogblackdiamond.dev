import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import SnakeBody from './Components/SnakeBody.jsx'


function Button() {

    const [apps, updateApps] = useState([
        [100, 100],
        [200, 200],
        [300, 300]
    ]);


    return (
        <div>
            <button onClick={() => {
                updateApps([...apps, [0, 0]])
            }}>
                Add new thingey!!
            </button>

            {apps.map(app => {
                return <SnakeBody key={Math.random()} xi={app[0]} yi={app[1]}/>
            })}
        </div>

    )
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Button/>        
    </StrictMode>,
)
