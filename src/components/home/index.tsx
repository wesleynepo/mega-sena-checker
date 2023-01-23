import { Flex, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { RefObject } from 'react'
import { Button } from '../button'
import { HowToContent } from '../how-to-modal'

type HomeProps = {
  contest: number
  inputRef: RefObject<HTMLInputElement>
}

export const Home = ({ inputRef, contest }: HomeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex flexDir="column" alignItems="center" width="100%">
      <HowToContent isOpen={isOpen} onClose={onClose} />
      <Text
        fontSize="4rem"
        fontFamily="heading"
        fontWeight="700"
        color="white"
        mb="4rem"
        letterSpacing="-0.09em"
      >
        Verificador Mega Sena
      </Text>
      <Text
        fontSize="1rem"
        fontFamily="heading"
        fontWeight="700"
        color="white"
        mb="4rem"
        letterSpacing="-0.09em"
      >
        Concurso {contest}
      </Text>
      <Stack spacing="0" flexDir="row" alignItems="flex-start">
        <Button
          label="Verificar agora!"
          onClick={() => inputRef?.current?.click()}
        />
        <Spacer w="10px" />
        <Button label="Como usar?" onClick={onOpen} />
      </Stack>
    </Flex>
  )
}
