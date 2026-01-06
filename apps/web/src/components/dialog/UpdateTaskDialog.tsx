import { Button } from "../ui/button";
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
import { ControllerSelect } from "../form/ControllerSelectForm";
import type { PriorityTaskType } from "@/types/PriorityTaskType";
import { selectPriorityData } from "@/data/selectPriority.data";
import type { StatusTaskType } from "@/types/StatusTaskType";
import { selectStatusValues } from "@/data/selectStatus.data";
import { ControllerDatePicker } from "../form/ControllerDatePicker";
import { FaRegEdit } from "react-icons/fa";
import { useUpdateTaskDialog } from "@/hooks/useUpdateTaskDialog";
import type { TaskItem } from "@/types/TaskItem";
import { ControllerMultiSelect } from "../form/ControllerMultiSelect";
import { updateTaskDialogData } from "@/data/updateTaskDialog.data";
import ContainerInputDialog from "./ContainerInputDialog";
import { dialogTexts } from "@/data/dialog.data";

const styles = {
  dialogContent: "sm:max-w-125",
  form: "flex flex-col gap-4",
  dialogFooter: "mt-4",
  buttonClose: "cursor-pointer",
  button: "text-primary",
};

type UpdateTaskDialogProps = {
  task: TaskItem;
};

export default function UpdateTaskDialog({ task }: UpdateTaskDialogProps) {
  const { handleSubmit, control, onSubmit, errors, reset, users } =
    useUpdateTaskDialog(task);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={styles.button}>
          <FaRegEdit />
          <p>{updateTaskDialogData.buttonEdit}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>{updateTaskDialogData.dialogTitle}</DialogTitle>
          <DialogDescription>
            {updateTaskDialogData.dialogDescription}
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <ContainerInputDialog
            children={
              <ControllerInputForm
                name="title"
                control={control}
                label={dialogTexts.taskTitle.label}
                placeholder={dialogTexts.taskTitle.placeholder}
                type="text"
                primaryColor
                error={errors.title}
              />
            }
          />
          <ContainerInputDialog
            children={
              <ControllerInputForm
                name="description"
                control={control}
                label={dialogTexts.description.label}
                placeholder={dialogTexts.description.placeholder}
                type="text"
                primaryColor
                error={errors.description}
              />
            }
          />
          <ContainerInputDialog
            children={
              <ControllerSelect<PriorityTaskType>
                name="priority"
                control={control}
                label={dialogTexts.priority.label}
                placeholder={dialogTexts.priority.placeholder}
                values={selectPriorityData}
                error={errors.priority}
              />
            }
          />
          <ContainerInputDialog
            children={
              <ControllerSelect<StatusTaskType>
                name="status"
                control={control}
                label={dialogTexts.status.label}
                placeholder={dialogTexts.status.placeholder}
                values={selectStatusValues}
                error={errors.status}
              />
            }
          />
          <ContainerInputDialog
            children={
              <ControllerMultiSelect
                name="assignedEmails"
                label={dialogTexts.assigned.label}
                control={control}
                options={users.map((u) => ({
                  label: u.email,
                  value: u.email,
                }))}
                placeholder={dialogTexts.assigned.placeholder}
              />
            }
          />
          <ContainerInputDialog
            children={
              <ControllerDatePicker
                name="dueDate"
                label={dialogTexts.dueDate.label}
                control={control}
                error={errors.dueDate}
              />
            }
          />
          <DialogFooter className={styles.dialogFooter}>
            <DialogClose asChild>
              <Button
                className={styles.buttonClose}
                variant="outline"
                onClick={() => reset()}
              >
                {updateTaskDialogData.buttonCancel}
              </Button>
            </DialogClose>

            <Button type="submit">{updateTaskDialogData.buttonSave}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
