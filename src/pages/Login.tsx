import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bloodType: z.string().optional(),
  age: z.string().optional(),
  dateOfBirth: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const Login = () => {
  const { signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  // Sign In state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState<string | null>(null);
  const [isSignInSubmitting, setIsSignInSubmitting] = useState(false);

  // Sign Up state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUpSubmitting, setIsSignUpSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  // Sign In handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignInSubmitting(true);
    setSignInError(null);
    const result = await signIn(email, password);
    setIsSignInSubmitting(false);
    if (result.success) {
      navigate("/");
    } else {
      setSignInError(result.error || "Login failed");
    }
  };

  // Sign Up handler
  const onSignUp = async (data: SignUpFormData) => {
    setIsSignUpSubmitting(true);
    try {
      const result = await signUp(data.email, data.password, {
        full_name: data.fullName,
        username: data.username,
        blood_type: data.bloodType,
        age: data.age,
        date_of_birth: data.dateOfBirth,
      });
      if (result.success) {
        navigate('/login', {
          state: { message: 'Account created successfully! Please check your email to verify your account.' },
        });
      }
    } catch (error) {
      // error handled by context
    } finally {
      setIsSignUpSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl space-y-4 sm:space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">WE CARE</h1>
            <p className="text-sm sm:text-base text-gray-600">Your Complete Healthcare Companion</p>
          </div>
        </div>

        {/* Login/Signup Form */}
        <Card className="shadow-lg border-0">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="space-y-1 pb-3 sm:pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="text-xs sm:text-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-xs sm:text-sm">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* Sign In Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-10 sm:h-11 text-sm sm:text-base"
                      disabled={isSignInSubmitting || loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-10 sm:h-11 text-sm sm:text-base"
                      disabled={isSignInSubmitting || loading}
                    />
                  </div>
                  {signInError && <p className="text-sm text-red-500">{signInError}</p>}
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button type="submit" className="w-full h-10 sm:h-11 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-sm sm:text-base" disabled={isSignInSubmitting || loading}>
                    {isSignInSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center px-2">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSubmit(onSignUp)} className="space-y-4">
                <CardContent className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      {...register('fullName')}
                      className={errors.fullName ? 'border-red-500' : ''}
                      disabled={isSignUpSubmitting || loading}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      {...register('username')}
                      className={errors.username ? 'border-red-500' : ''}
                      disabled={isSignUpSubmitting || loading}
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">{errors.username.message}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      {...register('email')}
                      className={errors.email ? 'border-red-500' : ''}
                      disabled={isSignUpSubmitting || loading}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        {...register('password')}
                        className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                        disabled={isSignUpSubmitting || loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                        disabled={isSignUpSubmitting || loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                  {/* Blood Type */}
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type (Optional)</Label>
                    <Select onValueChange={(value) => setValue('bloodType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (Optional)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      {...register('age')}
                      min="1"
                      max="120"
                      disabled={isSignUpSubmitting || loading}
                    />
                  </div>
                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth (Optional)</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...register('dateOfBirth')}
                      disabled={isSignUpSubmitting || loading}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3" disabled={isSignUpSubmitting || loading}>
                    {isSignUpSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center px-2">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
