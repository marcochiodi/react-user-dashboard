import React, { useEffect } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import Table from './components/table/UserList';
import UserModal from './components/shared/UserModal';
import { useUsers } from './store/users.store';
import { User } from './models/users.model';
import ThemeToggle from './components/shared/ThemeToggle';
import Header from './components/shared/Header';
import Spinner from './components/shared/Spinner';
import './services/axiosGlobal'

function App() {
  const theme = useUsers(s => s.darktheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme ? "dark" : "light");
  }, [theme]);


  const selectUser = useUsers((state) => state.selectUser);
  const user = useUsers((state) => state.userSelected);
  return (

    <div className="container">
      <Spinner />
      <Header></Header>
      <div className="row">
        <div className="col-12 p-3">
          <div className="App position-relative d-flex flex-column">
            <div className="btn-theme">
              <ThemeToggle></ThemeToggle>
            </div>
            <Table></Table>
            <UserModal user={user} onClose={() => selectUser(null)} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
