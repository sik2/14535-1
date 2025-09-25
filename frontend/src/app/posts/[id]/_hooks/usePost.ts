import { useEffect, useState } from 'react'

import { client } from '@/lib/backend/client'

import { components } from '@/lib/backend/apiV1/schema'

type PostDto = components['schemas']['PostWithAuthorDto']

export default function usePost(id: number) {
  const [post, setPost] = useState<PostDto | null>(null)
  useEffect(() => {
    client
      .GET('/api/v1/posts/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg)
          return
        }

        setPost(res.data)
      })
  }, [id])

  return {
    post,
  }
}
