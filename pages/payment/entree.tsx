import { useState } from "react";
import FormSection from "../../components/FormSection";

import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "next/router";
export default function Example() {
    const [err, setErr] = useState("")
    const router = useRouter()
    const [identity, setIdentity] = useState({
        fiche: "",
        name: "",
        phone: "",
        address: "",
        gender: "",
    })
    const [form, setForm] = useState({ reste: 0, labo: 0, visite: 0, hospi: 0, medic: 0, other: 0 })
    const total = () => form.hospi + form.labo + form.medic + form.visite + form.other;
    const saveEntree = async () => {
        try {
            const docRef = await addDoc(collection(db, "operations"), {
                date: Timestamp.now(),
                fiche: identity.fiche,
                personne: identity.name,
                operation: 'entree',
                libel: "payment medical",
                reste: form.reste,
                total: total(),
                payments: [
                    { libel: "Hospitalisation", value: form.hospi },
                    { libel: "Consultation", value: form.visite },
                    { libel: "Laboratoire", value: form.labo },
                    { libel: "Medicaments", value: form.medic },
                    { libel: "Autres charges", value: form.other }
                ]
            });

            const docRefo = await setDoc(doc(db, "malades", identity.phone), {
                date: Timestamp.now(),
                fiche: identity.fiche,
                name: identity.name,
                phone: identity.phone,
                address: identity.address,
            });
            console.log("Document written with ID: ", docRef.id);
            router.push("/")
        } catch (error) {
            setErr("Erreur d'enregistrement")
        }

    }

    return (
        <div className="bg-slate-200 pt-6">
            <form className="space-y-6 max-w-4xl mx-auto" action="#" method="POST">
                <p className="text-red-500 text-lg">{err}</p>

                <div className="bg-white px-4  py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Identite</h3>

                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="numero-fiche" className="block text-sm font-medium text-gray-700">
                                        Numero fiche
                                    </label>
                                    <input
                                        type="text"
                                        name="numero-fiche"
                                        id="numero-fiche"
                                        value={identity.fiche}
                                        onChange={(e) => setIdentity({ ...identity, fiche: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="date-t" className="block text-sm font-medium text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date-t"
                                        id="date-t"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="nom_complet" className="block text-sm font-medium text-gray-700">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        name="nom_complet"
                                        id="nom_complet"
                                        value={identity.name}
                                        onChange={(e) => setIdentity({ ...identity, name: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Genre
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        value={identity.gender}
                                        onChange={(e) => setIdentity({ ...identity, gender: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                        Adresse
                                    </label>
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        value={identity.address}
                                        onChange={(e) => setIdentity({ ...identity, address: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Telephone
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        value={identity.phone}
                                        onChange={(e) => setIdentity({ ...identity, phone: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
                <FormSection label={"Laboratoire"} value={form.labo} section="Laboratoire" setValue={(e) => setForm({ ...form, labo: parseFloat(e.target.value) })} />
                <FormSection label={"consultation"} value={form.visite} section="Consultation " setValue={(e) => setForm({ ...form, visite: parseFloat(e.target.value) })} />
                <FormSection label={"hospitalisation"} value={form.hospi} section="Hospitalisation" setValue={(e) => setForm({ ...form, hospi: parseFloat(e.target.value) })} />
                <FormSection label={"pharmacie"} value={form.medic} section="Pharmacie" setValue={(e) => setForm({ ...form, medic: parseFloat(e.target.value) })} />
                <FormSection label={"others"} value={form.other} section="Autres charges" setValue={(e) => setForm({ ...form, other: parseFloat(e.target.value) })} />


                <div className="flex justify-end py-10">
                    <button
                        type="button"
                        onClick={() => {
                            router.replace("/")
                        }}
                        className="rounded-md border border-gray-300 bg-white py-2 px-10 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            saveEntree()
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
