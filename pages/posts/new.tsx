import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import Link from 'next/link'
import { createNewPostThunk } from '../../src/redux/createThunk'
import styled from 'styled-components'

const Wrapper = styled.div`
font-family: "Tenor Sans", sans-serif;
`

const InputTitle = styled.input`
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 3px;
`
const BodyText = styled.textarea`
width:40%;
resize: none;
`
const Button = styled.button`
transition-duration: 0.4s;
background-color: whitesmoke;
border-radius: 10px;
width: 200px;
height: 30px;
text-align: center;
&:hover {
  background-color: green;
   cursor:pointer;
   color:white;
}
`
const BackToPage = styled.div`
font-size: 20px;
text-decoration: none;
&:hover{
    cursor:pointer;
    text-decoration:underline;
}
`
type newPostType = {
    title: string,
    body: string
}
const NewPost = () => {
    const { handleSubmit, register } = useForm()
    const dispatch = useDispatch()
    const onSubmit = (data: newPostType, e: any) => {
        dispatch(createNewPostThunk(data))
        e.target.reset()
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label>Название статьи:</label>
                    <InputTitle name="title" placeholder='Название'
                        ref={register({ required: true })} />
                </div>
                <div className="mb-3">
                    <BodyText name="body" placeholder='Текст статьи'
                        rows={5}
                        ref={register({ required: true })}
                    />
                </div>
                <div>
                    <Button className="btn btn-primary" type="submit">
                        Отправить
                    </Button>
                </div>
            </form>
            <Link href="/"><BackToPage>Вернуться на главную</BackToPage></Link>
        </Wrapper>
    )
}
export default NewPost
export type { newPostType }