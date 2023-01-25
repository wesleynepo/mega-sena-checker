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
      borderRadius="50px"
      bgColor="#D9D9D9"
      width="80%"
      height="80%"
    >
      {children}
    </Flex>
  )
}
