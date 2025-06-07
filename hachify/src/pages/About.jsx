



const About = () => {

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <h1 className="text-4xl mt-10 md:text-6xl md:mb-25">ABOUT US</h1>
            <div className="flex flex-col justify-center items-center md:space-x-15 md:flex-row md:justify-center md:items-center">
                <img 
                    src="src/img/doro-bg.png" 
                    alt="doro" 
                    className="size-52 w-100 my-10 " 
                />
                <div className="flex flex-col w-100 indent-3 space-y-5  md:justify-center md:items-center">
                    <p className="text-base/6 text-justify text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quidem placeat beatae, itaque sapiente aspernatur.</p>
                    <p className="text-base/6 text-justify text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. At tempora ducimus magni! Quos dolores quo deserunt nostrum sint, molestias, culpa deleniti ad blanditiis, qui sit aliquam officiis sequi modi ea?</p>
                </div>
            </div>
        </div>
    )
}

export default About;