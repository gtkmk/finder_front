import React, { useState } from 'react';
import ProfileHeader from '@/components/profileHeader'; 
import ProfileContent from '@/components/profileContent';

const ProfilePage = () => {
  return (
    <div>
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default ProfilePage;
