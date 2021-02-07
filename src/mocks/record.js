import { getRandomArrayItem, getRandomDate, getRandomInt, getRandomObjectItem, range } from "../utils/common";

export const NAMES = [
  `Вениамин`,
  `Август`,
  `Августин`,
  `Авраам`,
  `Аврора`,
  `Агата`,
  `Агафон`,
  `Агнесса`,
  `Агния`,
  `Ада`,
  `Аделаида`,
  `Аделина`,
  `Акулина`,
  `Александр`,
  `Александра`,
  `Алексей`,
  `Алена`,
  `Алина`,
  `Алиса`,
  `Алла`,
  `Алсу`,
  `Альберт`,
  `Альбина`,
  `Амалия`,
  `Анастасий`,
  `Анастасия`,
  `Анатолий`,
  `Ангелина`,
  `Андрей`,
  `Анжела`,
  `Анжелика`,
  `Анисий`,
  `Анна`,
  `Антон`,
  `Антонина`,
  `Анфиса`,
  `Аполлинарий`,
  `Аполлон`,
  `Арина`,
  `Аристарх`,
  `Аркадий`,
  `Арсен`,
  `Арсений`,
  `Артем`,
  `Артемий`,
  `Артур`,
  `Архип`,
  `Ася`,
];
export const SURNAMES = [
  `Смирнов`,
  `Иванов`,
  `Кузнецов`,
  `Соколов`,
  `Попов`,
  `Лебедев`,
  `Козлов`,
  `Новиков`,
  `Морозов`,
  `Петров`,
  `Волков`,
  `Соловьёв`,
  `Васильев`,
  `Зайцев`,
  `Павлов`,
  `Семёнов`,
  `Голубев`,
  `Виноградов`,
  `Богданов`,
  `Воробьёв`,
  `Фёдоров`,
  `Михайлов`,
  `Беляев`,
  `Тарасов`,
  `Белов`,
  `Комаров`,
  `Орлов`,
  `Киселёв`,
  `Макаров`,
  `Андреев`,
  `Ковалёв`,
  `Ильин`,
  `Гусев`,
  `Титов`,
  `Кузьмин`,
  `Кудрявцев`,
  `Баранов`,
  `Куликов`,
  `Алексеев`,
  `Степанов`,
  `Яковлев`,
  `Сорокин`,
  `Сергеев`,
  `Романов`,
  `Захаров`,
  `Борисов`,
  `Королёв`,
  `Герасимов`,
  `Пономарёв`,
  `Григорьев`,
  `Лазарев`,
  `Медведев`,
  `Ершов`,
  `Никитин`,
  `Соболев`,
  `Рябов`,
  `Поляков`,
  `Цветков`,
  `Данилов`,
  `Жуков`,
  `Фролов`,
  `Журавлёв`,
  `Николаев`,
  `Крылов`,
  `Максимов`,
  `Сидоров`,
  `Осипов`,
  `Белоусов`,
  `Федотов`,
  `Дорофеев`,
  `Егоров`,
  `Матвеев`,
  `Бобров`,
  `Дмитриев`,
  `Калинин`,
  `Анисимов`,
  `Петухов`,
  `Антонов`,
  `Тимофеев`,
  `Никифоров`,
  `Веселов`,
  `Филиппов`,
  `Марков`,
  `Большаков`,
  `Суханов`,
  `Миронов`,
  `Ширяев`,
  `Александров`,
  `Коновалов`,
  `Шестаков`,
  `Казаков`,
  `Ефимов`,
  `Денисов`,
  `Громов`,
  `Фомин`,
  `Давыдов`,
  `Мельников`,
  `Щербаков`,
  `Блинов`,
  `Колесников`,
  `Карпов`,
  `Афанасьев`,
  `Власов`,
  `Маслов`,
  `Исаков`,
  `Тихонов`,
  `Аксёнов`,
  `Гаврилов`,
  `Родионов`,
  `Котов`,
  `Горбунов`,
  `Кудряшов`,
  `Быков`,
  `Зуев`,
  `Третьяков`,
  `Савельев`,
  `Панов`,
  `Рыбаков`,
  `Суворов`,
  `Абрамов`,
  `Воронов`,
  `Мухин`,
  `Архипов`,
  `Трофимов`,
  `Мартынов`,
  `Емельянов`,
  `Горшков`,
  `Чернов`,
  `Овчинников`,
  `Селезнёв`,
  `Панфилов`,
  `Копылов`,
  `Михеев`,
  `Галкин`,
  `Назаров`,
  `Лобанов`,
  `Лукин`,
  `Беляков`,
  `Потапов`,
  `Некрасов`,
  `Хохлов`,
  `Жданов`,
  `Наумов`,
  `Шилов`,
  `Воронцов`,
  `Ермаков`,
  `Дроздов`,
  `Игнатьев`,
  `Савин`,
  `Логинов`,
  `Сафонов`,
  `Капустин`,
  `Кириллов`,
  `Моисеев`,
  `Елисеев`,
  `Кошелев`,
  `Костин`,
  `Горбачёв`,
  `Орехов`,
  `Ефремов`,
  `Исаев`,
  `Евдокимов`,
  `Калашников`,
  `Кабанов`,
  `Носков`,
  `Юдин`,
  `Кулагин`,
  `Лапин`,
  `Прохоров`,
  `Нестеров`,
  `Харитонов`,
  `Агафонов`,
  `Муравьёв`,
  `Ларионов`,
  `Федосеев`,
  `Зимин`,
  `Пахомов`,
  `Шубин`,
  `Игнатов`,
  `Филатов`,
  `Крюков`,
  `Рогов`,
  `Кулаков`,
  `Терентьев`,
  `Молчанов`,
  `Владимиров`,
  `Артемьев`,
  `Гурьев`,
  `Зиновьев`,
  `Гришин`,
  `Кононов`,
  `Дементьев`,
  `Ситников`,
  `Симонов`,
  `Мишин`,
  `Фадеев`,
  `Комиссаров`,
  `Мамонтов`,
  `Носов`,
  `Гуляев`,
  `Шаров`,
  `Устинов`,
  `Вишняков`,
  `Евсеев`,
  `Лаврентьев`,
  `Брагин`,
  `Константинов`,
  `Корнилов`,
  `Авдеев`,
  `Зыков`,
  `Бирюков`,
  `Шарапов`,
  `Никонов`,
  `Щукин`,
  `Дьячков`,
  `Одинцов`,
  `Сазонов`,
  `Якушев`,
  `Красильников`,
  `Гордеев`,
  `Самойлов`,
  `Князев`,
  `Беспалов`,
  `Уваров`,
  `Шашков`,
  `Бобылёв`,
  `Доронин`,
  `Белозёров`,
  `Рожков`,
  `Самсонов`,
  `Мясников`,
  `Лихачёв`,
  `Буров`,
  `Сысоев`,
  `Фомичёв`,
  `Русаков`,
  `Стрелков`,
  `Гущин`,
  `Тетерин`,
  `Колобов`,
  `Субботин`,
  `Фокин`,
  `Блохин`,
  `Селиверстов`,
  `Пестов`,
  `Кондратьев`,
  `Силин`,
  `Меркушев`,
  `Лыткин`,
  `Туров`,
];
export const Status = {
  DONE: `Выполнено`,
  IN_PROGRESS: `Выполняется`,
  PENDING: `Ожидает`,
};

const generateName = () => `${getRandomArrayItem(NAMES)} ${getRandomArrayItem(SURNAMES)}`;

const generateRecord = (i) => ({
  id: i + 1,
  clientName: generateName(),
  date: getRandomDate().format(`DD.MM.YYYY`),
  percentDiff: getRandomInt(0, 80),
  staffName: generateName(),
  status: getRandomObjectItem(Status),
});

export const generateRecords = (count = 30) => range(count).reduce((acc, i) => {
  acc = [...acc, generateRecord(i)];
  return acc;
}, []);