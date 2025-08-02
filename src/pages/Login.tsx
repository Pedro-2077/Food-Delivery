import { LoginForm } from '@/components/auth/LoginForm';
import heroFood from '@/assets/hero-food.jpg';

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <img
          src={heroFood}
          alt="Delicious Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6 animate-float">
              Delicious Food
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Faça seus pedidos de forma rápida e fácil
            </p>
            <div className="text-lg opacity-80">
              Sabores únicos, entrega rápida
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-subtle">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Food Delivery
            </h1>
            <p className="text-muted-foreground mt-2">Entre na sua conta</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;