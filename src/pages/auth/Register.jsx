import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Check if authtoken exists in local storage
        const authToken = localStorage.getItem('authtoken');
        if (authToken) {
            navigate('/');
        }
    }, [navigate]);
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [dob, setDob] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [experience, setExperience] = useState(0);
    const [experienceInput, setExperienceInput] = useState(0);
    const [selectedBorderColor, setSelectedBorderColor] = useState('#000000');
    const [profileImage, setProfileImage] = useState(null);



    // State and handler for hobbies
    const hobbiesOptions = [
        { label: 'Cricket', value: 'cricket' },
        { label: 'Chess', value: 'chess' },
        { label: 'Football', value: 'football' },
    ];

    // creatable
    const skillsOptions = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'React', value: 'react' },
        { label: 'Node.js', value: 'nodejs' },
        // Add more predefined skills as needed
    ];

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleDateChange = (date) => {
        setDob(date);
    };
    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
    };
    const handleCountryChange = (country) => {
        setSelectedCountry(country);
    };
    // Event handler for capturing the selected gender
    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };
    // Event handler for capturing the selected interests as an array
    const handleInterestsChange = (e) => {
        const interest = e.target.value;
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((i) => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };
    // hobbies
    const handleHobbiesChange = (selectedOptions) => {
        setSelectedHobbies(selectedOptions);
    };
    // cratable skills
    const handleSkillsChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions);
    };
    // experience range
    const handleExperienceChange = (e) => {
        setExperience(e.target.value);
    };
    // experience input
    const handleExperienceInputChange = (e) => {
        setExperienceInput(parseInt(e.target.value, 10));
    };
    // color
    const handleBorderColorChange = (e) => {
        setSelectedBorderColor(e.target.value);
    };
    // image
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };
    

    const handleFormSubmit =async (e) => {
        // make an axios.post request and send these consoled values to the given endpoint
        e.preventDefault();
        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        console.log(dob)
        console.log(dob ? dob.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null);
        console.log(phoneNumber);
        console.log(selectedCountry)
        console.log(selectedGender)
        console.log(selectedInterests);
        console.log(selectedHobbies);
        console.log(selectedSkills);
        console.log(experience)
        console.log(selectedBorderColor)
        console.log(profileImage)

        // sending this form data to axios end point
        // Prepare the data object with form fields
        const formData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            dob: dob ? dob.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null,
            phoneNumber,
            selectedCountry,
            selectedGender,
            selectedInterests,
            selectedHobbies,
            selectedSkills,
            experience,
            selectedBorderColor,
        };
        // Create a FormData object to handle file upload (Profile Image)
        const formDataUpload = new FormData();
        formDataUpload.append('profileImage', profileImage);

        // Loop through the formData object and append each key-value pair to formDataUpload
        Object.entries(formData).forEach(([key, value]) => {
            formDataUpload.append(key, value);
        });

        try {
            // Send the POST request to the specified URL
            const response = await axios.post('http://localhost:8000/api/v1/register', formDataUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the appropriate Content-Type for file upload
                },
            });

            // Handle the response
            console.log('Response:', response.data); // Log the response data
            if(response.data){
                alert("user registered successfully")
                // useNavigate hook from react-router-dom to redirect it login page
                navigate('/login')
            }
            // Additional logic based on response if needed
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            // Additional error handling logic if needed
        }
    }

    return (
        <>
            <div className="container py-4 px-4 my-4 bg-dark text-white">
                <form onSubmit={handleFormSubmit} style={{ backgroundColor: `${selectedBorderColor}` }}>
                    <h4 className="text-center text-warning">User Register Form</h4>
                    {/* first name */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleFirstNameChange}
                        />
                    </div>
                    {/* last name */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleLastNameChange}
                        />
                    </div>
                    {/* email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleEmailChange}
                        />
                    </div>
                    {/* password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {/* confirm password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    {/* dob */}
                    <div className="mb-3">
                        <DatePicker
                            selected={dob}
                            onChange={handleDateChange}
                            placeholderText="Date of Birth"
                            className="form-control"
                            id="dob"
                            name="dob"
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={50}
                            showTimeInput
                        />
                    </div>
                    {/* phone number */}
                    {/* country selector */}
                    <div className="mb-3">country
                        <select
                            value={selectedCountry}
                            onChange={(e) => handleCountryChange(e.target.value)}
                            className="form-control"
                        >
                            <option value="">Select Country</option>
                            <option value="PK">Pakistan</option>
                            <option value="RU">Russia</option>
                            <option value="US">United States</option>
                            {/* Add more countries as needed */}
                        </select>
                    </div>
                    <div className="mb-3">
                        <PhoneInput
                            placeholder="Phone Number +92"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            defaultCountry="PK"
                            country={selectedCountry}
                        />
                    </div>
                    {/* Gender radio buttons */}
                    <div className="mb-3">
                        <label>Gender:</label>
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={selectedGender === 'male'}
                                onChange={handleGenderChange}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={selectedGender === 'female'}
                                onChange={handleGenderChange}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    {/* select your interests - you may choose more than one*/}
                    <div className="mb-3">
                        <label>Interests:</label>
                        <div>
                            <input
                                type="checkbox"
                                id="javascript"
                                name="interests"
                                value="JavaScript"
                                checked={selectedInterests.includes('JavaScript')}
                                onChange={handleInterestsChange}
                            />
                            <label htmlFor="javascript">JavaScript</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="php"
                                name="interests"
                                value="PHP"
                                checked={selectedInterests.includes('PHP')}
                                onChange={handleInterestsChange}
                            />
                            <label htmlFor="php">PHP</label>
                        </div>
                    </div>

                    {/* now select hobbies - by using react-select library */}
                    {/* cricket, chess,  football */}
                    <div className="mb-3">
                        <label>Hobbies:</label>
                        <Select
                            isMulti
                            options={hobbiesOptions}
                            value={selectedHobbies}
                            onChange={handleHobbiesChange}
                            className='bg-warning'
                        />
                    </div>
                    {/* creatable */}
                    <div className="mb-3">
                        <label>Skills:</label>
                        <Creatable
                            isMulti
                            options={skillsOptions}
                            value={selectedSkills}
                            onChange={handleSkillsChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Years of Experience:</label>
                        <input
                            type="range"
                            min="0"
                            max="30"
                            value={experienceInput}
                            onChange={(e) => {
                                handleExperienceInputChange(e);
                                setExperience(e.target.value);
                            }}
                            className="form-control-range"
                        />
                        <span>{experienceInput} years</span>
                    </div>
                    {/* experience input */}
                    <div className="mb-3">
                        <label>Years of Experience (Numeric):</label>
                        <input
                            type="number"
                            min="0"
                            max="30"
                            value={experienceInput}
                            onChange={handleExperienceInputChange}
                            className="form-control"
                        />
                    </div>

                    {/* form backGround color */}
                    <div className="mb-3">
                        <label>Change background Color:</label>
                        <input
                            type="color"
                            value={selectedBorderColor}
                            onChange={handleBorderColorChange}
                            
                        />
                    </div>
                    {/* Profile Image Upload */}
                    <div className="mb-3">
                        <label>Profile Image:</label>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={handleProfileImageChange}
                            className="form-control-file"
                            name='profileImage'
                        />
                    </div>
                    
                    {/* submit */}
                    <div className="mb-3 text-center">
                        <button className="btn btn-primary form-control" type="submit" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Register