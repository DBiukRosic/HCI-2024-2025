import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources • CAR(E)",
  description: "Explore a variety of car maintenance resources and guides provided by CAR(E).",
};

function Resources(){
    return(
    <main className='flex justify-center text-4xl p-14'>
        <h1>Resources</h1>
      </main>
    )
}

export default Resources;