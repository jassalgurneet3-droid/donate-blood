Create a complete **blood donation platform named "Find Blood"** using **React.js for the frontend and Node.js (Express.js) for the backend**. Do **not use any other programming language or framework** besides JavaScript, React, and Node.js.

The website should connect blood donors with people who need blood and include the following features.

Frontend Requirements (React):

* Build the frontend using **React with functional components and hooks**.
* Use **React Router** for navigation.
* Use **TailwindCSS** for styling.
* Implement **smooth animations and transitions using Framer Motion**.
* Make the website **fully responsive for mobile, tablet, and desktop**.

Navigation Menu:
The header should include the following pages:

1. Find Blood (Home page)
2. Become a Donor
3. Find Nearby Centre
4. Register / Login

Pages and Features:

Home Page:

* Hero section with blood donation message
* Blood group search dropdown
* Location search input
* List of available donors
* Quick action cards (Become a Donor, Find Blood Bank, Emergency Request)

Become a Donor Page:

* Information about benefits of donating blood
* Eligibility requirements
* Step-by-step process of donation
* Call-to-action button to register as donor

Blood Compatibility Page:

* Dropdown to select blood group
* Show which blood groups the selected group can donate to
* Show which blood groups the selected group can receive from
* Display a full compatibility table

Nearby Donation Centre Page:

* Show blood banks and hospitals near the user
* Use browser **Geolocation API** to get latitude and longitude
* Display centres on a map (Google Maps or simulated map)
* Show centre name, address, phone number, and working hours

Authentication System:

* Registration and login system
* OTP verification using **email or phone**
* OTP input with 6-digit verification
* After OTP verification redirect user to signup form

Signup Form:
The signup form should include the following sections.

Personal Information:

* Full Name (required)
* Gender (required)
* Age (18–65)
* Weight (minimum 50kg)
* City
* State
* Pincode

Contact Information:

* Phone number (auto-filled after OTP)
* Alternate phone number
* Email address (auto-filled)

Location Access:

* Checkbox to allow GPS location
* Capture and store latitude and longitude

User Type Selection:

* Donor
* Beneficiary

Donor Fields (shown when donor selected):

* Have Tattoo (Yes/No)
* Last Blood Donation Date
* Emergency Donation Availability
* Medical Circumstances
* Preferred Donation Location
* Willing to Travel Distance (5km / 10km / 20km)

Beneficiary Fields:

* Patient / Family Member / Hospital Staff
* Hospital Name

Eligibility Check Page:
After form submission show eligibility result based on:

* Age between 18 and 65
* Weight minimum 50kg
* Donation gap (90 days male, 120 days female)
* Tattoo wait period of 1 year

Display:

* Eligible or Not Eligible message
* Individual rule checks
* Next eligible donation date if not eligible

Backend Requirements (Node.js):

* Use **Node.js with Express.js**
* Create REST APIs for:

  * User registration
  * Login
  * OTP verification
  * Donor registration
  * Blood search
  * Nearby centres
* Store data in **MongoDB**
* Store user details, donor details, and location coordinates
* Implement validation and error handling

Additional Requirements:

* Use a **red-themed medical UI design**
* Implement **animations and hover effects**
* Ensure clean component structure
* Follow best practices for React and Node.js
* Code should be modular and production ready

The final result should be a **complete full-stack blood donation platform built only with React.js and Node.js**.
