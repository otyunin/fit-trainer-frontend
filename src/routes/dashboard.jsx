// @material-ui/icons
import { Person, Dashboard } from '@material-ui/icons'
// core components/views
import DashboardPage from 'views/Dashboard/Dashboard'
import SignIn from 'views/SignIn/SignIn'

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/signin',
    sidebarName: 'Sign In',
    navbarName: 'Sign In',
    icon: Person,
    component: SignIn,
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' },
]

export default dashboardRoutes
