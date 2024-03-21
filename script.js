const addBox = document.querySelector('.add-box'),
iconBtn = document.querySelector('.icon'),
closeBox = document.querySelector('.closeBtn'),
addNote = document.querySelector('.add-note'),
titleTag = document.querySelector('.title input'),
descriptionTag = document.querySelector('.description textarea'),
popupBox = document.querySelector('.popup-box');

let months = ['january','february','March','April','May','June','July','August','September','October','November','December'];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

iconBtn.addEventListener('click',()=>{
    popupBox.classList.add('show');
})

closeBox.addEventListener('click',()=>{
  titleTag.value = '';
  descriptionTag.value = '';
  popupBox.classList.remove('show');
})

function showNotes(){
  document.querySelectorAll('.note').forEach((note) => note.remove());
  notes.forEach((element,index) => {
    let liTag = `<li class="note">
    <div class="details">
      <p>${element.title}</p>
      <span>${element.des}</span>
    </div>
    <div class="bottom-content">
        <span>${element.date}</span>
        <div class="setting">
          <i onclick = "showIcon(this)" class="fa-solid fa-ellipsis-h "></i>
          <ul class="menu">
            <li><i class="fa-solid fa-pen"></i>Edit</li>
            <li onclick = "deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
          </ul>
        </div>
    </div>
   </li>`;
   addBox.insertAdjacentHTML('afterend',liTag);
  });
}
showNotes();

function showIcon(elem){
  elem.parentElement.classList.add("show");
  document.addEventListener('click',(e)=>{
    if( e.target.tagName != 'I' || e.target != elem){
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId){
  notes.splice(noteId,1);
  localStorage.setItem('notes',JSON.stringify(notes));
  showNotes();
}

addNote.addEventListener('click',(e)=>{
  e.preventDefault();
  let noteTag = titleTag.value,
  noteDes = descriptionTag.value;
  if(noteTag || noteDes){
   let dateObj = new Date(),
   month = months[dateObj.getMonth()],
   day = dateObj.getDate(),
   year = dateObj.getFullYear();


   let noteInfo = {
    title: noteTag,
    des: noteDes,
    date: `${month} ${day} ${year}`
   }
   
   notes.push(noteInfo);
    //saving notes to local stirage 
    localStorage.setItem('notes',JSON.stringify(notes));
    closeBox.click();
    showNotes();
  }

  
})

