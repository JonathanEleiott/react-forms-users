# React Forms && JSON Web Token

## Forms - allow users to input information

- Controlled Forms
  - links each input to a useState
  - all event listeners get passed in an event
  - we can use the event.target to get the element where the event occurred
  - we can use the event.target.value on an input to get what the user typed in
  - Setting up a form
    - onSubmit(function)
  - Setting up an input
    - Create a useState to save the value that the user will type in
    - Set the value of the input to the new useState variable
    - Set the onChange to a function that will run when the user types into the input field -> setUseState(event.target.value)

## Calling an API

- by default, fetch will make a GET request
- fetch takes in an optional second argument which will be an object
- fetch(URL, { key: value })
- KEYS for the optional object
  - method -> 'POST'
  - headers -> { "Content-Type": "application/json" }
  - body: JSON.stringify({ "name": "Barry Allen", "email": "TheFlash@aol.com"... })

## JWT (JSON Web Tokens) -> credentials that contain a header, payload (data), and a signature
