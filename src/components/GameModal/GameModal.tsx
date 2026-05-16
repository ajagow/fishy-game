import styled from "styled-components"
import type { GameState } from "../../constants"
import { Modal, type ModalProps } from "../Modal/Modal"

import { Text } from "../Text/Text"

interface GameModalProp extends ModalProps {
    gameState: GameState
    setGameState: (state: GameState) => void
}

const GAME_MODAL_CONTENT: Record<GameState, { title?: string; body?: string[]; btnLabel?: string; btnAction?: GameState }> = {
    "INTRO": {
        title: "How to play",
        body: [
            "You are the little red guppy in the ocean and you're trying to eat smaller fish so that you can grow into a big strong apex predator!",
            "To move, use your arrow keys.",
            "But watch out! If you run into a larger fish, they'll eat you.",
            "To finish the game, you must eat all the fish in the ocean"
        ],
        btnLabel: "start",
        btnAction: 'PLAY'
    },
    "PAUSE": {
        title: "Taking a break from conquering the ocean?",
        body: ["Hit resume when you're ready to try to become the big kahuna"],
        btnLabel: "resume",
        btnAction: 'PLAY'
    },
    "PLAY": {
        title: "",
        body: [],
    },
    "WON": {
        title: "Danggg. Didn't know you had it in you!",
        body: ["Congrats on surviving! You're the last fish in the ocean. Must be lonely being on top haha"],
        btnLabel: 'reconquer the ocean',
        btnAction: 'PLAY'
    },
    "LOST": {
        title: "...And another one bit the dust!",
        body: ["Sorry, buddy. Looks like mother nature wins this time. Better luck next time!"],
        btnLabel: 'try again',
        btnAction: 'PLAY'
    }
}

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 400px;
    text-align:
`

const ActionButton = styled.button`
    margin-top: 16px;
    width: fit-content;
`

export const GameModal = (props: GameModalProp) => {
    const { open, closeModal, gameState, setGameState}  = props

    const { title, body, btnLabel, btnAction } = GAME_MODAL_CONTENT[gameState]

    const showButton = !!btnLabel && !!btnAction
    
    return (
        <Modal open={open} closeModal={closeModal}>
            <ModalContent>
                {title && <Text variant="title">{title}</Text>}
                {body && body.map(text => <Text variant="body">{text}</Text>)}
                {showButton  && <ActionButton onClick={() => {
                    setGameState(btnAction)
                    closeModal()
                }}>{btnLabel}</ActionButton>}
            </ModalContent>

        </Modal>
    )
}