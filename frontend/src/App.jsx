import axios from "axios";
import config from "./config";
import { useEffect, useState } from "react";
import Form from "./components/form";
import Table from "./components/table";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios
      .get(config.api.url + "/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  };
  useEffect(() => {
    getEvents();
  }, [getEvents]);




  const deleteEvent = (rowId) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      axios
      .delete(config.api.url + '/events/delete/' + rowId)
      .then((res)=> {
        if(res.data.deleted) {
          getEvents()
        } 
      })
      .catch((err)=> {
        console.error(err);
      })
    }

  }

  return (
    <div className="App">
      <div className="formContainer">
        <Form getEvents={getEvents} />
      </div>
      <div className="tableContainer">
        <Table events={events} deleteEvent ={deleteEvent} className="table" />
      </div>
    </div>
  );
}

export default App;
