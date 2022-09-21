import './App.css';
import React, { useState } from 'react';
function App() {
  const [idupdate, setidupdate] = useState(0);
  const contact = [{ id: 0, name: "baran", lastname: "ahmadi", phonenumber: '0910646748', country: "Iran", city: "Tehran", favorite: true, deleteStyle: { display: 'none' } }];
  const [contacts, setcontact] = useState(contact);
  const [filter, setFilter] = useState('allContact');
  const [mode, setmode] = useState('save');
  const [search, setSearch] = useState('');
  const [id, setId] = useState('0');
  const filterData = [
    { id: 1, title: 'allContact' },
    { id: 2, title: 'favoriteContact' },
    { id: 3, title: 'unFavoriteContact' },
  ]

  const [form, setform] = useState({
    name: '',
    lastname: '',
    phonenumber: '',
    country: '',
    city: '',
    favorite: ''
  });
  const change = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "save") {
      setcontact([...contacts, { id: Math.floor(Math.random() * 1000), name: form.name, firstname: form.firstname, favorite: form.favorite, country: form.country, city: form.city, phonenumber: form.phonenumber, deleteStyle: { display: 'none' } }]);
      setform({
        id: 0,
        name: '',
        lastname: '',
        phonenumber: '',
        country: '',
        city: '',
        favorite: ''
      });
    }
    else {
      setcontact(contacts.map((contact) => {
        if (contact.id == idupdate) {
          contact.name = form.name;
          contact.firstname = form.firstname;
          contact.phonenumber = form.phonenumber;
          contact.country = form.country;
          contact.city = form.city;
          contact.favorite = form.favorite;
        }

        return contact;
      }))
      setmode("save");
    }
  };
  const Areyousure = (id) => {
    setcontact(contacts.map((contact) => {
      if (contact.id === id) {
        contact.deleteStyle = { display: 'block' };
      }
      return contact;
    }))
  };
  const UpdateContact = (contact) => {
    setform(contact);
    setmode("update");
    setidupdate(contact.id);
  };

  const Deletecontact = (id) => {
    setcontact(contacts.map((contact) => {
      if (contact.id === id) {
        contact.deleteStyle = { display: 'none' };
      }
      return contact;
    }))
    setcontact(contacts.filter((contact) => contact.id !== id));
  }
  const handleSearch = e => {
    setSearch(e.target.value)
  }
  const handleFilterBtn = title => {
    setFilter(title)
  }
  const handleForm = e => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  /************************/
  return (
    <div>
      <form onSubmit={handleSubmit} className={'formcontact'}>
        <div><h2>Phonebook</h2></div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={change} />
          <label>LastName:</label>
          <input type="text" name="lastname" value={form.lastname} onChange={change} />
          <label>PhoneNumber:</label>
          <input type="number" name=" phonenumber" value={form.phonenumber} onChange={change} />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" value={form.country} onChange={change} />
          <label>City:</label>
          <input type="text" name="city" value={form.city} onChange={change} />
        </div>
        <div>
          <label>favorite</label>
          <select name={'favorite'} onChange={handleForm} value={form.favorite}>
            <option value="favoriteContact">favoriteContact</option>
            <option value="unFavoriteContact">unFavoriteContact</option>
          </select>
        </div>
        <div><input type={"submit"} value={mode} /></div>

      </form>
      <div>
        Search :
      </div>
      <div>
        <input onChange={handleSearch} value={search} />
      </div>
      <div>
        Filter
      </div>
      <div>
        {filterData.map(filterBtn => (
          <button onClick={() => handleFilterBtn(filterBtn.title)}
            style={{ backgroundColor: filterBtn.title === filter ? 'purple' : 'white' } }>
            {filterBtn.title}
          </button>
        ))}
      </div>
      {contacts.filter(contact => contact.name.toUpperCase().includes(search.toUpperCase()) && (filter === 'allContact' ? true : contact.favorite === filter)).map((contact) => (
        <div className='baran'>
          <div style={{ width: 50 }}>
            <img src={`https://avatars.dicebear.com/api/avataaars/:${contact.id}.svg`}></img>
          </div>
          <div>name:{contact.name}</div>
          <div>lastname:{contact.lastname}</div>
          <div>phonenumber:{contact.phonenumber}</div>
          <div>country:{contact.country}</div>
          <div>city:{contact.city}</div>
          <div>favorite:{contact.favorite}</div>
          <div>
            <button onClick={() => Areyousure(contact.id)}>Delete contact</button>
            <div style={contact.deleteStyle}>
              <p>Are you sure????</p>
              <button onClick={() => Deletecontact(contact.id)}>Yes</button>
              <button>No</button>
            </div>
          </div>
          <div><button onClick={() => UpdateContact(contact)}>Update contact</button></div>
        </div>
      ))}
    </div>
  );
}

export default App;
