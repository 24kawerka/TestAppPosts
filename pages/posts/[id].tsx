import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updatePostThunk } from "../../src/redux/createThunk";
import { commentType } from '../../src/redux/postsReducer'
import { Comment } from "./comment";
import { newPostType } from "./new";
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
font-family: "Tenor Sans", sans-serif;
`
const Title = styled.h1`
text-align:center;
`
const Text = styled.div`
width:50%;
margin-left:25%;
margin-top:50px;
margin-bottom:50px;
text-align:left
`
const Button = styled.button`
transition-duration: 0.4s;
background-color: whitesmoke;
border-radius: 10px;
width: 200px;
height: 30px;
text-align: center;
margin-left:80%;
&:hover {
  cursor:pointer;
  border-color:orange;
}
`
const CommentsTitle = styled.h2`

`
const BackToPage = styled.div`
font-size: 20px;
text-decoration: none;
margin-left:80%;
&:hover{
    cursor:pointer;
    text-decoration:underline;
}
`
const ButtonSubmit = styled.button`
transition-duration: 0.4s;
background-color: whitesmoke;
border-radius: 10px;
width: 150px;
height: 30px;
text-align: center;
&:hover {
  cursor:pointer;
  background:green;
  color:white;
}
`
const ButtonCancel = styled.button`
transition-duration: 0.4s;
background-color: whitesmoke;
border-radius: 10px;
width: 150px;
height: 30px;
text-align: center;
&:hover {
  cursor:pointer;
  background:red;
  color:white;
}
`
const InputTitle = styled.input`
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
`
const BodyText = styled.textarea`
width:40%;
resize: none;
`
export default function Post({ data }) {
    const [showInput, setShowInput] = useState(1)
    const dispatch = useDispatch()
    const { handleSubmit, register } = useForm()
    const onSubmit = (updatedPost: newPostType) => {
        dispatch(updatePostThunk(updatedPost, data.id))
        setShowInput(1)
        window.location.reload()
    }
    return (
        <Wrapper>{
            showInput === 1 ?
                <div>
                    <Title>{data.title}</Title>
                    <Text>{data.body}</Text>
                    <Button onClick={() => setShowInput(2)}>Изменить статью</Button>
                    {data.comments !== undefined ?
                        <>
                            <CommentsTitle>Комментарии:</CommentsTitle>
                            {data.comments.map((comment: commentType) =>
                                <Comment key={comment.id} comment={comment} />
                            )}

                        </> :
                        null
                    }
                    <Link href="/"><BackToPage>Вернуться на главную</BackToPage></Link>
                </div>
                :
                <form className="px-4 py-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <label >Название</label>
                        <InputTitle name="title" placeholder='Название' autoComplete="false" defaultValue={data.title}
                            ref={register({ required: true })} />
                    </div>
                    <div className="mb-3">
                        <BodyText name="body" placeholder='Текст статьи'
                            defaultValue={data.body}
                            rows={5}
                            ref={register({ required: true })}
                        />
                    </div>
                    <div>
                        <ButtonSubmit className="btn btn-primary" type="submit">
                            Изменить
                    </ButtonSubmit>
                        <ButtonCancel onClick={() => setShowInput(1)}>Отмена</ButtonCancel>
                    </div>
                </form>
        }
        </Wrapper>
    )
}

export const getServerSideProps = async ({ params }) => {
    const { data } = await axios.get(
        `https://simple-blog-api.crew.red/posts/${params.id}`
    );
    return {
        props: {
            data
        },
    };
}