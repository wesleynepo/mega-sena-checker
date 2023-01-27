import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

type PanelProps = {
  children: ReactNode
}
export const Panel = ({ children }: PanelProps) => {
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      borderRadius="0.75em"
      bgColor="#D9D9D9"
      px={{ base: '0.5em', md: '2em' }}
      pb="1em"
    >
      {children}
    </Flex>
  )
}
