import React from 'react';
import { Typography } from '@mui/material';
import {Paper} from '@mui/material';

const Contacts = () => {

  return (
    <Paper style={{padding:15}} >
      <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold' , textAlign:'center'}} >
      Контакты
      </Typography>
      <Typography variant="body1" >
     
Связаться с Нами
<br /><br />
Мы ценим ваше внимание к нашему блогу и всегда рады взаимодействовать с нашими читателями. Если у вас есть какие-либо вопросы, предложения или комментарии, пожалуйста, не стесняйтесь обращаться к нам.<br />
<br /><br />
Адрес:<br />
Улица Пушкина, дом 10, офис 202<br />
Город, Страна, Почтовый индекс<br />
<br /><br />
Телефон:<br />
+1 (123) 456-7890<br />
<br /><br />
Электронная почта: <br />
info@example.com<br />
<br /><br />
Мы стараемся отвечать на все сообщения в течение 24 часов в рабочие дни.
      </Typography>
    </Paper>
  );
};

export default Contacts;
