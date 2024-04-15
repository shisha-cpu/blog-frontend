import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch } from 'react-redux';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
import styles from "./Login.module.scss";
import { fetchUser, selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "@mui/material";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: 'forget@yandex.ru',
            password: '12345',
            secretWord: 'forget'
        },
        mode: 'onChange'
    })
    const [forget, setForget] = useState(false)
    const onForget = () => {
        setForget(!forget)
    }
    const onSubmit = async (values) => {
        if (forget) {
            delete values.password; 
        } else {
            delete values.secretWord;
        }
        const data = await dispatch(fetchUser(values))
        console.log(data.payload);
        if (!data.payload) {
            alert('Ошибка Авторизации')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }
    if (isAuth) {
        return <Navigate to='/' />
    }


    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Укажите почту ' })}
                    fullWidth
                />
                {forget ?
                    <TextField
                        className={styles.field}
                        label="секретное слово"
                        error={Boolean(errors.secretWord?.message)}
                        helperText={errors.secretWord?.message}
                        {...register('secretWord', { required: 'Укажите секретное слово ' })}
                        fullWidth
                    />
                    :

                    <TextField
                        className={styles.field}
                        label="Пароль"
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'Укажите пароль ' })}
                        fullWidth
                    />
                }


                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>

            </form>
            {forget ? '' :
                <Typography classes={{ root: styles.title }}>
                    <Link classes={{ root: styles.link }} onClick={onForget} >Забыли пароль ?</Link>
                </Typography>
            }

        </Paper>
    );
};
