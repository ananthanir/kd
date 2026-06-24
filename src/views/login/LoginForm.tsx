// views/login/LoginForm.tsx

'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CAPTCHA_CHARS, USER_TYPES } from '@/constants/login/userTypesConstants'


const generateCaptcha = (): string =>
    Array.from({ length: 5 }, () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]).join(' ')

type Props = {
    userType: string
    onUserTypeChange?: (id: string) => void
    mobileMode?: boolean
}

const LoginForm = ({ userType, onUserTypeChange, mobileMode = false }: Props) => {
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [captcha, setCaptcha] = useState<string>(generateCaptcha)
    const [captchaInput, setCaptchaInput] = useState('')

    const refreshCaptcha = useCallback(() => {
        setCaptcha(generateCaptcha())
        setCaptchaInput('')
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const match = USER_TYPES.find(t => t.id === userType)
        router.push(match?.redirect ?? '/home')
    }

    return (
        <div className='flex flex-col gap-3'>
            {/* Section heading */}
            <div className='flex items-center gap-3'>
                <div className='flex-1 h-[1.5px] bg-kuhs-primary' />
                <div className='flex items-center gap-2'>
                    <i className='ri-lock-line text-kuhs-primary text-base' aria-hidden='true' />
                    <span className='text-sm font-semibold text-kuhs-navy'>Login</span>
                </div>
                <div className='flex-1 h-[1.5px] bg-kuhs-primary' />
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3' noValidate>
                {/* Mobile-only: User Type dropdown */}
                {mobileMode && onUserTypeChange && (
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-semibold text-kuhs-navy'>User Type</label>
                        <div className='flex items-center border border-kuhs-border rounded-xl px-3 gap-2 bg-white focus-within:border-kuhs-primary transition-colors h-10'>
                            <i className='ri-user-settings-line text-kuhs-primary text-sm' aria-hidden='true' />
                            <select
                                value={userType}
                                onChange={e => onUserTypeChange(e.target.value)}
                                className='flex-1 text-sm text-kuhs-navy bg-transparent outline-none appearance-none cursor-pointer'
                            >
                                {USER_TYPES.map(type => (
                                    <option key={type.id} value={type.id}>{type.label}</option>
                                ))}
                            </select>
                            <i className='ri-arrow-down-s-line text-kuhs-primary text-sm' aria-hidden='true' />
                        </div>
                    </div>
                )}

                {/* User ID */}
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-semibold text-kuhs-navy'>User ID</label>
                    <div className='flex items-center border border-kuhs-border rounded-xl px-3 gap-2 bg-white focus-within:border-kuhs-primary transition-colors h-10'>
                        <i className='ri-user-line text-kuhs-primary text-sm' aria-hidden='true' />
                        <input
                            type='text'
                            placeholder='Enter your User ID'
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            className='flex-1 text-sm text-kuhs-navy bg-transparent outline-none placeholder:text-gray-400'
                        />
                    </div>
                </div>

                {/* Password */}
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-semibold text-kuhs-navy'>Password</label>
                    <div className='flex items-center border border-kuhs-border rounded-xl px-3 gap-2 bg-white focus-within:border-kuhs-primary transition-colors h-10'>
                        <i className='ri-lock-line text-kuhs-primary text-sm' aria-hidden='true' />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='flex-1 text-sm text-kuhs-navy bg-transparent outline-none placeholder:text-gray-400'
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(p => !p)}
                            className='text-gray-400 hover:text-kuhs-primary transition-colors'
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <i className={showPassword ? 'ri-eye-off-line text-sm' : 'ri-eye-line text-sm'} />
                        </button>
                    </div>
                </div>

                {/* Captcha */}
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-semibold text-kuhs-navy'>Captcha</label>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center px-3 py-2 rounded-lg border-2 border-dashed border-kuhs-primary bg-kuhs-primary-subtle min-w-[100px]'>
                            <span className='text-sm font-bold tracking-[0.18em] text-kuhs-navy select-none'>
                                {captcha}
                            </span>
                        </div>
                        <button
                            type='button'
                            onClick={refreshCaptcha}
                            className='text-kuhs-primary hover:rotate-180 transition-transform duration-300 shrink-0'
                            aria-label='Refresh captcha'
                        >
                            <i className='ri-refresh-line text-lg' />
                        </button>
                        <div className='flex-1 flex items-center border border-kuhs-border rounded-xl px-3 gap-2 bg-white focus-within:border-kuhs-primary transition-colors h-10'>
                            <i className='ri-shield-check-line text-kuhs-primary text-sm' aria-hidden='true' />
                            <input
                                type='text'
                                placeholder='Enter Captcha'
                                value={captchaInput}
                                onChange={e => setCaptchaInput(e.target.value)}
                                className='flex-1 text-sm text-kuhs-navy bg-transparent outline-none placeholder:text-gray-400'
                            />
                        </div>
                    </div>
                </div>

                {/* Forgot password */}
                <div className='flex justify-end'>
                    <a href='#' className='text-xs text-kuhs-primary hover:underline font-medium'>
                        Forgot Password?
                    </a>
                </div>

                {/* Login button */}
                <button
                    type='submit'
                    className='w-full flex items-center justify-center gap-2 bg-kuhs-primary hover:bg-kuhs-primary-dark active:scale-[0.98] text-white font-semibold py-2.5 rounded-xl transition-all text-sm'
                >
                    <i className='ri-lock-line' aria-hidden='true' />
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
