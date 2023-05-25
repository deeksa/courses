import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <div className="container1">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="image2"
      />
    </Link>
  </div>
)

export default Header
