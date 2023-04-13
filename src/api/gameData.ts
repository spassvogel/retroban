import axios from 'axios'
import xmlJs from 'xml-js'
import { initGameData } from '../store/actions/game'
import { AppDispatch } from '../store/store'
import transformSokobanXML from './transform/transformXML'

const fetchGameData = async (path: string) => {
  try {
    const response = await axios.get(`${path}`, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    return response
  }
  catch (error) {
    console.error(error)
  }
}

const getXmlData = async (puzzleId: string) => {
  const response = await fetchGameData(puzzleId)
  if (response?.status === 200 && response.data.includes('puzzle')) {
    return parseXML(response.data)
  }
  console.error(`${response?.request.responseURL || 'The response url'} had an invalid data format.`)

  throw new Error()
}

export const parseXML = (input: string) => {
  return xmlJs.xml2js(input, { compact: true })
}

export const loadGameData = async (path: string, dispatch: AppDispatch) => {
  const xmlData = await getXmlData(path)
  startGame(xmlData, dispatch)
}

export const startGame = (xmlData: xmlJs.Element | xmlJs.ElementCompact, dispatch: AppDispatch) => {
  const initialGameData = transformSokobanXML(xmlData)
  dispatch(initGameData(initialGameData))
}