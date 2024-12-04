// // see SignupForm.js for comments
// import { useState, useEffect } from 'react';
// import { useMutation } from '@apollo/client';
// import type { ChangeEvent, FormEvent } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import Auth from '../utils/auth';
// import type { User } from '../models/User';
// import { LOGIN_USER } from '../utils/mutations';
// import { Link } from 'react-router-dom';



// // This is the new code
// // import React, { useState } from 'react';
// // import { Form, Button, Alert } from 'react-bootstrap';
// // import '../assets/LoginForm.css';

// const LoginForm = () => {
//   const [userFormData, setUserFormData] = useState({ email: '', password: '' });
//   const [validated, setValidated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//     }
//     setValidated(true);

//     try {
//       // Assume Auth.login is a function that handles login
//       const data: { login: { token: string } } = {
//         login: {
//           token: ''
//         }
//       }; // Add type annotation and initialize with an empty object
//       Auth.login(data.login.token);
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true);
//     }

//     setUserFormData({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <div className="login-form-container">
//       <h2 className="login-form-title">Login</h2>
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
//           Something went wrong with your login credentials!
//         </Alert>
//         <Form.Group className="mb-3">
//           <Form.Label htmlFor="email">Email</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Your email"
//             name="email"
//             onChange={handleInputChange}
//             value={userFormData.email || ''}
//             required
//           />
//           <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label htmlFor="password">Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Your password"
//             name="password"
//             onChange={handleInputChange}
//             value={userFormData.password || ''}
//             required
//           />
//           <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
//         </Form.Group>

//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//             <span>Don't have an account? </span>
//             <Link to="/signup">Sign up</Link>
//           </div>


//         <Button
//           className="login-form-button"
//           disabled={!(userFormData.email && userFormData.password)}
//           type="submit"
//           variant="success"
//         >
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default LoginForm;



// BELOW IS ORIGINAL CODE DO NOT DELETE UNTIL I SAY SO 

// // see SignupForm.js for comments
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
// import type { User } from '../models/User';
import { LOGIN_USER } from '../utils/mutations';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const LoginForm = ({}: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState({ 
    email: '', 
    password: '',
  });

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
    <div className="login-form-container">
    <h2 className="login-form-title">Login</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
         className='login-form-button'
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
      </div>
    </>
  );
};

export default LoginForm;
