import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import SortieTable from '../../components/SortieTable'



export default function Home() {
    return (
        <div className='bg-slate-100 min-h-[88vh]'>
            <Head>
                <title>Gestion comptable </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='max-w-5xl mx-auto bg-white'>
                <div className='py-3 flex justify-between'>
                    Liste des sorties
                    <Link href={"/sortie/new"}>
                        <button className='px-8 py-2 bg-red-600 text-white rounded-md'>Sortie</button>
                    </Link>
                </div>
                <SortieTable />
            </main>


        </div>
    )
}
