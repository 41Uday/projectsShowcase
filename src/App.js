import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

// Replace your code here
class App extends Component {
  state = {
    dropId: categoriesList[0].id,
    projectsList: [],
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    const {dropId} = this.state
    this.setState({apiStatus: apiConstantStatus.progress})
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${dropId}`,
    )
    if (response.ok) {
      const data = await response.json()
      const {projects} = data

      const fetchedArray = projects.map(e => ({
        id: e.id,
        name: e.name,
        imageUrl: e.image_url,
      }))
      console.log(fetchedArray)
      this.setState({projectsList: fetchedArray})
      this.setState({apiStatus: apiConstantStatus.success})
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  successStyle = () => {
    const {projectsList} = this.state

    return (
      <ul className="list-cont">
        {projectsList.map(e => (
          <li key={e.id} className="li-item">
            <img src={e.imageUrl} alt={e.name} className="l-img" />
            <p className="l-para">{e.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  failureButton = () => {
    this.getProjectsList()
  }

  failureStyle = () => (
    <div className="f-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="f-img"
      />
      <h1 className="f-head">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="butt" onClick={this.failureButton}>
        Retry
      </button>
    </div>
  )

  renderStyle = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#328af2" height="50" width="50" />
    </div>
  )

  changeText = event => {
    this.setState({dropId: event.target.value}, this.getProjectsList)
  }

  allMethods = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.successStyle()
      case apiConstantStatus.failure:
        return this.failureStyle()
      case apiConstantStatus.progress:
        return this.renderStyle()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div className="card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="h-img"
          />
        </div>
        <div className="card-2">
          <select className="drop" onChange={this.changeText}>
            <option value={categoriesList[0].id}>
              {categoriesList[0].displayText}
            </option>
            <option value={categoriesList[1].id}>
              {categoriesList[1].displayText}
            </option>
            <option value={categoriesList[2].id}>
              {categoriesList[2].displayText}
            </option>
            <option value={categoriesList[3].id}>
              {categoriesList[3].displayText}
            </option>
            <option value={categoriesList[4].id}>
              {categoriesList[4].displayText}
            </option>
          </select>
        </div>
        {this.allMethods()}
      </div>
    )
  }
}

export default App
