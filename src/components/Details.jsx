import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

import { TailSpin } from 'react-loader-spinner'
import Review from './Review'

const Details = () => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [data, setData] = useState({
        title: '',
        year: '',
        image: '',
        description: '',
        rating: 0,
        rated: 0
    });

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const _doc = doc(db, 'movies', id)
            const _data = await getDoc(_doc);
            setData(_data.data());
            setLoading(false);
        }
        getData();
    }, [])

  return (
    <div className='p-4 w-full flex gap-12 flex-wrap justify-evenly mt-6'>
        { loading ? <div className='w-full h-[80vh] flex justify-center items-center'><TailSpin height={60} color='red' /></div> : <>
        <img className='md:h-[34rem] h-96 w-96 rounded-2xl' src={data.image} />
        <div className='md:w-1/2 relative overflow-hidden p-4'>
            <img className=' absolute -z-10 top-0 left-0 object-fill opacity-10' src={data.image} />
            <h1 className='md:text-4xl text-2xl font-semibold text-gray-300'>{data.title} <span className='text-red-700'>({data.year})</span></h1>
            <ReactStars
                size={30}
                half={true}
                value={data.rating/data.rated}
                edit={false}
             />
            <p className='mt-6 md:text-lg text-gray-300'>{data.description}</p>
        </div>
        </>
        }
        <Review id={id} prevRating={data.rating} userRated={data.rated}  />

    </div>
  )
}

export default Details
