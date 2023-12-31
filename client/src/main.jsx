import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2 wrongPageStyling'>UNAVAILABLE!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
