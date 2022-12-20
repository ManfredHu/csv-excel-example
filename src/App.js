import "./styles.css";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const combinedData = {
  country: "ksksjdjd",
  create_day: "10/11/2022",
  create_time: "7:02 PM",
  detail: "This is a tricks data",
  email: "testest@163.com",
  handle_status: "New",
  id: "7153207099810414222",
  name: "ManfredHu",
  note: "测试一下",
  phone: "13800138000",
  source: "Profile"
};
const columns = [
  "id",
  "name",
  "create_day",
  "create_time",
  "handle_status",
  "source",
  "detail",
  "phone",
  "email",
  "country",
  "note"
];

const header = [
  "ID",
  "Name",
  "Received date",
  "Received time",
  "Status",
  "Source",
  "Details",
  "Phone number",
  "Email",
  "Country and city",
  "Notes"
];

export default function App() {
  // CSV数据组装，因为CSV数据为，号分割，简单直接可以自行组装
  const downloadCSV = () => {
    // 新建10行一样的数据
    // DIY 表头
    const csvText = Papa.unparse(Array(10).fill(combinedData), {
      quotes: true,
      header: false,
      columns
    });
    if (!csvText) {
      console.log("数据错误", csvText);
      return;
    }
    console.log("csv数据", csvText);
    const encodedUri = new Blob([`\ufeff${header.join(",")}\n${csvText}`], {
      type: "text/csv;charset=utf-8"
    });
    const link = document.createElement("a");
    const fileName = `now-${Date.now()}.csv`;
    link.setAttribute("href", window.URL.createObjectURL(encodedUri));
    link.setAttribute("Content-Type", "text/csv");
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Excel 数据组装，需要依赖XLSX库
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(Array(10).fill(combinedData), {
      // combinedData 为 object，这里可以设置字段的 key 对应的列，默认通过 Object.keys 排列
      header: columns
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    /* calculate column width */
    // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    // worksheet["!cols"] = [{ wch: 200 }];

    const fileName = `now-${Date.now()}.xlsx`;
    XLSX.writeFile(workbook, fileName, {
      compression: true
    });
  };
  return (
    <div className="App">
      <h1 onClick={downloadCSV}>点击下载CSV文件</h1>
      <h1 onClick={downloadExcel}>点击下载Excel文件</h1>
    </div>
  );
}
