import Head from 'next/head'
import { useRef, useState } from 'react'
import { Box, Flex, Spacer, VStack } from '@chakra-ui/react'
import * as Content from '@/components/home'
import { getLatestLottery, LatestLotteryResponse } from '@/services/caixa'
import { Result } from '@/components/result'
import { Crop } from '@/components/crop'
import { Author } from '@/components/author'

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    if (target.files) {
      const objectURL = URL.createObjectURL(target.files[0])
      setFile(objectURL)
    }
    e.currentTarget.value = ''
  }

  const clearAll = () => {
    URL.revokeObjectURL(file)
    setFile('')
    setFileCropped('')
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
          <input
            ref={inputFile}
            type="file"
            onChange={handleFileChange}
            hidden
          />
          <VStack
            height="100%"
            alignItems="center"
            display="flex"
            justifyContent="center"
            pt="2em"
          >
            <Flex height="90%" alignItems="center">
              {fileCropped.length > 0 ? (
                <Result file={fileCropped} onBack={clearAll} drawn={drawn} />
              ) : file.length > 0 ? (
                <Crop file={file} setCropped={setFileCropped} />
              ) : (
                <Content.Home inputRef={inputFile} contest={contest} />
              )}
            </Flex>
            <Author />
          </VStack>
        </Box>
      </main>
    </>
  )
}
