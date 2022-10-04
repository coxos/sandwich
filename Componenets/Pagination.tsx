import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { State } from "../store";
import styled from "styled-components";

type ActivePropType = {
  active: boolean;
};

const Wrapper = styled.ul`
  margin-top: 25px;
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1px;
`;

const PageSelector = styled.li<ActivePropType>`
  width: 30px;
  padding: 10px 0;
  text-align: center;
  font-weight: 600;
  color: ${({ active }) => (!active ? "darkslategray" : " white")};
  background-color: ${({ active }) => (!active ? "white" : "#62c8c2")};
  cursor: pointer;
`;

const Pagination = ({
  clickPage,
}: {
  clickPage: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const { page, pageSize, totalItemCount } = useAppSelector(
    (state: State) => state.sandwichList
  );

  const totalCount = totalItemCount !== null ? totalItemCount : 0;

  if (totalCount === 0) {
    return <div> null </div>;
  }

  const allPage = Math.ceil(totalCount / pageSize);

  return (
    <Wrapper>
      {Array.from(Array(allPage).keys()).map((p) => (
        <PageSelector
          key={p}
          active={page === p + 1 ? true : false}
          onClick={clickPage}
        >
          {p + 1}
        </PageSelector>
      ))}
    </Wrapper>
  );
};

export default Pagination;
