import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig';

const View = () => {

    const [article, setArticle] = useState([]) ;
// const[user]= useAuthState(auth)
const {id} = useParams();
const {imageUrl} = useParams();
 useEffect(() => {
    const docRef = doc(db, 'Courses', id)
    onSnapshot(docRef, (snapshot)=>{
        setArticle({ ...snapshot.data(), id: snapshot.id });
        console.log(snapshot);
    })

 }, [id])


  return (
    <div className='container'>
    {
       article && (
           <div className="row">
               <div className="col-3">
                   <img src={article.imageUrl} style={{width: '100%'}} alt="" />
               </div>
               <div className="col-9">
               <h2 className='mb-'>{article.title}</h2>
               <h3>Author:{article.createdBy}</h3>
                {/* <div>Posted On : {article.createdAt.toDate().toDateString()}</div> */}
                <hr />
               <h4>{article.description}</h4>
               </div>
              
                <Link to='/homeUser'>
                    <button>Home</button>
                </Link>
           </div>
       )
    }
   </div>
  )
}

export default View