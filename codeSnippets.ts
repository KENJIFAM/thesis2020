// Code example of user-defined type
type Season = "spring" | "summer" | "autumn" | "winter";
type Age = number;
interface User {
  id: string;
  name: string;
  age: number;
}

// Code example of functions in TypeScript
// Function with defined type void
const hello = (name: string): void => {
  console.log(name);
};

// Function with other defined types
const multiple = (a: number, b: number): number => {
  return a * b;
};
