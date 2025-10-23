import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './Components/Start'
import Login from './Components/Login'                   // Admin login
import CollectorLogin from './Components/CollectorLogin'  // Collector login
import CollectorDetail from './Components/CollectorDetail'
import PrivateRoute from './Components/PrivateRoute'

import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Collector from './Components/Collector'            // Former Employee
import AddCollector from './Components/AddCollector'
import EditCollector from './Components/EditCollector'

import Category from './Components/Category'

import Collection from './Components/Collection'
import AddCollection from './Components/AddCollection'
import EditCollection from './Components/EditCollection'

import Profile from './Components/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Start />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/collector_login' element={<CollectorLogin />} />
        <Route path='/collector_detail/:id' element={<CollectorDetail />} />

        {/* Protected Dashboard Routes */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Default Dashboard Home */}
          <Route path='' element={<Home />} />

          {/* Collector Management */}
          <Route path='/dashboard/collector' element={<Collector />} />
          <Route path='/dashboard/add_collector' element={<AddCollector />} />
          <Route path='/dashboard/edit_collector/:id' element={<EditCollector />} />

          {/* Category Management */}
          <Route path='/dashboard/category' element={<Category />} />

          {/* Collection Management */}
          <Route path='/dashboard/collection' element={<Collection />} />
          <Route path='/dashboard/add_collection' element={<AddCollection />} />
          <Route path='/dashboard/edit_collection/:id' element={<EditCollection />} />

          {/* Profile */}
          <Route path='/dashboard/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
