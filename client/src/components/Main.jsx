import React from "react";
import { Link } from "react-router-dom"; // Correct import

const Main = () => {
    return (
        <div className="flex flex-col items-center justify-center m-0 font-extraabold lg:w-full h-100vh w-contain md:m-0 ">
            <div className="flex flex-col space-y-4 lg:w-full">
                <h1 className="text-[8rem] sm:text-[0rem] lg:text-[5rem] flex flex-col text-center justify-center items-center pt-14 text-white font-serif">
                    DIPLOMATIC LAWN CARE
                </h1>

                <h2 className="text-[3.5rem] pt-10 text-center flex flex-col justify-center items-center text-white">
                    Full-service property maintenance company.
                    <br /> Devoted to providing prompt, professional lawn care and detailed{" "}
                    <br />
                    clean-up services to <br />
                    Richmond, Henrico, and surrounding counties.
                </h2>
            </div>

            <div className="flex flex-col items-center justify-center pt-14">
                <button className="items-center justify-center px-4 py-4 mb-16 text-[2.5rem] text-center text-white bg-red-500 rounded-md">
                    <a href="/estimate">GET A FREE ESTIMATE</a>
                </button>
            </div>
        </div>
    );
};

export default Main;
