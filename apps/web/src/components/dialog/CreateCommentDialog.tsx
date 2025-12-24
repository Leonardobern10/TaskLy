import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ControllerInputForm from "../form/ControllerInputForm";
import { Button } from "../ui/button";
import { useCreateCommentDialog } from "@/hooks/useCreateCommentDialog";
import { createCommentData } from "@/data/createComment.data";

const styles = {
  dialogContent: "sm:max-w-106.25 max-h-screen",
  containerInput: "grid gap-4 pt-4",
};

export default function CreateCommentDialog({ id }: { id: string }) {
  const { handleSubmit, control, errors, onSubmit, reset } =
    useCreateCommentDialog(id);
  const {
    dialogCloseText,
    dialogDescriptionText,
    dialogTitleText,
    inputCommentPlaceholder,
    inputName,
    buttonSaveText,
  } = createCommentData;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LuPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <form>
          <DialogHeader>
            <DialogTitle>{dialogTitleText}</DialogTitle>
            <DialogDescription>{dialogDescriptionText}</DialogDescription>
          </DialogHeader>
          <div className={styles.containerInput}>
            <div>
              <ControllerInputForm
                name="text"
                control={control}
                label={inputName}
                placeholder={inputCommentPlaceholder}
                type="text"
                error={errors}
                primaryColor
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => reset()}>
              {dialogCloseText}
            </Button>
          </DialogClose>
          <Button className="cursor-pointer" onClick={handleSubmit(onSubmit)}>
            {buttonSaveText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
