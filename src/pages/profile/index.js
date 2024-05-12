import React, { useState, useEffect } from 'react';
import ProfileHeader from '@/components/profileHeader'; 
import ProfileContent from '@/components/profileContent';

const ProfilePage = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []); // Executa apenas uma vez após a montagem do componente

  return (
    <div >
      <ProfileHeader />
      <ProfileContent />
      <p>Width: {width}</p>
    </div>
  );
};

export default ProfilePage;
