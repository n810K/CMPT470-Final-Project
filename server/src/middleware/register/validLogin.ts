export default async (request, respond, next) => {
  const { email, password } = request.body

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
  }

  if (request.path === "/login") {
    if (![email, password].every(Boolean)) {
      return respond.status(401).json("Missing Credentials")
    } else if (!validEmail(email)) {
      return respond.status(401).json("Invalid Email")
    }
  }

  next()
}
