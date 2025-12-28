import { ALERTS } from "@/utils/alerts";

const style = {
  title: "text-muted-foreground pt-2",
  value: "font-medium text-foreground",
  alert: "text-neutral-700 font-medium",
};

const dataComponent = {
  title: "Responsáveis: ",
};

type AssignedContainerProps = {
  assignedEmails: string[];
};

export default function AssignedContainer({
  assignedEmails,
}: AssignedContainerProps) {
  return (
    <div>
      <p className={style.title}>{dataComponent.title}</p>
      {assignedEmails.length === 0 ? (
        <p className={style.alert}>{ALERTS.withoutAssigneds}</p>
      ) : (
        <ul className={style.value}>
          {assignedEmails.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
