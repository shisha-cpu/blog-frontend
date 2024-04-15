import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import styles from './Login.module.scss';
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";


export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register , handleSubmit , setError  , formState : {errors ,isValid}} = useForm({
    defaultValues: {
      fullname : '',
      email : '',
      password : '',
      secretWord : ''
     },
     mode :'onChange'
  })
  const onSumbit = async (values)=>{
    const data = await dispatch(fetchRegister(values))
     if (!data.payload) {
       alert('Ошибка Авторизации')
     }
 
     if('token' in data.payload){
       window.localStorage.setItem('token', data.payload.token)
     }
   }
   if (isAuth) {
     return <Navigate to='/'/>
   }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSumbit)}>
      <TextField 
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName'  , {required : 'Укажите  имя '})}
        className={styles.field} 
        label="Полное имя"
       fullWidth />
      <TextField       
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email'  , {required : 'Укажите почту '})}
        className={styles.field} label="E-Mail" fullWidth />
      <TextField 
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password'  , {required : 'Укажите пароль '})}
         className={styles.field} label="Пароль" fullWidth />
         <TextField
       className={styles.field} 
       label="секретное слово" 
       error={Boolean(errors.secretWord?.message)}
       helperText={errors.secretWord?.message}
       {...register('secretWord'  , {required: 'Укажите секретное слово '})}
       fullWidth 
       />
      <Button type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
