import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'

const apiConstant = {
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}
class CourseItem extends Component {
  state = {
    courseItemObj: {},
    apiStatus: '',
  }

  componentDidMount() {
    this.getCourseItemDetail()
  }

  getCourseItemDetail = async () => {
    this.setState({
      apiStatus: apiConstant.inprogress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {courseDetails: data.course_details}
      const updatedDataObj = {
        id: updatedData.courseDetails.id,
        name: updatedData.courseDetails.name,
        imageUrl: updatedData.courseDetails.image_url,
        description: updatedData.courseDetails.description,
      }
      this.setState({
        courseItemObj: updatedDataObj,
        apiStatus: apiConstant.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  renderDetailPage = () => {
    const {courseItemObj} = this.state
    console.log(courseItemObj)
    return (
      <div>
        <Header />
        <div className="container14">
          <div className="container9">
            <img
              src={courseItemObj.imageUrl}
              alt={courseItemObj.name}
              className="image2"
            />
            <div>
              <h1>{courseItemObj.name}</h1>
              <p>{courseItemObj.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onTapRetry = () => this.getCourseItemDetail()

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

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.inprogress:
        return this.renderLoader()
      case apiConstant.success:
        return this.renderDetailPage()
      case apiConstant.failure:
        return this.renderFailurePage()
      default:
        return null
    }
  }
}

export default CourseItem
