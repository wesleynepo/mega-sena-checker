import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import {
  Flex,
  Input,
  Text,
  Box,
  Spacer,
  Spinner,
  Circle,
  HStack
} from '@chakra-ui/react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { createWorker } from 'tesseract.js'
import { Button } from '@/components/button'
import { Panel } from '@/components/panel'
import * as Content from '@/components/home'
import { getLatestLottery, LatestLotteryResponse } from '@/services/caixa'

export async function getStaticProps() {
  const latestLottery = await getLatestLottery()
  return {
    props: latestLottery,
    revalidate: 1000
  }
}

type HomeProps = LatestLotteryResponse

export default function Home({ contest, drawn }: HomeProps) {
  const inputFile = useRef(null)
  const [file, setFile] = useState<string>('')
  const [fileCropped, setFileCropped] = useState<string>('')

  const handleFileChange = (e: any) => {
    const target = e.target as HTMLInputElement
    if (target.files) {
      const objectURL = URL.createObjectURL(target.files[0])
      setFile(objectURL)
    }
  }

  const clearAll = () => {
    setFile('')
    setFileCropped('')
    // TODO: Should take care of memory leaking soon
  }
  return (
    <>
      <Head>
        <title>Verificador Mega Sena</title>
        <meta name="description" content="Verificador Mega Sena" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Box
          as="section"
          background="linear-gradient(135deg, #0065B7 0%, #0065B7 50%, #0581B4 50%, #35B7AF 100%)"
          height="100vh"
        >
          <Input
            ref={inputFile}
            type="file"
            onChange={handleFileChange}
            hidden
          />
          <Flex
            height="100%"
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            {fileCropped.length > 0 ? (
              <ResultContent
                file={fileCropped}
                onBack={clearAll}
                drawn={drawn}
              />
            ) : file.length > 0 ? (
              <CropContent file={file} setCropped={setFileCropped} />
            ) : (
              <Content.Home inputRef={inputFile} contest={contest} />
            )}
          </Flex>
        </Box>
      </main>
    </>
  )
}

type ResultContentProps = {
  file: string
  onBack: () => void
  drawn: string[]
}

const ResultContent = ({ file, onBack, drawn }: ResultContentProps) => {
  const [loading, setLoading] = useState(true)
  const [ocr, setOcr] = useState<string[][]>([])
  const doOCR = async (file: string) => {
    const worker = await createWorker()
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.setParameters({ tessedit_char_whitelist: '0123456789' })
    const {
      data: { text }
    } = await worker.recognize(file)
    const output = text
      .replaceAll(' ', '')
      .split('\n')
      .map((s) => s.match(/.{1,2}/g))
      .filter((game) => game != null)

    if (output != null) {
      setOcr(output as any)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (file) {
      doOCR(file)
    }
  }, [file])

  if (loading) {
    return <Spinner color="white" size="xl" />
  }

  return (
    <Panel>
      <HStack
        width="90%"
        mt="10px"
        borderColor="#8F8F8F"
        borderBottom="1px solid"
      >
        <Text fontWeight="600" color="#006BAE" fontSize="32px" px="10px">
          Resultados
        </Text>
        <Spacer />
        <Button label="Voltar" onClick={() => onBack()} />
      </HStack>
      {ocr.map((game, index) => (
        <Game
          key={index}
          game={game}
          prefix={String.fromCharCode(index + 65)}
          drawn={drawn}
        />
      ))}
    </Panel>
  )
}

type GameProps = {
  game: string[]
  prefix: string
  drawn: string[]
}

const Game = ({ game, prefix, drawn }: GameProps) => {
  let acertos = 0
  return (
    <HStack mt="5px">
      <Text
        minW="50px"
        fontWeight="600"
        color="#006BAE"
        fontSize="36px"
        px="10px"
        textAlign="center"
      >
        {prefix}
      </Text>
      {game.map((n) => {
        const match = drawn.includes(n)
        if (match) acertos++
        return (
          <Circle
            key={n}
            color="white"
            size="50px"
            fontWeight="bold"
            fontSize="28px"
            bgColor={match ? '#006BAE' : '#5897BE'}
          >
            {n}
          </Circle>
        )
      })}
      {acertos > 3 && (
        <Text
          minW="50px"
          fontWeight="600"
          color="#006BAE"
          fontSize="36px"
          px="10px"
          textAlign="center"
        >
          {acertos} acertos
        </Text>
      )}
    </HStack>
  )
}

type CropContentProps = {
  file: string
  setCropped: (file: string) => void
}

const CropContent = ({ file, setCropped }: CropContentProps) => {
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
