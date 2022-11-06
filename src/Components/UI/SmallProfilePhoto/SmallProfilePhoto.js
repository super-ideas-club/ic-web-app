import {Link} from "react-router-dom";

import './SmallProfilePhoto.css'


const SmallProfilePhoto = (props) => {
    let imageUrl = props.imageUrl
    let profileName = props.profileName;


    return (
      <div className={"small-profile-photo"}>
          <img src={imageUrl} alt={"Profile photo"}/>
          <div className={"drop-profile-menu-wrapper"}>
              <div className={"drop-profile-menu-triangle"}>
              </div>
              <div className={"drop-profile-menu"}>
                  <div className={"profile-name"}>
                      {profileName}
                  </div>
                  <Link to={"/profile/" + props.profileId} className={"drop-profile-row"}>
                      Профиль
                  </Link>
                  <Link to={"/notifications"} className={"drop-profile-row"}>
                      Уведомления
                  </Link>
                  <Link to={"/exit"} className={"drop-profile-row"}>
                      Выйти
                  </Link>
              </div>
          </div>
      </div>
  )
}

export { SmallProfilePhoto }