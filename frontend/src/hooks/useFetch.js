import useSWR from 'swr'
import axios from 'axios';

export function useFetch(url) {
  const { data, error, mutate } = useSWR(url, async url => {
    const response = await axios.get(`http://localhost:3333/${url}`);

    return response.data;
  }, {
    refreshInterval: 1500,
    refreshWhenHidden: true
  })

  return { data, error, mutate }
}