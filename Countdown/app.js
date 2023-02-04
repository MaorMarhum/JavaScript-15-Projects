const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

let tempDate = new Date()
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0)

const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
const month = futureDate.getMonth()
const date = futureDate.getDate()
const day = weekdays[futureDate.getDay()]

giveaway.textContent = `giveaway ends on ${day} ${date} ${months[month]} ${year} ${hours}:${minutes}am`

// future time in ms
const futureTime = futureDate.getTime()

const getRemainingTime = () => {
  const today = new Date().getTime()
  const t = futureTime - today

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000

  // calculate all values
  const days = Math.floor(t / oneDay)
  const hours = Math.floor((t % oneDay) / oneHour)
  const minutes = Math.floor((t % oneHour) / oneMinute)
  const seconds = Math.floor((t % oneMinute) / 1000)

  // set values array
  const values = [days, hours, minutes, seconds]

  const format = (item) => {
    if (item < 10) {
      return item = `0${item}`
    } else {
      return item
    }
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index])
  })

  if (t < 0) {
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class='expired'>sorry, this giveaway has expired</h4>`
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000)


getRemainingTime()