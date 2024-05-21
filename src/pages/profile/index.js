import React, { useState, useEffect } from 'react';
import ProfileHeader from '@/components/profileHeader'; 
import ProfileContent from '@/components/profileContent';
import { useRouter } from 'next/router';
import useGetUser from '@/hooks/useGetUser';
import WarningIcon from '@mui/icons-material/Warning';

const ProfilePage = () => {
  const router = useRouter();
  const userId = extractUserId(router.asPath);
  const { userData } = useGetUser(userId);

  console.log(userData);

  function extractUserId(url) {
    const startIndex = url.indexOf('userId=') + 7;
    const endIndex =
      url.indexOf('&', startIndex) !== -1
        ? url.indexOf('&', startIndex)
        : url.length;
    let userId = url.slice(startIndex, endIndex);
    if (userId.length < 10) {
      userId = null
    }

    return userId;
  }

  return (
    <div>
      {userData ? ( 
        <>
          <ProfileHeader
            userId={userId}
            name={userData.name}
            userName={userData.user_name}
            email={userData.email}
            cellphoneNumber={userData.cellphone_number}
            followersCount={userData.followers_count}
            followingCount={userData.following_count}
            foundPostsCount={userData.found_posts_count}
            lostPostsCount={userData.lost_posts_count}
            profilePicture={userData.profile_picture_path}
            profileBanner={userData.profile_banner_picture_path}
            isOwnProfile={userData.is_own_profile}
            isFollowed={userData.is_followed}
            isFollowing={userData.is_following}
          />
          <ProfileContent
            userId={userId}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20%', color: 'white' }}>
          <WarningIcon style={{ fontSize: 64 }} />
          <p>Usuário não encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
