"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";

export async function login(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    redirect("/admin/login?error=" + encodeURIComponent("Email dan password wajib diisi."));
  }

  let pesanError = null;

  try {
    const supabase = await createSessionClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (
        error.message.includes("Invalid login credentials") ||
        error.message.includes("invalid_grant")
      ) {
        pesanError = "Email atau password salah. Silakan periksa kembali.";
      } else if (error.message.includes("Email not confirmed")) {
        pesanError = "Email akun admin belum dikonfirmasi.";
      } else {
        pesanError = `Gagal masuk: ${error.message}`;
      }
    }
  } catch (err) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    pesanError = err.message || "Terjadi kesalahan saat masuk. Silakan coba lagi.";
  }

  if (pesanError) {
    redirect("/admin/login?error=" + encodeURIComponent(pesanError));
  }

  redirect("/admin");
}

export async function keluar() {
  try {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  } catch {
    // Tetap alihkan ke halaman login meski terjadi kesalahan saat sign out
  }

  redirect("/admin/login");
}

export { login as masuk, keluar as logout };

