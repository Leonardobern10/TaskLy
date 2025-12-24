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
import { ControllerMultiSelect } from "../form/ControllerMultiSelect";
import { newTaskDialogData } from "@/data/newTaskDialog.data";
import ContainerInputDialog from "./ContainerInputDialog";

const styles = {
  icon: "size-4",
  buttonSpan: "text-sm font-medium",
  dialogContent: "sm:max-w-106.25 max-h-screen overflow-y-scroll",
  containerForm: "grid gap-4",
  containerInput: "grid gap-3",
};

export default function NewTaskDialog() {
  const { handleSubmit, control, reset, errors, onSubmit, users } =
    useNewTaskDialog();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">
            <LuPlus className={styles.buttonSpan} />
            <span className={styles.buttonSpan}>
              {newTaskDialogData.buttonNewTask}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>{newTaskDialogData.dialogTitle}</DialogTitle>
            <DialogDescription>
              {newTaskDialogData.dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <div className={styles.containerForm}>
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
                  placeholder="Insira uma descrição para a atividade."
                  type="text"
                  primaryColor
                  error={errors.description}
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
