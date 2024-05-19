import { Base64Image } from '@/components/Image'
import { CardHeader } from '@mui/material'
import Image from 'next/image'
import PostActionsMenu from '../postActionsMenu';

const translateAnimalType = {
  dog: 'Cachorro',
  cat: 'Gato',
  bird: 'Pássaro',
  other: 'Outro',
};

const translateAnimalSize = {
  small: 'Pequeno',
  medium: 'Médio',
  large: 'Grande',
};

export const PostCardHeader = ({
  post,
  miniature,
}) => {
  const translatedAnimalType = translateAnimalType[post.post_animal_type] || post_animal_type;
  const translatedAnimalSize = translateAnimalSize[post.post_animal_size] || post_animal_size;

  if (miniature) return (
    <CardHeader
      avatar={
        <>
          {post.post_lostFound === 'lost' && (
            <Image
              src="/icons/map_lost2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
          {post.post_lostFound === 'found' && (
            <Image
              src="/icons/map_found2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
        </>      
      }
      title={post_location}
      subheader={translatedAnimalType + ' • ' + translatedAnimalSize}
      action={
        <>
          <PostActionsMenu post={post} />
          {post.post_reward && (
            <Image
              src="/icons/bribe.png"
              alt="Possui recompensa"
              width={50}
              height={50}
            />
          )}
          {post.post_lostFound === 'lost' && (
            <Image
              src="/icons/map_lost2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
          {post.post_lostFound === 'found' && (
            <Image
              src="/icons/map_found2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
        </>
      }
    />
  )
console.log(post)
  return (
    <CardHeader
      avatar={<Base64Image mediaUrl={post.post_author_avatar} type="avatar" />}
      title={post.post_author_username}
      subheader={post.post_location + ' - Tipo de animal: ' + translatedAnimalType + ' - Tamanho: ' + translatedAnimalSize}
      action={
        <div style={{ display: 'flex', alignItems: 'center'}}>
          {post.is_own_post == 1 &&
            <PostActionsMenu post={post} />
          }
          
          {post.post_reward && (
            <Image
              src="/icons/bribe.png"
              alt="Possui recompensa"
              width={50}
              height={50}
            />
          )}
          {post.post_lostFound === 'lost' && (
            <Image
              src="/icons/map_lost2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
          {post.post_lostFound === 'found' && (
            <Image
              src="/icons/map_found2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
        </div>
      }
    />
  )
}
