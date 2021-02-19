import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { postType, setPosts } from '../src/redux/postsReducer'
import { deletePostThunk } from '../src/redux/createThunk'
import styled from 'styled-components'

const Wrapper = styled.div`
font-family: "Tenor Sans", sans-serif;
text-align:center;
`
const Title = styled.h1`

`
const Li = styled.li`
list-style-type: none; 
margin-bottom:50px;
`
const Button = styled.button`
transition-duration: 0.4s;
background-color: whitesmoke;
border-radius: 10px;
width: 200px;
height: 30px;
margin-top: 2%;
text-align: center;
margin-left:50px;
&:hover {
  background-color: red;
  color: whitesmoke;
  cursor:pointer
}
`
const CreateLink = styled.div`
font-size:20px;
text-decoration:none;
&:hover{
  cursor:pointer;
  text-decoration:underline;
}
`
const MoreInfo = styled.span`
font-size:16px;
text-decoration:none;
&:hover{
  cursor:pointer;
  text-decoration:underline;
}
`
const Index = ({ data }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPosts(data))
  }, [])
  const deletePost = (id: number) => {
    dispatch(deletePostThunk(id))
    window.location.reload()
  }

  return (
    <Wrapper>
      <Title>Узнайте для себя что то новое</Title>
      <Link href="/posts/new"><CreateLink>Или создайте свою собственную статью!</CreateLink></Link>
      <ul>
        {data.map((post: postType) =>
          <Li key={post.id}>
            <div>
              <h2>{post.title}</h2>
            </div>
            <Link href={`/posts/${post.id}`}>
              <MoreInfo>
                Узнать больше
              </MoreInfo>
            </Link>
            <Button onClick={() => deletePost(post.id)}>Удалить статью</Button>
          </Li>
        )}
      </ul>
    </Wrapper>
  )
}
export default Index


export const getStaticProps = async () => {
  const { data } = await axios.get(
    `https://simple-blog-api.crew.red/posts`
  );

  return {
    props: {
      data
    },
  };
};