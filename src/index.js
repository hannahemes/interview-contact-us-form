import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

function Form() {
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
        <div>
            <h1>Contact us form</h1>
            {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>
                    {result.message}
                </p>
            )}
            <form onSubmit={sendEmail}>
                <p>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={onInputChange}
                    />
                </p>

                <p>
                    <label for="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        value={state.email}
                        onChange={onInputChange}
                    />
                </p>

                <p>
                    <label for="subject">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={state.subject}
                        onChange={onInputChange}
                    />
                </p>

                <p>
                    <label for="message">Message</label>
                    <textarea
                        name="message"
                        value={state.message}
                        onChange={onInputChange}
                    />
                </p>

                <p>
                    <input type="submit" value="Send Message" />
                </p>
            </form>
        </div>
    );
}

ReactDOM.render(<Form />, document.getElementById('root'));
