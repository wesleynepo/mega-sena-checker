import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { Button } from '../button'
import { Panel } from '../panel'

export const HowToContent = () => {
  return (
    <Panel>
      <Box width="90%" mt="10px" borderColor="#8F8F8F" borderBottom="1px solid">
        <Text fontWeight="600" color="#006BAE" fontSize="36px" px="10px">
          Como usar?
        </Text>
      </Box>
      <Text color="#006BAE" fontSize="20px" p="10px">
        Após selecionar a imagem, fazer o corte na regiào apenas com os números
        da sorte, como na imagem abaixo:
      </Text>
      <Image src="/howto.png" height="300" width="700" alt="Imagem exemplo" />
      <Flex m="10px" flexDir="column-reverse" height="100%">
        <Button onClick={() => null} label="Vamos lá!" />
      </Flex>
    </Panel>
  )
}
