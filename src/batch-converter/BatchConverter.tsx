import { useState } from "react"
import "./../converter/converter.scss"
import App from "../App"
import storedLevels from "../../levels.json"
import { convertToXML } from "../converter/utils"

const Converter = () => {
  const [input, setInput] = useState("")
  const [source, setSource] = useState("")
  const [sourceURL, setSourceURL] = useState("")
  const [author, setAuthor] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")
  const [level, setLevel] = useState("1")
  const [output, setOutput] = useState("")

  const handleInputChange = (map: string) => {
    setInput(map)
  }

  const lineHasLevel = (line: string) => {
    // levels should be boxed in, so the first (actual) character should be #
    return line.trimStart()[0] === "#"
  }

  const readLevelData = () => {
    const lines = input.split('\n')

    let i = 0;
    let state: 'fileHeader' | 'newLevel' | 'levelNotes' | 'solution' = 'fileHeader'
    const levelData: { name: string, data: string[], solution: string }[] = []
    while (i < lines.length - 2) {
      switch (state) {
        case 'levelNotes':
        case 'fileHeader': {
          if (lineHasLevel(lines[i + 2])) {
            // Start of first level
            const level = { name: lines[i], data: [], solution: ""}
            levelData.push(level)
            state = 'newLevel'
            i++ // skip empty line!
          }

          if (lines[i].startsWith('Solution')){
            state = 'solution'
          }
          break
        }

        case 'newLevel': {
          if (lineHasLevel(lines[i])) {
            levelData[levelData.length - 1].data.push(lines[i])
          } else {
            state = 'levelNotes'
          }
          break
        }

        case 'solution': {
          levelData[levelData.length - 1].solution = lines[i]
          state = 'levelNotes'
        }
      }
      i ++
    }

    return levelData
  }

  const processLevelsData = (levelsData: { name: string, data: string[], solution: string }[]) => {
    const unallowedLevelNumbers = storedLevels.levels.map(l => +(l.path.substring("xml/level".length, "xml/level".length + 4)))

    levelsData.forEach((lD) => {
      const data = lD.data.join('\n')
      const converted = convertToXML(data, lD.name, level, source, sourceURL, author, authorEmail, lD.solution)

      const levelNumber = findAvailableLevelNumber(unallowedLevelNumbers, +level)
      unallowedLevelNumbers.push(levelNumber)

      if (converted) {
        const a = document.createElement('a')
        document.body.appendChild(a)

        const blob = new Blob([converted], {type : 'text/xml'});
        const url = URL.createObjectURL(blob)
        a.setAttribute('style', "display: none")
        a.href = url
        a.target = "_blank"
        a.download = `level${levelNumber}.xml`
        a.click();
        window.URL.revokeObjectURL(url);

        setOutput(`${output}\nWrote file ${a.download} name: ${lD.name}`)
        console.log(`Downloaded level ${a.download}`)
      }
    })
  }

  const handleConvert = () => {

    // First read level data from pasted input
    const levelsData = readLevelData()
    processLevelsData(levelsData)

  }


  return (
    <div className="converter">
      <div>
        <label>Input SOK level format with solutions.
        <br/>Make sure the area where the player is is fully walled in.</label>
        <textarea name="" id="" rows={10} value={input} onChange={(e) => handleInputChange(e.target.value)}></textarea>
        <div className="properties">
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

function findAvailableLevelNumber(unallowedLevelNumbers: number[], level: number) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidate = Math.floor(Math.random() * (level * 1000) + (level * 1000))
    if (!unallowedLevelNumbers.includes(candidate)) {
      return candidate
    }
  }
}

