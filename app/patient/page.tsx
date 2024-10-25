import ScreeningForm from "@/components/screeningForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Page() {
  return (
    <section className="min-h-screen py-4">
      <h1 className="text-4xl font-bold">Patient Page</h1>
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger>
            <Button variant={"destructive"}>
              <span role="img" aria-label="help icon">
                ❌
              </span>{" "}
              I don&apos;t feel so well
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Screening Form</SheetTitle>
              <SheetDescription>
                <ScreeningForm />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <p className="mt-4 text-lg">
        This is the patient page. You can use this page to display patient
        information, appointments, and other patient-related data.
      </p>
    </section>
  );
}
