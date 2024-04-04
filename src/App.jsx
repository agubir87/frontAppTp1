import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComp from './components/common/NavbarComp';
import Empresa from './components/Empresa/Empresa';
import Noticia from './components/Noticia/Noticia';
import DetallesEmpresa from './components/Empresa/DetallesEmpresa';
import AddEmpresa from './components/Empresa/AddEmpresa';
import EditEmpresa from './components/Empresa/EditEmpresa';
import AddNoticia from './components/Noticia/AddNoticia';
import DetallesNoticia from './components/Noticia/DetallesNoticia';
import EditNoticia from './components/Noticia/EditNoticia';


function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Empresa />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/noticia" element={<Noticia />} />
        <Route path="/detallesempresa/:id" element={<DetallesEmpresa />} />
        <Route path="/agregarempresa" element={<AddEmpresa />} />
        <Route path="/editempresa/:id" element={<EditEmpresa />} />
        
        <Route path="/agregar-noticia" element={<AddNoticia />} />
        <Route path="/detalles-noticia/:id" element={<DetallesNoticia />} />
        <Route path="/editar-noticia/:id" element={<EditNoticia />} />

      </Routes>
    </Router>
  );
}

export default App;

