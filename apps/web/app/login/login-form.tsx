'use client'

import { useActionState, useEffect } from "react"
import { Button } from "@repo/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Label } from "@repo/ui/components/ui/label"
import { Input } from "@repo/ui/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { login } from "../services/account-service"
import { redirect } from "next/navigation"

interface LoginState {
  loading: boolean
  error?: string | null
  success?: boolean
}

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const account = await login({ email, password })

    if (account) {
      redirect("/")
    }

    return { loading: false, error: "Invalid credentials" }
  } catch (error: any) {
    return {
      loading: false,
      error: error.message || "Login failed. Please try again.",
    }
  }
}


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, isPending] = useActionState(loginAction, {
    loading: false,
    error: null,
    success: false,
  })

  return (
    <Card className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>

      <form action={formAction}>
        <CardContent className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              disabled={isPending}
              className="rounded-lg py-2 pl-3"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isPending}
                className="rounded-lg py-2 pl-3 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isPending}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
          </div>

          {state.error && (
            <p className="text-red-500 text-sm text-center">{state.error}</p>
          )}
          {state.success && (
            <p className="text-green-600 text-sm text-center">
              Login successful!
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2.5"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary hover:underline font-medium">
              Sign up now
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm
