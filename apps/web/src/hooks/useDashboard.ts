import { useState, type ChangeEvent } from "react";

export const useDashboard = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const today = new Date();
  const formattedDay = today.toLocaleDateString("pt-BR", {
    weekday: "long",
  });
  const formattedDate = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTitle(e.target.value);

  return { formattedDate, formattedDay, searchTitle, onChange };
};
