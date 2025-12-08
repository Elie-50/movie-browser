import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="flex justify-center flex-col gap-4">
      <h1 className="text-center text-3xl">Oopsie! It looks like this page doesn't exist.</h1>
      <Link
        className="animated-gradient-link text-center font-semibold"
        to="/"
      >
        Go to Homepage
      </Link>
    </div>
  )
}

export default NotFoundPage
