import './App.css';
import React, { useState } from 'react';
function App() {
  const [idupdate,setidupdate]=useState(0);
  const contact = [{ id: 0, name: "baran", lastname: "ahmadi", phonenumber:'0910646748', country: "Iran", city: "Tehran", state: "Popular",deleteStyle:{display:'none'} }];
  const [contacts, setcontact] = useState(contact);
  const [mode,setmode]=useState('save');
  const[state,setstate]=useState('normal');
  const [form,setform] = useState({
    name: '',
    lastname: '',
    phonenumber: '',
    country: '',
    city: '',
    state:''
  });
  const change = (e) => {
    setform({...form,[e.target.name]:e.target.value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(mode==="save"){
      setcontact([...contacts,{id:Math.floor(Math.random() * 1000) , name:form.name ,firstname:form.firstname,state:form.state , country:form.country,city:form.city, phonenumber:form. phonenumber,deleteStyle:{display:'none'}}]);
      setform({
        id: 0,
        name: '',
        lastname: '',
        phonenumber: '',
        country: '',
        city: '',
        state:''
      });
    }
    else{
      setcontact(contacts.map((contact)=>{
        if(contact.id==idupdate){
          contact.name=form.name;
          contact.firstname=form.firstname;
          contact. phonenumber=form. phonenumber;
          contact.country=form.country;
          contact.city=form.city;
          contact.state=form.state;
        }

return contact;
      }))
      setmode("save");
    }
    };
 const Areyousure=(id)=>{
  setcontact(contacts.map((contact)=>{
    if(contact.id===id){
      contact.deleteStyle={display:'block'};
    }
    return contact;
  }))
};
 const UpdateContact = (contact) => {
   setform(contact);
   setmode("update");
   setidupdate(contact.id);
 };
 const Deletecontact=(id)=>{
  setcontact(contacts.map((contact)=>{
    if(contact.id===id){
      contact.deleteStyle={display:'none'};
    }
    return contact;
  }))
  setcontact(contacts.filter((contact) =>contact.id !== id))
 }

const checkradio=(e)=>{
  if(e.target.checked){
    setstate('popular');
  }
  else{
    setstate(contact.state='normal');
  }
  
}
/************************/
  return (
    <div>
      <form onSubmit={handleSubmit} className={'formcontact'}>
      <div><h2>Phonebook</h2></div>
        <div>
        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={change}/>
        <label>LastName:</label>
        <input type="text" name="lastname" value={form.lastname} onChange={change}/>
        <label>PhoneNumber:</label>
        <input type="text" name=" phonenumber" value={form. phonenumber} onChange={change}/>
        </div>
        <div>
        <label>Country:</label>
        <input type="text" name="country" value={form.country} onChange={change}/>
        <label>City:</label>
        <input type="text" name="city" value={form.city} onChange={change}/>
        </div>
        <div>
        <input type="radio" id="popular" name="normal" value={form.state} onChange={checkradio}/>
        <label htmlFor="popular">popular</label><br/>
        <input type="radio" id="normal" name="normal" value={form.state} />
        <label htmlFor="normal">normal</label><br/>
        </div>
        <div><input type={"submit"} value={mode}/></div>
        
      </form>
      {contacts.map((contact) => (
        <div className='baran'>
          <div>name:{contact.name}</div>
           <div>lastname:{contact.lastname}</div>
          <div>age:{contact.age}</div>
          <div>country:{contact.country}</div>
          <div>city:{contact.city}</div>
          <div>state:{contact.state}</div>
          <div>
            <button onClick={() =>Areyousure(contact.id)}>Delete contact</button>
            <div style={contact.deleteStyle}>
              <p>Are you sure????</p>
              <button onClick={() =>Deletecontact(contact.id)}>Yes</button>
              <button>No</button>
            </div>
          </div>
          <div><button onClick={() =>UpdateContact(contact)}>Update contact</button></div>
        </div>
      ))}
    </div>
  );
}

export default App;
