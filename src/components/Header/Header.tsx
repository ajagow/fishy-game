import styled from "styled-components"
import { Text } from '../Text/Text'
import type { GameState } from "../../constants"

const HeaderContainer = styled.div`
    text-align: center;
`

const ActionButtonContainer = styled.div`
    
`
type HeaderProps = {
    setGameState: (state: GameState) => void
    resetGame: () => void
}

export const Header = ({ setGameState, resetGame }: HeaderProps) => {
    return (
        <HeaderContainer>
            <Text variant="title">Fishy!</Text>
            <ActionButtonContainer>
                <button onClick={() => {
                    setGameState('PAUSE')
                }}>pause</button>
                <button onClick={() => resetGame()}>restart</button>
            </ActionButtonContainer>
        </HeaderContainer>
    )
}