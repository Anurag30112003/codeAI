import { useState } from "react";
import Spinner from "./components/Spinner";
import copy from "copy-to-clipboard";
import {BsClipboard} from "react-icons/bs";

export default function Js() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e :any) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const dataObj = Object.fromEntries(data);
        setLoading(true);

        const response = await fetch('/api/code/interview', {
            method: 'POST',
            body: JSON.stringify({ prompt: dataObj.prompt }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();

        let formatted = result.replace(/(\r\n|\n|\\n|\r)/gm, ` \n ` )
        let formatted2:any = '1.'+ formatted.replace(/ +(?= )/g,'');
        let formatted3:any = formatted2.replace(/;/g, `; \n ` )

        setData(formatted3);
        setLoading(false);

    }
    return (
        <div className="text-center">
      <div className="my-5 text-3xl"> Interview question Generator 🐱‍💻</div>
      <form onSubmit={handleSubmit}>
        <input type="text" className="text-xl resize rounded-md mt-5 px-20 py-5 text-center " name="prompt" placeholder="Enter a topic" /> <br />
        <button
          type="submit"
          className="bg-third text-xl text-secondary mt-10 rounded px-10 py-2 my-4 hover:bg-secondary hover:text-third border-2 border-third"
        >
          Submit
        </button>
      </form>
      {loading ? <Spinner/> : null}
      <textarea className="resize rounded-md w-[40rem] h-[20rem] px-5 py-5 mt-10" value={data}></textarea>
      <br />
      <button
        type="button"
        value="copy text"
        className="bg-third text-xl cursor-pointer text-secondary mt-2 rounded px-10 py-2 my-4 hover:bg-secondary hover:text-third border-2 border-third"
        onClick={() => {
          copy(`${data}`);
        }}
      > <BsClipboard className="inline"/> copy to clipboard</button>
    </div>
    )
}