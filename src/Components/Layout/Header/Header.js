import {Link} from "react-router-dom";
import {HaveIdea} from "../../UI/HaveIdea/HaveIdea";

import './Header.css'
import {SmallProfilePhoto} from "../../UI/SmallProfilePhoto/SmallProfilePhoto";
import {SignInButton} from "../../UI/SignInButton/SignInButton";


const Header = () => {
    let rightContent = <></>;
    let timeLine = "";
    let isLoggedIn = false;
    if (isLoggedIn){
        rightContent = (
            <div className={"header-right"}>
                <HaveIdea />
                <SmallProfilePhoto imageUrl="https://i.pinimg.com/originals/b5/10/1c/b5101ca3aced1afa053d71572a5bd8ce.jpg" notificationCount={3}/>
            </div>)
        timeLine = <div className={"navigation-item"}>
                        <Link to={"timeline"}> Лента </Link>
                    </div>
    }else{
        rightContent = (
            <div className={"header-right"}>
                <SignInButton />
            </div>)
    }

  return (
      <div className={"header"}>
          <div className={"navigation-items"}>
              <div className={"navigation-item"}>
                  <Link to={"/"}> Главная страница </Link>
              </div>
              {timeLine}
          </div>
          {rightContent}
      </div>
  )
}

export { Header }