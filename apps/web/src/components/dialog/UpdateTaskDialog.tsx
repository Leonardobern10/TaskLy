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

const styles = {
  dialogContent: "sm:max-w-125",
  form: "flex flex-col gap-4",
  dialogFooter: "mt-4",
};

export default function UpdateTaskDialog({ task }: { task: TaskItem }) {
  const { handleSubmit, control, onSubmit, errors, reset, users } =
    useUpdateTaskDialog(task);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
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
        <form className={styles.form}>
          <ContainerInputDialog
            children={
              <ControllerInputForm
                name="title"
                control={control}
                label="Titulo"
                placeholder="Insira o título da atividade."
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
                label="Descrição"
                placeholder="Insira uma descrição."
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
                label="Prioridade"
                placeholder="Defina a prioridade"
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
                label="Status"
                placeholder="Selecione um status"
                values={selectStatusValues}
                error={errors.status}
              />
            }
          />
          <ContainerInputDialog
            children={
              <ControllerMultiSelect
                name="assignedEmails"
                label="Responsáveis"
                control={control}
                options={users.map((u) => ({
                  label: u.email,
                  value: u.email,
                }))}
              />
            }
          />
          <ContainerInputDialog
            children={
              <ControllerDatePicker
                name="dueDate"
                label="Prazo de entrega"
                control={control}
                error={errors.dueDate}
              />
            }
          />
          <DialogFooter className={styles.dialogFooter}>
            <DialogClose asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => reset()}
              >
                {updateTaskDialogData.buttonCancel}
              </Button>
            </DialogClose>

            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              {updateTaskDialogData.buttonSave}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
