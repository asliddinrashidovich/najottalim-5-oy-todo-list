const form = document.querySelector('form');
const items = document.querySelector('#items');
const message = document.querySelector('.message');

let data = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

// local storage
function addLocal() {
    localStorage.setItem('todos', JSON.stringify(data))
}

// time
function setTime() {
    let now = new Date();

    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    return `${hour}:${minute}  ${day}/${month}/${year}`
}   

// add todos
function addTodos() {
    items.innerHTML = ``
    data.forEach((item, i) => {
      items.innerHTML += `
        <div class="item ${item.complated ? 'complated' : ''}" >
            <div class="item_content">
                <i onclick="tabTodos(${i})" class="fa-regular fa-circle-check" id="check"></i>
                <div>
                    <div class="flex">
                        <h3>${item.title}</h3>
                        <span>${item.date}</span>
                    </div>
                    <p>${item.description}</p>
                </div>
            </div>
            <button ${item.complated && 'disabled'} onclick="deletItem(${i})" class="button-css">Delete</button>
        </div>
      `
    })
}


// event submit
form.addEventListener('submit', (e) => {
    e.preventDefault()
  
    let Ftitle = form.inputTitle.value;
    let Fdescription = form.inputDescripttion.value;
  
    if(Ftitle.length && Fdescription.length) {
      data.push({title: Ftitle, description: Fdescription, date: setTime(), complated: false})
      addLocal()
      addTodos()
      form.reset();
    } else {
      message.classList.remove('hidden')
      setTimeout(() => {
          message.classList.add('hidden')
      }, 2500);
    }
})
addTodos()

// delete btn
function deletItem(id) {
    const newData = data.filter((item, i) => {
      return i !== id
    })
    data = newData
    addTodos()
    addLocal()
}

// tap todos 
function tabTodos(id) {
    let newData = data.map((item, i) => {
        if(i == id) {
            return {...item, complated: item.complated ? false : true}
        } else {
            return {...item}
        }
    })
    data = newData
    addTodos()
    addLocal()
}