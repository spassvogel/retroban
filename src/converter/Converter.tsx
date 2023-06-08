import { useState } from "react"
import App from "../App"

import "./converter.scss"
import { convertToXML } from "./utils"

const Converter = () => {
  const [input, setInput] = useState("")
  const [name, setName] = useState("")
  const [source, setSource] = useState("")
  const [sourceURL, setSourceURL] = useState("")
  const [author, setAuthor] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")
  const [level, setLevel] = useState("1")
  const [solution, setSolution] = useState("")
  const [output, setOutput] = useState("")

  const handleInputChange = (map: string) => {
    setInput(map)
    setSolution('')
  }


  const handleConvert = () => {
    const xml = convertToXML(input, name, level, source, sourceURL, author, authorEmail, solution)
    if (xml) {
      setOutput(xml)
    }
  }
  return (
    <div className="converter">
      <div>
        <label>Input (in <a href="http://www.sokobano.de/wiki/index.php?title=Level_format">Sokoban standard notation</a>).
        <br/>Make sure the area where the player is is fully walled in.</label>
        <textarea name="" id="" rows={10} value={input} onChange={(e) => handleInputChange(e.target.value)}></textarea>
        <div className="properties">
          <div className="form-control">
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Source</label>
            <input type="text" name="source" value={source} onChange={e => setSource(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Source URL</label>
            <input type="text" name="sourceURL" value={sourceURL} onChange={e => setSourceURL(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Author</label>
            <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Author Email</label>
            <input type="text" name="source-URL" value={authorEmail} onChange={e => setAuthorEmail(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Solution</label>
            <input type="text" name="solution" value={solution} onChange={e => setSolution(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>level</label>
            <select value={level} onChange={(e) => setLevel(e.currentTarget.value)}>
              <option value="1">Storage Unit (easy)</option>
              <option value="2">Warehouse (medium)</option>
              <option value="3">Logistics center (hard)</option>
            </select>
          </div>
        </div>
        <div>
          <button onClick={handleConvert}>CONVERT</button>
        </div>
      </div>
      <div>
        output
        <textarea name="" id="" rows={10} value={output}>

        </textarea>

      </div>
      <div className="preview">
        { output && <App gameData={output} />}
      </div>
    </div>
  )
}

export default Converter
