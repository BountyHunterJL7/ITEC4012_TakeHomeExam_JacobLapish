import './styles.css';
import {Link} from "react-router-dom";

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useEffect, useState} from 'react';

import {Logout} from "../logout";

export const Header = () => {

    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            })
        }, []
    )

    return (
        <div className="header">
                    <Link className="button-wrapper title" to={`/`}>
                        <h3>The Post</h3>
                    </Link>
                    <Link className="button-wrapper" to={`/`}>
                        <div className="home"><FontAwesomeIcon icon={faHome} />
                        <div className="buttonText">Home</div></div>
                    </Link>

                    <Link className="button-wrapper" to={`/post`}>
                        <div className="post"><FontAwesomeIcon icon={faPen} />
                        <div className="buttonText">Post</div></div>
                    </Link>

                    <Link className="button-wrapper" to={`/login`}>
                        {!user && <div className="sign-in"><FontAwesomeIcon icon={faSignInAlt} />
                        <div className="buttonText">Sign In</div></div>}
                    </Link>

                    <Logout/>

        </div>
      );
}