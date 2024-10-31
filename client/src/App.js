import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from "./landing/LandingPage";
import SignUp from './landing/SignUp';
import AdminDashboard from './admin/AdminPage';
import Report from './admin/Report';
import StudentPage from './student/StudentPage';
import Instructions from './student/Instructions';
import AdminLogin from './admin/AdminLogin'
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedAdminRoute from './ProtectedRoutes/ProtectedRouteAdmin';  // Import Admin Protected Route
import ProtectedUserRoute from './ProtectedRoutes/ProtectedRoute';    // Import User Protected Route
import AdminTable from './admin/AdminTable';
import DisQuallified from './student/DisQuallified';
import Session from './admin/Session';
import Question from './admin/Question';
import ShortAnswerQuestion from './admin/ShortAnswerQuestions';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
        
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/adminlogin' element={<AdminLogin />} />

            {/* Protecting routes for users */}
            <Route path='/studentdashboard/:loggedInUserId' element={<ProtectedUserRoute element={<StudentPage />} />} />
            <Route path='/instructions' element={<ProtectedUserRoute element={<Instructions />} />} />
            <Route path='/disqualified' element={<ProtectedUserRoute element={<DisQuallified />} />} />

           

            {/* Protecting routes for admins */}
            <Route path='/admindashboard' element={<ProtectedAdminRoute element={<AdminDashboard />} />} />
            <Route path='/report' element={<ProtectedAdminRoute element={<Report />} />} />
            {/* <Route path='/mcquestions/:sectionId' element={<ProtectedAdminRoute element={<Question />} />} /> */}
            {/* <Route path='/shortanswerquestions/:sectionId' element={<ProtectedAdminRoute element={<ShortAnswerQuestion />} />} /> */}


            <Route path='/questions' element={<ProtectedAdminRoute element={<AdminTable />} />} />
            {/* <Route path='/session' element={<ProtectedAdminRoute element={<Session />} />} /> */}

          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
