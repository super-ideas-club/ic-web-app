import './Footer.css'

const Footer = (props) => {
  return (
      <div className={"footer"}>
          <div className={"contacts-footer-column"}>
              <div className={"footer-header"}>Контакты</div>
              <div className={"contact"}>
                  <img src={require('./images/email-outline.png')} width={25} height={25}/>
                  <a href={"mailto:" + props.email} className={"contact-text"}>
                      {props.email}
                  </a>
              </div>
              <div className={"contact"}>
                  <img src={require('./images/phone-outline.png')} width={20} height={25} alt={""}/>
                  <div className={"contact-text"}>
                      {props.phone}
                  </div>
              </div>
              <div className={"messengers-contacts"}>
                  <div className={"contact"}>
                      <img src={require('./images/telegram-icon.png')} width={20} height={20} alt={""}/>
                      <div className={"contact-text"}>
                          {props.telegram}
                      </div>
                  </div>

                  <div className={"contact"}>
                      <img src={require('./images/vk-icon.png')} width={20} height={20} alt={""}/>
                      <div className={"contact-text"}>
                          {props.vk}
                      </div>
                  </div>
              </div>
          </div>
          <div className={"rules-footer-column"}>
              <div className={"footer-header"}>Правила</div>
              <div className={"footer-rules"}>
                  1)  Все идеи, опубликованные на этом сайте, являются интеллектуальной собственностью пользователей, разместивших их. <br />
                  2)  Контент сайта не доступен пользователям сайта, не прошедших регистрацию и авторизацию. <br />
                  3)  Для регистрации на сайте необходимо предоставление персональных данных. Компания имеет право на последующую обработку персональных данных пользователей.<br />
                  4)  Пользователям сайта при использовании сайта запрещается публиковать и распространять на сайте любую информацию, которая содержит угрозы, дискредитирует, оскорбляет других пользователей сайта или третьих лиц.
              </div>
          </div>
          <div className={"images-footer-column"}>
              <img src={require('./images/footer-img-1.png')} width={250} height={50} alt={""}/>
              <img src={require('./images/footer-img-2.png')} width={175} height={60} alt={""}/>
          </div>
      </div>
  )
}

export { Footer }