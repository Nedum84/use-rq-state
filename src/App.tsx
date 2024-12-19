import { useRQState } from "Hooks/useRQState";
import { User } from "Types/user";
import { getRandomItem } from "Utils/randomUtils";

export default function App() {
  const [count, setCount] = useRQState("counter", 0);
  const [, setMultiply] = useRQState("multiply", 2);
  const [, setUser] = useRQState<User>("user", {
    name: "Nelson",
    age: 42,
    location: "Lagos",
  });

  return (
    <div className="w-screen h-dvh sm:px-16">
      <div className="py-16 max-w-7xl h-full mx-auto bg-gray-200 dark:bg-[#333] overflow-auto">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-black mb-6 text-center text-gray-800 dark:text-white">
            useRQState: Simplified State Management Across Components
          </h1>

          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
            An alternative to useState, useRQState helps manage states without prop drilling. Just
            use the same query key across components, and it works out of the box.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
              Basic State Management
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 my-4">
              In this section, we demonstrate how to manage simple numeric states like counters and
              multipliers.
            </p>
            <div className="max-w-4xl mx-auto flex justify-center gap-4 my-4">
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 rounded-md bg-green-600 text-white flex-1 transition duration-300 ease-in-out hover:bg-green-500"
              >
                Increment Counter
              </button>
              <button
                onClick={() => setMultiply((prev) => prev * 2)}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white flex-1 transition duration-300 ease-in-out hover:bg-indigo-500"
              >
                x2 Multiplier
              </button>
            </div>
            <div className="flex gap-4 flex-col md:flex-row my-4">
              <Component1 />
              <Component2 />
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
              Usage with Complex Objects
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 my-4">
              This section demonstrates how to handle more complex states, such as user information
              (name, age, and location).
            </p>
            <div className="max-w-4xl mx-auto flex justify-center gap-4 my-4">
              <button
                onClick={() =>
                  setUser((user) => ({ ...user, name: getRandomItem<string>("name") }))
                }
                className="px-4 py-2 rounded-md bg-red-600 text-white flex-1 transition duration-300 ease-in-out hover:bg-red-500"
              >
                Change Name
              </button>
              <button
                onClick={() => setUser((user) => ({ ...user, age: getRandomItem<number>("age") }))}
                className="px-4 py-2 rounded-md bg-blue-600 text-white flex-1 transition duration-300 ease-in-out hover:bg-blue-500"
              >
                Change Age
              </button>
              <button
                onClick={() =>
                  setUser((user) => ({ ...user, location: getRandomItem<string>("location") }))
                }
                className="px-4 py-2 rounded-md bg-pink-600 text-white flex-1 transition duration-300 ease-in-out hover:bg-pink-500"
              >
                Change Location
              </button>
            </div>
            <Component3 />
          </section>

          <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
            <p className="flex gap-2">
              Source Code:
              <a
                href="https://whewjehwe.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                whewjehwe.com
              </a>
            </p>
            <p className="flex gap-2">
              Article:
              <a
                href="https://whewjehwe.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                whewjehwe.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component1() {
  const [count] = useRQState<number>("counter");

  return (
    <div className="border p-6 rounded-md shadow-lg bg-white dark:bg-gray-800 flex-1">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Counter Component</h3>
      <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{count}</p>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Click the "Increment Counter" button to increase this value.
      </p>
    </div>
  );
}

function Component2() {
  const [multiply] = useRQState<number>("multiply");

  return (
    <div className="border p-6 rounded-md shadow-lg bg-white dark:bg-gray-800 flex-1">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        2x Multiplier Component
      </h3>
      <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{multiply}</p>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Each click of the "x2 Multiplier" button multiplies the value by 2.
      </p>
    </div>
  );
}

function Component3() {
  const [user] = useRQState<User>("user");

  return (
    <div className="border p-6 rounded-md shadow-lg bg-white dark:bg-gray-800 flex-1">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">User Info</h3>
      {Object.entries(user).map(([key, value]) => {
        return (
          <div key={key} className="flex gap-1 items-center my-2">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{key}:</p>
            <span className="text-gray-800 dark:text-gray-200">{value}</span>
          </div>
        );
      })}
    </div>
  );
}
