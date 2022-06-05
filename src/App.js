import React, { useState } from 'react'
import './App.css'
import Gifs from './Gifs'

function App() {
  const [toggleGif, setToggleGif] = useState(false)
  const [fieldValue, setFieldValue] = useState('')
  const [gif, setGif] = useState()
  const [posts, setPosts] = useState([])

  const handleSubmit = () => {
    if (fieldValue) {
      setPosts([...posts, { fieldValue, gif, id: new Date().getTime() }])
      setFieldValue('')
      setGif()
    }
  }

  return (
    <div className='main-container'>
      <div className='form-container'>
        <textarea
          className='input'
          placeholder='Enter Message...'
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        ></textarea>
        {gif && <img className='selected-gif' src={gif} />}
        <div className='btn-container'>
          <button
            className='btn gif-btn'
            onClick={() => setToggleGif(!toggleGif)}
          >
            Add GIF
          </button>
          <button className='btn submit' onClick={handleSubmit}>
            Post
          </button>
        </div>
        {toggleGif && <Gifs setGif={setGif} setToggleGif={setToggleGif} />}
      </div>
      {posts.length > 0 && (
        <div className='post-container'>
          {posts.map((post) => {
            return (
              <div className='post' key={post.id}>
                <p>{post.fieldValue}</p>
                {post.gif && <img src={post.gif} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
