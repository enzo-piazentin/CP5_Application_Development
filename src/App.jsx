import './App.css'
import ImcCalc from './component/ImcCalc'
import ImcTable from './component/ImcTable'
import { data } from './data/data'
import { useState } from 'react'

function App() {
  const [imc, setImc] = useState('')
  const [info, setInfo] = useState('')
  const [infoClass, setInfoClass] = useState('')
  const [error, setError] = useState('')
  const [idealWeight, setIdealWeight] = useState({ min: '', max: '' })
  const [history, setHistory] = useState([])

  const resetCalculator = () => {
    setImc('')
    setInfo('')
    setInfoClass('')
    setError('')
    setIdealWeight({ min: '', max: '' })
  }

  const calcImc = (e, height, weight) => {
    e.preventDefault()

    const heightValue = Number(String(height).replace(',', '.'))
    const weightValue = Number(String(weight).replace(',', '.'))

    if (!height || !weight || Number.isNaN(heightValue) || Number.isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
      setError('Informe altura e peso válidos para continuar.')
      return
    }

    const imcResult = (weightValue / (heightValue * heightValue)).toFixed(1)
    const result = data.find((item) => Number(imcResult) >= item.min && Number(imcResult) <= item.max) ?? data[data.length - 1]

    setImc(imcResult)
    setInfo(result.info)
    setInfoClass(result.infoclass)
    setError('')

    const minWeight = (18.5 * heightValue * heightValue).toFixed(1)
    const maxWeight = (24.9 * heightValue * heightValue).toFixed(1)
    setIdealWeight({ min: minWeight, max: maxWeight })

    setHistory((previousHistory) => [
      {
        id: Date.now(),
        imc: imcResult,
        classification: result.info,
      },
      ...previousHistory,
    ].slice(0, 3))
  }

  return (
    <div className="container">
      {!imc ? (
        <ImcCalc calcImc={calcImc} error={error} />
      ) : (
        <ImcTable
          result={imc}
          info={info}
          infoClass={infoClass}
          idealWeight={idealWeight}
          history={history}
          onReset={resetCalculator}
        />
      )}
    </div>
  )
}

export default App
