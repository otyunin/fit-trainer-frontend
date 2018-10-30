// @material-ui/icons
import { Dashboard, Person } from '@material-ui/icons'
// core components/views
import DashboardPage from 'views/Dashboard/Dashboard'
import SignInPage from 'views/SignIn/SignIn'
import SignUpPage from 'views/SignUp/SignUp'
import VerifyEmailPage from 'views/VerifyEmail/VerifyEmail'

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
    sidebarName: 'Sign in',
    navbarName: 'Sign in',
    icon: Person,
    component: SignInPage,
  },
  {
    path: '/signup',
    sidebarName: 'Sign up',
    navbarName: 'Sign up',
    icon: Person,
    component: SignUpPage,
  },
  {
    path: '/verify-email',
    sidebarName: 'Email verification',
    navbarName: 'Email verification',
    icon: Person,
    component: VerifyEmailPage,
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' },
]

export default dashboardRoutes
