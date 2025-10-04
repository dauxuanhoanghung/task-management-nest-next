'use client'

import { useActionState, useState } from 'react'
import { Button } from '@repo/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card'
import { Label } from '@repo/ui/components/ui/label'
import { Input } from '@repo/ui/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { register } from '../services/account-service'

interface RegisterState {
  loading: boolean
  error?: string | null
  success?: boolean
}

const registerAction = async (
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!email || !password) {
    return { loading: false, error: 'Email and password are required.' }
  }

  if (password !== confirmPassword) {
    return { loading: false, error: 'Passwords do not match.' }
  }

  try {
    const account = await register({ email, password })

    if (account) {
      return { loading: false, success: true }
    }

    return { loading: false, error: 'Registration failed. Please try again.' }
  } catch (error: any) {
    return {
      loading: false,
      error:
        error?.message ||
        'Unexpected error occurred. Please try again later.',
    }
  }
}

// 🧩 Component chính
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, isPending] = useActionState(registerAction, {
    loading: false,
    error: null,
    success: false,
  })

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted/40 p-4'>
      <Card className='w-md bg-white p-8 border border-gray-200 rounded-2xl shadow-sm'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            Create Account
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your email and password to register
          </CardDescription>
        </CardHeader>

        <form action={formAction}>
          <CardContent className='space-y-4 mb-4'>
            {/* Email */}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='example@email.com'
                disabled={isPending}
                required
                className='rounded-lg py-2 pl-3'
              />
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  disabled={isPending}
                  required
                  className='rounded-lg py-2 pl-3 pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOffIcon className='h-4 w-4' />
                  ) : (
                    <EyeIcon className='h-4 w-4' />
                  )}
                  <span className='sr-only'>
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <div className='relative'>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  disabled={isPending}
                  required
                  className='rounded-lg py-2 pl-3'
                />
              </div>
            </div>

            {/* Error / Success messages */}
            {state.error && (
              <p className='text-red-500 text-sm text-center'>{state.error}</p>
            )}
            {state.success && (
              <p className='text-green-600 text-sm text-center'>
                Registration successful!
              </p>
            )}
          </CardContent>

          <CardFooter className='flex flex-col space-y-4'>
            <Button
              type='submit'
              className='w-full bg-black text-white rounded-lg py-2.5'
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'Register'}
            </Button>
            <p className='text-sm text-center text-muted-foreground'>
              Already have an account?{' '}
              <a
                href='/login'
                className='text-primary hover:underline font-medium'
              >
                Log in here
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterForm
