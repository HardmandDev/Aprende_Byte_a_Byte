import React, { useState, useEffect } from 'react';
// import { Avatar, Card, Button } from 'antd';
// import { getUserInfo, updateUserInfo } from '../api/user';

function Profile() {


  // useEffect(() => {
  //   getUserInfo().then(data => setUser(data));
  // }, []);

  // const handleUpdateProfile = (values) => {
  //   updateUserInfo(values).then(() => {
  //     // Show success message
  //   });
  // };

  return (
    <div>

      <h1>Armando</h1>
      <p>holis@gamil.com</p>

      <h2>My Courses</h2>
<p>cursos:

</p>
<ul>
    <li>Curso 1</li>
    <li>Curso 2</li>
    <li>Curso 3</li>
  </ul>
      <h2>Edit Profile</h2>
      {/* Form for editing profile information */}

      <h2>Settings</h2>
      {/* Settings options for password, notifications, etc. */}
    </div>
  );
}

export default Profile;
