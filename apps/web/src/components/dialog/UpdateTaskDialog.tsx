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
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>{updateTaskDialogData.dialogTitle}</DialogTitle>
          <DialogDescription>
            {updateTaskDialogData.dialogDescription}
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form className="flex flex-col gap-4">
          {/* TITLE */}
          <div className="grid gap-3">
            <ControllerInputForm
              name="title"
              control={control}
              label="Titulo"
              placeholder="Insira o título da atividade."
              type="text"
              primaryColor
              error={errors.title}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="grid gap-3">
            <ControllerInputForm
              name="description"
              control={control}
              label="Descrição"
              placeholder="Insira uma descrição."
              type="text"
              primaryColor
              error={errors.description}
            />
          </div>

          <div className="grid gap-3">
            <ControllerSelect<PriorityTaskType>
              name="priority"
              control={control}
              label="Prioridade"
              placeholder="Defina a prioridade"
              values={selectPriorityData}
              error={errors.priority}
            />
          </div>
          {/* PRIORITY */}
          <div className="grid gap-3">
            <ControllerSelect<StatusTaskType>
              name="status"
              control={control}
              label="Status"
              placeholder="Selecione um status"
              values={selectStatusValues}
              error={errors.status}
            />
          </div>

          <div className="grid gap-3">
            <ControllerMultiSelect
              name="assignedEmails"
              label="Responsáveis"
              control={control}
              options={users.map((u) => ({
                label: u.email,
                value: u.email,
              }))}
            />
          </div>

          <div className="grid gap-3">
            <ControllerDatePicker
              name="dueDate"
              label="Prazo de entrega"
              control={control}
              error={errors.dueDate}
            />
          </div>

          <DialogFooter className="mt-4">
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
