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
import { StatusTaskType } from "@/types/StatusTaskType";
import { PriorityTaskType } from "@/types/PriorityTaskType";
import ControllerInputForm from "../form/ControllerInputForm";
import { selectStatusValues } from "@/data/selectStatus.data";
import { ControllerSelect } from "../form/ControllerSelectForm";
import { selectPriorityData } from "@/data/selectPriority.data";
import { LuPlus } from "react-icons/lu";
import { ControllerDatePicker } from "../form/ControllerDatePicker";
import { useNewTaskDialog } from "@/hooks/useNewTaskDialog";
import { useUsersStore } from "@/store/useUsersStore";
import { useEffect } from "react";
import { ControllerMultiSelect } from "../form/ControllerMultiSelect";
import { newTaskDialogData } from "@/data/newTaskDialog.data";

export default function NewTaskDialog() {
  const { handleSubmit, control, reset, errors, onSubmit } = useNewTaskDialog();
  const { users, getUsers } = useUsersStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-primary text-secondary gap-1">
            <LuPlus className="size-4" />
            <span className="text-xs font-medium tracking-wider">
              {newTaskDialogData.buttonNewTask}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{newTaskDialogData.dialogTitle}</DialogTitle>
            <DialogDescription>
              {newTaskDialogData.dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
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
            <div className="grid gap-3">
              <ControllerInputForm
                name="description"
                control={control}
                label="Descrição"
                placeholder="Insira uma descrição para a atividade."
                type="text"
                primaryColor
                error={errors.description}
              />
            </div>
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
              <ControllerSelect<PriorityTaskType>
                name="priority"
                control={control}
                label="Prioridade"
                placeholder="Defina a prioridade"
                values={selectPriorityData}
                error={errors.priority}
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => reset()}
              >
                {newTaskDialogData.buttonCancel}
              </Button>
            </DialogClose>
            <Button onClick={handleSubmit(onSubmit)}>
              {newTaskDialogData.buttonSave}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
