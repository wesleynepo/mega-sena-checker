import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import Image from 'next/image'

type HowToContentProps = {
  onClose: () => void
  isOpen: boolean
}

export const HowToContent = ({ onClose, isOpen }: HowToContentProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bgColor="#D9D9D9">
        <ModalCloseButton />
        <ModalBody>
          <Box width="90%" mt="10px">
            <Text fontWeight="600" color="#006BAE" fontSize="36px" px="10px">
              Como usar?
            </Text>
          </Box>
          <Text color="#006BAE" fontSize="20px" p="10px">
            Após selecionar a imagem, fazer o corte na região apenas com os
            números da sorte, como na imagem abaixo:
          </Text>
          <Image
            src="/howto.png"
            height="300"
            width="700"
            alt="Imagem exemplo"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
