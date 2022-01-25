import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

function TextInput({ isView, ...props }) {
    const [field, meta] = useField(props);

    return (
        <TextField
            fullWidth
            variant="outlined"
            {...field}
            {...props}
            error={meta.touched && Boolean(meta.error)}
            helperText={(meta.touched && meta.error) ? meta.error : (props.note ? props.note : null)}
        />
    );
}

export default TextInput;
