
import { useState } from 'react';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    ssn: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  });

  const [displayMessage, setDisplayMessage] = useState('');

  const API_URL = 'http://localhost:5050/api';

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'state' ? value.toUpperCase() : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setDisplayMessage('');

    try {
      // Step 1: Retrieve Alloy parameters
      const parametersResponse = await fetch(
        `${API_URL}/alloy/parameters`
      );

      if (!parametersResponse.ok) {
        throw new Error(
          'Unable to retrieve Alloy parameters'
        );
      }

      const parameters = await parametersResponse.json();

      // Step 2: Prepare applicant data
      const applicantData = {
        email_address: formData.email,
        address_line_1: formData.addressLine1,
        address_country_code: formData.country || "US",
        phone_number: formData.phoneNumber,

        name_first: formData.firstName,
        name_last: formData.lastName,

        address_line_2: formData.addressLine2 || undefined,
        address_city: formData.city || undefined,
        address_state: formData.state || undefined,
        address_postal_code: formData.zipCode || undefined,

        birth_date: formData.dateOfBirth || undefined
      };

      // Step 3: Submit applicant for evaluation
      const evaluationResponse = await fetch(
        `${API_URL}/alloy/evaluations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(applicantData)
        }
      );

      const result = await evaluationResponse.json();
      
      const { outcome } = result?.data?.data?.summary || {};
 
      if (outcome === "Approved") {
        setDisplayMessage('Congratulations! Your application has been approved and your account has been successfully created.');
      } else if (outcome === "Denied") {
        setDisplayMessage('Unfortunately, we were unable to approve your application at this time.');
      } else if (outcome === "Manual Review") {
       setDisplayMessage('We\'ve received your application. Our team needs to review some additional information and will follow up with you.');
      }
      else {
        setDisplayMessage('We\'ve received your application. Our team needs to review some additional information and will follow up with you.');
      }

    } catch (error) {
      console.error('API Error:', error);

      setDisplayMessage(error.message || 'Something went wrong');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <section id="center">

        <div className="hero">
          <img
            src={logo}
            className="base"
            width="170"
            height="179"
            alt="Logo"
          />
        </div>
        {displayMessage != '' ? (<div>{displayMessage}</div>) : (<form onSubmit={handleSubmit}>

          <div className="form-row">
          {/* First name data input not required in order to test manual review outcome */}
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              // required
            />
          </div>

          <div className="form-row">
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input
              id="addressLine1"
              type="text"
              name="addressLine1"
              placeholder="Enter street address"
              value={formData.addressLine1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="addressLine2">Address Line 2:</label>
            <input
              id="addressLine2"
              type="text"
              name="addressLine2"
              placeholder="Apartment, suite, unit (optional)"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="city">City:</label>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="state">State:</label>
            <input
              id="state"
              type="text"
              name="state"
              placeholder="NY"
              value={formData.state}
              onChange={handleChange}
              pattern="[A-Za-z]{2}"
              maxLength="2"
              title="Enter a two-letter state code (e.g., NY, CA)"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="zipCode">ZIP Code:</label>
            <input
              id="zipCode"
              type="text"
              name="zipCode"
              placeholder="Enter ZIP code"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="country">Country:</label>
            <input
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="ssn">SSN:</label>
            <input
              id="ssn"
              type="password"
              name="ssn"
              placeholder="9 digits, no dashes"
              value={formData.ssn}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, '')
                  .slice(0, 9);

                setFormData((prevData) => ({
                  ...prevData,
                  ssn: value
                }));
              }}
              pattern="[0-9]{9}"
              maxLength="9"
              inputMode="numeric"
              autoComplete="off"
              title="Enter exactly 9 digits without dashes"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[+]?[0-9\s().-]{7,20}"
              title="Enter a valid phone number"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

        </form>)
      }


        <section id="spacer"></section>

      </section>

      <section id="spacer"></section>
    </div>
  );
}

export default App;
