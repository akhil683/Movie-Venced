import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';

const Review = ({ id, prevRating, userRated }) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ reviewsLoading, setReviewsLoading] = useState(false);
    const [thought, setThought] = useState('');
    const [ data, setData] = useState([]);

    const sendReview = async () => {
        setLoading(true);
        try {
            await addDoc(reviewsRef, {
                movieid: id,
                name: "Akhil",
                rating: rating,
                thoughts: thought,
                timestamp: new Date().getTime(),
            })
            const doc = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: rating + prevRating,
                rated: userRated + 1,
            })
            setRating(0);
            swal({
                title: 'Review Sent',
                icon: 'success',
                buttons: false,
                timer: 3000
              })
          } catch (error) {
          swal({
            title: error.message,
            icon: 'error',
            buttons: false,
            timer: 3000
          })
        }
        setLoading(false);
    }

    useEffect(() => {
      const getData = async () => {
        setReviewsLoading(true);
        let quer = query(reviewsRef, where('movieid', '==', id));
        const querySnapshot = await getDocs(quer);
        querySnapshot.forEach((doc) => {
          setData((prev) => [...prev, doc.data()]);
        })
        setReviewsLoading(false);
      }
      getData();
    }, [])

  return (
    <div className='mt-12 mx-6 w-full'>
        <ReactStars 
            size={30}
            half={true}
            edit={true}
            value={rating}
            onChange={(rating) => setRating(rating)}
        />
        <input
            placeholder='Share your review...'
            className='w-full p-2 mt-2 outline-none bg-[#222] rounded-md'
            onChange={(e) => setThought(e.target.value)}
        />
      <button onClick={sendReview} className='bg-red-700 hover:bg-red-600 w-full p-2 my-2 rounded-md flex justify-center'>
        {loading ? <TailSpin height={20} color='white' /> : 'Share'}
      </button>
      { reviewsLoading 
      ? <div className='w-full h-[20vh] flex justify-center items-center'><TailSpin height={20} color='red' /></div>
      : <div className='mt-16'>
          {data.map((e, i) => {
            return (
              <div key={i} className='bg-gray-800 p-4 my-6 w-full rounded-lg border border-transparent hover:border-red-700'>
                <div className='flex justify-between'>
                  <p className='text-xl font-bold text-violet-400'>{e.name}</p>
                  <p className='text-gray-300 text-xs'>{new Date(e.timestamp).toDateString()}</p>
                </div>
                <ReactStars 
                    size={20}
                    half={true}
                    edit={false}
                    value={e.rating}
                  />
                <p className='mt-4'>{e.thoughts}</p>
              </div>
            )
          })}
        </div>}
    </div>
  )
}

export default Review
