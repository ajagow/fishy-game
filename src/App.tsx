import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { generateInitialFish, handleCollision} from './util'
import type { BaseFish, NPCFish } from './components/Fish/Fish'
import { Fish } from './components/Fish/Fish'
import { FISH_SIZE_MAP, type GameState } from './constants'
import { Header } from './components/Header/Header'
import { GameModal } from './components/GameModal/GameModal'

export const OCEAN_WIDTH = 800
export const OCEAN_HEIGHT = 600
const PLAYER_SPEED = 4
const INTIIAL_FISH_COUNT = 10

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`

const Ocean = styled.div`
  width: ${OCEAN_WIDTH}px;
  height: ${OCEAN_HEIGHT}px;
  position: relative;
  overflow: hidden;
  background-color: #ADD8E6;
  align-self: center;
`


function App() {
  const [playerFish, setPlayerFish] = useState<BaseFish>({ position: { x: OCEAN_WIDTH / 2, y: OCEAN_HEIGHT / 2}, fishType: 'xs' })
  const playerFishRef = useRef<BaseFish>(playerFish)

  const animationFrameId = useRef<number>(0)
  const [resetKey, setResetKey] = useState(crypto.randomUUID())

  const [gameState, setGameState] = useState<GameState>('INTRO')
  const keys = useRef<Record<string, boolean>>({})

  const [otherFish, setOtherFish] = useState<NPCFish[]>(generateInitialFish(INTIIAL_FISH_COUNT))
  const otherFishRef = useRef<NPCFish[]>(otherFish)

  const resetGame = () => {
    keys.current = {}
    const newPlayerFish = { position: { x: OCEAN_WIDTH / 2, y: OCEAN_HEIGHT / 2 }, fishType: 'xs' as const }
    const newOtherFish = generateInitialFish(INTIIAL_FISH_COUNT)

    playerFishRef.current = newPlayerFish
    otherFishRef.current = newOtherFish

    setPlayerFish(newPlayerFish)
    setOtherFish(newOtherFish)

    setGameState('PLAY')
    setResetKey(crypto.randomUUID())
  }


  useEffect(() => {

    // Keyboard event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      keys.current[e.key] = true
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault()
      keys.current[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Run the game
    const gameLoop = () => {
      // Handle collision with other fish
      const isGameOver = handleCollision(playerFishRef, otherFishRef)
      if (isGameOver) {
        cancelAnimationFrame(animationFrameId.current)
        setGameState('LOST')
        return
      }

      // Remove eaten fish
      otherFishRef.current = otherFishRef.current.filter(fish => !fish.isEaten)

      if(playerFishRef.current.fishType === 'xl' && otherFishRef.current.every(fish => fish.isEaten)) {
        setGameState('WON')
        return
      }

      if (gameState === 'PLAY') {
        // Handle player position and movement
        if (keys.current['ArrowUp']) playerFishRef.current.position.y -= PLAYER_SPEED
        if (keys.current['ArrowDown']) playerFishRef.current.position.y += PLAYER_SPEED
        if (keys.current['ArrowLeft']) playerFishRef.current.position.x -= PLAYER_SPEED
        if (keys.current['ArrowRight']) playerFishRef.current.position.x += PLAYER_SPEED

        const playerFishSize = FISH_SIZE_MAP[playerFishRef.current.fishType]
        const radius = playerFishSize / 2
        playerFishRef.current.position.x = Math.max(radius, Math.min(OCEAN_WIDTH - radius, playerFishRef.current.position.x))
        playerFishRef.current.position.y = Math.max(radius, Math.min(OCEAN_HEIGHT - radius, playerFishRef.current.position.y))
        setPlayerFish({ ...playerFishRef.current })

        // Handle other fish position and movement
        otherFishRef.current = otherFishRef.current.map(fish => {
          const { position, velocity } = fish
          const radius = FISH_SIZE_MAP[fish.fishType] / 2

          let newX = position.x + velocity.x
          let newY = position.y + velocity.y

          if (newX - radius < 0 || newX + radius > OCEAN_WIDTH) {
            fish.velocity.x *= -1
            newX = Math.max(radius, Math.min(OCEAN_WIDTH - radius, newX))
          }
          if (newY - radius < 0 || newY + radius > OCEAN_HEIGHT) {
            fish.velocity.y *= -1
            newY = Math.max(radius, Math.min(OCEAN_HEIGHT - radius, newY))
          }

          return { ...fish, position: { x: newX, y: newY } }
        })

        setOtherFish([...otherFishRef.current])

        //Set animation frame
        animationFrameId.current = requestAnimationFrame(gameLoop)
      }
    }

    gameLoop()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(animationFrameId.current)
    }

  }, [gameState, resetKey])

  if (!playerFish) {
    return
  }

  return (
    <Container>
      <Header setGameState={setGameState} resetGame={resetGame}/>
      <Ocean>
        <Fish position={playerFish.position} fishType={playerFish.fishType} isMainFish={true}/>
        {otherFish?.map((fish, index) => (
          <Fish key={index} position={fish.position} fishType={fish.fishType} isEaten={fish.isEaten}/>
        ))}
      </Ocean>
      <GameModal open={gameState !== 'PLAY'} closeModal={() => {
        resetGame()
      }} gameState={gameState} setGameState={setGameState} />
    </Container>
  )
}

export default App
