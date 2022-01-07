import React from 'react'
// import axios from 'axios';
import Header from '../components/Header';
// import Banner from '../components/Home/Banner';
import Main from '../components/Home/Main';
// import SearchPage from './SearchPage';
// import List from '../components/List';
// import SpotList from '../components/Home/SpotList'
// import SpotForm from '../components/SpotForm';
// import { useHistory } from 'react-router-dom';
import '../static/List.css'
import Sidebar from '../components/Home/Sidebar';



const Dashboard = () => {
    // this.state = { username: Cookies.get('userName') };
    // const [users, setUsers] = useState([]);
    // const [submitted, setSubmitted] = useState(false);
    // const [spots, setSpots] = useState([]);
    // const history = useHistory();

    // const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(null);

    // const changeSubmitted = () => {
    //     setSubmitted(!submitted)
    // }
    // const removeFromDom = (userId, id) => {
    //     setUsers(users.filter(user => user._id !== userId));
    //     setSpots(spots.filter(spot => id !== id));
    // }

    // useEffect(() => {
    //     axios.get('http://localhost:9000/api/users')
    //         .then(res => {
    //             setUsers(res.data);
    //             setSubmitted(true);
    //         })
    //         .catch(err => console.error(err));
    // }, []);

    // useEffect(() => {
    //     axios.get('http://localhost:9000/api/spots')
    //         .then(res => {
    //             setSpots(res.data);
    //             setSubmitted(true);
    //         })
    //         .catch(err => console.error(err));
    // }, []);

    return (
        <div>
            <Header />
            {/* <SearchPage /> */}
            {/* <div className="mt-4 text-center bg-gray-200 shadow-lg rounded-full">
                <h1 className=" text-3xl font-Quicksand text-green-500">Welcome,*username* </h1>
                <button className="btn btn-danger" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => history.push('/logout')}>
                    Logout
                </button>
            </div> */}
            {/* <Banner /> */}
            <div className='flex'>
                <Main />
                {/* {submitted && <List users={users} removeFromDom={removeFromDom} />} */}
                {/* <button className="btn btn-danger" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => history.push('/new_spot')}>
                Add Spot
            </button> */}
                {/* <SpotForm /> */}
                {/* {submitted && <SpotList spots={spots} removeFromDom={removeFromDom} />} */}
                <Sidebar />
            </div>
        </div>
    );
}

export default Dashboard;