import { collection, onSnapshot, query } from "firebase/firestore";
import Link from "next/link"
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import Moment from "react-moment"



export default function SortieTable() {
    const [sorties, setSorties] = useState([])

    useEffect(() => {
        const q = query(collection(db, "sorties"),);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ops = [];
            querySnapshot.forEach((doc) => {
                ops.push(doc.data());
            });
            console.log(ops);

            setSorties(ops);
        });
        return () => unsubscribe()

    }, []);



    return (
        <div className="">

            <div className=" mt-2 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-black">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6">
                                Date
                            </th>


                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 lg:table-cell"
                            >
                                Montant
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 sm:table-cell"
                            >
                                Cause
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                                Personne
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                                Libele
                            </th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {sorties.map((op, i) => (
                            <tr key={i}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">

                                    <Moment
                                        format="DD/MM/YYYY à HH:mm"
                                        date={op.date.seconds * 1000}
                                    ></Moment>

                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm font-bold text-gray-800 lg:table-cell">
                                    {op.montant + " $"}
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {op.cause}
                                </td>

                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {op.personneRef}
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {op.libel}
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
