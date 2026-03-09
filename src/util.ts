import type { RefObject } from 'react';
import { OCEAN_WIDTH, OCEAN_HEIGHT } from './App';
import type { NPCFish, FishType, BaseFish } from './components/Fish/Fish';
import { FISH_SIZE_MAP, FISH_SIZE_ORDER } from './constants';


const generateRandomFishSize = (): FishType => {
    const sizes: FishType[] = ['xs', 's', 'm', 'l', 'xl'];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

const createNPCFish = (fishType: FishType): NPCFish => {
    return {
            position: {
                x: Math.random() * OCEAN_WIDTH,
                y: Math.random() * OCEAN_HEIGHT,
            },
            fishType,
            velocity: {
                x: (Math.random() - 0.5) * 2, // Random velocity between -1 and 1
                y: (Math.random() - 0.5) * 2,
            },
            isEaten: false
        }
}

export const generateInitialFish = (fishCount: number): NPCFish[] => {
    const initialFish = []
    for (const size of FISH_SIZE_ORDER) {
        initialFish.push(createNPCFish(size))
    }
    for(let i = 0; i < fishCount - FISH_SIZE_ORDER.length; i++) {
        initialFish.push(createNPCFish(generateRandomFishSize()))
    }

    return initialFish
}

// Uses Axis-Aligned Bounding Box collision detection
const isColliding = (playerFish: BaseFish, fish: NPCFish): boolean => {
  const { position: playerPosition, fishType: playerFishType } = playerFish
  const playerSize = FISH_SIZE_MAP[playerFishType]
  const otherSize = FISH_SIZE_MAP[fish.fishType]

  const playerLeft = playerPosition.x - playerSize / 2
  const playerTop  = playerPosition.y - playerSize / 2
  const npcLeft    = fish.position.x  - otherSize  / 2
  const npcTop     = fish.position.y  - otherSize  / 2

  return (
    playerLeft < npcLeft + otherSize &&
    playerLeft + playerSize > npcLeft &&
    playerTop  < npcTop + otherSize &&
    playerTop  + playerSize > npcTop
  )
}

const isKilledByOtherFish = ({fishType, otherFishType}: {fishType: FishType; otherFishType: FishType}) => {
  return FISH_SIZE_ORDER.indexOf(fishType) < FISH_SIZE_ORDER.indexOf(otherFishType);
}

const growPlayer = (playerFish: BaseFish): boolean => {
  const currentIndex = FISH_SIZE_ORDER.indexOf(playerFish.fishType)
  const isMaxSize = currentIndex + 1 === FISH_SIZE_ORDER.length
  if (!isMaxSize) {
    playerFish.fishType = FISH_SIZE_ORDER[currentIndex + 1]
  }
  return isMaxSize
}


export const handleCollision = (playerFishRef: RefObject<BaseFish>, otherFishRef: RefObject<NPCFish[]>) => {
    const player = playerFishRef.current

    for (const fish of otherFishRef.current) {
        if (fish.isEaten || !isColliding(player, fish)) {
            continue
        }

        if (isKilledByOtherFish({fishType: player.fishType, otherFishType: fish.fishType} )) {
            return true
        }

        fish.isEaten = true
        return growPlayer(player)
    }

    return false

}