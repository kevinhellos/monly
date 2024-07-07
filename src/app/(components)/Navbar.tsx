import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { getFirstLetterCapitalized } from "../(utils)/utils";

export default function Navbar() {

  return (
    <div className="navbar bg-transparent">
      <div className="flex-1">
        <Link 
          href="/dashboard"
          className="btn btn-ghost hover:bg-transparent text-xl">
         <img
            src="/assets/imgs/money.png"
            width={35}
            alt="Monly Expense Tracker"
            className="mx-auto"
          />
          Monly
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-transparent"
          >
            <div className="w-10 rounded-full bg-[#28704F] text-xl font-light text-white py-[0.35rem]">
              {getFirstLetterCapitalized(String(auth?.currentUser?.email))}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-1 shadow"
          >
            <li className="menu-title font-medium text-xs">
              {auth?.currentUser?.email}
            </li>
            <li>
              <a className="rounded-md p-2 px-3 hover:text-red-600"
                onClick={() => {
                  try {
                    signOut(auth);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <LogOut className="me-2" size={18}/>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
