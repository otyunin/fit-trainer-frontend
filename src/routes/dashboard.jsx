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

const dashboardRoutes = user => [
  (!user && {
    path: '/signin',
    sidebarName: 'Sign in',
    navbarName: 'Sign in',
    icon: Person,
    component: SignInPage,
  }) || null,
  (!user && {
    path: '/signup',
    sidebarName: 'Sign up',
    navbarName: 'Sign up',
    icon: Person,
    component: SignUpPage,
  }) || null,
  {
    path: '/verify-email/:email/:verificationCode',
    sidebarName: 'Email verification',
    navbarName: 'Email verification',
    icon: Person,
    component: VerifyEmailPage,
  },
  (user && {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  }) || null,
  (user && {
    path: '/create-exercise',
    sidebarName: 'New Excercise',
    navbarName: 'New Excercise',
    icon: Receipt,
    component: CreateExercisePage,
  }) || null,
  (user && {
    path: '/edit-exercises',
    sidebarName: 'Edit Excercises',
    navbarName: 'Edit Excercises',
    icon: Receipt,
    component: EditExercisesPage,
  }) || null,
  (user && {
    path: '/create-workout',
    sidebarName: 'New Workout',
    navbarName: 'New Workout',
    icon: Receipt,
    component: CreateWorkoutPage,
  }) || null,
  (user && {
    path: '/edit-workout',
    sidebarName: 'Edit Workout',
    navbarName: 'Edit Workout',
    icon: Receipt,
    component: EditWorkoutPage,
  }) || null,
  { redirect: true, path: '/', to: user ? '/dashboard' : '/signin', navbarName: 'Redirect' },
].filter(route => !!route)

export default dashboardRoutes
