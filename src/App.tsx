import "./App.css";
import { categories, traverseSubCategories } from "./categories";
// import Player from "./player/Player";

export default function App() {
  console.log(traverseSubCategories(categories));

  return (
    <div className="p-4">
      {/* <Player /> */}
      <div>Testing Category Traversal</div>
    </div>
  );
}
