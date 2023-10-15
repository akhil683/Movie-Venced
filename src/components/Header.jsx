import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <div className='sticky bg-black z-50 top-0 text-3xl flex justify-between items-center text-red-500 font-bold px-6 py-2 border-gray-500 header-gradient'>
      <Link to={'/'}>
        <span>
            Movie<span className='text-white'>Venced</span>
        </span>
        </Link>
        <Link to={'/addmovie'}>
          <h1 className='text-xl flex items-center cursor-pointer'>
              <Button><AddCircleOutlineIcon className='mr-2' color='error' fontSize='large' /><span className='text-white'>Add New</span></Button>
          </h1>
        </Link>
    </div>
  )
}

export default Header
