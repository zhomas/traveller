import React from 'react'

import type { FC } from 'react'
import type { CityData } from '../types'
import { Box, Button, Flex, Text, Stack, useColorModeValue } from '@chakra-ui/react'
import { useToggleWishlist, useToggleVisited } from '../graphql/hooks'

interface Props {
  city: CityData
}

export const CityDetail: FC<Props> = ({ city }) => {
  const { id, wishlist, visited, name } = city
  const [toggleWishList, wishlistLoading] = useToggleWishlist(id, wishlist)
  const [toggleVisited, visitedLoading] = useToggleVisited(id, visited)

  const bg = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box padding={5} bg={bg} data-cy={name.toLowerCase()}>
      <Flex justifyContent={'space-between'}>
        <Text>{name}</Text>
        <Stack>
          <Button
            onClick={toggleWishList}
            isLoading={wishlistLoading}
            colorScheme={wishlist ? 'teal' : 'blackAlpha'}
            size={'xs'}>
            Wishlist
          </Button>
          <Button
            onClick={toggleVisited}
            isLoading={visitedLoading}
            colorScheme={visited ? 'orange' : 'blackAlpha'}
            size={'xs'}>
            Visited
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
