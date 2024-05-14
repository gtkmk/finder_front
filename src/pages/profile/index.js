import React, { useState, useEffect } from 'react';
import ProfileHeader from '@/components/profileHeader'; 
import ProfileContent from '@/components/profileContent';
import { useRouter } from 'next/router';
import { CollectionsOutlined } from '@mui/icons-material';
import useGetUser from '@/hooks/useGetUser';

const ProfilePage = () => {
  const router = useRouter();
  const userId = extractUserId(router.asPath);
  const { userData, isOwnProfile } = useGetUser(userId);

  function extractUserId(url) {
    const startIndex = url.indexOf('userId=') + 7;
    const endIndex =
      url.indexOf('&', startIndex) !== -1
        ? url.indexOf('&', startIndex)
        : url.length;
    const userId = url.slice(startIndex, endIndex);
    return userId;
  }

  console.log('userData:', userData);

  return (
    <div >
      {userData && 
        <ProfileHeader
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
          isOwnProfile={isOwnProfile}
        />
      }
      <ProfileContent />
    </div>
  );
};

export default ProfilePage;
