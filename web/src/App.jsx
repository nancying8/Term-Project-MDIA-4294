// Import React to use JSX
// Defines a single route (path and component)
// Wraps multiple Route
import { Route, Routes } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import AllDogs from './pages/AllDogs';
import DogDetails from './pages/DogDetails';
import AddDogForm from './pages/AddDogForm';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

// Import components
import EditDogForm from './components/EditDogForm';
import Header from './components/Header';
import Footer from './components/Footer';

// Import style
import a from './App.module.css';


function App() {
  return (

    <main className={a.app}>
      <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Alldogs" element={<AllDogs />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dogs/:id" element={<DogDetails />} />
            <Route path="/add-dog" element={<AddDogForm />} />
            <Route path="/edit-dog/:id" element={<EditDogForm />} />
        </Routes>
      <Footer />
    </main>

  );
}

export default App;


