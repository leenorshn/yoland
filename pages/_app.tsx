import '../styles/globals.css'
import AppBar from './../components/AppBar'
import { AuthProvider } from '../utils/AuthContext';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return <div>
    <AuthProvider >
      <Layout>
        <AppBar />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  </div>
}

export default MyApp
