import { Route, Routes } from "react-router-dom";

import { HomePage } from "./Pages/HomePage/HomePage";
import { NotFoundPage} from "./Pages/NotFoundPage/NotFoundPage";
import { Layout} from "./Components/Layout/Layout";
import {SignInPage} from "./Pages/SignInPage/SignInPage";
import {SignUpPage} from "./Pages/SignUpPage/SignUpPage";
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage";
import {IdeaPage} from "./Pages/IdeaPage/IdeaPage";
import {CreateIdeaPage} from "./Pages/CreateIdeaPage/CreateIdeaPage";
import axios from "axios";
import {Person} from "./Models/Person";
import {Context} from "./Utils/Context";
import {useState} from "react";
import {config, headers} from "./config";
import useCookies from "@js-smart/react-cookie-service";
import {ExitPage} from "./Pages/ExitPage/ExitPage";


const App = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'x-csrftoken'

    const { check } = useCookies()

    const [ currentPerson, serCurrentPerson] = useState(Person())
    const [ isLoggedIn, setLoggedIn ] = useState(check("csrftoken"))

    const getPerson = () => {
        axios.get(config.userInfo,
            {
                headers: headers,
                baseURL: config.serverUrl
            })
            .then( (result) => {
                serCurrentPerson({userInfo: result.data, isActive: true})
                console.log(result.data)
            })
            .catch( (error) => {
                console.log(error.data)
            })
    }

  return (
      <Context.Provider value={{
          currentPerson, getPerson, isLoggedIn, setLoggedIn
      }}>
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
                <Route path={"/exit"} element={<ExitPage />} />
                <Route path={"*"} element={<NotFoundPage />} />
            </Routes>
          </div>
      </Context.Provider>
  );
}

export default App;
