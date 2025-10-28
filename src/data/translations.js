const bosses = [
  {
    key: 'Gladius',
    translations: ['Gladius', 'Гладіус', 'Гладиус', 'Dog', 'Собака', 'Tricephalos', 'Трицефалос'],
  },
  {
    key: 'Adel',
    translations: ['Adel', 'Адель', 'Jaw', 'Челюсть', 'Hippo', 'Бегемот'],
  },
  {
    key: 'Gnoster',
    translations: ['Gnoster', 'Гностер', 'Butterfly', 'Метелик', 'Бабочка', 'Мотилек'],
  },
  {
    key: 'Maris',
    translations: ['Maris', 'Маріс', 'Марис', 'Augur', 'Авгур'],
  },
  {
    key: 'Libra',
    translations: ['Libra', 'Лібра', 'Либра', 'Goat', 'Козел'],
  },
  {
    key: 'Fulghor',
    translations: ['Fulghor', 'Фульгор', 'Centaur', 'Кентавр', 'Darkdrift Knight', 'Темний Рицар'],
  },
  {
    key: 'Caligo',
    translations: ['Caligo', 'Каліго', 'Калиго', 'Dragon', 'Дракон'],
  },
  {
    key: 'Heolstor',
    translations: ['Heolstor', 'Геолстор', 'Night Aspect', 'Аспект Ночі', 'Аспект Ночи'],
  },
];

const earthShifts = [
  {
    key: 'none',
    translations: [
      'None',
      'Default map',
      'Без змін',
      'Без изменений',
      'Звичайна карта',
      'Обычная карта',
      'Дефолтна карта',
    ],
  },
  {
    key: 'crater',
    translations: ['Crater', 'Кратер', 'Кратер'],
  },
  {
    key: 'forest',
    translations: ['Forest', 'Ліс', 'Лес'],
  },
  {
    key: 'mountain',
    translations: ['Mountain', 'Гора', 'Гора'],
  },
  {
    key: 'noklateo',
    translations: ['Noklateo', 'Ноклатео', 'Ноклатео', 'Castle', 'Замок', 'City', 'Місто', 'Город'],
  },
];

const locations = [
  {
    key: 'camp',
    translations: ['camp', 'табір', 'лагерь'],
  },
  {
    key: 'ruins',
    translations: ['ruins', 'руїни', 'руины', 'руіни'],
  },
  {
    key: 'fort',
    translations: ['fort', 'форт', 'форт'],
  },
  {
    key: 'church',
    translations: ['church', 'церква', 'церковь', 'собор'],
  },
];

const effects = [
  {
    key: 'poison',
    translations: ['poison', 'toxic', 'ядовитый', 'отруйний', 'отравление', 'отруєння'],
  },
  {
    key: 'rot',
    translations: ['scarlet rot', 'rot', 'гниль', 'красная гниль', 'червона гниль'],
  },
  {
    key: 'blood',
    translations: [
      'blood',
      'blood loss',
      'bleeding',
      'кровавий',
      'кровавый',
      'кровотеча',
      'кровопотеря',
      'кровотечение',
    ],
  },
  {
    key: 'frostbite',
    translations: ['frost', 'frostbite', 'ice', 'лід', 'лёд', 'льодяний', 'ледяной'],
  },
  {
    key: 'sleep',
    translations: ['sleep', 'сон', 'сонный', 'сонний'],
  },
  {
    key: 'madness',
    translations: ['madness', 'безумство', 'бешенство', 'шаленість'],
  },
  {
    key: 'death',
    translations: ['death blight', 'death', 'смерть', 'смертельний', 'смертельный'],
  },
  {
    key: 'fire',
    translations: ['fire', 'flame', 'огонь', 'вогонь', 'вогняний', 'огненный'],
  },
  {
    key: 'lightning',
    translations: ['lightning', 'блискавка', 'молния', 'молниевый'],
  },
  {
    key: 'holy',
    translations: ['holy', 'святий'],
  },
  {
    key: 'magic',
    translations: ['magic', 'магія', 'магия', 'магічний', 'магический'],
  },
  {
    key: 'none',
    translations: ['default', 'звичайний', 'обычный'],
  },
];

export const DICTIONARY = {
  bosses,
  earthShifts,
  locations,
  effects,
};

export const TRANSLATIONS = Object.entries(DICTIONARY).flatMap(([category, items]) =>
  items.map((item) => ({
    key: `${category}.${item.key}`,
    translations: item.translations,
  }))
);
