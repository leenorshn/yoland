import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { db } from "../../utils/firebase"

/* This example requires Tailwind CSS v2.0+ */
const projects = [
    { id: 1, name: 'New Advertising Campaign', hours: '12.0', rate: '$75.00', price: '$900.00' },
    // More projects...
]

export default function Example() {
    const router = useRouter()
    const [operation, setOperation] = useState(null)

    useEffect(() => {
        (async function get() {
            const docRef = doc(db, "operations", `${router.query.fiche}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOperation({ ...docSnap.data() })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })()


    }, [])
    if (!operation) {
        return <div className="flex items-center justify-center w-full h-full">
            <h1>Chargement en cours ...</h1>
        </div>
    }


    return (
        <div className="mx-auto max-w-4xl print:block pt-4 print:text-black imprimer">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Facture de:{operation.personne}</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Fiche numero {operation.fiche}
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <a
                            href="javascript:window.print()"
                            className="inline-flex print:hidden  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            imprimer
                        </a>
                    </div>
                </div>
                <div className=" mt-8 flex flex-col ">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                >
                                    Brache
                                </th>


                                <th
                                    scope="col"
                                    className="py-3.5 pl-3  text-right text-sm font-semibold text-gray-900"
                                >
                                    Prix
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {operation && operation.payments.map((project, i) => (
                                <tr key={i} className="border-b border-gray-200">
                                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                        <div className="font-medium text-gray-900">{project.libel}</div>

                                    </td>

                                    <td className="py-4 pl-3  text-right text-sm text-gray-500">{project.value}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="pr-20">

                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                                >
                                    Reste
                                </th>
                                <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">
                                    Reste
                                </th>
                                <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">{operation && operation.reste}$</td>
                            </tr>
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                                >
                                    Total
                                </th>
                                <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                                    Total
                                </th>
                                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                                    {operation && operation.total}$
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}
