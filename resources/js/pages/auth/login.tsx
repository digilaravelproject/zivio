import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Sign In - ZIVIO Admin Portal" />

            {status && (
                <div className="rounded-md bg-emerald-50 border border-emerald-200/80 p-3 text-center text-xs font-semibold text-emerald-800">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold text-[#171512]">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="admin@zivio.com"
                                    className="h-10 text-xs bg-[#FAF9F5]/40 border-black/15 focus:border-[#8E755F] focus:bg-white transition"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-semibold text-[#171512]">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs text-[#8E755F] hover:text-[#171512] font-medium"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="h-10 text-xs bg-[#FAF9F5]/40 border-black/15 focus:border-[#8E755F] focus:bg-white transition"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-2.5 pt-1">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember" className="text-xs text-[#716C64] cursor-pointer select-none">
                                    Keep me signed in on this device
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-2 w-full h-10 text-xs font-semibold bg-[#171512] hover:bg-[#8E755F] text-white transition-all shadow-sm rounded-md"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <Spinner className="size-4 mr-2" />}
                                Sign In to Admin Portal
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Portal Authentication',
    description: 'Sign in with your authorized credentials to manage architectural lighting catalog & leads.',
};
