/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { createUser } from '@/redux/Features/user/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useCreateUserMutation } from '@/redux/Features/Products/ProductApi';
import { toast, Toaster } from 'react-hot-toast';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  email: string;
  phoneNumber: string;
  password?: string;
}

interface SuccessResponse {
  data: {
    message: string;
  };
}

interface ErrorResponse {
  error: {
    data: {
      message: string;
    };
  };
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const [createUser, { isSuccess, isLoading, isError }] =
    useCreateUserMutation();

  const onSubmit = async (data: SignupFormInputs) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
    console.log(data);

    if (!passwordRegex.test(data.password!)) {
      toast.error(
        'Invalid password! Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return; // Exit the function if the password is invalid
    }
    const result = await createUser(data);
    console.log(result);

    if ('data' in result) {
      console.log('inside condition');
      toast.success(result.data.message!);
    } else if ('error' in result) {
      if ('error' in result.error) {
        const errorData = result.error.data as any;
        toast.error(errorData.message);
      }
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="phoneNumber"
              placeholder="phone number"
              type="number"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('phoneNumber', { required: 'Number is required' })}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button>Create Account</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}
