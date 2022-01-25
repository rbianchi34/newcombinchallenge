import React, { useState } from "react";
import { Grid } from '@mui/material';
import PeopleGrid from "./PeopleGrid";
import PeopleForm from "./PeopleForm";
import { useIdleTimer } from 'react-idle-timer'

function PeopleManager() {
    const [newPerson, setNewPerson] = useState(null)
    const [reload, setReload] = useState(true)
    const handleOnIdle = () => {
        setReload(true)
        reset()
    }
    //Timer to reload the grid every 2 minutes idle
    const { reset } = useIdleTimer({
        timeout: 120000,
        onIdle: handleOnIdle,
        debounce: 250
    })

    return (
        <Grid container spacing={3} >
            <Grid item md={6} xs={12}>
                <PeopleForm passPersonToGrid={setNewPerson} />
            </Grid>
            <Grid item md={6} xs={12}>
                <PeopleGrid newPerson={newPerson} clearNewPerson={() => { setNewPerson(null) }} reload={reload} setReload={setReload} />
            </Grid>
        </Grid>
    )
}
export default PeopleManager;