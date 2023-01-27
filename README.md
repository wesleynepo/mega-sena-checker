## Verificador da Mega Sena

Esse projeto nasceu de uma conversa com amigos pós sorteio da MEGA da VIRADA, com a grande quantidade de cupons e somente as fotos deles pensei, seria uma boa ideia um webapp que fizesse esse papel de escanear o comprovante e baseado no último concurso disponível fazer a contagem de acertos.

## Conceito

Utilizei o NextJS pela familiaridade e porque já previa um possível problema, como obter os dados sem fazer diversas consultas, não quis deixar a responsabilidade de fazer a consulta na API da Caixa no client-side, entào usei o ISR do NextJS para funcionar como um cache pra esses dados, sendo revalidados a cada 10 minutos.
O app em si é simples, ele usa o Tesseract.JS como bibliotéca para OCR que escaneia a imagem, são dadas as instrucões e espera-se que o usuário siga.

## O problema

Na maior parte dos inputs o modelo que o Tesseract usa consegue ler corretamente os número impressos, porém em alguns momentos ele tem uma grande dificuldade de entender o 0, tentei diversos modelos diferentes e configuraćões e não consegui chegar em um resultado aceitavél.
Ou seja, boa parte das leituras não ocorrem corretamente no ambiente controlado, imagine com diversos inputs e com qualidade inferior.
Um ponto futuro para esse projeto funcionar corretamente era treinar com os dados específicos o tesseract, porém vai muito pro lado de IA/ML que no momento não tenho interesse, mas eventualmente espero retornar ao projeto para fazer isso.

