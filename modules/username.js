function generateRandomUsername() {
  const adjectives = [
    "Fast",
    "Quick",
    "Smart",
    "Cool",
    "Brave",
    "Calm",
    "Strong",
    "Clever",
    "Bold",
    "Charming",
    "Creative",
    "Funny",
    "Generous",
    "Gentle",
    "Graceful",
    "Honest",
    "Imaginative",
    "Loyal",
    "Patient",
    "Reliable",
  ];
  const nouns = [
    "Tiger",
    "Lion",
    "Eagle",
    "Shark",
    "Panther",
    "Elephant",
    "Giraffe",
    "Kangaroo",
    "Dolphin",
    "Penguin",
    "Owl",
    "Wolf",
    "Bear",
    "Cheetah",
    "Falcon",
    "Rhinoceros",
    "Crocodile",
    "Hippopotamus",
    "Fox",
    "Zebra",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun + Math.floor(Math.random() * 100);
}

module.exports = { generateRandomUsername };
