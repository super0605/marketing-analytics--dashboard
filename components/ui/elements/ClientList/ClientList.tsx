import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { withRouter } from "next/router";
import ClientRow from "./ClientRow/ClientRow";
import { H2, SearchBar } from "../../../../components";
import { ClientSummary } from "../../../../constants/interfaces";
import { elevation } from "../../../../constants/constants";

const List = styled.ul`
  padding: 0;
  margin: 0;
  box-shadow: ${elevation.dp05};
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const A = styled.a`
  text-decoration: none;
`;

interface ClientListCompProps {
  clientSummaries: ClientSummary[];
  href: string;
  as?: string;
}
const ClientListComp = (props: ClientListCompProps) => {
  const { clientSummaries, href, as } = props;
  return (
    <div>
      <HeaderRow>
        <H2 content="All brands" />
        <SearchBar placeholder="Search" />
      </HeaderRow>
      <List>
        {clientSummaries.map((summary, i) => (
          <Link
            key={`client-link-${i}`}
            href={href}
            as={as ? as : href}
            passHref
          >
            <A>
              <ClientRow summary={summary} />
            </A>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default withRouter(ClientListComp);
