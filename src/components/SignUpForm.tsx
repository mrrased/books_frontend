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
import { toast, Toaster } from 'react-hot-toast';
import { createUser } from '@/redux/Features/user/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Puff } from 'react-loader-spinner';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  email: string;
  phoneNumber: string;
  password?: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: SignupFormInputs) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
    console.log(data);

    if (!passwordRegex.test(data.password!)) {
      toast.error(
        'Invalid password! Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return;
    }
    setIsLoading(true);
    await dispatch(
      createUser({
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      })
    ).then((r) => {
      if (r.meta.requestStatus === 'fulfilled') {
        toast.success('User Created Successful');
        setIsLoading(false);
        reset();
      } else {
        toast.error('Somthing went wrong');
        setIsLoading(false);
      }
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Toaster />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
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
      )}
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
