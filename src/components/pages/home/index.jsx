import './styles.css';
import {useContext, useEffect, useState} from 'react';
import  { PostCard } from "../../post-card"


import { useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export const HomePage = () => {

    const [postList, setPostList] = useState([]);

    const [loading, setLoading] = useState(true);

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

          setPostList(formattedData);

          setLoading(false);
        
        } catch(err) {
          console.log(err)
        }
      }

    return (
        <div className="home-page">
          <h1>Heres what people are talking about</h1>
          <div className="post-container">
            { 
              postList.map((post) => (
                <PostCard key={post.id.stringValue} user={post.user.stringValue} post={post.post.stringValue}></PostCard>
              )) 
            }
    
            {
              loading && <p>Loading Data...</p>
            }
              
          </div>
        </div>
      );
}