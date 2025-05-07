import { Fragment, useEffect, useState } from "react";
import styles from "./App.module.scss";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

function App() {
  const [dataForm, setDataForm] = useState({
    date: dayjs(new Date()).format("YYYY-MM-DD"),
    sales: "",
    tips: "",
  });
  const [listDataForm, setListDataForm] = useState([]);
  const getDataFormLocaleStorage = localStorage.getItem("DataForm");
  console.log("dataForm", dataForm);

  useEffect(() => {
    setListDataForm(JSON.parse(getDataFormLocaleStorage));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setDataForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    // const formData = new FormData(e.target);
    // const formJson = Object.fromEntries(formData.entries());
    // console.log("formJson-1", formJson);
    // console.log("dataForm", dataForm);
    setDataForm({
      date: "",
      sales: "",
      tips: "",
    });
    const result = [
      ...listDataForm,
      {
        date: dayjs(dataForm.date).format("dddd.MM.YYYY"),
        sales: dataForm.sales,
        tips: dataForm.tips,
        sum: Number(dataForm.sales) + Number(dataForm.tips),
      },
    ];
    setListDataForm(result);

    localStorage.setItem("DataForm", JSON.stringify(result));
  }

  return (
    <>
      <h1>Vite + React </h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label>
          Число
          <input
            type="date"
            name="date"
            value={dataForm.date}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Выручка
          <input
            type="number"
            name="sales"
            value={dataForm.sales}
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label>
          Чаевые
          <input
            type="number"
            name="tips"
            value={dataForm.tips}
            onChange={(e) => handleChange(e)}
          />
        </label>

        <button type="submit">Сохранить</button>
      </form>
      <ol className={styles.list}>
        {listDataForm.map((item, index) => {
          return (
            <li className={styles.list__item} key={index}>
              {index + 1}
              <p>Дата {item.date}</p>
              <p>Выручка {item.sales}</p>
              <p>Чаевые {item.tips}</p>
              <p>Общая сумма за день {item.sum}</p>
            </li>
          );
        })}
      </ol>
      <div className={styles.generalInfo}>
        <p>Количество смен за месяц {listDataForm.length}</p>
        <p>
          Выручка за месяц
          {listDataForm.reduce((prev, item) => {
            return Number(prev) + Number(item.sales);
          }, 0)}
        </p>
        <p>
          Чаевые за месяц
          {listDataForm.reduce((prev, item) => {
            return Number(prev) + Number(item.tips);
          }, 0)}
        </p>
        <p>
          Общая сумма за месяц
          {listDataForm.reduce((prev, item) => {
            return Number(prev) + Number(item.sum);
          }, 0)}
        </p>
      </div>
    </>
  );
}

export default App;
