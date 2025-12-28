import { useAuthStore } from "@/store/useAuthStore";
import { useTaskStore } from "@/store/useTaskStore";
import type { FilterFormValues } from "@/types/FilterFormValues";
import { OrderParams } from "@/types/OrderOptionsEnum";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useTasksContainer = ({ searchTitle }: { searchTitle: string }) => {
  const { tasks, loading, setFilters } = useTaskStore();
  const { user } = useAuthStore();
  const { control, watch, reset } = useForm<FilterFormValues>({
    defaultValues: { status: "", priority: "", order: OrderParams.CREATED },
  });
  const router = useRouter();
  const selectedStatus = watch("status");
  const selectedPriority = watch("priority");
  const selectedOrder = watch("order");

  const handleReset = () => {
    reset({ status: "", priority: "", order: OrderParams.CREATED });
    setFilters({});
  };

  useEffect(() => {
    if (!user) router.navigate({ from: "/auth/login" });

    const delay = setTimeout(() => {
      setFilters({
        title: searchTitle.trim() || undefined,
        status: selectedStatus || undefined,
        priority: selectedPriority || undefined,
        order: selectedOrder || undefined,
      });
    }, 400);
    return () => clearTimeout(delay);
  }, [user, searchTitle, selectedStatus, selectedPriority, selectedOrder]);

  return {
    tasks,
    loading,
    control,
    handleReset,
  };
};
