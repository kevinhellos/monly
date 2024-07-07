import LoginProvider from "./LoginProvider";

const login = () => {

  return (
    <div className="flex justify-center items-center bg-slate-50 h-screen">
      <div className="card w-96 bg-base-100">
        <div className="card-body p-10">
          
          <img
            src="/assets/imgs/money.png"
            width={55}
            alt="Monly Expense Tracker"
            className="mx-auto"
          />
          <h2 className="text-xl font-medium mb-0 mt-3 text-center font-sans">
           Monly
          </h2>
          <p className="mb-3 text-center text-sm">Please sign in to continue</p>

          <LoginProvider
            provider="g"
          />

        </div>
      </div>
    </div>
  );
}
 
export default login;