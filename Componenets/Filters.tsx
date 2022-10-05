import React, { useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFIlters, getSandwiches, SandwichFilters } from "../store";

const Wrapper = styled.form`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div``;
const Search = styled.input`
  padding: 10px;
`;

const PriceContainer = styled.div``;

const PriceMin = styled.input`
  text-align: center;
  padding: 10px 5px;
  width: 120px;
  appearance: none;
  appearance: textfield;
  margin: 0;
`;
const PriceMax = styled.input`
  text-align: center;
  padding: 10px 5px;
  width: 120px;
  appearance: none;
  appearance: textfield;
  margin: 0;
`;

const Submit = styled.button`
  font-weight: 500;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  box-shadow: 0px 0px 0px 0px transparent, 0px 0px 0px 1px white;
  -webkit-transition: 320ms;
  transition: 320ms;
  border: 2px solid lightseagreen;
  margin-left: 20px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: lightseagreen;
  color: white;

  &:hover {
    box-shadow: 0px 0px 0px 2px #60c7c2;
    background-color: white;
    color: lightseagreen;
  }
`;

const RemoveFilterButton = styled.button``;

const Filters = () => {
  const { SanwichesMaxPrice, filters } = useAppSelector(
    (state) => state.sandwichList
  );
  const maxPrice = SanwichesMaxPrice as number;
  const enterSearch = useRef<HTMLInputElement>(null);
  const enterMinPrice = useRef<HTMLInputElement>(null);
  const enterMaxPrice = useRef<HTMLInputElement>(null);

  const dispath = useAppDispatch();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let searchName = null;
    let minPrice = null;
    let maxPrice = null;

    if (
      enterSearch.current?.value.trim() === "" &&
      enterMinPrice.current?.value.trim() === "" &&
      enterMaxPrice.current?.value.trim() === ""
    ) {
      return;
    }

    if (enterSearch.current?.value.trim() !== "") {
      searchName = enterSearch.current?.value.trim();
    }

    if (enterMinPrice.current?.value.trim() !== "") {
      minPrice = enterMinPrice.current?.value.trim();
    }
    if (enterMaxPrice.current?.value.trim() !== "") {
      maxPrice = enterMaxPrice.current?.value.trim();
    }

    const filterPrice =
      minPrice === null && maxPrice === null ? null : [minPrice, maxPrice];

    const filter = {
      searchSandwichName: searchName,
      price: filterPrice,
    } as SandwichFilters;

    dispath(setFIlters(filter));
    dispath(getSandwiches(1));
  };

  const removeFilters = () => {
    dispath(setFIlters(null));
    dispath(getSandwiches(1));
  };

  return (
    <Wrapper onSubmit={submitHandler}>
      <SearchContainer>
        <Search
          id="Search"
          type="text"
          placeholder="Sandwich search"
          ref={enterSearch}
          defaultValue={
            filters?.searchSandwichName ? filters?.searchSandwichName : ""
          }
        />
      </SearchContainer>
      <PriceContainer>
        <PriceMin
          id="priceMin"
          type="number"
          placeholder="min: 0 ft"
          min={0}
          max={maxPrice}
          ref={enterMinPrice}
          defaultValue={filters?.price?.[0] ? filters?.price?.[0] : ""}
        />
        &nbsp;-&nbsp;
        <PriceMax
          id="priceMax"
          type="number"
          placeholder={`max: ${maxPrice.toString()} ft`}
          min={0}
          max={maxPrice}
          ref={enterMaxPrice}
          defaultValue={filters?.price?.[1] ? filters?.price?.[1] : ""}
        />
      </PriceContainer>
      <Submit type="submit"> Submit </Submit>
      <RemoveFilterButton onClick={removeFilters}>
        Remove filters
      </RemoveFilterButton>
    </Wrapper>
  );
};

export default Filters;
