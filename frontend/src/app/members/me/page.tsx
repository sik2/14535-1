'use client'

import { components } from '@/global/backend/apiV1/schema'
import { client } from '@/global/backend/client'
import { useEffect, useState } from 'react'

type MemberDto = components['schemas']['MemberDto']

export default function Page() {
  const [loginMember, setLoginMember] = useState<MemberDto | null>(null)

  useEffect(() => {
    client.GET('/api/v1/members/me').then((res) => {
      if (res.error) return

      setLoginMember(res.data.data)
    })
  }, [])

  return (
    <>
      <h1>내 정보</h1>

      <ul>
        <li>닉네임 : {loginMember?.nickname}</li>
        <li>가입일 : {loginMember?.createDate}</li>
      </ul>
    </>
  )
}
