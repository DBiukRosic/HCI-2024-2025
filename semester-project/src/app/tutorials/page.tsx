import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorials • CAR(E)",
  description: "Explore a variety of car maintenance tutorials and guides provided by CAR(E).",
};

function Tutorials(){
    return(
    <main className='flex justify-center text-4xl p-14'>
        <h1>Tutorials</h1>
      </main>
    )
}

export default Tutorials;