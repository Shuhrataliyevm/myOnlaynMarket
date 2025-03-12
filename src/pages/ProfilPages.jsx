import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import API from '@/utils/API';

function ProfilPages() {
    const [user, setUser] = useState({})
    const navigate=useNavigate();
    useEffect(() => {
        API.get('/auth/me').then((res) => {
            setUser(res?.data);
        })
    }, []);
    console.log('user', user);

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/login" replace={true} />;
    }

    const handleLougout = () =>{
        navigate('/login')
        localStorage.removeItem('accessToken');
    }

    return <div className="profile-card">
        <div className="profile-header">
            <img src="https://dummyjson.com/icon/emilys/128" alt="Emily Johnson" className='profil-image' />
            <h2>Emily Johnson</h2>
            <p>
                <strong>Username:</strong>{user?.username}
            </p>
            <p>
                <strong>Email:</strong> {user?.email}
            </p>
            <p>
                <strong>Phone:</strong> {user?.phone}
            </p>
            <p>
                <strong>Age:</strong> {user?.age}
            </p>
            <p>
                <strong>Gender:</strong> {user?.gender}

            </p>
            <p>
                <strong>Birth Date:</strong> May 30, 1996
            </p>
            <p>
                <strong>Blood Group</strong> {user?.bloodGroup}
            </p>
            <p>
                <strong>Height:</strong> {user?.height}
            </p>
            <p>
                <strong>Weight:</strong> {user?.weight}
            </p>
            <p>
                <strong>Eye Color:</strong>Green
            </p>
            <p>
                <strong>Hair:</strong> {user?.hair?.color}
            </p>
            <p>
                <strong>Address:</strong> {user?.address?.address}
            </p>
            <p>
                <strong>Company:</strong> {user?.company?.name}
            </p>
            <p>
                <strong>University:</strong> {user?.university}
            </p>
            <button className='loginBtn' onClick={handleLougout}>Login</button>
        </div>
    </div>
}

export default ProfilPages;
