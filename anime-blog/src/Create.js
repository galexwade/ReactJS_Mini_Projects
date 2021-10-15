import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('alex');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        })
        .then(() => {
            console.log('New blog added');
            setIsPending(false);
            history.push('/');
        })
    };

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={ handleSubmit }>
                {/* Blog title */}
                <label>Blog title:</label>
                <input type="text" required value={ title } onChange={ (e) => setTitle(e.target.value) }/>
                {/* Blog body */}
                <label>Blog body:</label>
                <textarea required value={ body } onChange={ (e) => setBody(e.target.value) }></textarea>
                {/* Blog author */}
                <label>Blog author:</label>
                <select value={ author } onChange={ (e) => setAuthor(e.target.value) }>
                    <option value="alex">Alex</option>
                    <option value="oda">Oda</option>
                </select>
                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding Blog...</button> }
            </form>
        </div>
     );
}
 
export default Create;