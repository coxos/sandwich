import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { State } from "../store";
import styled from "styled-components";

type ActivePropType = {
  isActive: boolean;
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
  color: ${({ isActive }) => (!isActive ? "darkslategray" : " white")};
  background-color: ${({ isActive }) => (!isActive ? "white" : "#62c8c2")};
  cursor: pointer;
`;

const Pagination = ({ clickPage }: { clickPage: (event: number) => void }) => {
  const { page, pageSize, totalItemCount } = useAppSelector(
    (state: State) => state.sandwichList
  );

  const totalCount = totalItemCount as number;
  const allPage = Math.ceil(totalCount / pageSize);

  return (
    <Wrapper>
      {Array.from(Array(allPage).keys()).map((index) => (
        <PageSelector
          key={index}
          isActive={page === index + 1}
          onClick={() => {
            clickPage(index + 1);
          }}
        >
          {index + 1}
        </PageSelector>
      ))}
    </Wrapper>
  );
};

export default Pagination;
