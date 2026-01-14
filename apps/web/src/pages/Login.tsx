import InputWithLabel from "@/components/form/InputWithLabel";
import HeaderSection from "@/components/header/HeaderSection";
import { Button } from "@/components/ui/button";
import { buttonData } from "@/data/button.data";
import { dialogTexts } from "@/data/dialog.data";
import { useLogin } from "@/hooks/useLogin";
import { PATH } from "@/utils/path";
import { Controller } from "react-hook-form";

const styles = {
  containerAuth: "container-auth",
  bodyAuth: "body-auth",
  formAuth: "form-auth",
  button: "w-full md:w-fit mt-2 cursor-pointer font-semibol text-lg",
};

export default function Login() {
  const { handleSubmit, control, errors, onSubmit } = useLogin();

  return (
    <div className={styles.containerAuth}>
      <div className={styles.bodyAuth}>
        {/* Header */}
        <HeaderSection
          title="Entrar"
          text="Ainda não tem conta? Cadastre-se"
          linkTo={PATH.REGISTER}
        />

        {/* Form */}
        <form className={styles.formAuth} onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="email"
                inputType="email"
                label={dialogTexts.email.label}
                placeholder={dialogTexts.email.placeholder}
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
                label={dialogTexts.password.label}
                placeholder={dialogTexts.password.placeholder}
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
            className={styles.button}
          >
            {buttonData.enter}
          </Button>
        </form>
      </div>
    </div>
  );
}
