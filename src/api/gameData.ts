import axios from 'axios'
import xmlJs from 'xml-js'
import { initGameData } from '../store/actions/game'
import { AppDispatch } from '../store/store'
import transformSokobanXML from './transform/transformXML'

const fetchGameData = async (puzzleId: string) => {
  try {
    const response = await axios.get(`/xml/${puzzleId}.xml`, {
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
    return xmlJs.xml2js(response.data, { compact: true })
  }
  console.error(`${response?.request.responseURL || 'The response url'} had an invalid data format.`)

  throw new Error()
}

export const loadGame = async (puzzleId: string, dispatch: AppDispatch) => {
  const xmlData = await getXmlData(puzzleId)
  const initialGameData = transformSokobanXML(xmlData)
  dispatch(initGameData(initialGameData))
}
