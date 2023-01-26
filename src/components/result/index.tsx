import { Game, handleGame } from '@/services/game-check'
import { HStack, Spacer, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Button } from '../button'
import { GameResult } from '../game'
import { Panel } from '../panel'

type ResultProps = {
  file: string
  onBack: () => void
  drawn: string[]
}

export const Result = ({ file, onBack, drawn }: ResultProps) => {
  const [games, setGames] = useState<Game[]>()

  const handler = async () => {
    const games = await handleGame(file, drawn)
    setGames(games)
  }

  useEffect(() => {
    handler()
  }, [file])

  if (games === undefined) {
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
      {games.map((game) => (
        <GameResult key={game.prefix} game={game} />
      ))}
    </Panel>
  )
}
