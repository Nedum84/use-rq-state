const randomNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
  "Kara",
  "Liam",
  "Mia",
  "Nathan",
  "Olivia",
  "Paul",
  "Quinn",
  "Rose",
  "Steve",
  "Tina",
];

const randomLocations = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Berlin",
  "Sydney",
  "Dubai",
  "Toronto",
  "San Francisco",
  "Rome",
  "Cape Town",
  "Mumbai",
  "Los Angeles",
  "Beijing",
  "Istanbul",
  "Rio de Janeiro",
  "Mexico City",
  "Hong Kong",
  "Moscow",
  "Chicago",
];

const randomAges = Array.from({ length: 20 }, () => Math.floor(Math.random() * 60) + 18); // 18-77

// The new getRandomItem function, accepting a type
export const getRandomItem = <T extends string | number>(type: "name" | "age" | "location"): T => {
  switch (type) {
    case "name":
      return randomNames[Math.floor(Math.random() * randomNames.length)] as T;
    case "age":
      return randomAges[Math.floor(Math.random() * randomAges.length)] as T;
    case "location":
      return randomLocations[Math.floor(Math.random() * randomLocations.length)] as T;
    default:
      return "N/A" as T;
  }
};
