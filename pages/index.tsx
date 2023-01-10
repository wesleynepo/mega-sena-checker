import Head from 'next/head'
import {createWorker} from 'tesseract.js'
import {useEffect, useRef, useState} from 'react';
import {Container, Input, Spinner, Text, Box, Button} from '@chakra-ui/react';

type Games = string[]

export default function Home() {
    const doOCR = async (file: string) => {
        setIsReading(true)
        const worker = await createWorker()
        await worker.load();
        await worker.loadLanguage('eng')
        await worker.initialize('eng')
        const {data: {text}} = await worker.recognize(file)

        const output = text.replaceAll("@", "0").split("\n")
        setIsReading(false)
        setOcr(output as any)


        const test = output
        console.log(test)
    };

    const inputFile = useRef(null)
    const [ocr, setOcr] = useState<Games>([])
    const [file, setFile] = useState<string>("")
    const [isReading, setIsReading] = useState(false)

    const handleFileChange = (e: any) => {
        if (e.target.files) {
            const objectURL = URL.createObjectURL(e.target.files[0])
            setFile(objectURL);
        }
    };

    useEffect(() => {
        if (file) {
            doOCR(file)
        }
    }, [file])

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Verificador Mega Sena" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <Box as='section' pt='6rem' pb={{base: '0', md: '5rem'}}>
                    <Container size="md" alignItems="center" >
                        <Text
                            fontSize={{base: '2.25rem', sm: '3rem', lg: '4rem'}}
                            fontFamily='heading'
                            fontWeight='extrabold'
                            mb='16px'
                            lineHeight='1.2'
                        >
                            Verificador Mega Sena
                        </Text>
                        <Input ref={inputFile} type="file" onChange={handleFileChange} hidden />
                        <Button
                            h='2rem'
                            px='40px'
                            fontSize='1.2rem'
                            as='a'
                            size='lg'
                            colorScheme='teal'
                            onClick={() => inputFile.current.click()}
                        >
                            Subir jogo
                        </Button>
                        {isReading && <Spinner />}
                    </Container>
                </Box>
            </main>
        </>
    )
}
