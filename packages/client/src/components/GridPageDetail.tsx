import React from 'react'
import type { FC } from 'react'
import type { CityData } from '../types'

import { Container, Heading, SimpleGrid, Box, useColorModeValue, Text, VStack } from '@chakra-ui/react'

interface Props {
  heading: string
  cities: CityData[]
}

export const GridPageDetail: FC<Props> = ({ heading, cities }) => {
  const bg = useColorModeValue('gray.200', 'gray.700')
  return (
    <VStack spacing={10}>
      <Heading as="h1">{heading}</Heading>
      <Container maxW="container.md">
        <SimpleGrid columns={2} spacing={5}>
          {cities.map(city => (
            <Box key={city.id} bg={bg} padding={5}>
              <Text>{city.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </VStack>
  )
}
