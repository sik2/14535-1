'use client'

import useAuth from '@/global/auth/hooks/useAuth'

export default function Page() {
  const { isLogin, loginMember } = useAuth()
  return (
    <>
      <h1>내 정보</h1>

      {isLogin ? (
        <ul>
          <li>닉네임 : {loginMember.nickname}</li>
          <li>가입일 : {loginMember.createDate}</li>
        </ul>
      ) : (
        <p>로그인 정보가 없습니다.</p>
      )}
    </>
  )
}
