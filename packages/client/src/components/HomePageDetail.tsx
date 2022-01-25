import React, { useMemo, useState } from 'react'

import type { FC } from 'react'
import type { CityData } from '../types'
import { CityDetail } from '.'
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

interface Props {
  heading: string
  cities: CityData[]
  runSearch: (name: string) => void
}

export const HomePageDetail: FC<Props> = ({ heading, cities, runSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    runSearch(searchTerm)
  }

  const grid = useMemo(
    () => (
      <SimpleGrid columns={2} gap={5} data-cy="items-grid">
        {cities.map(city => (
          <CityDetail key={city.id} city={city} />
        ))}
      </SimpleGrid>
    ),
    [cities],
  )

  return (
    <VStack spacing="8">
      <Heading as="h1">{heading}</Heading>
      <Container maxW="container.md">
        <form onSubmit={onSubmit}>
          <InputGroup>
            <Input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              data-cy="home-searchbox"
            />
            <InputRightElement
              children={<IconButton aria-label="" icon={<Search2Icon />} type="submit" />}
            />
          </InputGroup>
        </form>
      </Container>
      <Container maxW="container.lg">{grid}</Container>
    </VStack>
  )
}
