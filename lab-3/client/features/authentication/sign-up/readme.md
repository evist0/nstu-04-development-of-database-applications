Sign up form is the unique one. It requires multistep fields filling with validation support.

You should know 3 basic things about this form:
1. Each screen works as independent form with its own validations
2. Screens get control functions from "useSteps" and call them when its needed
3. All data is placed in FormDataContext and used to do registration request on Form level