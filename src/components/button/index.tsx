import * as Chakra from "@chakra-ui/react"

type ButtonProps = {
    label: string
    onClick: () => void
}

export const Button = ({label, onClick}: ButtonProps) => {
    return (
        <Chakra.Button
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
        </Chakra.Button>
    )
}
