import { RegisterForm } from '@/components/auth/RegisterForm';
import heroFood from '@/assets/hero-food.jpg';

const Register = () => {
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
              Junte-se a nós
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Crie sua conta e comece a fazer pedidos incríveis
            </p>
            <div className="text-lg opacity-80">
              Experiência gastronômica única
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-subtle">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Food Delivery
            </h1>
            <p className="text-muted-foreground mt-2">Crie sua conta</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;