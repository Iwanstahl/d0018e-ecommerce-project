import React from 'react';

const About = () => {
  return (
    <div className="h-screen w-full bg-(--second-text-color) p-6 overflow-hidden">
      <div className="h-full w-full grid grid-cols-6 grid-rows-2 gap-6">
        
        {/* TOP LEFT */}
        <div className="col-span-4 row-span-1 border border-(--main-text-color) p-8 flex flex-col justify-between group cursor-default">
          <span className="text-[10px] uppercase tracking-[0.5em] text-(--main-text-color) opacity-40">ABOUT / 01</span>
          <h1 className="text-[6vw] font-bold uppercase leading-none tracking-tighter text-(--main-text-color) group-hover:text-(--hover-color) transition-colors duration-300">
            Built once.
          </h1>
        </div>

        {/* RIGHT BOX */}
        <div className="col-span-2 row-span-2 border border-(--main-text-color) bg-(--main-text-color) p-8 flex flex-col justify-between cursor-default group/right">
          <div className="flex flex-col gap-10">
            {/* Project Part */}
            <div className="space-y-4">
              <h2 className="text-l text-(--second-text-color) font-bold uppercase tracking-widest underline decoration-(--hover-color) underline-offset-4">Goal</h2>
              <p className="text-lg text-(--second-text-color) leading-snug opacity-90 group-hover/right:opacity-100 transition-opacity">
                A project in the course D0018E where the goal was to create an e-commerce website using a relational database.
              </p>
            </div>

            {/* Team Part */}
            <div className="space-y-4">
              <h2 className="text-l text-(--second-text-color) font-bold uppercase tracking-widest underline decoration-(--hover-color) underline-offset-4">
                The Team
              </h2>
              
              <ul className="text-[10px] text-(--second-text-color) space-y-4 uppercase tracking-tighter">
                <li className="hover:text-(--hover-color) transition-colors cursor-pointer group/name">
                  <div className="font-bold">Isak Wanstål</div>
                  <div className="lowercase opacity-50 group-hover/name:opacity-100 tracking-normal text-[9px]">isawan-3@student.ltu.se</div>
                </li>

                <li className="hover:text-(--hover-color) transition-colors cursor-pointer group/name">
                  <div className="font-bold">Edwin Bohlin</div>
                  <div className="lowercase opacity-50 group-hover/name:opacity-100 tracking-normal text-[9px]">edwboh-3@student.ltu.se</div>
                </li>

                <li className="hover:text-(--hover-color) transition-colors cursor-pointer group/name">
                  <div className="font-bold">Gegham Grigoryan</div>
                  <div className="lowercase opacity-50 group-hover/name:opacity-100 tracking-normal text-[9px]">geggri-2@student.ltu.se</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-[10px] text-(--second-text-color) uppercase tracking-widest opacity-40 leading-relaxed border-t border-(--second-text-color)/20 pt-4">
            Luleå University Of Technology / 2026
          </div>
        </div>

        {/* BOTTOM LEFT */}
        <div className="col-start-2 col-span-3 row-span-1 border border-(--main-text-color) p-8 flex flex-col justify-center group cursor-default">
          <p className="text-sm uppercase tracking-[0.2em] leading-relaxed text-(--main-text-color) group-hover:text-(--hover-color) transition-colors duration-300">
            Built for a few, <br />
            deployed once.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;