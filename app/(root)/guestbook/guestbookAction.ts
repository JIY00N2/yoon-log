"use server";

import { GuestBookService } from "@/app/_lib/guestbook/service";
import { revalidatePath } from "next/cache";

export async function guestbookAction(
  prevState: {
    success: boolean;
    error: boolean;
    message: string;
  },
  formData: FormData,
) {
  const comment = formData.get("comment")?.toString();
  if (!comment) {
    return {
      success: false,
      error: true,
      message: "방명록을 남겨주세요!",
    };
  }
  try {
    await GuestBookService.createComment({ comment });
    revalidatePath("/guestbook");
    return {
      success: true,
      error: false,
      message: "등록 성공!",
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: (error as Error).message,
    };
  }
}
