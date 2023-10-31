import React, { useState } from 'react';
import { 
    Container,
    Box,
    Typography, 
    Button,
    TextField,     
    Alert
} from '@mui/material';

export default function Form() {

    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [result, setResult] = useState(null);
 
    const sendEmail = (event) => {
        event.preventDefault();

        fetch('/send', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...state }),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                setResult(response);
                setState({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            })
            .catch(() => {
                setResult({
                    success: false,
                    message: 'Something went wrong. Try again later',
                });
            });
    };

    const onInputChange = (event) => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value,
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Contact Us Form
                </Typography>

                {result && (
                    <Alert sx={{mt: 1}} severity={`${result.success ? "success" : "error"}`}>
                        {result.message}
                    </Alert>
                )}

                <Box component="form" onSubmit={sendEmail} sx={{ mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={onInputChange}
                        autoComplete="off"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={onInputChange}
                        autoComplete="off"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        type="text"
                        name="subject"
                        value={state.subject}
                        onChange={onInputChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        maxRows={10}
                        id="message"
                        label="Message"
                        type="text"
                        name="message"
                        value={state.message}
                        onChange={onInputChange}
                    />

                    <Button
                        sx={{ mt: 3}}
                        type="submit"
                        variant="contained"
                        id="sendButton"
                    >
                        Send Message
                    </Button>
                </Box>           
            </Box>
        </Container>
    );
}