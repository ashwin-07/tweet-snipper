import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Text, Input, Box, Center, InputGroup, InputRightElement, Flex, Spacer } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import axios from 'axios'
import { server } from '../config'
import { useState } from 'react'
import Editor from '../components/Editor'

export default function Home() {

  const [tweetDetails, setTweetDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getTweetDetails = async (elem) => {
    elem.preventDefault();
    //TODO use regex match to validate and extract tweet ID
    const url = elem.target.elements.url.value
    const id = url.split('/')[5]
    try {
      setLoading(true)
      const {data}= await axios.get(`/api/tweet/${id}`)
      console.log("axiso res")
      console.log(data)
      if (data.success) {
        setError(false)
        setTweetDetails(data.tweetDetails)
      }
      else {
        setError(true);
      }
      setLoading(false)
    }
    catch (ex) {
      setLoading(false)
      setError(true)
      setTweetDetails(null)
    }
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>TweetSnip</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box px='4' align='center'>
        <Text fontSize={{ base: "30px", md: "45px", lg: "50px" }} className='title i'>Capture <mark className="blue">tweets</mark> into customizable images.</Text>
      </Box>

      <Box my="12" align='center'>
        <form onSubmit={getTweetDetails} autoComplete='off'>
          <InputGroup maxW='90vw'>
            <Input width='50vw' variant="outline" size="lg" placeholder="https://twitter.com/CoolestAccEver/status/1384562769786073098?s=20" name='url' />
            <InputRightElement>
              <button type='submit'>
                <Search2Icon></Search2Icon>
              </button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>

      <Editor loading={loading} error={error} tweetDetails={tweetDetails}></Editor>
    </div>
  )
}
