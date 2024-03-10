// Write your code here

import {Component} from 'react'
import './index.css'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilteredActive: false,
  }

  onTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      title: titleInput,
      date: dateInput,
      id: uuidv4(),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilteredActive} = this.state

    this.setState({isFilteredActive: !isFilteredActive})
  }

  getFilteredAppointments = () => {
    const {appointmentList, isFilteredActive} = this.state
    if (isFilteredActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput} = this.state
    const filteredAppointmentList = this.getFilteredAppointments()

    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="add-appointment-heading">Add Appointment</h1>
          <div className="form-img-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <label className="label-text" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="title-input"
                placeholder="Title"
                onChange={this.onTitleInput}
                value={titleInput}
              />
              <label htmlFor="date" className="label-text">
                Date
              </label>
              <input
                type="date"
                className="date-input"
                id="date"
                placeholder="dd/mm/yyyy"
                onChange={this.onDateInput}
                value={dateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="img-size"
              />
            </div>
          </div>
          <hr className="break-line" />
          <div className="appointment-Starred-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className="star-button"
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
