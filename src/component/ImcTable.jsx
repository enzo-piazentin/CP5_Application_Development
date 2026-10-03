import './ImcTable.css'
import Button from './Button'
import { data } from '../data/data'

const ImcTable = ({ result, info, infoClass, idealWeight, history, onReset }) => {
  const classification = data.find((item) => Number(result) >= item.min && Number(result) <= item.max) ?? data[data.length - 1]

  return (
    <div className="result-container">
      <div className={`result-card ${infoClass}`}>
        <p className="result-label">Seu IMC</p>
        <h2>{result}</h2>
        <span className="result-badge">{info}</span>
        <p className="result-message">Seu resultado está na faixa: {classification.classification}</p>
      </div>

      <div className="result-summary">
        <div>
          <span>Peso ideal</span>
          <strong>
            {idealWeight.min}kg - {idealWeight.max}kg
          </strong>
        </div>
        <div>
          <span>Classificação</span>
          <strong>{classification.info}</strong>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Faixa de IMC</th>
              <th>Classificação</th>
              <th>Obesidade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.info} className={Number(result) >= item.min && Number(result) <= item.max ? 'current-row' : ''}>
                <td>{item.classification}</td>
                <td>{item.info}</td>
                <td>{item.obesity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="history-box">
        <h3>Histórico rápido</h3>
        {history && history.length > 0 ? (
          <ul>
            {history.map((entry) => (
              <li key={entry.id}>
                <span>{entry.imc}</span>
                <small>{entry.classification}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma medição salva ainda.</p>
        )}
      </div>

      <div className="action-control single-button">
        <Button id="new-calc-btn" text="Nova medição" action={onReset} />
      </div>
    </div>
  )
}

export default ImcTable