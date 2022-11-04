import { Route, Routes } from "react-router-dom";

import { HomePage } from "./Pages/HomePage/HomePage";
import { NotFoundPage} from "./Pages/NotFoundPage/NotFoundPage";
import { Layout} from "./Components/Layout/Layout";
import {SignInPage} from "./Pages/SignInPage/SignInPage";
import {SignUpPage} from "./Pages/SignUpPage/SignUpPage";
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage";
import {IdeaPage} from "./Pages/IdeaPage/IdeaPage";
import {CreateIdeaPage} from "./Pages/CreateIdeaPage/CreateIdeaPage";

const App = () => {
  return (
      <div className="App">
        <Routes>
            <Route path={"/"} element={<Layout headerOnly />}>
                <Route index element={<HomePage />} />
                <Route path={"/sign-in"} element={<SignInPage />} />
                <Route path={"/sign-up"} element={<SignUpPage />} />
                <Route path={"/create-idea"} element={<CreateIdeaPage />} />
            </Route>
            <Route path={"/"} element={<Layout/>}>
                <Route path={"/timeline"} element={<HomePage />} />
                <Route path={"/profile"} element={<ProfilePage />} />
                <Route path={"/idea"} element={<IdeaPage />} />
            </Route>
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </div>
  );
}

export default App;
