import {createBrowserRouter,RouterProvider, Route, Link} from 'react-router-dom'
import './App.css';
import User from './components/getUser/User'
import Add from './components/addUser/Add';
import Edit from './components/Update/Edit.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element:(
       <User/>
      )
    },
    {
      path :'/add',
      element : (<Add/>)
    },
    {
      path : "/edit/:id",
      element : (<Edit/>)
    }
  ])
  return (
    <div className="App">
   <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
