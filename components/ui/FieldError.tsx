import type { Errors } from "@/lib/forms";

/* pesan error di bawah field (span.fm-err seperti versi HTML) */
export default function FieldError({ errors, id }: { errors: Errors; id: string }) {
  return errors[id] ? (
    <span className="fm-err" id={`${id}-err`}>
      {errors[id]}
    </span>
  ) : null;
}
