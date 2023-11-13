import './App.css';
import AddArticle from './Components/AddCours';
import Article from './Components/Article';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './Register';
import SignIn from './SignIn';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import AddProfesseur from './Components/Professeur/AddProfesseur';
import { ToastContainer } from 'react-toastify';
import ArchiverCours from './Components/ArchiverCours';
import ListeProfesseur from './Components/ListeProfesseurs';
import EditProfesseur from './Components/Professeur/EditProfesseur';
import UserRegistrer from './Connexion/UserRegistrer';
import UserSign from './Connexion/UserSign';
import { AdmiRegister } from './Connexion/AdmiRegister';
import HomeUser from './Components/HomeUser';
import View from './Components/User/View';
import AdmiSignin from './Connexion/AdmiSignin';
import Articles from './Components/Articles';
import EditCours from './Components/EditCours';
function App() {
  return (
    <BrowserRouter>
    
    <div className="container-fluid ">
         <ToastContainer  />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/homeUser' element={<HomeUser/>} />
      <Route path='/addArticle' element={<AddArticle/>} />
      <Route path='/article/:id' element={<Article/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/addProf' element={<AddProfesseur/>} />
      <Route path='/archiveCours' element={<ArchiverCours/>} />
      <Route path='/listeProf' element={<ListeProfesseur/>} />
      <Route path='/edit/:id' element={<EditProfesseur/>} />
      <Route path='/userRegister' element={<UserRegistrer/>} />
      <Route path='/signUser' element={<UserSign/>} />
      <Route path='/admiRegister' element={<AdmiRegister/>} />
      <Route path='/admiSign' element={<AdmiSignin/>} />
      <Route path='/view/:id' element={<View/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path='/editCours/:id' element={<EditCours/>} />










    </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
