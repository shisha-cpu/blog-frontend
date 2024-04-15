import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import axios from '../axios';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch , useSelector} from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { selectIsAuth } from '../redux/slices/auth';
import { Link } from 'react-router-dom';

import './Home.scss'; 
export const Home = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const userData = useSelector(state =>state.auth.data);
  const { posts , tags } = useSelector(state =>state.posts);
  const [showPopular, setShowPopular] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const postLoaded = posts.status === 'loading';
  const tagsLoaded = tags.status === 'loading';

  const filterPopularPosts = () => {
    const popularPosts = posts.items.slice();
    const sortedPosts = popularPosts.sort((a, b) => b.viewsCount - a.viewsCount);
    return sortedPosts.filter(post => post.viewsCount > 14);
  };
  
  const handlePopularTabClick = () => {
    setShowPopular(true);
  };
  const handleNewTabClick = () => {
    setShowPopular(false);
  };

  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  let filteredPosts = selectedTag ? posts.items.filter(post => post.tags.includes(selectedTag)) : posts.items;
  
  filteredPosts = filteredPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
<Tabs style={{ marginBottom: 15 , color: 'white' }} value={showPopular ? 1 : 0} >
  <Tab style={{color: 'white' , fontSize: '20px' }} label="Новые" onClick={handleNewTabClick} disableRipple={true} />
  <Tab style={{color: 'white'  , fontSize: '20px'}} label="Популярные" onClick={handlePopularTabClick} disableRipple={true} />   
</Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          <Slide direction="left" in={!showPopular} mountOnEnter unmountOnExit>
            <div>
              {postLoaded
                ? [...Array(5)].map((_, index) => <Post key={index} isLoading={true} />)
                : filteredPosts.map((post) => (
                    <Post
                      key={post._id}
                      id={post._id}
                      title={post.title}
                      imageUrl={`http://localhost:4444${post.imageUrl}`}
                      user={{
                        avatarUrl: post.user ? post.user.avatarUrl : '', 
                        fullName: post.user ? post.user.fullName : '', 
                      }}
                      createdAt={post.updatedAt}
                      viewsCount={post.viewsCount}
        
                      tags={post.tags}
                      isEditable={userData ? userData._id === post.user?._id : false} 
                      
                    />
                  ))
              }
            </div>
          </Slide>
          <Slide direction="right" in={showPopular} mountOnEnter unmountOnExit>
            <div>
              {postLoaded
                ? [...Array(5)].map((_, index) => <Post key={index} isLoading={true} />)
                : filterPopularPosts().map((post) => (
                    <Post
                      key={post._id}
                      id={post._id}
                      title={post.title}
                      imageUrl={`http://localhost:4444${post.imageUrl}`}
                      user={{
                        avatarUrl: post.user ? post.user.avatarUrl : '', 
                        fullName: post.user ? post.user.fullName : '', 
                      }}
                      createdAt={post.updatedAt}
                      viewsCount={post.viewsCount}
                      tags={post.tags}
                      isEditable={userData ? userData._id === post.user?._id : false} 
                    />
                  ))
              }
            </div>
          </Slide>
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tagsLoaded} onTagClick={handleTagClick} />
          <input 
        type="text" 
        placeholder="Поиск постов..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-input" 
      />
        </Grid>
      </Grid>

    </>
  );
};
