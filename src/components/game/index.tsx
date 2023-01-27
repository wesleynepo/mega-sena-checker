import { Game } from '@/services/game-check'
import { Circle, HStack, Text } from '@chakra-ui/react'

type GameResultProps = {
  game: Game
}

export const GameResult = ({ game }: GameResultProps) => {
  const { prefix, plays } = game
  return (
    <HStack mt="0.5em" pt="0.5em">
      <Text
        minW="1em"
        fontWeight="600"
        color="#006BAE"
        fontSize={{ base: '1em', md: '2em' }}
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
            size="1.5em"
            fontWeight="bold"
            fontSize={{ base: '1.25em', md: '2em' }}
            bgColor={drawn ? '#006BAE' : '#5897BE'}
          >
            {guess}
          </Circle>
        )
      })}
    </HStack>
  )
}
