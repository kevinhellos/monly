// This is the common container
// Used to provide consistent padding y axis throughout

function Container({ children } : { children : React.ReactNode }) {
    return (
      <div className="flex justify-center min-h-screen px-5">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </div>
    )
}
  
export default Container;