import { TableItem } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Row({
  id,
  theme,
  number,
  createDate,
  changeDate,
  finishDate,
  status,
}: TableItem) {
  const router = useRouter();

  const goRequestPage = () => {
    router.push("/request/" + id);
  };
  return (
    <tr onClick={goRequestPage}>
      <td>
        <div className="table__theme">
          {theme}
          {status === "На согласовании" && <span className="table__warning">!</span>}
        </div>
      </td>
      <td>№ {number}</td>
      <td>{createDate}</td>
      <td>{changeDate}</td>
      <td>{finishDate}</td>
      <td>{status}</td>
    </tr>
  );
}
