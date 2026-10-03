import Button from './Button'
import './ImcCalc.css'
import { useState } from 'react'

const ImcCalc = ({ calcImc, error }) => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const validDigits = (text) => {
    const sanitized = text.replace(',', '.')
    return sanitized.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  }

  const clearForm = (e) => {
    e.preventDefault()
    setWeight('')
    setHeight('')
  }

  const handleHeightChange = (e) => {
    setHeight(validDigits(e.target.value))
  }

  const handleWeightChange = (e) => {
    setWeight(validDigits(e.target.value))
  }

  return (
    <div id="calc-container">
      <h2>Calculadora de IMC</h2>
      <p className="subtitle">Avalie sua saúde e descubra sua faixa ideal.</p>
      <form id="imc-form">
        <div className="form-inputs">
          <div className="form-control">
            <label htmlFor="height">Altura</label>
            <input
              type="text"
              name="height"
              id="height"
              placeholder="Exemplo 1,75"
              onChange={handleHeightChange}
              value={height}
              inputMode="decimal"
            />
          </div>
          <div className="form-control">
            <label htmlFor="weight">Peso</label>
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="Exemplo 70,5"
              onChange={handleWeightChange}
              value={weight}
              inputMode="decimal"
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="action-control">
          <Button id="calc-btn" text="Calcular" action={(e) => calcImc(e, height, weight)} />
          <Button id="clear-btn" text="Limpar" action={clearForm} />
        </div>
      </form>
    </div>
  )
}

export default ImcCalc