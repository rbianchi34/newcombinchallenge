import React, { useEffect, useState } from "react";
import { Alert, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import makeStyles from '@mui/styles/makeStyles';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    dialogActions: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3)
    },
}))

function PeopleGrid({ newPerson, clearNewPerson, reload, setReload }) {
    const [people, setPeople] = useState([])

    const [error, setError] = useState(null)



    useEffect(() => {
        if (reload) {
            setError(null)
            const token = localStorage.getItem("token");
            if (token) {
                axios.get("http://localhost:8081/api/members",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then((response) => {
                        //MUI requires ids for the rows
                        response.data.map((r, i) => {
                            r.id = i;
                            return r
                        })
                        setPeople(response.data)
                    })
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
            } else {
                setError("Access Denied: Missing token.")
            }
            setReload(false)
        }

    }, [reload])



    useEffect(() => {
        if (newPerson) {
            let currentPeople = [...people];
            newPerson.id = currentPeople.length + 1
            currentPeople.push(newPerson);
            setPeople(currentPeople);
            clearNewPerson();
        }
    }, [newPerson])

    const columns = [
        { field: "firstName", headerName: "First Name" },
        { field: "lastName", headerName: "Last Name" },
        { field: "address", headerName: "Address" },
        { field: "ssn", headerName: "SSN" },
    ]


    return (
        <Grid container spacing={3}>
            {error &&
                <Grid item xs={12}>
                    <Alert severity="error" onClose={() => { setError(null) }}>{error}</Alert>
                </Grid>
            }
            <Grid item xs={12}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={people} columns={columns} />
                </div>
            </Grid>
        </Grid>
    )
}
export default PeopleGrid;