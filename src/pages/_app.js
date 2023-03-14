import Footer from '@/components/footer'
import Header from '@/components/header'
import '@/styles/globals.css'
import '@/styles/layout.css'
import '@/styles/registration.css'



export default function App({ Component, pageProps }) {
  return (
  <>
  {/* <Header></Header> */}
  <Component {...pageProps} />
  {/* <Footer></Footer> */}
  </>
  )
}
