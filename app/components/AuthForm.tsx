'use client'

import { BsGithub, BsGoogle } from 'react-icons/bs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useCallback, useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';

import AuthSocialButton from './AuthSocialButton';
import Button from './Button';
import Input from './Input/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
            console.log('Authenticated')
        }
    }, [session?.status, router]);


    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            // Axios Register
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong'))
                .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            // NextAuth sign in
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials');
                    }

                    if (callback?.ok && !callback?.error) {
                        toast.success('Logged in');
                        router.push('/users');
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {
            redirect: false
        }).then((callback) => {
            if (callback?.error) {
                toast.error('Invalid Credentials')
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Logged in')
            }
        })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                className="
          bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
          "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            id="name"
                            label="Nombre de usuario"
                        />
                    )}
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        id="email"
                        label="Correo electronico"
                        type="email"
                    />
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        id="password"
                        label="Contraseña"
                        type="password"
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {variant === 'LOGIN' ? 'Iniciar sesion' : 'Registrarme'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                  absolute 
                  inset-0 
                  flex 
                  items-center
                "
                        >
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                O puedes iniciar sesion con
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div
                    className="
              flex 
              gap-2 
              justify-center 
              text-sm 
              mt-6 
              px-2 
              text-gray-500
            "
                >
                    <div>
                        {variant === 'LOGIN' ? '¿Es la primera vez que chateas?' : '¿Ya tienes una cuenta?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Crear cuenta' : 'Iniciar sesion'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm