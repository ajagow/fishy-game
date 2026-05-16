import { useEffect } from 'react'
import styled from 'styled-components'

const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(33, 33, 33, 0.9);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
`

const CloseButton = styled.button`
    width: min-content;
    align-self: flex-end;
    border: none;
    background: transparent;
    padding: 8px;

`

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: white;    
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 50%;
`

const ModalContent = styled.div`
    padding: 24px;
    display: flex;
    justify-content: center;
`

export interface ModalProps {
    open: boolean
    closeModal: () => void
}
export const Modal = (props: React.PropsWithChildren<ModalProps>) => {
    const { open, closeModal, children } = props

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                closeModal()
            }

        }

        document.addEventListener('keydown', handleKeyDown)
        
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeModal])


    if (!open) return null
    
    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={closeModal}>x</CloseButton>
                <ModalContent>
                    {children}
                </ModalContent>
            </ModalContainer>

        </ModalBackground>
    )
}