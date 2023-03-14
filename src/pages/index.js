
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={styles.main}>
      
        <div className={styles.center}>
          <form >
          <label htmlFor="first">First Name</label>
          <input type="text" id="first" name="first" required />
          <br></br>
    
          <label htmlFor="last">Last Name</label>
          <input type="text" id="last" name="last" required />
    
          <button type="submit">Submit</button>
          </form>
                   
        </div>
     
      </main>
    </>
  )
}
