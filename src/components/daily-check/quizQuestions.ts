
import { Question } from "./types";

export const questions: Question[] = [
  {
    id: 1,
    text: "How's your mental weather today?",
    options: [
      { text: "Clear skies (calm, content)", emoji: "🌤️", value: 4 },
      { text: "Partly cloudy (a little off but okay)", emoji: "☁️", value: 3 },
      { text: "Thunderstorm (anxious or down)", emoji: "⛈️", value: 1 },
      { text: "Total fog (numb/confused)", emoji: "🌫️", value: 0 },
    ],
  },
  {
    id: 2,
    text: "Which vibe ruled your day?",
    options: [
      { text: "Peace mode", emoji: "🧘‍♀️", value: 4 },
      { text: "Zen-ish", emoji: "😌", value: 3 },
      { text: "Bit of everything", emoji: "🎭", value: 2 },
      { text: "Chaos mode", emoji: "🌪️", value: 1 },
    ],
  },
  {
    id: 3,
    text: "Energy level check:",
    options: [
      { text: "Rocket fuel", emoji: "🚀", value: 4 },
      { text: "Somewhere in the middle", emoji: "⚡", value: 3 },
      { text: "Meh", emoji: "🐢", value: 2 },
      { text: "Drained AF", emoji: "🔋", value: 1 },
    ],
  },
  {
    id: 4,
    text: "Sleep recently?",
    options: [
      { text: "Slept like a log", emoji: "😴", value: 4 },
      { text: "Got enough", emoji: "😊", value: 3 },
      { text: "Kept tossing", emoji: "😕", value: 2 },
      { text: "What is sleep?", emoji: "👁️", value: 1 },
    ],
  },
  {
    id: 5,
    text: "Social battery status:",
    options: [
      { text: "Fully charged", emoji: "🔋", value: 4 },
      { text: "Slightly dying", emoji: "🪫", value: 3 },
      { text: "No interactions today", emoji: "🤐", value: 2 },
      { text: "Please leave me alone", emoji: "🙅‍♀️", value: 1 },
    ],
  },
  {
    id: 6,
    text: "Did anything today lift you up?",
    options: [
      { text: "Yes, big moment!", emoji: "🎉", value: 4 },
      { text: "Yes, something small", emoji: "🌱", value: 3 },
      { text: "Not really", emoji: "😐", value: 2 },
      { text: "Quite the opposite", emoji: "👎", value: 1 },
    ],
  },
  {
    id: 7,
    text: "How are you treating yourself lately?",
    options: [
      { text: "Like royalty", emoji: "👑", value: 4 },
      { text: "Doing my best", emoji: "💪", value: 3 },
      { text: "Could be better", emoji: "🤷‍♀️", value: 2 },
      { text: "Not great", emoji: "😔", value: 1 },
    ],
  },
  {
    id: 8,
    text: "Be real: what do you need most right now?",
    options: [
      { text: "Rest or sleep", emoji: "🛌", value: 0 },
      { text: "A good laugh", emoji: "😂", value: 0 },
      { text: "Motivation", emoji: "🔥", value: 0 },
      { text: "Someone to talk to", emoji: "🗣️", value: 0 },
    ],
  },
];
