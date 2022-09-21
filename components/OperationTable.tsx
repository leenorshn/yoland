import { collection, onSnapshot, query } from "firebase/firestore";
import Link from "next/link"
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import Moment from "react-moment"

/* This example requires Tailwind CSS v2.0+ */
const people = [


]

export default function OperationTable() {
    const [operations, setOperations] = useState([])

    useEffect(() => {
        const q = query(collection(db, "operations"),);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ops = [];
            querySnapshot.forEach((doc) => {
                ops.push({ ...doc.data(), id: doc.id });
            });
            console.log(ops);

            setOperations(ops);
        });
        return () => unsubscribe()

    }, []);



    return (
        <div className="">

            <div className=" mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-black">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6">
                                Date
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 sm:table-cell"
                            >
                                Operation
                            </th>

                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 lg:table-cell"
                            >
                                Montant
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                                Reste
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                                Libele
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                                Fiche
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-100">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {operations.map((op, i) => (
                            <tr key={i}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">

                                    <Moment
                                        format="DD/MM/YYYY à HH:mm"
                                        date={op.date.seconds * 1000}
                                    ></Moment>

                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {op.operation}
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-800 lg:table-cell">
                                    {op.total + " $"}
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-900 lg:table-cell">
                                    {op.reste + " $"}
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {op.libel}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{op.fiche}</td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Link href={`/payment/${op.id}`}>
                                        <a className="text-indigo-600 hover:text-indigo-900">
                                            Voir detail<span className="sr-only">, {op.fiche}</span>
                                        </a>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
