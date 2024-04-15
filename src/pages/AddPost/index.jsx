import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useState } from 'react';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';
import { useNavigate , useParams } from 'react-router-dom';
export const AddPost = () => {
  const [ imageUrl , setImageUrl ] = useState()
  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = useState(false);
  const [title , setTitle ] = useState()
  const [tags , setTags] = useState()
 
  const inputRef = useRef(null)
  const navigate = useNavigate()
const {id } = useParams()
const idEdit  = Boolean(id)
  const handleChangeFile = async(event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image' , file)
      const{data} = await axios.post('/upload' , formData)
      console.log(data);
      setImageUrl(data.url)
    } catch (error) {
      console.warn('Ошибка при загрузки файла ');
      console.log(error);
    }
  };

  const onClickRemoveImage = ()=>{
      setImageUrl('')
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  useEffect(()=>{
    if (id) {
      axios.get(`posts/${id}`).then(({data})=>{
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join(','))
      })
    }
  })

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

    const onSubmit = async()=>{
      try {
        setLoading(true)
       const  fields ={
          title,
          imageUrl,
          tags,
          text
     
        }
        const {data} = await axios.post('/posts' , fields )

        const id = data._id
        navigate(`/posts/${id}`)
      } catch (error) {
        console.warn(error);
        alert('Ошибка при создании статьи ')
      }
    }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={()=> inputRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile}  hidden />
      {imageUrl && (
        <>
         <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
         <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
     
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e=>setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
      classes={{ root: styles.tags }} 
      variant="standard"
       placeholder="Тэги"
       value={tags}
       onChange={e=>setTags(e.target.value)}
       fullWidth />

      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div><br /></div>
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {idEdit ? 'Сохранить '  : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};


