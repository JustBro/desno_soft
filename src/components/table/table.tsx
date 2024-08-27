import "./table.scss";
import Row from "../row/row";
import { TableItem } from "@/types/types";

type Props = {
  data: TableItem[];
};

export const Table = ({ data }: Props) => {
  const titles = [
    "Тема",
    "Номер",
    "Дата создания",
    "Дата изменения",
    "Крайний срок",
    "Состояние",
  ];

  return (
    <section className="table">
      <table>
        <thead>
          <tr>
            {titles.map((title) => (
              <th>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData) => (
            <Row {...rowData} />
          ))}
        </tbody>
      </table>
    </section>
  );
};
