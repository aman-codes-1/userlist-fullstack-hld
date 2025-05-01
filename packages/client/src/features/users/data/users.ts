export const ALL_INTERESTS = [
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

export const COLOR_SCHEMES = [
  "bg-red-100    text-red-800",
  "bg-orange-100 text-orange-800",
  "bg-amber-100  text-amber-800",
  "bg-yellow-100 text-yellow-800",
  "bg-lime-100   text-lime-800",
  "bg-green-100  text-green-800",
  "bg-emerald-100 text-emerald-800",
  "bg-teal-100   text-teal-800",
  "bg-cyan-100   text-cyan-800",
  "bg-sky-100    text-sky-800",
  "bg-blue-100   text-blue-800",
  "bg-indigo-100 text-indigo-800",
  "bg-violet-100 text-violet-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100   text-pink-800",
] as const;

export const generateInterests = (
  interests: string[]
): { name: string; badgeColor: string }[] => {
  const interestToColor: Record<string, string> = ALL_INTERESTS.reduce(
    (map, name, idx) => {
      map[name] = COLOR_SCHEMES[idx % COLOR_SCHEMES.length];
      return map;
    },
    {} as Record<string, string>
  );

  return interests.map((interest) => ({
    name: interest,
    badgeColor: interestToColor[interest],
  }));
};

