// @material-ui/icons

import { Dashboard, Person, Receipt } from '@material-ui/icons'

// core components/views
import DashboardPage from 'views/Dashboard/Dashboard'
import SignInPage from 'views/SignIn/SignIn'
import SignUpPage from 'views/SignUp/SignUp'
import VerifyEmailPage from 'views/VerifyEmail/VerifyEmail'
import CreateExercisePage from 'views/CreateExercise/CreateExercise'
import EditExercisesPage from 'views/EditExercises/EditExercises'
import CreateWorkoutPage from 'views/CreateWorkout/CreateWorkout'
import EditWorkoutPage from 'views/EditWorkout/EditWorkout'

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
    path: '/verify-email/:email/:verificationCode',
    sidebarName: 'Email verification',
    navbarName: 'Email verification',
    icon: Person,
    component: VerifyEmailPage,
  },
  {
    path: '/create-exercise',
    sidebarName: 'New Excercise',
    navbarName: 'New Excercise',
    icon: Receipt,
    component: CreateExercisePage,
  },
  {
    path: '/edit-exercises',
    sidebarName: 'Edit Excercises',
    navbarName: 'Edit Excercises',
    icon: Receipt,
    component: EditExercisesPage,
  },
  {
    path: '/create-workout',
    sidebarName: 'New Workout',
    navbarName: 'New Workout',
    icon: Receipt,
    component: CreateWorkoutPage,
  },
  {
    path: '/edit-workout',
    sidebarName: 'Edit Workout',
    navbarName: 'Edit Workout',
    icon: Receipt,
    component: EditWorkoutPage,
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' },
]

export default dashboardRoutes
