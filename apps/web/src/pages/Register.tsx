import HeaderSection from "@/components/header/HeaderSection";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { useRegister } from "@/hooks/useRegister";
import InputWithLabel from "@/components/form/InputWithLabel";
import { PATH } from "@/utils/path";
import { buttonData } from "@/data/button.data";
import { dialogTexts } from "@/data/dialog.data";

const styles = {
  containerAuth: "container-auth",
  bodyAuth: "body-auth",
  formAuth: "form-auth",
  button: "w-full mt-2 cursor-pointer",
};

export default function Register() {
  const { control, handleSubmit, onSubmit, errors } = useRegister();

  return (
    <div className={styles.containerAuth}>
      <div className={styles.bodyAuth}>
        {/* Header */}
        <HeaderSection
          title="Criar Conta"
          text="Já possui cadastro? Entre"
          linkTo={PATH.LOGIN}
        />

        {/* Form */}
        <form className={styles.formAuth} onSubmit={handleSubmit(onSubmit)}>
          {/* Nome */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                inputType="text"
                id="name"
                placeholder={dialogTexts.name.placeholder}
                label={dialogTexts.name.label}
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
                placeholder={dialogTexts.email.placeholder}
                label={dialogTexts.email.label}
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
                placeholder={dialogTexts.password.placeholder}
                label={dialogTexts.password.label}
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
                placeholder={dialogTexts.confirmPassword.placeholder}
                label={dialogTexts.confirmPassword.label}
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
            className={styles.button}
          >
            {buttonData.register}
          </Button>
        </form>
      </div>
    </div>
  );
}
