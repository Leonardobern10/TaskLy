import InputWithLabel from "@/components/form/InputWithLabel";
import HeaderSection from "@/components/header/HeaderSection";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { Controller } from "react-hook-form";

export default function Login() {
  const { handleSubmit, control, errors, onSubmit } = useLogin();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md bg-card shadow-sm rounded-xl p-8 border">
        {/* Header */}
        <HeaderSection
          title="Entrar"
          text="Ainda não tem conta? Cadastre-se"
          linkTo="/auth/register"
        />

        {/* Form */}
        <form
          className="flex flex-col gap-6 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="email"
                inputType="email"
                label="E-mail"
                placeholder="Digite seu email"
                error={errors.email}
                {...field}
                primaryColor
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="password"
                inputType="password"
                label="Senha"
                placeholder="Digite sua senha"
                error={errors.password}
                {...field}
                primaryColor
              />
            )}
          />

          {/* Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={Object.keys(errors).length > 0}
            className="w-full mt-2 cursor-pointer"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
