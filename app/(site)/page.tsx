import AuthForm from '../components/AuthForm'
import Image from 'next/image'

export default function Home() {
    return (
        <div className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
      ">
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <Image
                    alt='Logo'
                    height='100'
                    width='100'
                    className='mx-auto w-auto'
                    src='/images/logo-solution.png'
                />
                <h2 className='
                mt-6
                text-center
                text-3xl
                font-bold
                tracking-light
                text-gray-900
                '>
                    Inicia sesion para chatear
                </h2>
            </div>

            {/*AuthForm */}
            <AuthForm />
        </div>
    )
}
