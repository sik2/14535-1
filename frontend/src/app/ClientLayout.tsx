'use client'

import { components } from '@/global/backend/apiV1/schema'
import { client } from '@/global/backend/client'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type MemberDto = components['schemas']['MemberDto']

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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

  return (
    <>
      <header>
        <nav className="flex">
          <Link href="/" className="p-2 rounded hover:bg-gray-100">
            홈
          </Link>
          <Link href="/posts" className="p-2 rounded hover:bg-gray-100">
            글목록
          </Link>
          {isLogin ? (
            <>
              <button
                onClick={logout}
                className="p-2 rounded hover:bg-gray-100"
              >
                로그아웃
              </button>
              <Link
                href="/members/me"
                className="p-2 rounded hover:bg-gray-100"
              >
                {loginMember.nickname}님의 정보
              </Link>
            </>
          ) : (
            <Link
              href="/members/login"
              className="p-2 rounded hover:bg-gray-100"
            >
              로그인
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">풋터</footer>
    </>
  )
}
