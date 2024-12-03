# Shared Input Component
The Shared Input Component is a React-based application designed to manage multiple dynamic forms. It supports adding, submitting, and removing forms with real-time validation and animations for notifications. The project uses React Toastify for displaying beautiful popups to inform users about form actions like successful submission, missing fields, or form removal. Each form’s data is stored in localStorage for persistence.
<h3>Features</h3>
<ul>
  <li>Dynamic Form Management:</li>

* Add multiple forms dynamically with unique IDs.
* Remove individual forms with real-time updates.
<li>Form Persistence:</li>

* Saves each form's data to localStorage for persistence across page reloads.
<li>Form Validation:</li>

* Ensures all fields are filled before submission with error notifications.
<li>Notification System:</li>

* Real-time success, error, info, and warning notifications using React Toastify.
<li>Field Types:</li>

* Text inputs, textarea, checkboxes (multi-selection), and radio buttons.
<li>Responsive UI:</li>

* Styled with CSS for a clean and user-friendly interface.
</ul>
# Website Looks Like...
![Screenshot 2024-12-03 103753](https://github.com/user-attachments/assets/a70b797c-391c-47bd-8de8-b6239296ecc5)


# Implementation 
1. Step 1: Clone the Repository
  * git clone https://github.com/your-username/shared-input-component.git
  * cd shared-input-component
2. Step 2: Install Dependencies
* Install the required packages using npm:
npm or bun install
3. Step 3: Run the Application
* Start the development server: bun or npm run dev
4. Step 4: Adding React Toastify
 * If React Toastify is not already installed, install it using:npm or bun install react-toastify


# How It Works
1. Form Initialization:

* When the app loads, it retrieves previously saved forms from localStorage and initializes them.
* If no forms are found, it creates an initial blank form.
2. Form Actions:

* Add Form: Generates a new form with unique ID and empty fields.
R* emove Form: Deletes a specific form from the UI and localStorage.
* Submit Form: Validates and saves the form data to localStorage.
3. Notifications:

* Displays a success message when data is successfully submitted.
* Warns the user if they attempt to submit with empty fields.
* Confirms when a form is added or removed.
4. Data Persistence:

* Uses localStorage to save each form's data under unique keys (formData-ID).
