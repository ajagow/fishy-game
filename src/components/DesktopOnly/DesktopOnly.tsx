import { Text } from '../Text/Text'
import { useIsMobile } from '../../useIsMobile'


export const DesktopOnly = ({ children }: React.PropsWithChildren) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Text variant="title">Sry! Fishy is not available on mobile</Text>
        <Text variant="body">Please visit on a desktop device to play. Our devs are working on hard to support a mobile version!</Text>
      </div>
    )
  }

  return <>{children}</>
}