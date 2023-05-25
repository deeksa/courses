import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseDisplay from '../CourseDisplay'
import './index.css'

const apiConstants = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    apiStatus: '',
    courseList: [],
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getUpdated = each => ({
    id: each.id,
    name: each.name,
    logoUrl: each.logo_url,
  })

  onTapRetry = () => this.getCoursesList()

  renderFailurePage = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onTapRetry}>
        Retry
      </button>
    </div>
  )

  getCoursesList = async () => {
    this.setState({
      apiStatus: apiConstants.inprogress,
    })
    const url = `https://apis.ccbp.in/te/courses`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const listObj = {courses: data.courses, total: data.total}
      const couList = listObj.courses.map(e => this.getUpdated(e))
      this.setState({
        courseList: couList,
        apiStatus: apiConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderCourseLoader = () => {
    const {courseList} = this.state
    return (
      <div>
        <Header />
        <h1>Courses</h1>
        <ul className="list1">
          {courseList.map(e => (
            <CourseDisplay each={e} key={e.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inprogress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderCourseLoader()
      case apiConstants.failure:
        return this.renderFailurePage()
      default:
        return null
    }
  }
}
export default Home
