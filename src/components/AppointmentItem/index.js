// Write your code here

import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {title, date, isStarred, id} = appointmentDetails

  const onclickStar = () => {
    toggleIsStarred(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div>
        <p className="title-head">{title}</p>
        <p className="date-text">
          {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <button
        type="button"
        className="star-button"
        onClick={onclickStar}
        data-testid="star"
      >
        <img src={starImg} alt="star" className="star-img" />
      </button>
    </li>
  )
}

export default AppointmentItem
