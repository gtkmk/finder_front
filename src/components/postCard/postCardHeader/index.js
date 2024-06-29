import { Base64Image } from '@/components/Image'
import { CardHeader, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import PostActionsMenu from '../postActionsMenu';
import Tooltip from '@mui/material/Tooltip';

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
  const translatedAnimalType = translateAnimalType[post.post_animal_type] || post.post_animal_type;
  const translatedAnimalSize = translateAnimalSize[post.post_animal_size] || post.post_animal_size;

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
              alt="Animal avistado"
              width={50}
              height={50}
            />
          )}
        </>      
      }
      title={post.post_location}
      subheader={translatedAnimalType + ' • ' + translatedAnimalSize}
      action={
        <div style={{ display: 'flex', alignItems: 'center'}}>
          {post.is_own_post == 1 &&
            <PostActionsMenu post={post} />
          }
          {post.post_reward && (
            <Tooltip title="Possui recompensa" placement="bottom">
              <Image
                src="/icons/bribe.png"
                alt="Possui recompensa"
                width={50}
                height={50}
              />
            </Tooltip>
          )}
          {post.post_lostFound === 'lost' && (
            <Tooltip title="Animal perdido" placement="bottom">
              <Image
                src="/icons/map_lost2.png"
                alt="Animal perdido"
                width={50}
                height={50}
              />
            </Tooltip>
          )}
          {post.post_lostFound === 'found' && (
            <Tooltip title="Animal avistado" placement="bottom">
              <Image
                src="/icons/map_found2.png"
                alt="Animal avistado"
                width={50}
                height={50}
              />
            </Tooltip>
          )}
        </div>
      }
    />
  )

  return (
    <CardHeader
      avatar={
        <Link href={`/profile?userId=${post.post_author_id}`} legacyBehavior>
          <a style={{ textDecoration: 'none' }}>
            <Base64Image mediaUrl={post.post_author_avatar} type="avatar" />
          </a>
        </Link>
      }
      title={
        <Link href={`/profile?userId=${post.post_author_id}`} legacyBehavior>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography>{post.post_author_username}</Typography>
          </a>
        </Link>
      }
      subheader={post.post_location + ' - Tipo de animal: ' + translatedAnimalType + ' - Tamanho: ' + translatedAnimalSize}
      action={
        <div style={{ display: 'flex', alignItems: 'center'}}>
          {post.is_own_post == 1 &&
            <PostActionsMenu post={post} />
          }
          
          {post.post_reward && (
            <Tooltip title="Possui recompensa" placement="bottom">
              <Image
                src="/icons/bribe.png"
                alt="Possui recompensa"
                width={50}
                height={50}
              />
            </Tooltip>
          )}
          {post.post_lostFound === 'lost' && (
            <Tooltip title="Animal perdido" placement="bottom">
              <Image
                src="/icons/map_lost2.png"
                alt="Animal perdido"
                width={50}
                height={50}
              />
            </Tooltip>
          )}
          {post.post_lostFound === 'found' && (
            <Tooltip title="Animal avistado" placement="bottom">
              <Image
                src="/icons/map_found2.png"
                alt="Animal avistado"
                width={50}
                height={50}
              />
            </Tooltip>
          )}
        </div>
      }
    />
  )
}
