import { Metadata } from "next"
 
export const metadata: Metadata = {
  title: "Error 404 | Page not found",
  description: "The page you're looking found could not be found",
}

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="mt-[35vh] text-xl font-medium">Error 404 | Page not found</h1>
      <p className="mt-5">
        The page you"re looking found could not be found
      </p>
    </div>
  );
}

export default NotFound;