import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/AcitivityDashboard";
import {v4 as uuid, v4} from 'uuid'
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []); //it will run after initial rendering that is return.

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x=>x.id===id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string){
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id? setActivities([...activities.filter(x=>x.id!==activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id!==id)])
  }
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit = {handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
