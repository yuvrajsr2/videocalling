import React from 'react';
import { ShipWheelIcon } from 'lucide-react';

const SignUpPage = () => {

  const [signupData, setSignupData] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });


  const handleSignup = (e) => {
    e.preventDefault();
    // signup logic here
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme='forest'>
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
      rounded-xl shadow-lg overflow-hidden'>

        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col '>
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />

            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary
            to-secondary tracking-wider'>View</span>

          </div>

          <div className='w-full flex-1'>
            <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Create an account</h2>
                  <p className='text-sm opacity-70'>HAVE FUN AND CALL YOUR FRIENDS</p>

                </div>
                <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text '>Full Name</span>
                    </label>

                    <input type="text"
                      placeholder="Emma Stone"
                      className='input input-bordered w-full'
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text '>Email</span>
                    </label>

                    <input type="email"
                      placeholder="emma@gmail.com"
                      className='input input-bordered w-full'
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text '>Password</span>
                    </label>

                    <input type="password"
                      placeholder="••••••••"
                      className='input input-bordered w-full'
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />

                    <p className='text-xs opacity-70 mt-1'>Password must be at least 6 characters</p>
                  </div>

                  <div className='form-control '>
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input type="checkbox" className='checkbox checkbox-sm' required />
                      <span className='text-xs leading-tight'>
                        I agree to the {" "}
                        <span className='text-primary hover:underline'>terms of service</span> and {" "}
                        <span className='text-primary hover:underline'>privacy policy</span>


                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>


      </div>

    </div>
  )
}

export default SignUpPage
