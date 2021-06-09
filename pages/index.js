import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import HeroPost from '../components/hero-post'

import Container from '../components/container'
import { indexQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { async } from 'rxjs';

export default function Index({allPosts, preview}) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview}>
       
        <Head>
          <title>Next JS app + Sanity example</title>
          <meta name="description" content="###" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          
        </Container>

        </Layout>
    </>
  )
}
export async function getStaticProps({preview=false}){
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  return {
    props: {allPosts, preview},
  }
}