import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePagination } from "@/hooks/usePagination";

const styles = {
  handlePrevious: (page: number) =>
    page === 1 ? "pointer-events-none opacity-50" : "",
  handleNext: (page: number, totalPages: number) =>
    page === totalPages ? "pointer-events-none opacity-50" : "",
  containerPagination: "py-4 px-4",
};

export default function PaginationComponent() {
  const dataPages = usePagination();

  return (
    <div className={styles.containerPagination}>
      <Pagination>
        <PaginationContent>
          {/* PREVIOUS */}
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={dataPages?.page === 1}
              onClick={dataPages?.handlePrevious}
              className={styles.handlePrevious(dataPages?.page!)}
            />
          </PaginationItem>

          {/* NÚMEROS */}
          {dataPages?.pagesArray.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === dataPages?.page}
                onClick={() => dataPages.fetchTasks(p)}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* ELLIPSIS (opcional caso tenha muitas páginas) */}
          {dataPages?.totalPages! > 7 && <PaginationEllipsis />}

          {/* NEXT */}
          <PaginationItem>
            <PaginationNext
              aria-disabled={dataPages?.page === dataPages?.totalPages}
              onClick={dataPages?.handleNext}
              className={styles.handleNext(
                dataPages?.page!,
                dataPages?.totalPages!
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
