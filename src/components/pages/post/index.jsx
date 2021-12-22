import {set, useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db } from "../../..";
import "firebase/firestore";
import { collection } from '@firebase/firestore';
import "./styles.css";
import {useState, useEffect} from "react";
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';


import {getAuth, onAuthStateChanged} from 'firebase/auth';
import "firebase/compat/auth";

export const Post = () => {

    //const {register, handleSubmit} = useForm();
    // const [post, setPost] = useState({id: "", user: "", post: ""});
    const history = useNavigate();

    const [post, setPost] = useState('')
    
    
    

    useEffect(
      () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            history('/login');
          }
        })
      }, []
    );

    // const postPost = async (formVals) => {
    //     const formattedData = {
    //         field: {
    //             id: {
    //                 stringValue: formVals.id
    //             },
    //             user: {
    //                 stringValue: formVals.user
    //             },
    //             post: {
    //                 stringValue: formVals.post
    //             },
    //         }
    //     }
    //     try {
    //         const response = await fetch('https://firestore.googleapis.com/v1/projects/social-ab256/databases/(default)/documents/posts/',
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             method: "POST",
    //             body: JSON.stringify(formattedData)
    //         })
    //         history("/");
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // };

    const postPost = (event) => {
        const htmlId = uuid();
        event.preventDefault();

        // const elementsArray = [...event.target.elements];

        // const formData = elementsArray.reduce((accumulator, currentValue) => {
        //     if (currentValue.id) {
        //         accumulator[currentValue.id] = currentValue.value;
        //     }

            

        //     return accumulator;
        // }, {});
        // console.log(formData);
        db.collection("posts").add({id:htmlId, user:firebase.auth().currentUser.email, post:post}); 
        
        history("/");
    }

    

    return (
        <div className="post-info">
          <h1>Whats on your mind?</h1>

            <form onSubmit={postPost}>
                {/*<input type="text" id={htmlId} placeholder="tempID"></input>
                <input type="text" id="user" placeholder="tempUser"></input>*/}
                <input type="text" id="post" className="post-textbox" onChange={event => setPost(event.target.value)} placeholder="post"></input>            
                <button className="post-button">Post</button>
            </form>




            {/* <form className="form-layout" onSubmit={handleSubmit(postPost)}>
                <h2>Whats on your mid? </h2>
                <br></br>

                <label htmlform="id"> temp id field </label>
                <input 
                {...register("id")}
                name="id"
                required/>

                <label htmlform="user"> temp user field </label>
                <input 
                {...register("user")}
                name="user"
                required/>

                <label htmlform="post"> Type Here </label>
                <input 
                {...register("post")}
                name="post"
                required/>

                <input type="submit" value="Post" />
                <br></br>
            </form> */}
        </div>
    );
};