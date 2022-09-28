import sandwichesData from "../assets/data/sandwichesData";
import Image from "next/image";
import Layout from "../Componenets/Layout";
import styled from "styled-components";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Sandwich,
  sandwichListSlice,
  SandwichListState,
  State,
} from "../store";
import { createSelector } from "@reduxjs/toolkit";

const Wrapper = styled.section`
  width: 100vw;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
`;

const SandwichList = styled.ul`
  list-style-type: none;
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const ImageWraper = styled.div`
  width: 100%;
  height: 350px;
  filter: grayscale(1);
  transition: 320ms;
`;

type SandiwchListPropType = {
  vegan: boolean;
};

const SandwichListLi = styled.li<SandiwchListPropType>`
  width: 100%;
  justify-self: center;
  background-color: ${({ vegan }) => (!vegan ? "white" : "#dafdda")};
  box-shadow: 0px 0px 33px 0px #00000057;
  transition: 320ms;

  &:hover ${ImageWraper} {
    filter: grayscale(0);
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 25px 0px #000000ab;
  }
`;

const CardBody = styled.div`
  text-align: center;
  padding: 25px;
`;
const NameText = styled.div`
  font-weight: bolder;
  font-size: 21px;
  letter-spacing: -1px;
`;

const PriceText = styled.div`
  font-size: 16px;
  letter-spacing: 1px;
  color: #a1a1a1;
`;

const Sandwiches: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      sandwichListSlice.actions.sandwichListLoaded({
        list: sandwichesData,
        totalCount: 100,
      })
    );
  }, [dispatch]);

  const sandwiches = useSelector(
    (state: State) => state.sandwichList.sandwiches
  );

  console.log(sandwiches);

  return (
    <Layout>
      <Wrapper>
        <SandwichList>
          {sandwiches?.map(({ name, price, isvegan, image }) => (
            <SandwichListLi key={name} vegan={isvegan}>
              <ImageWraper>
                <Image src={image} alt={name} layout="fill" objectFit="cover" />
              </ImageWraper>
              <CardBody>
                <NameText>{name}</NameText>
                <PriceText>{price} Ft</PriceText>
              </CardBody>
            </SandwichListLi>
          ))}
        </SandwichList>
      </Wrapper>
    </Layout>
  );
};

export default Sandwiches;
