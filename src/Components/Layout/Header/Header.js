import {Link} from "react-router-dom";
import {HaveIdea} from "../../UI/HaveIdea/HaveIdea";

import './Header.css'
import {SmallProfilePhoto} from "../../UI/SmallProfilePhoto/SmallProfilePhoto";


const Header = () => {
  return (
      <div className={"header"}>
          <div className={"navigation-items"}>
              <div className={"navigation-item"}>
                  <Link to={"/"}> Главная страница </Link>
              </div>
              <div className={"navigation-item"}>
                  <Link to={"timeline"}> Лента </Link>
              </div>
          </div>
          <div className={"header-right"}>
              <HaveIdea />
              <SmallProfilePhoto imageUrl="https://i.pinimg.com/originals/b5/10/1c/b5101ca3aced1afa053d71572a5bd8ce.jpg" notificationCount={3}/>
          </div>
      </div>
  )
}

export { Header }