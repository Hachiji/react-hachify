import { SiGmail, SiFacebook, SiGithub, } from 'react-icons/si'
import { FiPhone } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <h1 className="text-rose-400 text-3xl md:text-5xl mb-5 md:mb-10">CONTACT US</h1>
            <div className="flex gap-6 justify-center items-center">
                <a 
                    href="https://github.com/Hachiji" 
                    className="hover:wiggle-10 hover:scale-150 transition-all duration-300 ease-in-out" 
                    target='_blank'
                >
                    <SiGithub size={30} color='#181717'/>
                </a>

                <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=marloujerezon.anhs@gmail.com&su=Inquiry" 
                    className="hover:wiggle-10 hover:scale-150 transition-all duration-300 ease-in-out" 
                    target='_blank'
                >
                    <SiGmail size={30} color='#EA4335'/>
                </a>

                <a 
                href="https://web.facebook.com/mjjerezon" 
                className="hover:wiggle-10 hover:scale-150 transition-all duration-300 ease-in-out" 
                target='_blank'
                >
                    <SiFacebook size={30} color='#1877F2'/>
                </a>
                
                
                
            </div>
                <div className="flex justify-center items-center gap-3 mt-5 md:mt-10">
                    <FiPhone size={30} color='#000'/><span className='text-gray-500 hover:underline hover:underline-offset-2 transition-all duration-200 ease-in-out'>+639398331682</span>
                </div>
        </div>
    )
}

export default Contact;