import { Route, Routes } from "react-router-dom";

import { HomePage } from "./Pages/HomePage/HomePage";
import { NotFoundPage} from "./Pages/NotFoundPage/NotFoundPage";
import { Layout} from "./Components/Layout/Layout";

const App = () => {
  return (
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </div>
  );
}

export default App;
