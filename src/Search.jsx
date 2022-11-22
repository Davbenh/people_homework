import React from 'react'


function Search({setInput, searchFilter}) {
  return (
    <div className='search'><label>חיפוש אנשים</label>
    <input type="text" min="0" id="search" name="q" onInput={(e) => setInput(e.target.value)}/>
    
    <button onClick={searchFilter}>חפש</button></div>
  )
}

export default Search