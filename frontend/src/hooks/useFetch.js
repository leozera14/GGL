import useSWR from 'swr'
import axios from 'axios';

export function useFetch(url) {
  const { data, error, mutate } = useSWR(url, async url => {
    const response = await axios.get(url);

    return response.data;
  }, {
    refreshInterval: 1000,
    refreshWhenHidden: true
  })

  return { data, error, mutate }
}