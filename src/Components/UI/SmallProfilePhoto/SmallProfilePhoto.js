import {Link} from "react-router-dom";

import './SmallProfilePhoto.css'


const SmallProfilePhoto = (props) => {
    let smallNotifications = "";
    let notificationsCount = props.notificationCount
    let imageUrl = props.imageUrl
    let profileName = props.profileName;


    if (notificationsCount > 0){
        smallNotifications = (
            <div className={"small-notifications"}>
                {notificationsCount}
            </div>);
    }

    return (
      <div className={"small-profile-photo"}>
          <img src={imageUrl} alt={"Profile photo"}/>
          {smallNotifications}
          <div className={"drop-profile-menu-wrapper"}>
              <div className={"drop-profile-menu-triangle"}>
              </div>
              <div className={"drop-profile-menu"}>
                  <div className={"profile-name"}>
                      {profileName}
                  </div>
                  <Link to={"/profile"} className={"drop-profile-row"}>
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