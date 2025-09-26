'use client'

import { useAuthContext } from '@/global/auth/hooks/useAuth'
import { use } from 'react'

import usePost from '../../../../domain/post/hooks/usePost'

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params)
  const { post, modifyPost } = usePost(id)
  const { isLogin } = useAuthContext()

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    const titleInput = form.elements.namedItem('title') as HTMLInputElement
    const contentInput = form.elements.namedItem(
      'content',
    ) as HTMLTextAreaElement

    if (titleInput.value.trim() === '' || titleInput.value.length === 0) {
      alert('제목을 입력해주세요.')
      titleInput.focus()
      return
    }

    if (contentInput.value.trim() === '' || contentInput.value.length === 0) {
      alert('내용을 입력해주세요.')
      contentInput.focus()
      return
    }

    modifyPost(id, titleInput.value, contentInput.value)
  }

  if (post === null) return <div>로딩중...</div>

  if (!isLogin) return <>로그인 후 사용해주세요.</>

  return (
    <>
      <h1>{id}번 글 수정 페이지</h1>

      <form className="flex flex-col gap-2 p-2" onSubmit={handleSumbit}>
        <input
          className="border p-2 rounded"
          type="text"
          name="title"
          placeholder="제목"
          autoFocus
          defaultValue={post.title}
        />
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="내용"
          defaultValue={post.content}
        />
        <button className="border p-2 rounded" type="submit">
          저장
        </button>
      </form>
    </>
  )
}
