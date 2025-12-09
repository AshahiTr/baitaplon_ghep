import { supabase } from "../supabaseClient";

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  // Sign up với metadata
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || '',
      }
    }
  });

  if (error) return { success: false, message: error.message };
  
  // Kiểm tra nếu cần confirm email
  if (data.user && !data.session) {
    return { 
      success: true, 
      data,
      message: "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận." 
    };
  }
  
  return { success: true, data };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, data };
}

export async function signOut() {
  await supabase.auth.signOut();
}

// Lấy thông tin user từ public.users
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return { success: false, message: error.message };
  return { success: true, data };
}