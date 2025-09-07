import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile • CAR(E)",
  description: "Manage your user profile and account settings on CAR(E).",
};

function User_profile(){
    return(
    <main className='flex justify-center text-4xl p-14'>
        <h1>User Profile</h1>
      </main>
    )
}

export default User_profile;