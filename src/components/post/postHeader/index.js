import { Base64Image } from '@/components/Image'
import { CardHeader } from '@mui/material'
import Image from 'next/image'

export const PostHeader = ({
  post_author_avatar,
  post_author,
  post_location,
  post_reward,
  post_lostFound,
}) => {
  return (
    <CardHeader
      avatar={<Base64Image mediaUrl={post_author_avatar} type="avatar" />}
      title={post_author}
      subheader={post_location}
      action={
        <>
          {post_reward && (
            <Image
              src="/icons/bribe.png"
              alt="Possui recompensa"
              width={50}
              height={50}
            />
          )}
          {post_lostFound === 'lost' && (
            <Image
              src="/icons/map_lost2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
        </>
      }
    />
  )
}
