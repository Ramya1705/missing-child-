// import React, { useState } from 'react';
// import './SignUpForm.css';

// const SignUpForm = () => {
//   const [formData, setFormData] = useState({
//     userType: 'user',
//     secretKey: '',
//     username: '',
//     email: '',
//     mobileNo: '',
//     password: '',
//     verificationCode: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [step, setStep] = useState(1);
//   const [verificationSentTo, setVerificationSentTo] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Special handling for mobile number
//     if (name === 'mobileNo') {
//       const numbersOnly = value.replace(/\D/g, '');
//       const truncated = numbersOnly.slice(0, 10);
//       setFormData(prevState => ({ ...prevState, [name]: truncated }));

//       if (truncated.length > 0 && truncated.length !== 10) {
//         setErrors(prev => ({ ...prev, mobileNo: 'Mobile number must be 10 digits' }));
//       } else {
//         setErrors(prev => ({ ...prev, mobileNo: '' }));
//       }
//     } else {
//       setFormData(prevState => ({ ...prevState, [name]: value }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.mobileNo) {
//       newErrors.mobileNo = 'Mobile number is required';
//     } else if (formData.mobileNo.length !== 10) {
//       newErrors.mobileNo = 'Mobile number must be 10 digits';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInitialSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await fetch('http://localhost:5000/api/auth/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData)
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setVerificationSentTo(formData.email);
//           setStep(2);
//         } else {
//           alert(data.error);
//         }
//       } catch (error) {
//         console.error('Registration error:', error);
//       }
//     }
//   };

//   const handleVerificationSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           verificationCode: formData.verificationCode
//         })
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert('Verification successful');
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
//     }
//   };

//   const resendVerificationCode = async () => {
//     try {
//       await fetch('http://localhost:5000/api/auth/resend', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: verificationSentTo })
//       });
//       alert('Verification code resent');
//     } catch (error) {
//       console.error('Error resending code:', error);
//     }
//   };

//   if (step === 2) {
//     return (
//       <div className="form-container">
//         <div className="form-box">
//           <h2>Two-Factor Authentication</h2>
//           <div className="verification-info">
//             Please enter the verification code sent to:<br />
//             <strong>{verificationSentTo}</strong>
//           </div>

//           <form onSubmit={handleVerificationSubmit}>
//             <div className="form-group">
//               <label>Verification Code</label>
//               <input
//                 type="text"
//                 name="verificationCode"
//                 value={formData.verificationCode}
//                 onChange={handleChange}
//                 placeholder="Enter verification code"
//                 maxLength="6"
//                 pattern="\d*"
//               />
//             </div>

//             <button type="submit" className="submit-button">
//               Verify & Complete Registration
//             </button>

//             <div className="resend-code">
//               Didn't receive the code?{' '}
//               <button 
//                 type="button" 
//                 className="resend-button"
//                 onClick={resendVerificationCode}
//               >
//                 Resend Code
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <h2>Sign Up</h2>

//         <form onSubmit={handleInitialSubmit}>
//           <div className="form-group">
//             <label>User Type</label>
//             <div className="radio-group">
//               <label className="radio-label">
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="user"
//                   checked={formData.userType === 'user'}
//                   onChange={handleChange}
//                 />
//                 <span>User</span>
//               </label>
//               <label className="radio-label">
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="admin"
//                   checked={formData.userType === 'admin'}
//                   onChange={handleChange}
//                 />
//                 <span>Admin</span>
//               </label>
//             </div>
//           </div>

//           {formData.userType === 'admin' && (
//             <div className="form-group">
//               <label>Secret Key (Admin Only)</label>
//               <input
//                 type="text"
//                 name="secretKey"
//                 value={formData.secretKey}
//                 onChange={handleChange}
//                 placeholder="Enter Secret Key"
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <label>Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Mobile No</label>
//             <input
//               type="tel"
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleChange}
//               placeholder="Enter your mobile number"
//               pattern="\d*"
//               maxLength="10"
//               required
//             />
//             {errors.mobileNo && (
//               <span className="error-message">{errors.mobileNo}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" className="submit-button">
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userType: 'user',
    secretKey: '',
    username: '',
    email: '',
    mobileNo: '',
    password: '',
    verificationCode: ''
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [verificationSentTo, setVerificationSentTo] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobileNo') {
      const numbersOnly = value.replace(/\D/g, '');
      const truncated = numbersOnly.slice(0, 10);
      setFormData(prevState => ({ ...prevState, [name]: truncated }));

      if (truncated.length > 0 && truncated.length !== 10) {
        setErrors(prev => ({ ...prev, mobileNo: 'Mobile number must be 10 digits' }));
      } else {
        setErrors(prev => ({ ...prev, mobileNo: '' }));
      }
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobileNo) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (formData.mobileNo.length !== 10) {
      newErrors.mobileNo = 'Mobile number must be 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
          setVerificationSentTo(formData.email);
          setStep(2);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Error during registration. Please try again.');
      }
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.verificationCode
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please login.');
        // Redirect to login page or handle successful registration
      } else {
        alert(data.error || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Error during verification. Please try again.');
    }
  };

  const resendVerificationCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verificationSentTo })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Verification code resent successfully');
      } else {
        alert(data.error || 'Error resending code');
      }
    } catch (error) {
      console.error('Error resending code:', error);
      alert('Error resending verification code');
    }
  };

  if (step === 2) {
    return (
      <div className="form-container">
        <div className="form-box">
          <h2>Email Verification</h2>
          <div className="verification-info">
            Please enter the verification code sent to:<br />
            <strong>{verificationSentTo}</strong>
          </div>

          <form onSubmit={handleVerificationSubmit}>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter verification code"
                maxLength="6"
                pattern="\d*"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Verify & Complete Registration
            </button>

            <div className="resend-code">
              Didn't receive the code?{' '}
              <button 
                type="button" 
                className="resend-button"
                onClick={resendVerificationCode}
              >
                Resend Code
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same...
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleInitialSubmit}>
          {/* Existing form fields remain the same */}
          <div className="form-group">
            <label>User Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={formData.userType === 'user'}
                  onChange={handleChange}
                />
                <span>User</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={formData.userType === 'admin'}
                  onChange={handleChange}
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          {formData.userType === 'admin' && (
            <div className="form-group">
              <label>Secret Key (Admin Only)</label>
              <input
                type="text"
                name="secretKey"
                value={formData.secretKey}
                onChange={handleChange}
                placeholder="Enter Secret Key"
              />
            </div>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile No</label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              pattern="\d*"
              maxLength="10"
              required
            />
            {errors.mobileNo && (
              <span className="error-message">{errors.mobileNo}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;