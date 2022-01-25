import React, { useState } from "react";
import { Button, Card, CardContent, Alert, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../form/TextInput';
import { useLocation } from "react-router";
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


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PeopleForm({ passPersonToGrid }) {
    let query = useQuery();
    const classes = useStyles();

    const [error, setError] = useState(null)

    const handleSubmit = (formData, reset) => {
        setError(null)
        const token = localStorage.getItem("token");
        if (token) {
            axios.post("http://localhost:8081/api/members", { ...formData },
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((response) => {
                    passPersonToGrid(formData);
                    reset()
                })
                .catch((error) => {
                    setError(error.response.data.message)
                })
        } else {
            setError("Access Denied: Missing token.")
        }

    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                firstName: query.get("firstName") ? query.get("firstName") : '',
                lastName: query.get("lastName") ? query.get("lastName") : '',
                address: query.get("address") ? query.get("address") : '',
                ssn: query.get("ssn") ? query.get("ssn") : '',
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().trim().required("Required field"),
                lastName: Yup.string().trim().required("Required field"),
                address: Yup.string().trim().required("Required field"),
                ssn: Yup.string().trim().required("Required field")
                    .matches(/^([0-9]){3}\-([0-9]){2}\-([0-9]){4}$/, "Invalid format. Please enter your SSN like '###-##-####', where # is a number.")
            })}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmit(values, resetForm);
                setSubmitting(false);

            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Card style={{ width: '100%' }} >
                        <CardContent>
                            <Grid container spacing={3} >
                                {error &&
                                    <Grid item xs={12}>
                                        <Alert severity="error" onClose={() => { setError(null) }}>{error}</Alert>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <TextInput
                                        required
                                        name="firstName"
                                        label="First Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextInput
                                        required
                                        name="lastName"
                                        label="Last Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextInput
                                        required
                                        name="address"
                                        label="Address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextInput
                                        required
                                        name="ssn"
                                        label="SSN"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.dialogActions} direction="row" justifyContent="space-between" >
                                <Grid item>
                                    <Button variant="contained" color="secondary" onClick={() => { formik.resetForm() }}>Reset</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" type="submit">Save</Button>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </form>
            )}
        </Formik>
    )
}
export default PeopleForm;