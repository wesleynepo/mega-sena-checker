import { Link, Text } from '@chakra-ui/react'

export const Author = () => {
  return (
    <Text color="white" fontSize="xs" pb="2em">
      Desenvolvido por
      <Link href="https://github.com/wesleynepo" isExternal>
        <Text as="span" fontWeight="bold">
          {' '}
          Wesley Nepomuceno
        </Text>
      </Link>
    </Text>
  )
}
