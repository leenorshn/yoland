import React from 'react'

const StatWidget = ({ listOps, }) => {

    return (
        <div className={' rounded-lg'}>
            <div className='flex space-x-8 '>
                <div className='px-8 py-0 flex flex-col items-center '>
                    <h1 className='text-slate-400'>{"Balance"}</h1>
                    <h2 className='text-black text-2xl font-semibold'>{200}$</h2>
                </div>
                <div className='px-8 py-0 flex flex-col items-center '>
                    <h1 className='text-slate-400'>{"Entree"}</h1>
                    <h2 className='text-blue-600 text-2xl font-semibold'>{250}$</h2>
                </div>
                <div className='px-8 py-0 flex flex-col items-center '>
                    <h1 className='text-slate-400'>{"Sortie"}</h1>
                    <h2 className='text-red-500 text-2xl font-semibold'>{50}$</h2>
                </div>
            </div>
        </div>
    )
}

export default StatWidget;
