'use client'

import useAuth from '@/global/auth/hooks/useAuth'

export default function Page() {
  const { loginMember } = useAuth()
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
