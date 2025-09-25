import { components } from '@/global/backend/apiV1/schema'
import { client } from '@/global/backend/client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

type MemberDto = components['schemas']['MemberDto']
export default function useAuth() {
  const router = useRouter()

  const [loginMember, setLoginMember] = useState<MemberDto | null>(null)
  const isLogin = loginMember !== null

  useEffect(() => {
    client.GET('/api/v1/members/me').then((res) => {
      if (res.error) return

      setLoginMember(res.data.data)
    })
  }, [])

  const logout = () => {
    client.DELETE('/api/v1/members/logout').then((res) => {
      if (res.error) {
        alert(res.error.msg)
        return
      }

      router.replace('/posts')
    })
  }

  if (isLogin) return { isLogin: true, loginMember, logout } as const

  return {
    isLogin: false,
    loginMember: null,
    logout,
  } as const
}
