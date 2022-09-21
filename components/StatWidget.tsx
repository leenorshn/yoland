import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase';

const StatWidget = () => {
    const [entree, setEntree] = useState([])
    const [sortie, setSortie] = useState([])

    useEffect(() => {
        const q = query(collection(db, "operations"),);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ops = [];
            querySnapshot.forEach((doc) => {
                ops.push({ ...doc.data(), id: doc.id });
            });


            setEntree(ops);
        });


        return () => {
            unsubscribe()

        }

    }, []);
    useEffect(() => {
        const q2 = query(collection(db, "sorties"),);
        const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
            const ops2 = [];
            querySnapshot.forEach((doc) => {
                ops2.push(doc.data());
            });
            console.log(ops2);

            setSortie(ops2);
        });
        return () => unsubscribe2()
    }, [])

    const totalEntree = () => {
        var t = 0
        for (var i = 0; i < entree.length; i++) {
            t = t + entree[i].total;
        }
        return t;
    }

    const totalSortie = () => {
        var t = 0
        for (var i = 0; i < sortie.length; i++) {
            t = t + sortie[i].montant;
        }
        return t;
    }

    return (
        <div className={' rounded-lg'}>
            <div className='flex space-x-8 '>
                <div className='px-8 py-0 flex flex-col items-center '>
                    <h1 className='text-slate-400'>{"Balance"}</h1>
                    <h2 className='text-black text-2xl font-semibold'>{totalEntree() - totalSortie()}$</h2>
                </div>
                <div className='px-8 py-0 flex flex-col items-center '>
                    <h1 className='text-slate-400'>{"Entree"}</h1>
                    <h2 className='text-blue-600 text-2xl font-semibold'>{totalEntree()}$</h2>
                </div>
                <div className='px-8 py-0 flex flex-col items-center '>
                    <h1 className='text-slate-400'>{"Sortie"}</h1>
                    <h2 className='text-red-500 text-2xl font-semibold'>{totalSortie()}$</h2>
                </div>
            </div>
        </div>
    )
}

export default StatWidget;
