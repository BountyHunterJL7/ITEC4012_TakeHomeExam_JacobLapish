import './styles.css';
import {Link} from 'react-router-dom';

export const PostCard = (props) => {

    const {id, post, user} = props;

    return (
        //<Link to={`/car/${id}`}>
            <div className="post-card">
                <Link className='user-link' to={`/me/${user}`}>
                    <h5 className = "user"> {user} </h5>
                </Link>
                <h3 className = "card-post"> {post} </h3>
            </div>
        //</Link>
    )
}