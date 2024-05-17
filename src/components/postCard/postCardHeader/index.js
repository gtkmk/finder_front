import { Base64Image } from '@/components/Image'
import { CardHeader } from '@mui/material'
import Image from 'next/image'

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
  post_author_avatar,
  post_author,
  post_location,
  post_reward,
  post_lostFound,
  post_animal_size,
  post_animal_type,
  miniature,
}) => {
  const translatedAnimalType = translateAnimalType[post_animal_type] || post_animal_type;
  const translatedAnimalSize = translateAnimalSize[post_animal_size] || post_animal_size;

  if (miniature) return (
    <CardHeader
      avatar={
        <>
          {post_lostFound === 'lost' && (
            <Image
              src="/icons/map_lost2.png"
              alt="Animal perdido"
              width={50}
              height={50}
            />
          )}
          {post_lostFound === 'found' && (
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
          {post_reward && (
            <Image
              src="/icons/bribe.png"
              alt="Possui recompensa"
              width={50}
              height={50}
            />
          )}
        </>
      }
    />
  )

  return (
    <CardHeader
      avatar={<Base64Image mediaUrl={post_author_avatar} type="avatar" />}
      title={post_author}
      subheader={post_location + ' - Tipo de animal: ' + translatedAnimalType + ' - Tamanho: ' + translatedAnimalSize}
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
          {post_lostFound === 'found' && (
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
}
