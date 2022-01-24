import type { CityData } from '../types'
import { updateCity } from './mutations'
import { searchCities } from './queries'
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

interface CitiesFilter {
  filter: Partial<CityData>
}

interface CitiesResponse {
  cities: {
    total: number
    cities: CityData[]
  }
}

interface UpdateCity {
  input: {
    id: number
    visited?: boolean
    wishlist?: boolean
  }
}

interface MutationResponse {
  updateCity: CityData
}

type CityUpdateHook = (id: number, val: boolean) => [() => void, boolean]

export const useCitySearch = () => {
  const { error, loading, data, refetch } = useQuery<CitiesResponse, CitiesFilter>(searchCities)

  return {
    error,
    loading,
    data,
    runSearch: (name: string) => {
      refetch({ filter: { name } })
    },
  }
}

export const useVisitedCities = () => {
  return useQuery<CitiesResponse, CitiesFilter>(searchCities, {
    variables: {
      filter: { visited: true },
    },
  })
}

export const useWishlistCities = () => {
  return useQuery<CitiesResponse, CitiesFilter>(searchCities, {
    variables: {
      filter: { wishlist: true },
    },
  })
}

const createToggleHook =
  (key: 'wishlist' | 'visited'): CityUpdateHook =>
  (id, currentValue) => {
    const [mutate] = useMutation<MutationResponse, UpdateCity>(updateCity)
    const [loading, setLoading] = useState(false)

    const update = () => {
      setLoading(true)
      mutate({
        variables: {
          input: {
            id,
            [key]: !currentValue,
          },
        },
        onCompleted: () => {
          setLoading(false)
        },
        refetchQueries: [{ query: searchCities, variables: { filter: { [key]: true } } }],
      })
    }

    return [update, loading]
  }

export const useToggleWishlist = createToggleHook('wishlist')
export const useToggleVisited = createToggleHook('visited')
