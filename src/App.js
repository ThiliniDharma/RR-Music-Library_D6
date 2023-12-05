import './App.css';
import { useEffect, useState, Fragment ,Suspense} from 'react'
import Gallery from './components/Gallery'
import About from './components/About';
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import { BrowserRouter as Router ,Routes ,Route, Link } from 'react-router-dom';
import { StyleContext } from './contexts/StyleContext';
import { createResource as fetchData } from './helper'

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')

  const aboutPageStyle = {
    "color":"white",
    "background-color":"blue"
  }
  useEffect(() => {
    if (searchTerm) {
        setData(fetchData(searchTerm))
    }
}, [searchTerm])

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      console.log(fetchData(searchTerm))
      setData(fetchData(searchTerm))
      
      // const fetchData = async () => {
      //   const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
      //   const resData = await response.json()
      //   if(resData.results.length > 0) {
      //     setData(resData.results)
      //   } else {
      //     setMessage('Not Found')
      //   }
      // }
      // fetchData()
  }
  else {
    setMessage('Not Found')
     }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if(data){
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
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
            {renderGallery()}
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
