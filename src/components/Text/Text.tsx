import styled, { css } from 'styled-components'

const typographyVariants = {
    title: css`
        font-family: "Courier Prime", monospace;
        font-size: 2rem;
    `,
    body: css`
        font-family: "Inter", sans-serif;
    `
}
type TextVariant = keyof typeof typographyVariants

type TextProps = {
  variant?: TextVariant
}

const StyledText = styled.span<{variant: TextVariant, as?: React.ElementType }>`
    margin: 0;
    padding: 0;
    ${({ variant }) => typographyVariants[variant] || typographyVariants.body}
`


export const Text = ({ variant = 'body', children }: React.PropsWithChildren<TextProps>) => {
    return(
        <StyledText variant={variant} >
            {children}
        </StyledText>
    )


}