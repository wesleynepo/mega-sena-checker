import Head from 'next/head'
import {ReactNode, RefObject, useEffect, useRef, useState} from 'react'
import {Flex, Input, Text, Box, Button, Spacer, Spinner, Circle, HStack} from '@chakra-ui/react'
import Image from 'next/image'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {createWorker} from 'tesseract.js';

export async function getStaticProps() {
  const response = await fetch("https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }})
  const result = await response.json()

  return {
    props: {
        concurso: result.numero,
        sorteados: result.listaDezenas
    },
    revalidate: 1000
  }
}

type HomeProps = {
    concurso: number,
    sorteados: string[]
}

export default function Home({concurso, sorteados}: HomeProps) {
    const inputFile = useRef(null)
    const [file, setFile] = useState<string>("")
    const [fileCropped, setFileCropped] = useState<string>("")

    const handleFileChange = (e: any) => {
        if (e.target.files) {
            const objectURL = URL.createObjectURL(e.target.files[0])
            setFile(objectURL);
        }
    };

    const clearAll = () => {
        setFile("")
        setFileCropped("")
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
                    as='section'
                    background="linear-gradient(135deg, #0065B7 0%, #0065B7 50%, #0581B4 50%, #35B7AF 100%)"
                    height="100vh"
                >
                    <Input ref={inputFile} type="file" onChange={handleFileChange} hidden />
                    <Flex height="100%" alignItems="center" display="flex" justifyContent="center">
                        {fileCropped.length > 0 ? <ResultContent file={fileCropped} onBack={clearAll} sorteados={sorteados} /> : file.length > 0 ? <CropContent file={file} setCropped={setFileCropped} /> : <HomeContent inputRef={inputFile} concurso={concurso} />}
                    </Flex>
                </Box>
            </main>
        </>
    )
}

type ResultContentProps = {
    file: string
    onBack: () => void
    sorteados: string[]
}

const ResultContent = ({file, onBack, sorteados}: ResultContentProps) => {
    const [loading, setLoading] = useState(true)
    const [ocr, setOcr] = useState<string[][]>([])
    const doOCR = async (file: string) => {
        const worker = await createWorker()
        await worker.load();
        await worker.loadLanguage('eng')
        await worker.initialize('eng')
        const {data: {text}} = await worker.recognize(file)
        const output = text.replaceAll("@", "0").replaceAll(" ", "").replaceAll("©", "0").split("\n").map(s => s.match(/.{1,2}/g)).filter(game => game != null)
        console.log(output)
        setOcr(output as any)
        setLoading(false)
    };

    useEffect(() => {
        if (file) {
            doOCR(file)
        }
    }, [file])

    if (loading) {
        return <Spinner color="white" size="xl" />
    }

    return (
        <BaseBackground>
            <HStack width="90%" mt="10px" borderColor="#8F8F8F" borderBottom="1px solid">
                <Text fontWeight="600" color="#006BAE" fontSize="32px" px="10px">
                    Resultados
                </Text>
                <Spacer />
                <LotteryButton label="Voltar" onClick={() => onBack()} />
            </HStack>
            {ocr.map((game, index) => <Game key={index} game={game} prefix={String.fromCharCode(index + 65)} sorteados={sorteados} />)}
        </BaseBackground>)
}

type GameProps = {
    game: string[]
    prefix: string
    sorteados: string[]
}

const Game = ({game, prefix, sorteados}: GameProps) => {
    let acertos = 0
    return (
        <HStack mt="5px">
            <Text minW="50px" fontWeight="600" color="#006BAE" fontSize="36px" px="10px" textAlign="center">{prefix}</Text>
            {game.map(n => {
                var match = sorteados.includes(n)
                if (match) acertos++
                return (<Circle key={n} color="white" size="50px" fontWeight="bold" fontSize="28px" bgColor={match ? "#006BAE" : "#5897BE"}>
                    {n}
                </Circle>)
            })}
            { acertos > 3 && <Text minW="50px" fontWeight="600" color="#006BAE" fontSize="36px" px="10px" textAlign="center">{acertos} acertos</Text>}
        </HStack>
    )
}

const HowToContent = () => {
    return (
        <BaseBackground>
            <Box width="90%" mt="10px" borderColor="#8F8F8F" borderBottom="1px solid">
                <Text fontWeight="600" color="#006BAE" fontSize="36px" px="10px">
                    Como usar?
                </Text>
            </Box>
            <Text color="#006BAE" fontSize="20px" p="10px">
                Após selecionar a imagem, fazer o corte na regiào apenas com os números da sorte, como na imagem abaixo:
            </Text>
            <Image src="/howto.png" height="300" width="700" alt="Imagem exemplo" />
            <Flex m="10px" flexDir="column-reverse" height="100%">
                <Button
                    h='3rem'
                    maxW="315px"
                    fontSize='1.2rem'
                    fontWeight="400"
                    as='a'
                    size='lg'
                    bgGradient="linear(to-b, #fda917, #fc8f01)"
                    color="#fff"
                    borderColor="#9f6705"
                    borderWidth="1px"
                    borderRadius="0px"
                    _hover={{
                        borderColor: "#6c4105",
                        bgGradient: "linear(to-b, #ffb32d, #ff9a00)"
                    }}
                >
                    Vamos lá!
                </Button>
            </Flex>
        </BaseBackground>
    )
}

type BaseBackgroundProps = {
    children: ReactNode
}
const BaseBackground = ({children}: BaseBackgroundProps) => {
    return (
        <Flex alignItems="center" flexDir="column" borderRadius="50px" bgColor="#D9D9D9" width="80%" height="70%">
            {children}
        </Flex>
    )
}

type HomeContentProps = {
    concurso: number
    inputRef: RefObject<HTMLInputElement>
}

const HomeContent = ({inputRef, concurso}: HomeContentProps) => {
    return (
        <Flex flexDir="column" alignItems="center" width="100%">
            <Text
                fontSize="4rem"
                fontFamily='heading'
                fontWeight='700'
                color="white"
                mb='4rem'
                letterSpacing="-0.09em"
            >
                Verificador Mega Sena
            </Text>
            <Text
                fontSize="1rem"
                fontFamily='heading'
                fontWeight='700'
                color="white"
                mb='4rem'
                letterSpacing="-0.09em"
            >
                Concurso {concurso}
            </Text>
            <LotteryButton label="Verificar agora!" onClick={() => inputRef?.current?.click()} />
        </Flex>
    )
}

type CropContentProps = {
    file: string
    setCropped: (file: string) => void
}

const CropContent = ({file, setCropped}: CropContentProps) => {
    const cropperRef = useRef<HTMLImageElement>(null);
    const onClick = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        setCropped(cropper.getCroppedCanvas().toDataURL());
    }

    return (
        <Flex alignItems="center" flexDir="column" height="90%">
            <Cropper
                src={file}
                style={{height: "80%"}}
                guides={false}
                ref={cropperRef}
            />
            <Spacer />
            <LotteryButton label="Confirmar" onClick={onClick} />
        </Flex>
    )
}

type LotteryButtonProps = {
    label: string
    onClick: () => void
}

const LotteryButton = ({label, onClick}: LotteryButtonProps) => {
    return (
        <Button
            h='3rem'
            maxW="315px"
            fontSize='1.2rem'
            fontWeight="400"
            as='a'
            size='lg'
            bgGradient="linear(to-b, #fda917, #fc8f01)"
            color="#fff"
            borderColor="#9f6705"
            borderWidth="1px"
            borderRadius="0px"
            _hover={{
                borderColor: "#6c4105",
                bgGradient: "linear(to-b, #ffb32d, #ff9a00)"
            }}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}
