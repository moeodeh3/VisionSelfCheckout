import './App.css';
import StartPage from './components/StartPage';
import MainPage from './components/MainPage'
import React from 'react'








function App() {


  const [startPage, setStartPage] = React.useState(true)


  const handleStart = () => {
    setStartPage(prevPage => !prevPage)
  }



  return (
    <div className="App">
      {startPage && <StartPage changePage={handleStart}/>}
      {!startPage && <MainPage/>}
    </div>
  );
}

export default App;
