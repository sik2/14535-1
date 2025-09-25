'use client'

import { use } from 'react'

import Link from 'next/link'

import usePost from './_hooks/usePost'
import usePostComments from './_hooks/usePostComments'

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params)

  const { post, deletePost } = usePost(id)
  const { postComments, deletePostComment, writePostComment } =
    usePostComments(id)

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    const contentInput = form.elements.namedItem(
      'content',
    ) as HTMLTextAreaElement

    if (contentInput.value.trim() === '' || contentInput.value.length === 0) {
      alert('댓글 내용을 입력해주세요.')
      contentInput.focus()
      return
    }

    writePostComment(contentInput.value)
  }

  if (post === null) return <div>로딩중...</div>

  return (
    <>
      <h1>게시글 상세페이지</h1>
      <>
        <div>게시글 번호: {post.id}</div>
        <div>게시글 제목: {post.title}</div>
        <div>게시글 내용: {post.content}</div>
      </>

      <div className="flex gap-2">
        <button
          onClick={() => deletePost(post.id!)}
          className="p-2 rounded border"
        >
          삭제
        </button>
        <Link className="p-2 rounded border" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
      </div>

      <h2>댓글 작성</h2>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSumbit}>
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="댓글 내용"
        />
        <button className="border p-2 rounded" type="submit">
          작성
        </button>
      </form>

      <h2>댓글 목록</h2>

      {postComments === null && <div>댓글이 로딩중...</div>}

      {postComments !== null && postComments.length > 0 && (
        <ul>
          {postComments.map((comment) => (
            <li key={comment.id}>
              {comment.id}/{comment.content}
              <button
                className="p-2 rounded border"
                onClick={() => deletePostComment(id, comment.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
