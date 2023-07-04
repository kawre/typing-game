import { useMutation, useQuery } from '@tanstack/react-query'
import { login, me } from '../api/auth'
import { getConfig } from '../api/users'
import { UserRes } from '../types/auth.types'

export const useMe = () => useQuery<UserRes>(['me'], me)

export const useLogin = () => useMutation(['me'], login)
