import React from 'react';
import {
  DateDisplay,
  Header,
  Title,
  ToggleDarkTheme,
} from '../Styled components/header';

function Navbar() {
  const displaydate = new Date();

  // export const theme = {
  //   colors: {
  //     header: '#6F1E51',
  //     body: '#f5f6fa',
  //     footer: '#B53471',
  //     ischange: false,
  //     color: 'black',
  //   },
  // };

  // const handlecolor = () => {
  //   if (theme.colors.ischange === true) {
  //     theme.colors.body = '#2f3640';
  //     theme.colors.footer = '#576574';
  //     theme.colors.header = '#34e7e4';
  //     theme.colors.ischange = false;
  //   } else {
  //     theme.colors.body = '#f5f6fa';
  //     theme.colors.footer = '#B53471';
  //     theme.colors.header = '#6F1E51';
  //     theme.colors.ischange = true;
  //   }
  // };

  return (
    <Header>
      <img
        src="https://pbs.twimg.com/profile_images/1219929831225335808/GCSPNKz-_400x400.jpg"
        alt="logoimg"
      />

      <Title>📝 To-Do list Application</Title>
      <DateDisplay>📅 Date:{displaydate.toLocaleDateString()}</DateDisplay>
      <ToggleDarkTheme> 👆dark theme</ToggleDarkTheme>
    </Header>
  );
}

export default React.memo(Navbar);
