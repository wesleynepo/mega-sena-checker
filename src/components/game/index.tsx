import { Game } from '@/services/game-check'
import { Circle, HStack, Text } from '@chakra-ui/react'

type GameResultProps = {
  game: Game
}

export const GameResult = ({ game }: GameResultProps) => {
  const { prefix, winningCounts, plays } = game
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
      {plays.map(({ guess, drawn }) => {
        return (
          <Circle
            key={guess}
            color="white"
            size="50px"
            fontWeight="bold"
            fontSize="28px"
            bgColor={drawn ? '#006BAE' : '#5897BE'}
          >
            {guess}
          </Circle>
        )
      })}
      {winningCounts > 3 && (
        <Text
          minW="50px"
          fontWeight="600"
          color="#006BAE"
          fontSize="36px"
          px="10px"
          textAlign="center"
        >
          {winningCounts} acertos
        </Text>
      )}
    </HStack>
  )
}
