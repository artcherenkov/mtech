import { getRandomDate, getRandomInt, range } from "../utils/common";

const generateError = () => ({
  date: getRandomDate().toISOString(),
  resource_url: "https://google.com",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices elementum justo. Proin euismod, arcu non lobortis tristique, nisl odio.",
  is_favorite: Math.random() > 0.5,
  is_resolved: Math.random() > 0.5,
  is_activated: Math.random() > 0.5,
  company_id: getRandomInt(1000, 10000),
  resource_id: getRandomInt(100000, 1000000),
  client_id: getRandomInt(100, 500),
  abonement_id: getRandomInt(1, 99999),
  abonement_number: getRandomInt(11111, 999999999),
  id: getRandomInt(1, 99999),
});

export const generateErrors = (count = 50) =>
  range(count).reduce((acc) => {
    acc = [...acc, generateError()];
    return acc;
  }, []);
