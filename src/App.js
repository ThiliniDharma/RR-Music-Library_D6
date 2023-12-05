import './App.css';
import { useEffect, useState, Fragment } from 'react'
import Gallery from './components/Gallery'
import About from './components/About';
import SearchBar from './components/SearchBar'
import { BrowserRouter as Router ,Routes ,Route, Link } from 'react-router-dom';
import { StyleContext } from './contexts/StyleContext';
import { useState, Suspense, useRef } from 'react';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  const aboutPageStyle = {
    "color":"white",
    "background-color":"blue"
  }

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
         <Route exact path={'/'} element={
          <Fragment>
            <SearchBar handleSearch={handleSearch} />
            <Link to={'/about'}> About Page </Link>
            <hr />
            {message}
            <Gallery data={data} />
          </Fragment>
         }>
         </Route>
         <Route path={'/about'} element={
          <Fragment>
            <StyleContext.Provider value={aboutPageStyle}>
              <About />
            {/* <p>This is our about page!</p>
            <hr/>
            <Link to={'/'}> Home Page </Link> */}
            </StyleContext.Provider>
          </Fragment>
         }>
        </Route>
       </Routes>
      </Router>
    </div>
  );
}

export default App;