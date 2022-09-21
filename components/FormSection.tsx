import React from 'react'

const FormSection = ({ section, label, value, setValue }) => {
    return (
        <div className='shadow bg-white rounded-lg'>
            <div className='flex justify-around p-6'>
                <h2>{section + " $"}</h2>
                <div className="col-span-6 sm:col-span-4">

                    <input
                        type="number"
                        name="price"
                        id={label}
                        value={value}
                        onChange={setValue}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
        </div>
    )
}

export default FormSection
