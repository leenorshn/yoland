import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { db } from '../../utils/firebase';

const Sortie = () => {
    const router = useRouter();
    const [form, setForm] = useState({ montant: 0, cause: "", libel: "", personneRef: "" })

    const [err, setErr] = useState("")
    const saveSortie = async () => {

        try {
            const docRef = await addDoc(collection(db, "sorties"), {
                date: Timestamp.now(),
                montant: form.montant,
                cause: form.cause,
                libel: form.libel,
                personneRef: form.personneRef

            });
            console.log("Document written with ID: ", docRef.id);
            router.push("/sortie")
        } catch (error) {
            setErr("Erreur d'enregistrement")
        }
    }

    return (
        <div className="bg-slate-200 pt-6">
            <form className="space-y-6 max-w-4xl mx-auto" action="#" method="POST">
                <p className='text-red-500'>{err}</p>

                <div className="bg-white px-4  py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Sortie d argent</h3>

                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className=" space-y-5">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="numero-fiche" className="block text-sm font-medium text-gray-700">
                                        Montant
                                    </label>
                                    <input
                                        type="number"
                                        name="numero-fiche"
                                        id="numero-fiche"
                                        value={form.montant}
                                        onChange={(e) => setForm({ ...form, montant: parseFloat(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>





                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Cause
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        value={form.cause}
                                        onChange={(e) => setForm({ ...form, cause: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="Aprovisionnement">Achat medicament</option>
                                        <option value="taxe">Taxe</option>
                                        <option value="Salaire">Salaire</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>



                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Libelé
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        value={form.libel}
                                        onChange={(e) => setForm({ ...form, libel: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Personne de reference
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        value={form.personneRef}
                                        onChange={(e) => setForm({ ...form, personneRef: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>




                            </div>
                        </div>
                    </div>
                </div>



                <div className="flex justify-end py-10">
                    <button
                        type="button"
                        onClick={() => router.replace('/')}
                        className="rounded-md border border-gray-300 bg-white py-2 px-10 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Annuler
                    </button>
                    <button

                        onClick={(e) => {
                            e.preventDefault()
                            saveSortie();
                        }}
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Sortie