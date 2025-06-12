import { Button } from "@heroui/react";

export function SubmitButton({ defaultText, loadingText, loading = false }) {
  return (
    <Button type="submit" color="primary" className="mt-4 w-full" isLoading={loading}>
      {loading ? loadingText : defaultText}
    </Button>
  );
}
