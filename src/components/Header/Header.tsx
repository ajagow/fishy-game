import styled from "styled-components"

const HeaderContainer = styled.div`
    text-align: center;
`
export const Header = () => {
    return (
        <HeaderContainer>
            <h1>Welcome to Fishy!</h1>
            <p>
                To play, use your arrow keys to move your fish (the red square). 
                Eat fish smaller than you to keep growing in size until you're king of the ocean! 
                Be careful though, if you collide with a fish larger than you, the game will end!
            </p>
        </HeaderContainer>
    )
}