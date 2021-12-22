import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import './styles.css';
import { PostCard } from '../../post-card';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from "react-router-dom";


export const Me = (props) => {

    const {id} = useParams();

    const [posts, setPosts] = useState([]);

    const history = useNavigate();
    

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

    useEffect(
        () => {
            getPosts();
        }, []
      );

    const getPosts = async() => {
        try {
          const response = await fetch('https://firestore.googleapis.com/v1/projects/social-ab256/databases/(default)/documents/posts/')
          const data = await response.json();
          console.log(data);
          const formattedData = data.documents.map((item) => {
            return item.fields
          });

          console.log(formattedData);

          setPosts(formattedData);
        
        } catch(err) {
          console.log(err)
        }
      }

        return (
          
            <div className="individual-wrapper">
              <h2>Posts By:</h2>
              <h1>{id}</h1>
                {
                    posts.map((individualPosts) => {console.log(id +"   " + individualPosts.user.stringValue);
                        if (individualPosts.user.stringValue === id){
                            console.log("SUCCESS");
                            return (
                                <PostCard key={individualPosts.id} 
                                    user={individualPosts.user.stringValue} 
                                    post={individualPosts.post.stringValue} >
                                </PostCard>)
                    }}
                        
                    )
                }
            </div>
            
        );

}
