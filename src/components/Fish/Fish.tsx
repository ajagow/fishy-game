import {styled} from 'styled-components'
import { FISH_SIZE_MAP } from '../../constants';

export type FishType = 'xs' |  's'|  'm' |  'l' | 'xl';

export interface Position {
    x: number;
    y: number;
}

export interface BaseFish {
    position: Position
    fishType: FishType;
    isMainFish?: boolean
}

export interface NPCFish extends BaseFish {
    velocity: Position
    isEaten: boolean
} 

const FishBody = styled.div<{ position: Position; fishType: FishType; isMainFish: boolean; isEaten: boolean}>`
    position: absolute;
    left: ${({ position, fishType }) => position.x - FISH_SIZE_MAP[fishType] / 2}px;
    top: ${({ position, fishType }) => position.y - FISH_SIZE_MAP[fishType] / 2}px;
    background: ${({isMainFish}) => isMainFish ? 'red' : 'blue'};
    width: ${props => FISH_SIZE_MAP[props.fishType]}px;
    height: ${props => FISH_SIZE_MAP[props.fishType]}px;
    display: ${props => props.isEaten ? 'none' : 'initial'}
`

export const Fish = ({position, fishType, isMainFish = false, isEaten = false}: BaseFish & {isEaten?: boolean}): React.ReactElement => {
    return <FishBody position={position} fishType={fishType} isMainFish={isMainFish} isEaten={isEaten} />
}