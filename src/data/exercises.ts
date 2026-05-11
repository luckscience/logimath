export type Difficulty =
  | "Principiante"
  | "Intermedio"
  | "Avanzado";

export interface Exercise {
  title: string;
  difficulty: Difficulty;
  difficultyColor: string;
  category: string;
  link: string;
}

export const exercises: Exercise[] = [
  {
    title: "El puente y la antorcha",
    difficulty: "Intermedio",
    difficultyColor: "gray",
    category: "Optimización",
    link: "/exercises/example"
  },

  {
    title: "Juan y las manzanas",
    difficulty: "Avanzado",
    difficultyColor: "red",
    category: "Retroceso",
    link: "/exercises/exercise-juan-and-apples"
  }
];