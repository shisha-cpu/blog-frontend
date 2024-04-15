import Container from "@mui/material/Container";
import {Routes , Route} from 'react-router-dom'
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login  } from "./pages";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { fetchAuth, selectIsAuth } from "./redux/slices/auth";
import { useSelector } from "react-redux";
import About from "./pages/About";
import Contacts from "./pages/Contacts";

function App() {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAuth())
  } , [])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
      <Routes >
        <Route path="/" element={ <Home />} />
        <Route path="/about" element={ <About />} />
        <Route path="/contacts" element={ <Contacts />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/edit" element={<AddPost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      </Container>
    </>
  );
}

export default App;
