import GuestBookCommentForm from "@/app/_components/GuestBookCommentForm";
import TabSummary from "@/app/_components/TabSummary";
import { GuestBookService } from "@/app/_lib/guestbook/service";
import formattedDate from "@/app/_utils/formattedDate";
import { revalidatePath } from "next/cache";

async function handleGuestBookCommentSubmit(
  prevState: {
    success: boolean;
    error: boolean;
    message: string;
  },
  formData: FormData,
) {
  "use server";
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

export default async function GuestBookPage() {
  const comments = await GuestBookService.getComments();

  return (
    <>
      <TabSummary
        title={"익명 방명록"}
        content={`총 ${comments.length}개의 방명록`}
      />
      <section>
        {comments.map((comment) => (
          <div key={comment._id.toString()}>
            <div>{comment.comment}</div>
            <div>{formattedDate(comment.createdAt)}</div>
          </div>
        ))}
      </section>
      <GuestBookCommentForm handleSubmit={handleGuestBookCommentSubmit} />
    </>
  );
}
