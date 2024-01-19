'use client'
import { Button } from '@/components/ui/button'
import { signIn, signUp } from "@/lib/actions/auth";
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
      Sign In
    </Button>
  )

}

const initialState = {
  errors: {},
  message: null
}

export function AuthForm({ message }: { message?: string }) {
  const [state, dispatch] = useFormState(signIn, initialState)

  return (

    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={dispatch}
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <SubmitButton />
      <button
        formAction={signUp}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
      >
        Sign Up
      </button>
      {message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {message}
        </p>
      )}
    </form>
  )
}
