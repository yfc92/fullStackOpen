import userService from '../services/users'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const queryKey = 'users'

const useUsers = () => {
  //const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      console.log('Query users successful', data)
    }
  })

  return {
    users: result.data
  }
}

export default useUsers
