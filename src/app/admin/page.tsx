import React from "react";
import { AuroraBackground } from "@/components/aceternity-ui/aurora-background";
import LoginForm from './_components/login-form';

const AdminSignIn = () => {
  return (
    <AuroraBackground>
      <div className="w-full relative z-50 grid md:grid-cols-10 grid-cols-1 md:px-60 px-10 gap-40">
        <div className="w-full md:col-span-6">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Grow your business with{" "}
            <span className="text-orange-600">1 Market Philippines</span> today!
          </h2>
          <p className="text-sm md:text-lg text-neutral-700 dark:text-neutral-400">
            If you are a retailer, brand or business with products to sell, you
            can sell on{" "}
            <span className="text-orange-600">1 Market Philippines</span> no
            matter how many products you have. We can help accelerate your
            traffic.
          </p>
        </div>
        <div className="md:col-span-4 w-full">
          <div className="bg-white shadow-lg border px-6 py-6 rounded-md">
            <h3 className="text-2xl">Login</h3>
            <p className='text-muted-foreground'>Please enter your information to sign in.</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default AdminSignIn;
