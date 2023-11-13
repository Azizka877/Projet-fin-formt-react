import {   doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {  db } from '../firebaseConfig';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Article = () => {
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
                <div className="col-8">
                <h2 className='mb-'>{article.title}</h2>
                <h3>Author:{article.createdBy}</h3>
                 {/* <div>Posted On : {article.createdAt.toDate().toDateString()}</div> */}
                 <hr />
                <h4>{article.description}</h4>
                </div>
                <div className="col-md-1 pe-2">
                      <div className='deleteButton'> < DeleteButton id={id} imageUrl={imageUrl}/> </div>

                 </div>
            </div>
        )
     }

        <Link to='/'>
               <button className='btn btn-success mt-5'>Retour</button>
        </Link>
    </div>
  )
}

export default Article