import {Link} from "react-router-dom";
import {HaveIdea} from "../../UI/HaveIdea/HaveIdea";

import './Header.css'
import {SmallProfilePhoto} from "../../UI/SmallProfilePhoto/SmallProfilePhoto";
import {SignInButton} from "../../UI/SignInButton/SignInButton";
import {useContext} from "react";
import {Context} from "../../../Utils/Context";



const Header = (props) => {
    const { currentPerson, isLoggedIn } = useContext(Context)

    let rightContent = <></>;
    let timeLine = "";

    let headerStyle = {}
    let navStyle = {}

    if (props.transparent) {
        headerStyle = {background: "none", boxShadow: "none"}
        navStyle = {color: "#13334C"}
    }


    if (isLoggedIn){
        rightContent = (
            <div className={"header-right"}>
                <HaveIdea />
                <SmallProfilePhoto imageUrl={currentPerson.userInfo.avatar_link} profileId={currentPerson.userInfo.user_id}
                                   profileName={currentPerson.userInfo.name + " " + currentPerson.userInfo.surname}/>
            </div>)
        timeLine = <div className={"navigation-item"}>
                        <Link to={"timeline"} style={navStyle}> Лента </Link>
                    </div>
    }else{
        rightContent = (
            <div className={"header-right"}>
                <SignInButton />
            </div>)
    }

  return (
      <div className={"header"} style={headerStyle}>
          <div className={"navigation-items"}>
              <div className={"navigation-item"}>
                  <Link to={"/"} style={navStyle}> Главная страница </Link>
              </div>
              {timeLine}
          </div>
          {rightContent}
      </div>
  )
}

export { Header }