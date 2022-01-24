import React, { useMemo } from 'react'
import type { FC } from 'react'
import { Search2Icon } from '@chakra-ui/icons'
import {
  VStack,
  Heading,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react'
import { City } from './City'
import { CityData } from '../types'

interface Props {
  heading: string
  searchTerm: string
  onSubmit: React.FormEventHandler
  onInputChange: React.ChangeEventHandler
  cities: CityData[]
}

export const HomePageDetail: FC<Props> = ({ heading, searchTerm, cities, onSubmit, onInputChange }) => {
  const grid = useMemo(() => {
    return (
      <SimpleGrid columns={2} gap={5}>
        {cities.map(city => (
          <City key={city.id} city={city} />
        ))}
      </SimpleGrid>
    )
  }, [cities])

  return (
    <VStack spacing="8">
      <Heading as="h1">{heading}</Heading>
      <Container maxW="container.md">
        <form onSubmit={onSubmit}>
          <InputGroup>
            <Input onChange={onInputChange} value={searchTerm} />
            <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} type="submit" />} />
          </InputGroup>
        </form>
      </Container>
      <Container maxW="container.lg">{grid}</Container>
    </VStack>
  )
}
