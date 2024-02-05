// BrowserRoutes wraps everywhere we want to use the router
// Routes wraps each of our individla routes
// Route to create a single route
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// import pages & components
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />} // the element renders a page. Here we are rendering Home from its root path
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
