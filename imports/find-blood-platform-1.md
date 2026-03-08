Create a complete **blood donation platform named "Find Blood"** using a **React-based frontend and Node.js backend**. The project must use **only JavaScript technologies**. Do not use any other programming languages such as Python, PHP, Java, or frameworks like Django, Laravel, or Spring.

Frontend Requirements:

* Build the frontend using **React (component-based architecture)**.
* Use **functional components and React hooks**.
* Use **React Router for page navigation**.
* Use **TailwindCSS for styling**.
* Use **Framer Motion (Motion) for animations and transitions**.
* Ensure the design is **fully responsive for mobile, tablet, and desktop**.

Navigation Menu:
The header navigation should contain:

* Find Blood (Home)
* Become a Donor
* Find Nearby Centre
* Register / Login

Pages and Features:

Home Page:

* Hero section promoting blood donation
* Blood group search dropdown
* Location search input
* Display list of available donors
* Quick action cards such as Become a Donor, Emergency Blood Request, Find Blood Bank

Become a Donor Page:

* Explain benefits of donating blood
* Display eligibility requirements
* Show a step-by-step donation process
* Include a call-to-action button to register

Blood Compatibility Page:

* Blood group selection dropdown
* Show compatible blood groups for donation
* Show compatible blood groups for receiving blood
* Display a full compatibility table

Nearby Donation Centre Page:

* Show nearby hospitals or blood banks
* Use **browser Geolocation API** to capture user latitude and longitude
* Display centres on a map interface
* Show centre details such as name, address, phone number, and working hours

Authentication System:

* Implement login and registration system
* Allow OTP verification through **email or phone number**
* Provide a **6-digit OTP input verification screen**
* After successful OTP verification, redirect the user to the signup form

Signup Form:
Include the following sections.

Personal Information:

* Full Name (required)
* Gender (required)
* Age (18–65)
* Weight (minimum 50 kg)
* City
* State
* Pincode

Contact Information:

* Phone number (auto-filled after OTP verification)
* Alternate phone number
* Email address (auto-filled after OTP verification)

Location Access:

* Checkbox to allow GPS location
* Capture and store latitude and longitude coordinates

User Type Selection:

* Donor
* Beneficiary

Donor Fields (shown when donor is selected):

* Tattoo status (Yes/No)
* Last blood donation date
* Emergency donation availability
* Medical circumstances
* Preferred donation location
* Travel distance preference (5 km, 10 km, 20 km)

Beneficiary Fields:

* Relationship with patient (Patient / Family Member / Hospital Staff)
* Hospital name

Eligibility Check Page:
After registration, display eligibility status based on:

* Age between 18 and 65
* Weight at least 50 kg
* Minimum donation gap (90 days for males, 120 days for females)
* Tattoo waiting period of 1 year

Show:

* Eligible or Not Eligible message
* Individual eligibility checks
* Next eligible donation date if not eligible

Backend Requirements:

* Build backend using **Node.js with Express**
* Create REST APIs for:

  * User registration
  * Login
  * OTP verification
  * Donor registration
  * Searching donors by blood group
  * Nearby donation centres
* Store data using **MongoDB database**
* Save user details, donor information, and location coordinates

Additional Requirements:

* Use a **red-themed medical UI design**
* Add smooth animations and hover effects
* Maintain clean component structure
* Follow best practices for React and Node.js
* The final project should be a **complete full-stack blood donation platform using React-based frontend and Node.js backend only**
