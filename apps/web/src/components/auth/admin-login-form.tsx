"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/lib/api";
import { setAccessToken } from "@/lib/auth-storage";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(1, "Informe sua senha"),
});

type LoginSchema = z.infer<typeof loginSchema>;

type AuthResponse = {
  accessToken: string;
};

export function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      setServerError(null);

      const response = await api<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setAccessToken(response.accessToken);
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Não foi possível entrar"
      );
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-(--mm-text)">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="admin@megamoveis.com"
          className="mm-input w-full"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-(--mm-danger)">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-(--mm-text)">
          Senha
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="mm-input w-full pr-11"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--mm-text-soft)"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {errors.password ? (
          <p className="text-sm text-(--mm-danger)">{errors.password.message}</p>
        ) : null}
      </div>

      {serverError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="mm-btn-primary w-full gap-2">
        <LogIn className="h-4 w-4" />
        <span>{isSubmitting ? "Entrando..." : "Entrar"}</span>
      </button>
    </form>
  );
}