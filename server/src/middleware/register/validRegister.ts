export default async (request, respond, next) => {
  const { email, name, password } = request.body

  // valid email format using regex
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
  }
  function validUsername(name) {
    return /^[0-9a-zA-Z_.-]+$/.test(name)
  }

  if (request.path === "/register") {
    //check for empty values in the fields
    if (![email, name, password].every(Boolean)) {
      //if any values above are empty, then return missing creds
      return respond.status(401).json("Missing credentials")
    } else if (!validUsername(name)) {
      return respond.status(401).json("Invalid Username")
    }
    // if all values are filled, check if the email is valid...ie. test@email.com
    else if (!validEmail(email)) {
      return respond.status(401).json("Invalid Email")
    }
  }
  next()
}
