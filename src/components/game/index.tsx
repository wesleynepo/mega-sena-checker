import { Circle, HStack, Text } from '@chakra-ui/react'

type GameProps = {
  game: string[]
  prefix: string
  drawn: string[]
}

export const Game = ({ game, prefix, drawn }: GameProps) => {
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
