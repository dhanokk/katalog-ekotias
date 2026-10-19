"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";

// Helper untuk memastikan admin sudah login sebelum menjalankan aksi
export async function pastikanAdminLogin() {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(
      "/admin/login?error=" +
        encodeURIComponent("Sesi kamu telah berakhir. Silakan masuk kembali.")
    );
  }

  return { supabase, user };
}

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

export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData = maybeFormData || prevStateOrFormData;
  const passwordBaru = formData.get("password_baru")?.toString() || "";
  const konfirmasiPassword = formData.get("konfirmasi_password")?.toString() || "";

  // Wajib periksa login admin di server sebelum mengubah data
  const { supabase } = await pastikanAdminLogin();

  if (passwordBaru.length < 8) {
    redirect(
      "/admin/password?error=" +
        encodeURIComponent("Password baru minimal 8 karakter.")
    );
  }

  if (passwordBaru !== konfirmasiPassword) {
    redirect(
      "/admin/password?error=" +
        encodeURIComponent("Konfirmasi password tidak sama.")
    );
  }

  let pesanError = null;

  try {
    const { error } = await supabase.auth.updateUser({
      password: passwordBaru,
    });

    if (error) {
      pesanError = `Gagal mengganti password: ${error.message}`;
    }
  } catch (err) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    pesanError = err.message || "Terjadi kesalahan saat mengganti password.";
  }

  if (pesanError) {
    redirect("/admin/password?error=" + encodeURIComponent(pesanError));
  }

  redirect(
    "/admin/password?berhasil=" + encodeURIComponent("Password berhasil diganti.")
  );
}

export { login as masuk, keluar as logout };
