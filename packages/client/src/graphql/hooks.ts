import { useState } from 'react'
import type { CityData } from '../types'
import type { ApolloError, QueryResult } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CITIES } from './queries'
import { UPDATE_CITY } from './mutations'

type Maybe<T> = T | undefined

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
  input: Partial<CityData> & { id: number }
}

interface MutationResponse {
  updateCity: CityData
}

type CityToggleHook = (
  id: number,
  val: boolean,
) => [toggle: () => void, isLoading: boolean]

type CityToggleHookFactory = (key: 'wishlist' | 'visited') => CityToggleHook

type CitySearchHook = () => {
  error: Maybe<ApolloError>
  loading: boolean
  data: Maybe<CitiesResponse>
  runSearch: (cityName: string) => void
}

export const useCitySearch: CitySearchHook = () => {
  const { error, loading, data, refetch } = useQuery<CitiesResponse, CitiesFilter>(
    GET_CITIES,
  )
  return {
    error,
    loading,
    data,
    runSearch: (name: string) => refetch({ filter: { name } }),
  }
}

export const useVisitedCities = (): QueryResult<CitiesResponse, CitiesFilter> => {
  return useQuery<CitiesResponse, CitiesFilter>(GET_CITIES, {
    variables: {
      filter: { visited: true },
    },
  })
}

export const useWishlistCities = (): QueryResult<CitiesResponse, CitiesFilter> => {
  return useQuery<CitiesResponse, CitiesFilter>(GET_CITIES, {
    variables: {
      filter: { wishlist: true },
    },
  })
}

const createToggleHook: CityToggleHookFactory = key => (id, currentValue) => {
  const [mutate] = useMutation<MutationResponse, UpdateCity>(UPDATE_CITY)
  const [loading, setLoading] = useState(false)

  const toggleFn = () => {
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
      refetchQueries: [{ query: GET_CITIES, variables: { filter: { [key]: true } } }],
    })
  }

  return [toggleFn, loading]
}

export const useToggleWishlist = createToggleHook('wishlist')
export const useToggleVisited = createToggleHook('visited')
