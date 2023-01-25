import { HStack, Spacer, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import { Button } from '../button'
import { Game } from '../game'
import { Panel } from '../panel'

type ResultProps = {
  file: string
  onBack: () => void
  drawn: string[]
}

export const Result = ({ file, onBack, drawn }: ResultProps) => {
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
