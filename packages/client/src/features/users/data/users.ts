import { faker } from "@faker-js/faker";

const INTERESTS = [
  "sports",
  "dance",
  "music",
  "travel",
  "reading",
  "cooking",
  "photography",
  "gaming",
  "hiking",
  "yoga",
  "painting",
  "coding",
  "gardening",
  "writing",
  "film",
];

const COLOR_SCHEMES = [
  'bg-red-100    text-red-800',
  'bg-orange-100 text-orange-800',
  'bg-amber-100  text-amber-800',
  'bg-yellow-100 text-yellow-800',
  'bg-lime-100   text-lime-800',
  'bg-green-100  text-green-800',
  'bg-emerald-100 text-emerald-800',
  'bg-teal-100   text-teal-800',
  'bg-cyan-100   text-cyan-800',
  'bg-sky-100    text-sky-800',
  'bg-blue-100   text-blue-800',
  'bg-indigo-100 text-indigo-800',
  'bg-violet-100 text-violet-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100   text-pink-800',
] as const;

const INTEREST_TO_COLOR: Record<(typeof INTERESTS)[number], string> =
  INTERESTS.reduce((map, name, idx) => {
    map[name] = COLOR_SCHEMES[idx % COLOR_SCHEMES.length];
    return map;
  }, {} as Record<(typeof INTERESTS)[number], string>);

export type InterestItem = {
  name: (typeof INTERESTS)[number];
  badgeColor: string;
};

export const generateInterests = (min = 2, max = 5): InterestItem[] => {
  const count = faker.number.int({ min, max });
  const interests = faker.helpers.arrayElements(INTERESTS, count);
  return interests.map((name) => ({
    name,
    badgeColor: INTEREST_TO_COLOR[name],
  }));
};

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = `${firstName} ${lastName}`;
  return {
    _id: faker.string.uuid(),
    name,
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    age: faker.number.int({ min: 1, max: 150 }),
    mobile: faker.phone.number({ style: "international" }),
    interests: generateInterests(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});
