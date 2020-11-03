// Задание первого уровня 1
// В функцию приходит массив состояний заказа и фильтруется
// Нужно заменить FIXME на тип который вычисляется на основе OrderState

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const userOrderStates = [
  "initial",
  "inWork",
  "fulfilled",
] as const;

const orderStates = [
    ...userOrderStates,
  "buyingSupplies",
  "producing",
] as const;

type OrderState = typeof orderStates[number];
type FIXME = Array<typeof userOrderStates[number]>;

export const getUserOrderStates = (orderStates: OrderState[]): FIXME => {
  const filteredStates = [] as FIXME;
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
