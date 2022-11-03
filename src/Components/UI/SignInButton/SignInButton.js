import './SignInButton.css'
import {Link} from "react-router-dom";

const SignInButton = () => {
  return (
      <Link to={"/sign-in"} className={"sign-in-button"}>
          Войти
      </Link>
  )
}

export { SignInButton }