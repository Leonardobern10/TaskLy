import HeaderSection from "@/components/header/HeaderSection";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { useRegister } from "@/hooks/useRegister";
import InputWithLabel from "@/components/form/InputWithLabel";

export default function Register() {
  const { control, handleSubmit, onSubmit, errors } = useRegister();

  return (
    <div className="container-auth">
      <div className="body-auth">
        {/* Header */}
        <HeaderSection
          title="Criar Conta"
          text="Já possui cadastro? Entre"
          linkTo="/auth/login"
        />

        {/* Form */}
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
          {/* Nome */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                inputType="text"
                id="name"
                placeholder="Digite seu nome"
                label="Nome"
                error={errors.name}
                {...field}
                primaryColor
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                inputType="email"
                id="email"
                placeholder="Digite seu email"
                label="E-mail"
                error={errors.email}
                {...field}
                primaryColor
              />
            )}
          />

          {/* Senha */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                inputType="password"
                id="password"
                placeholder="Digite sua senha"
                label="Senha"
                error={errors.password}
                {...field}
                primaryColor
              />
            )}
          />

          {/* Confirmar senha */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                inputType="password"
                id="confirmPassword"
                placeholder="Confirme sua senha"
                label="Confirmar senha"
                error={errors.confirmPassword}
                {...field}
                primaryColor
              />
            )}
          />

          {/* Botão */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={Object.keys(errors).length > 0}
            className="w-full mt-2 cursor-pointer"
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
}
