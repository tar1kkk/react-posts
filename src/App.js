import React, { useState, useMemo, useEffect } from "react";
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
import { usePosts } from "./hooks/usePosts";
import axios from 'axios';
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./hooks/useFetching";


function App() {

  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearch = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts)
  })


  useEffect(() => {
    fetchPosts()
  }, [])

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
      {postError && <h2>Произошла ошибка${postError}</h2>}
      {isPostLoading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div> : <PostList remove={removePost} posts={sortedAndSearch} title='Список постов 1' />}
    </div>
  );
}

export default App;
