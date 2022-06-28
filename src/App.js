import React, { useState, useMemo } from "react";
import Counter from "./components/Counter";
import './components/App.css'
import UseState from "./components/UseState";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import Postfilter from "./components/Postfilter";
import Mymodal from "./components/UI/mymodal/Mymodal";


function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'Description' },
    { id: 2, title: 'Phyton', body: 'Description' },
    { id: 3, title: 'C++', body: 'Description' },
  ])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)


  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort].toLowerCase()))
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearch = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])


  function addNewPost(e) {
    e.preventDefault();
    if (title && body) {
      const newPost = {
        title,
        body,
        id: Date.now()
      }
      setPosts([...posts, newPost])
      setTitle('')
      setBody('')
      setModal(false)
    }
  }

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>Create user</MyButton>
      <Mymodal visible={modal} setVisible={setModal} >
        <form>
          <MyInput value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Название поста' />
          <MyInput value={body} onChange={e => setBody(e.target.value)} type='text' placeholder="Описание поста" />
          <MyButton onClick={addNewPost} >Создать пост</MyButton>
        </form>
      </Mymodal>

      <hr style={{ margin: '15px 0' }} />
      <Postfilter filter={filter} setFilter={setFilter} />
      {sortedAndSearch.length ? <PostList remove={removePost} posts={sortedAndSearch} title='Список постов 1' /> : <h2 style={{ textAlign: 'center' }}>Посты не найдены!</h2>}
    </div>
  );
}

export default App;
