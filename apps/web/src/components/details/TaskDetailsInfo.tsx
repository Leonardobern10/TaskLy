import InfoDetailsContainer from "./InfoContainerDetails";
import AssignedContainer from "./AssignedContainer";

type TaskDetailsInfoProps = {
  createdAt: Date;
  updatedAt: Date;
  authorEmail: string;
  assignedEmails: string[];
};

const styles = {
  h3: "text-lg font-semibold mb-3",
  content: "space-y-1 text-sm",
};

const dataComponent = {
  title: "Informações",
  createdAt: "Criado em",
  updatedAt: "Última atualização",
  autor: "Autor",
};

export default function TaskDetailsInfo({
  createdAt,
  updatedAt,
  authorEmail,
  assignedEmails,
}: TaskDetailsInfoProps) {
  return (
    <section>
      <h3 className={styles.h3}>{dataComponent.title}</h3>
      <div className={styles.content}>
        <InfoDetailsContainer
          title={dataComponent.createdAt}
          value={new Date(createdAt)}
        />
        <InfoDetailsContainer
          title={dataComponent.updatedAt}
          value={new Date(updatedAt)}
        />
        <InfoDetailsContainer title={dataComponent.autor} value={authorEmail} />
        <AssignedContainer assignedEmails={assignedEmails} />
      </div>
    </section>
  );
}
