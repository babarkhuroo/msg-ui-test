import React, { useEffect, useState } from 'react'
import './Gifs.css'

const TRENDING_API =
  'https://api.giphy.com/v1/gifs/trending?api_key=zku9oFhpuLEWmTv1iI9yT3196EhO1OiW&limit=10&offset=0'

const SEARCH_API =
  'https://api.giphy.com/v1/gifs/search?api_key=zku9oFhpuLEWmTv1iI9yT3196EhO1OiW&limit=10&offset=0&q='

function Gifs({ setGif, setToggleGif }) {
  const [search, setSearch] = useState('')
  const [gifs, setGifs] = useState([])
  const [loadingState, setLoadingState] = useState(false)

  const handleClick = (e) => {
    setGif(e.target.src)
    setToggleGif(false)
  }

  useEffect(() => {
    setLoadingState(true)
    fetch(search ? SEARCH_API + search : TRENDING_API)
      .then((res) => {
        setLoadingState(false)
        return res.json()
      })
      .then((result) => {
        setGifs(
          result.data.map((gif) => {
            return { gif_url: gif.images.fixed_height.url, gif_id: gif.id }
          })
        )
      })
      .catch(() => {
        alert('Something went wrong')
        setLoadingState(false)
      })
  }, [search])

  return (
    <div className='gif-container'>
      <div className='header'>
        <input
          type='text'
          placeholder='Search GIF'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='result'>
        {loadingState ? (
          <div className='loading'>
            <div className='loader'></div>
          </div>
        ) : (
          <div className='list'>
            {gifs.map(({ gif_url, gif_id }) => {
              return (
                <div key={gif_id} className='item'>
                  <img src={gif_url} onClick={handleClick} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Gifs
