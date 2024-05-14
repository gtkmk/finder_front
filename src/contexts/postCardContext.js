import { createContext, useState } from 'react'

export const  PostCardContext = createContext()

export function PostCardContextProvider({ children }) {
  const [commentsOpen, setCommentsOpen] = useState(false)

  return (
    <PostCardContext.Provider value={{ commentsOpen, setCommentsOpen }}>
      {children}
    </PostCardContext.Provider>
  )
}
