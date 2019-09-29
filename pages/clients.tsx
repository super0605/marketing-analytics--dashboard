import React from 'react'
import styled from 'styled-components';
import withAuth from '../hocs/withAuth';
import Link from 'next/link';
import {TopNav, H1, ClientList, IconButton} from "../components/";
import {ClientSummary, ActivityComment} from "../constants/interfaces";
import {HeadStyle } from '../constants/head';
import {px, sizes, elementSizes, icons, userRoles} from '../constants/constants';

import logoTennessee from "../static/media/avatar__client__Tennesse.png";
import logoUnitedRentals from "../static/media/avatar__client__UnitedRentals.jpg";
import logoMiami from "../static/media/avatar__client__Miami.jpg";
import logoThrivent from "../static/media/avatar__client__Thrivent.jpg";
import avatarStella from "../static/media/avatar__female03.png";
import avatarRafeeda from "../static/media/avatar__female02.png";

const exampleComment: ActivityComment = {
  user: {
    name: "Stella Owens",
    avatar: avatarStella,
    role: userRoles.client,
  },
  message: "Our paid search budget increased this month, but traffic from…",
}
const exampleComment2: ActivityComment = {
  user: {
    name: "Rafeeda Nouri",
    avatar: avatarRafeeda,
    role: userRoles.analyst,
  },
  message: "Our paid search budget increased this month, but traffic from…",
}

const exampleClientSummaries: ClientSummary[] = [
  {
    client: {
      name: "Tennessee",
      logo: logoTennessee,
    },
    sparkLine: "",
    sparkProgress: 0.7,
    activity: {
      content: exampleComment,
      time: "yesterday"
    }
  },
  {
    client: {
      name: "United Rentals",
      logo: logoUnitedRentals,
    },
    sparkLine: "",
    sparkProgress: 0.2,
  },
  {
    client: {
      name: "Miami",
      logo: logoMiami,
    },
    sparkLine: "",
    sparkProgress: 0.42,
    activity: {
      content: exampleComment,
      time: "3 hours ago"
    }
  },
  {
    client: {
      name: "Thrivent",
      logo: logoThrivent,
    },
    sparkLine: "",
    sparkProgress: 0.84,
    activity: {
      content: exampleComment2,
      time: "6 hours ago"
    }
  },
];

const Content = styled.div`
  width: ${px(elementSizes.contentAreaWide)};
  margin: ${px(sizes.big)} auto;
`;

const WelcomeRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${px(sizes.big)};
`;

const A = styled.a`
  text-decoration: none;
`;

export default withAuth(() => (
  <div>
    <HeadStyle />
    <TopNav loggedIn={true}/>

    <Content>
      <WelcomeRow>
        <H1 content="Welcome to your universe!"></H1>
        <Link href="/brandSetup" as='/brand-setup'>
          <A>
            <IconButton type={icons.add} label="Add a brand" alignment="left" />
          </A>
        </Link>
      </WelcomeRow>

      <ClientList href={'/brandGravity'} as={'/brand-gravity'} clientSummaries={exampleClientSummaries} />
    </Content>
  </div>
));
