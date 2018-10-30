// @material-ui/icons

import { Dashboard, Person, Receipt } from '@material-ui/icons'

// core components/views
import DashboardPage from 'views/Dashboard/Dashboard'
import SignInPage from 'views/SignIn/SignIn'
import SignUpPage from 'views/SignUp/SignUp'
import VerifyEmailPage from 'views/VerifyEmail/VerifyEmail'
import CreateExercise from 'views/CreateExercise/CreateExercise'
import CreateWorkoutPage from 'views/CreateWorkout/CreateWorkout'

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
  {
    path: '/create-workout',
    sidebarName: 'CreateWorkout',
    navbarName: 'CreateWorkout',
    icon: Receipt,
    component: CreateWorkoutPage,
  },
  {
    path: '/create-exercise',
    sidebarName: 'New Excercise',
    navbarName: 'New Excercise',
    icon: Receipt,
    component: CreateExercise,
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' },
]

export default dashboardRoutes
