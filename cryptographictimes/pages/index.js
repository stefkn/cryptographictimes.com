import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MainComponent from '../components/main.js'

import {useSpring, animated} from 'react-spring'

export default function Home() {
  const props = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 650 },})

  return (
    <div className={styles.container}>
      <Head>
        <title>Cryptographic Times</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <animated.div style={props}>
          <h1 className={styles.title}>
            We live in Cryptographic Times.
          </h1>
        </animated.div>

        {/* <div className={styles.mainbox}>
          <p className={styles.description}>
            Crypto:
            <code className={styles.code}>/ˈkrɪptəʊ/</code>
            concealed; secret
          </p>
          <p className={styles.description}>
            Graphic:
            <code className={styles.code}>/ˈɡrafɪk/</code>
            1. relating to visual art, especially involving drawing, engraving, or lettering
            2. giving clear and vividly explicit details
          </p>
          <p className={styles.description}>
            Vast amounts of capital and resources flow through global markets every day.
          </p>
          <p className={styles.description}>
            These exchanges are intentionally opaque. Let's explore.
          </p>
        </div> */}

        <MainComponent name="bitcoin"></MainComponent>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
