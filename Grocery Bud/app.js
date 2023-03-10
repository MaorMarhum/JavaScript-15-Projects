// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editID = ''

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', (e) => addItem(e))
// clear items
clearBtn.addEventListener('click', () => clearItems())

// ****** FUNCTIONS **********
const addItem = (e) => {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()
    if (value && !editFlag) {
        const element = document.createElement('article')
        // add class
        element.classList.add('grocery-item')
        // add id
        const attr = document.createAttribute('data-id')
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', (e) => deleteItem(e))
        editBtn.addEventListener('click', (e) => editItem(e))
        // append child
        list.appendChild(element)
        // display alert
        displayAlert('item added to the list', 'success')
        // show container
        container.classList.add('show-container')
        // set back to default
        setBackToDefault()
    } else if (value && editFlag) {
        editElement.innerHTML = value
        displayAlert('value changed', 'success')
        setBackToDefault()
    } else {
        displayAlert('please enter value', 'danger')
    }
}
// display alert
const displayAlert = (text, action) => {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
    // remove alert
    setTimeout(() => {
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}
// clear items
const clearItems = () => {
    const items = document.querySelectorAll('.grocery-item')

    if (items.length > 0) {
        items.forEach((item) => {
            list.removeChild(item)
        })
        container.classList.remove('show-container')
        displayAlert('empty list', 'danger')
        setBackToDefault()
    }
}
// edit function
const editItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    // set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editID = element.dataset.id
    submitBtn.textContent = 'edit'
}
// delete function
const deleteItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger')
    setBackToDefault()
}
// set back to default
const setBackToDefault = () => {
    grocery.value = ''
    editFlag = false
    editID = ''
    submitBtn.textContent = 'submit'
}