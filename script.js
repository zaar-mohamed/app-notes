const btnelement=document.getElementById('btn');
const appelemet=document.getElementById('app');




getnotes().forEach((note) => {
    const notelement=createNoteelement(note.id,note.content);
    appelemet.insertBefore(notelement,btnelement);
});
function createNoteelement(id,content){
    const element=document.createElement('textarea');
    element.classList.add('Note');
    element.placeholder='Empty note';
    element.value=content;

    element.addEventListener('dblclick',()=>{
      const warning=confirm('do you want to delete this note?');
      if(warning){
        deletenote(id,element);
      }  
  });

    element.addEventListener('input',()=>{
        updatenote(id,element.value);
    })

    return element;

}
function deletenote(id,element){
    notes=getnotes().filter((note)=>note.id!=id);
    savenotes(notes)
    appelemet.removeChild(element);
 }
 function updatenote(id,content){
    notes=getnotes();
    const target=notes.filter((note)=>note.id==id)[0];
    target.content=content;
    savenotes(notes)

 }

function addnote(){
    const notes=getnotes()

    const noteobj={
        id:Math.floor(Math.random()*10000),
        content:''
    };
    const notelement=createNoteelement(noteobj.id,noteobj.content);
    appelemet.insertBefore(notelement,btnelement);

    notes.push(noteobj);

    savenotes(notes)

}

function savenotes(notes){
    localStorage.setItem("note-app",JSON.stringify(notes));

}
function getnotes(){
    return JSON.parse(localStorage.getItem("note-app") || `[]`);
}

btnelement.addEventListener('click',addnote);

