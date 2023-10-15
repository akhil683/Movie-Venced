import React, { useState } from "react";
import { TailSpin} from "react-loader-spinner";
import { addDoc } from "firebase/firestore"; //to add the doc 

import { movieRef } from "../firebase/firebase";
import swal from 'sweetalert'

const AddMovie = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: '',
    rated: 0,
    rating: 0,
  });

  const addMovie = async () => {
    try {
      setLoading(true);
      await addDoc(movieRef, form);
      swal({
        title: 'Successfully added',
        icon: 'success',
        buttons: false,
        timer: 3000
      })
      setLoading(false);
    } catch (error) {
    swal({
      title: error,
      icon: 'error',
      buttons: false,
      timer: 3000
    })
  }
}

  return (
    <section className=" body-font relative">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-red-600">
            Add Movie
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-300">
            You can add your favourite movie to show the world.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="name" className="leading-7 text-sm text-gray-300">
                  Title
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full rounded border border-gray-300 focus:border-red-400  focus:ring-2 focus:ring-red-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="email" className="leading-7 text-sm text-gray-300">
                  Year
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={form.year}
                  onChange={(e) => setForm({...form, year: e.target.value})}
                  className="w-full rounded border border-gray-300 focus:border-red-400  focus:ring-2 focus:ring-red-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
             
            <div className="p-2 w-full">
              <div className="relative">
                <label for="message" className="leading-7 text-sm text-gray-300">
                  Image Link
                </label>
                <input
                  type="text"
                  id="imaglink"
                  name="year"
                  value={form.image}
                  onChange={(e) => setForm({...form, image: e.target.value})}
                  className="w-full rounded border border-gray-300 focus:border-red-400  focus:ring-2 focus:ring-red-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label for="message" className="leading-7 text-sm text-gray-300">
                  Description
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full rounded border border-gray-300 focus:border-red-400  focus:ring-2 focus:ring-red-400 h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button onClick={() => addMovie()} className="flex mx-auto text-white bg-red-600 border-0 py-2 px-8 uppercase focus:outline-none hover:bg-red-700 rounded text-lg">
                {loading ? <TailSpin height={25} color="white" /> :  'submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMovie;
