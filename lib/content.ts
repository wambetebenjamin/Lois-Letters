export type LiteracyPack = { id: string; title: string; language: string; level: string; format: string; description: string; image: string; focus: string };

export const packs: LiteracyPack[] = [
  { id: "swahili-syllable-start", title: "Syllable Steps: Kiswahili", language: "Kiswahili", level: "Getting started", format: "Print + read", description: "Practice open syllables with familiar words, picture cues and short read-aloud routines.", image: "/images/classroom-learning.jpg", focus: "ma · me · mi · mo · mu" },
  { id: "swahili-home-story", title: "At Home Together", language: "Kiswahili", level: "Early reader", format: "Decodable story", description: "A short, repeatable story with a word list and a caregiver reading prompt.", image: "/images/reading-together.jpg", focus: "home and family words" },
  { id: "english-sounds", title: "Sound and Say: English", language: "English", level: "Getting started", format: "Print + audio", description: "A gentle first sound-to-letter practice page with simple oral blending activities.", image: "/images/classroom-circle.jpg", focus: "m · s · a · t" },
  { id: "community-stories", title: "Stories from Our Place", language: "Kikuyu", level: "Early reader", format: "Shared reading", description: "A community story planning sheet designed to be adapted with local speakers.", image: "/images/classroom-outdoors.jpg", focus: "oral language and retelling" },
  { id: "french-first-words", title: "Mes premiers mots", language: "Français", level: "Getting started", format: "Print + read", description: "A starter set for speaking, noticing sounds and building confidence with first words.", image: "/images/reading-together.jpg", focus: "words and sound play" },
];

export const photos = {
  hero: "/images/classroom-outdoors.jpg",
  classroom: "/images/classroom-learning.jpg",
  reading: "/images/reading-together.jpg",
  circle: "/images/classroom-circle.jpg",
};
