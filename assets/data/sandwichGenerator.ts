import { Sandwich } from "../../store";

export const sandwichGenerator = (totalCount: number): Sandwich[] => {
  let randomId = () => Math.random().toString(36).substr(2);
  let randomIsVegan = () =>
    Math.floor(Math.random() * 999) % 10 === 0 ? true : false;
  let randomPrice = () => Math.floor(Math.random() * 9000) + 1000;

  const sandwichList = Array.from(Array(totalCount).keys()).map(
    (genSandwich, key) => {
      const isVegan = randomIsVegan();
      const isVeganImage = isVegan
        ? "https://cdn.pixabay.com/photo/2022/02/12/21/22/toast-7009956_960_720.jpg"
        : "https://cdn.pixabay.com/photo/2016/09/06/10/45/food-1648767_960_720.jpg";

      return {
        id: randomId(),
        name: `Sandwich ${key + 1}`,
        isvegan: isVegan,
        image: isVeganImage,
        price: randomPrice(),
      };
    }
  );

  return sandwichList;
};

const allSandwich: Sandwich[] = sandwichGenerator(
  Math.floor(Math.random() * 200 + 100)
);

export const getSandwichApi = (page: number, pageSize: number) => {
  const sartList = page === 1 ? 0 : (page - 1) * pageSize;
  const endList = page * pageSize;

  const sandwiches = allSandwich.slice(sartList, endList);
  //console.log(allSandwich, "allSanwich");

  return {
    list: sandwiches,
    totalCount: allSandwich.length as number,
  };
};
