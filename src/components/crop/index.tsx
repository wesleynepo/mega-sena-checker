import { Flex, Spacer } from '@chakra-ui/react'
import { useRef } from 'react'
import { Cropper } from 'react-cropper'
import { Button } from '../button'
import 'cropperjs/dist/cropper.css'

type CropProps = {
  file: string
  setCropped: (file: string) => void
}

export const Crop = ({ file, setCropped }: CropProps) => {
  const cropperRef = useRef<HTMLImageElement>(null)
  const onClick = () => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    setCropped(cropper.getCroppedCanvas().toDataURL())
  }

  return (
    <Flex alignItems="center" flexDir="column" height="90%">
      <Cropper
        src={file}
        style={{ height: '80%' }}
        guides={false}
        ref={cropperRef}
      />
      <Spacer />
      <Button label="Confirmar" onClick={onClick} />
    </Flex>
  )
}
