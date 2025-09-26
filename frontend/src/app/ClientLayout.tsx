'use client'

import { AuthContext, useAuthContext } from '@/global/auth/hooks/useAuth'

import Link from 'next/link'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authState = useAuthContext()
  const { isLogin, loginMember, logout } = authState ?? {}

  return (
    <AuthContext value={authState}>
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
                {loginMember?.nickname}님의 정보
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
    </AuthContext>
  )
}
