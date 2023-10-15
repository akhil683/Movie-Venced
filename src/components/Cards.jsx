import React, { useEffect, useState } from 'react'

import { getDocs} from 'firebase/firestore';
import { movieRef } from '../firebase/firebase';
import { TailSpin } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const _data = await getDocs(movieRef);
            _data.forEach((doc) => {
                setData((prev) => [...prev, {...(doc.data()), id: doc.id}])
            })
            setLoading(false);
        }
        getData();
    }, [])

  return (
    <div className='flex flex-wrap justify-center items-center px-3 mt-2'>
        {loading 
        ? <div className='w-full h-[80vh] flex justify-center items-center'><TailSpin height={60} color='red' /></div> 
        : data?.map((e, i) => {
            return (
           <Link to={`/details/${e.id}`} key={i}  >
                <div className='mt-6 mx-4 bg-blue-950 cursor-pointer rounded-lg relative duration-200 hover:-translate-y-1 shadow-2xl hover:shadow-slate-800'>
                    <div className=' w-52 h-72'>
                        <img 
                            className='w-full h-full rounded-t-lg'
                            src={e.image} 
                        />
                    </div>
                    <div className='p-2'>
                        <h1 className='font-semibold  text-2xl'>{e.title}</h1>
                        <p> 
                            <ReactStars 
                                half={true} 
                                value={e.rating/e.rated}
                                edit={false}
                            />
                        </p>
                        <p className='text-red-600 text-lg'>{e.year}</p>
                    </div>
                </div>
           </Link>
            )})
        }

        
        
    </div>
  )
}

export default Cards