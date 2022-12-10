The sign-up form is the unique one. It requires multistep fields filling with validation support.

You should know three basic things about this form:
1. Each screen works as an independent form with its own validations.
2. Screens get control functions from "useSteps" and call them when they are needed.
3. All data is placed in FormDataContext and used to do registration requests on the form level.