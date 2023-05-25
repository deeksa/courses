import {Link} from 'react-router-dom'
import './index.css'

const CourseDisplay = props => {
  const {each} = props
  const {id} = each
  console.log(each.name)
  return (
    <li>
      <Link to={`/courses/${id}`}>
        <div className="container10">
          <img src={each.logoUrl} alt={each.name} className="image1" />
          <p>{each.name}</p>
        </div>
      </Link>
    </li>
  )
}
export default CourseDisplay
