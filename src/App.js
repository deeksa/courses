import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import CourseItem from './components/CourseItem'
import NotFound from './components/NotFound'
// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItem} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
